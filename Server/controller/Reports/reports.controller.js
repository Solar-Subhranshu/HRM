const Attendance = require("../../models/attendance/attendance.model");
const Employee = require("../../models/auth/employee.model");
const helper = require("../../utils/common.util");

const moment = require("moment");
const xlsx = require("xlsx");

//calculates late time (difference between shift-time and punch-in time)
function calcLate(shiftStartTime,punchInTime){
    // console.log("shiftStartTime ",shiftStartTime);
    // console.log("punchInTime ",punchInTime);
    if(shiftStartTime=="" || (shiftStartTime instanceof Date))
    {return `00:00`}

    const shiftHr = parseInt(shiftStartTime.split(':')[0]);
    const shiftMin = parseInt(shiftStartTime.split(':')[1]);

    let isPM = punchInTime.slice(-2)==='PM'? true:false;
    let punchHr = parseInt(punchInTime.slice(0,5).split(':')[0]);
    let punchMin = parseInt(punchInTime.slice(0,5).split(':')[1]);

    if(isPM) {punchHr+=12};
    
    if(punchHr<shiftHr){
        return `00:00`
    }
    return `${punchHr-shiftHr}:${punchMin-shiftMin}`
}

const downloadDailyReport = async(req,res)=>{
    try {
        function writeDownloadBuffer(arr,reportType){
            const worksheet =xlsx.utils.json_to_sheet(arr);
            const workbook = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(workbook,worksheet,reportType);
        
            const myBuffer = xlsx.write(workbook,{bookType:'xlsx', type:'buffer'});
            const fileName = `${reportType}_Entries_${new Date().toISOString().split('T')[0]}.xlsx`;
            // console.log(fileName);
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        
            return myBuffer;
        }

        const {date,empArr,reportType}= req.body;
        
        if(!date || !reportType){
            return res.status(400).json({
                success:false,
                message:"Date and Report-Type is required!"
            });
        }

        const empData = await Employee.find().lean()
        .populate({
            path:"department",
            select:"-updatedAt -createdAt -__v -created_By -updated_By"
        })
        .populate({
            path:"reportingManager",
            select:"name"
        })
        .select("name employeeCode department reportingManager"); 

        const responseRecord =  await Attendance.find({date}).lean()
                                .populate({
                                    path:"employeeId",
                                    select:"employeeCode name",
                                    populate:[{
                                        path:"department",
                                        select:"department"
                                    },{
                                        path:"reportingManager",
                                        select:"name"
                                    },{
                                        path:"shift",
                                        select:"startTime"
                                    }]
        });
        
        //selected employee
        if(empArr && Array.isArray(empArr) && empArr.length!=0){
            let generalData = responseRecord.filter((record) => {
                return empArr.some((emp) => {
                    return (emp._id === record.employeeId._id.toString())
                })});
            generalData = generalData.map((d)=> ({
                Emp_Code : d.employeeId.employeeCode,
                Name : d.employeeId.name,
                Department : d.employeeId.department.department,
                Reporting_Manager : d.employeeId.reportingManager?.name || "",
                Status : 'Present',
                In_Time: moment(d.punchInTime).format("hh:mm A")
            }));

            let genData = empData.filter((data) => {
                return empArr.some((emp) => {
                    return emp._id === data._id.toString()
                })});

            genData = genData.map((d)=> ({
                Emp_Code : d.employeeCode,
                Name : d.name? d.name : "",
                Department : d.department.department,
                Reporting_Manager : d.reportingManager?.name || "",
                Status : 'Absent'
            }));

            const finalArr=[
                ...genData,
                ...generalData
            ];

            const myBuffer = writeDownloadBuffer(finalArr,'Selected');
            return res.status(200).send(myBuffer);

            // return res.status(200).json({
            //     success:true,
            //     message:"List of Selected People",
            //     Count:final.length,
            //     data:final
            //    });
        }
        
        //present report
        if(responseRecord.length>0 &&(reportType==='Present')){
            //logic to show present
            const presentData = responseRecord.map((record)=>{
                return {
                    empCode : record.employeeId.employeeCode,
                    name : record.employeeId.name,
                    department : record.employeeId.department.department,
                    reportingManager : record.employeeId.reportingManager.name,
                    inTime: moment(record.punchInTime).format("hh:mm A"), //startTime
                    lateTime: calcLate((record.employeeId.shift?.startTime || ""),moment(record.punchInTime).format("hh:mm A")),
                    outTime: moment(record.punchOutTime).format("hh:mm A"),
                    workingHour : `${String(Math.floor(record.totalMinutes/60)).padStart(2,'0')}:${String(record.totalMinutes%60).padStart(2,'0')}`
                }
            });

            const myBuffer = writeDownloadBuffer(presentData,reportType);
            return res.status(200).send(myBuffer);
        }
       
        //absent report
        if(reportType==='Absent'){
            const absentData = empData.filter((emp)=>{
                return !responseRecord.some(record=> {return record.employeeId._id.toString()=== emp._id.toString()})
            });

            const absentArr = absentData.map((d)=>({
                Emp_Code : d.employeeCode,
                Name : d.name? d.name : "",
                Department : d.department.department,
                Reporting_Manager : d.reportingManager?.name || "",
                Status : 'Absent'
            }));

            const myBuffer = writeDownloadBuffer(absentArr,reportType);
            return res.status(200).send(myBuffer);

        //     return res.status(200).json({
        //     success:true,
        //     message:"List of Absent People",
        //     absentCount:absentArr.length,
        //     data:absentArr
        //    });
        }

        //mispunch report
        if(reportType==='MisPunch'){
            const misPunchData = responseRecord.filter((record)=> !record.punchOutTime);

            const misPunchArr = misPunchData.map((record)=>({
                Emp_Code : record.employeeId.employeeCode,
                Name : record.employeeId.name,
                Department : record.employeeId.department?.department || "",
                Reporting_Manager : record.employeeId.reportingManager?.name || "",
                In_Time: moment(record.punchInTime).format("hh:mm A"),
                Out_Time : "",
                Status : 'Mis-Punch'
            }))

            const myBuffer = writeDownloadBuffer(misPunchArr,reportType);
            return res.status(200).send(myBuffer);

            // return res.status(200).json({
            //     success:true,
            //     message:"List of Mis-Punch People",
            //     misPunchCount:misPunchArr.length,
            //     data:misPunchArr
            //    });
        }
        return res.status(400).json({
            success:false,
            message:"No Record Found",
            data:responseRecord
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Could Not Download.",
            error:error.message
        });
    }
}

