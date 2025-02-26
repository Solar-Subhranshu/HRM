// const Department = require("../../models/common/department.model");
// const JoiningForm = require("../../models/joiningForm/joiningForm.model");
const Employee = require("../../models/auth/employee.model");
const moment = require("moment");
const xlsx = require("xlsx");


//only admin should download and access these reports.
const monthlyJoiningReport = async(req,res)=>{
    try {
        const {monthDate} = req.query || req.body;

        if(!monthDate){
            return res.status(400).json({
                success:false,
                message:"Month-date is required!"
            });
        }

        let correctMonthDate;
        if(!(monthDate instanceof Date)){
            correctMonthDate = new Date(monthDate);
        }
        else{
            correctMonthDate = monthDate;
        }

        // Get late days count in the current month
        const firstDayOfMonth = moment(correctMonthDate).startOf("month").toDate();
        const lastDayOfMonth = moment(correctMonthDate).endOf("month").toDate();

        const dbData = await Employee.find({
            // status:"Approved",
            joiningDate: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
        })
        .populate({
            path:"department",
            select:"department"
        })
        .populate({
            path:"designation",
            select:"designation"
        })
        .populate({
            path:"joiningHR",
            select:"name"
        })
        .populate({
            path:"branch",
            select:"name"
        })
        // .select("employeeCode name father_husbandName personalPhoneNum personalEmail")
        .lean();

        if(!dbData){
            return res.status(400).json({
                success:false,
                message:"Failed To Retrieve Data from DataBase. Try Again Later."
            });
        }
        if(dbData.length===0){
            return res.status(202).json({
                success:true,
                message:"No joinings found for the selected month.",
                data:[]
            })
        }
        // console.log(dbData);

        const refinedDataArr = dbData.map((item)=>({
            Employee_Code : item.employeeCode,
            Name : item.name,
            Mobile_No : item.personalPhoneNum, //personal phone-number
            Email : item.personalEmail,
            Department : item.department.department,
            Role_Allocated : item.designation.designation,
            Location : item.branch.name,
            Reporting : item.reportingManager.name,
            Joining_Date : moment(item.joiningDate).format("DD-MM-YYYY"),
            Bank_Name : item.bankName,
            Bank_IFSC_Code : item.bankIFSC,
            Bank_Account_No : `${item.bankAccount},`,
            Aadhar_No : `${item.aadharCard},`,
            PAN_No : `${item.panCard},`,
            Salary : item.salary ? `CTC ${item.salary.ctc}/- in-Hand ${item.salary.inHand}/-` : "Salary Not Provided.",
            Father_Name : item.father_husbandName,
            HR_Name : item.joiningHR?.name
        }));

        // console.log(downloadFormatData);

        //setting the buffer to send
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(refinedDataArr);
        xlsx.utils.book_append_sheet(workbook,worksheet,"Joining-Report");

        const sendableBuffer = xlsx.write(workbook,{bookType:'xlsx', type:'buffer'});
        const fileName = `${moment(correctMonthDate).format("MMM-YYYY")} Joining Report.xlsx`;
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        return res.status(200).send(sendableBuffer);
        // return res.status(200).json({
        //     success:true,
        //     message:"Db data fetched successfully.",
        //     data:refinedDataArr
        // });


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Couldn't Generate Report",
            error:error.message
        });
    }
}


module.exports = {
    monthlyJoiningReport
}