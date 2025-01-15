const Attendance = require("../../models/attendance/attendance.model");
const Employee = require("../../models/auth/employee.model");

const moment = require("moment");
const xlsx = require("xlsx");

function calcLate(shiftStartTime,punchInTime){

    console.log("shiftStartTime ",shiftStartTime);
    console.log("punchInTime ",punchInTime);
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

module.exports = {
    downloadDailyReport
}