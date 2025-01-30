const Leave = require("../../models/attendance/leave.model");
const Employee = require("../../models/auth/employee.model");

//CRUD operation 
/*
create - at the time of employee registration, at the start of every year for all active employees
read - view and show data for monthly reports
update - updation can only happen on leave-allowed-per-month
delete - only available for backend
*/

// called at employee-registration, and on 1st January.
//create a new Leave-Record
const createLeaveRecord = async(empId)=> {
    try {
        if(!empId){
            return{
                success:false,
                message:"employee is required."
            }
        }

        const currDate = new Date();
        const emp = await Employee.findById(empId).select("joiningDate").lean();
        if(!emp.isActive){
            return {
                success:false,
                message:"Employee is no longer active",
            }
        }

        let monthlyLeaves=0;
        let accumulatedLeaves=0;
        //check if eligible for monthly paid leaves (in case we register old employees)
        const monthsCompleted = (currDate.getFullYear() - emp.joiningDate.getFullYear())*12 + (currDate.getMonth() - emp.joiningDate.getMonth());

        if(monthsCompleted >=3){
            monthlyLeaves = 2;

            if(currDate.getFullYear()-emp.joiningDate.getFullYear() > 0){
                const lastYearLeaveRecord = await Leave.findOne({employee:empId , year:(currDate.getFullYear()-1)}).lean();
                if(lastYearLeaveRecord){
                    accumulatedLeaves = lastYearLeaveRecord.leavesAccumulated;  // if leaves were not used completely, last year.
                    monthlyLeaves = lastYearLeaveRecord.leaveAllowedPerMonth;  //if monthly leaves ever changed for that employee, years before
                }
            }
        }

        const newLeaveRecord = new Leave({
            employee:empId,
            leaveAllowedPerMonth: monthlyLeaves,
            leavesAccumulated: accumulatedLeaves,
            year: currDate.getFullYear()
        });

        await newLeaveRecord.save();

        return {
            success:true,
            message:"Leave Record Saved Successfully."
        }

    } catch (error) {
        return {
            success:false,
            message:`An un-expected error occured. ${error.message}`
        }
    }
}

//Shows existing leave-records 
const viewLeaveRecord = async(req,res)=> {
    try {
        const {emp,year} = req.body;

        if(!emp && !year){
            return res.status(400).json({
                success:false,
                message: "One of the field, either employee or year is required."
            });
        }

        if(emp && year){
            const response = await Leave.findOne({employee:emp, year:year}).lean();
            if(response){
                return res.status(200).json({
                    success:true,
                    message : `Employee Leave Record for the year ${year}`,
                    data: response
                });
            }
        }
        
        if(emp){
            const response = await Leave.find({employee:emp}).populate({path:"employee",select:"name"}).lean();
            if(response){
                return res.status(200).json({
                    success:true,
                    message : `Employee Leave Record for employee ${response.employee.name}`,
                    data: response
                });
            }
        }

        if(year){
            const response = await Leave.find({year:year}).lean();
            if(response){
                return res.status(200).json({
                    success:true,
                    message : `Employee Leave Record for Year`,
                    data: response
                });
            }
        }
    } catch (error) {
        return res.status(400).json({
            success:false,
            message :"Internal Server Error",
            error:error.message
        });
    }
}


const updateLeaveCountAllowedPerMonth= async(req,res)=>{
     try {
        //emp can be single employee-id or array of employee-id
        const employeeId=req.employeeId;
        const {emp, leavesPerMonth} =req.body;
        
        if(!emp || !leavesPerMonth){
            return res.status(400).json({
                success:false,
                message: "All fields are required."
            });
        }

        const currYear = new Date().getFullYear();
        const updateField = {
            leaveAllowedPerMonth : leavesPerMonth,
            updated_By:employeeId
        }

        if(Array.isArray(emp)){
            //update in bulk
            //compare which suits better, bulkwrite or updateMany
            const isUpdated = await Leave.updateMany(
                {_id : {$in : emp} },
                {$set : updateField}
            );
            return res.status(200).json({
                success:true,
                message:`Records Updated : ${isUpdated.modifiedCount}`
            });
        }
        else{
            const currRecord = await Leave.findOne({employee:emp, year:currYear}).lean();

            if(currRecord){
                const isUpdated = await Leave.findByIdAndUpdate(currRecord._id, updateField);
                return res.status(200).json({
                    success:true,
                    message:"Leave Record Updated Successfully.",
                    data: isUpdated
                })
            }
            else{ 
                throw new Error("No Record Found to update.")
            }
        }
     } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        });
     }
}

//only for monthly corn job
//updating accumulated leave count.
const updateLeaveAccumulatedEachMonth = async()=> {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
     createLeaveRecord,
     viewLeaveRecord,
     updateLeaveCountAllowedPerMonth,

}