const downloadMonthlyReport = async(req,res)=>{
    try {
        // month-> "January 2025"  in this format
        const {month}= req.body;
        if(!month){
            return res.status(400).json({
                success:false,
                message:"Month is required"
            });
        }

        const date = new Date(month);
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
 
        // const employee = await Employee.find().lean();
        const query = { date: { 
                            $gte: firstDay, 
                            $lt: lastDay
                        }};
        
        const attendance = await Attendance.find(query)
        .populate({
            path:"employeeId",
            select:"name employeeCode department designation officeTimePolicy shift"
        })
        .select("-createdAt -updatedAt -updated_By -__v ").lean();
        
        if(!attendance){
            return res.status(400).json({
                success:false,
                message:"No record found."
            });
        }

        return res.status(200).json({
            success:true,
            message:`Attendance Report for the month ${month}`,
            data : attendance
        });
          

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        });
    }
}

const dashboardReport = async(req,res)=>{
    try {
        const currDate = new Date();
        const date =currDate.toISOString().split('T')[0]

        //employee data
        const empData = await Employee.find().lean()
        .populate({
            path:"department",
            select:"-updatedAt -createdAt -__v -created_By -updated_By"
        })
        .populate({
            path:"reportingManager",
            select:"name"
        })
        .select("name employeeCode department reportingManager"); 

        //Current day attendance Data
        const responseRecord =  await Attendance.find({date}).lean()
                                .populate({
                                    path:"employeeId",
                                    select:"employeeCode name",
                                    populate:[{
                                        path:"department",
                                        select:"department"
                                    },{
                                        path:"reportingManager",
                                        select:"name"
                                    },{
                                        path:"shift",
                                        select:"startTime endTime"
                                    },{
                                        path:"officeTimePolicy",
                                        select:"permittedLateArrival"
                                    }
                                ]
        });

        // console.log(responseRecord);

        //present data
        const presentData = responseRecord.map((record)=>{
            return {
                employeeCode: record.employeeId.employeeCode,
                name: record.employeeId.employeeCode,
                department : record.employeeId.department.department,
                in_Time:moment(record.punchInTime).format("hh:mm A"),
                shift : `${record.employeeId.shift.startTime} - ${record.employeeId.shift.endTime}`,
                reportingManager: record.employeeId.reportingManager.name
            }
        })

        //Absent Data
        const absentData = empData.filter((emp)=>{
            return !(responseRecord.some(record=> {return record.employeeId._id.toString()===emp._id.toString()}))
        });
        //absent data to be shown
        const absentDataFormat = absentData.map((d)=>{
            return {
                employeeCode:d.employeeCode,
                name:d.name,
                department:d.department.department,
                reportingManager:d.reportingManager?.name||""
            }
        })

        //Late Data 
        const lateData = responseRecord.filter((record)=>{
            const allowedLateTime = helper.timeDurationInMinutes('00:00',record.employeeId.shift.startTime) + helper.timeDurationInMinutes("00:00",record.employeeId.officeTimePolicy.permittedLateArrival);

            // const midnight = moment("00:00","HH:mm");
            const punchIn = moment(record.punchInTime).diff(moment('00:00','HH:mm'), 'minutes');
            return punchIn>allowedLateTime
        })
        //Late Data to be shown
        const lateDataFormat = lateData.map((d)=>{
            return{
                employeeCode: d.employeeId.employeeCode,
                name: d.employeeId.employeeCode,
                department : d.employeeId.department.department,
                in_Time:moment(d.punchInTime).format("hh:mm A"),
                shift : `${d.employeeId.shift.startTime} - ${d.employeeId.shift.endTime}`,
                reportingManager: d.employeeId.reportingManager.name
            }
        })

        return res.status(200).json({
            success:true,
            data:{
            presentData:presentData,
            absentData:absentDataFormat,
            lateData:lateDataFormat
            }
        })

        throw new Error("Function halted here for checking.")


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error.",
            error:error.message
        });
    }
}



module.exports = {
    downloadDailyReport,
    downloadMonthlyReport,
    dashboardReport
}