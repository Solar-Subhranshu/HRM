const Leave = require("../../models/attendance/leave.model");
const Employee = require("../../models/auth/employee.model");

//CRUD operation 
/*
create - at the time of employee registration, at the start of every year for all active employees
read - view and show data for monthly reports
update - updation can only happen on leave-allowed-per-month
delete - only available for backend
*/

const createLeaveRecord = async(empId)=> {
    try {
        if(!empId){
            return{
                success:false,
                message:"employee is required."
            }
        }

        const currDate = new Date();
        const employee = await Employee.findById(empId).select("joiningDate").lean();

        //check if eligible for monthly paid leaves
        const monthsCompleted = (currDate.getFullYear() - employee.joiningDate.getFullYear())*12 + (currDate.getMonth() - employee.joiningDate.getMonth());

        if(monthsCompleted >=3){
            
        }

    } catch (error) {
        
    }
}