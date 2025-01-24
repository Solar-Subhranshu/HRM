const Attendance = require("../models/attendance/attendance.model");
const moment = require("moment");

const applyLateArrivalPenalty = async(employee,punchInTime)=>{
    try {
        const employeeId = employee._id;
        const shiftStart = employee.shift.startTime;
        const officePolicy = employee.officeTimePolicy;
        const permittedLateArrival = officePolicy.permittedLateArrival;
        
        // Convert times to minutes
        const punchInMinutes = moment(punchInTime).hours() * 60 + moment(punchInTime).minutes();
        const shiftStartMinutes = moment(shiftStart, "HH:mm").hours() * 60 + moment(shiftStart, "HH:mm").minutes();
        const allowedLateMinutes = moment(permittedLateArrival, "HH:mm").hours() * 60 + moment(permittedLateArrival, "HH:mm").minutes();
    
        // Get late days count in the current month
        const firstDayOfMonth = moment().startOf("month").toDate();
        const lastDayOfMonth = moment().endOf("month").toDate();

        const lateDaysThisMonth = await Attendance.countDocuments({
            employeeId,
            date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
            punchInTime: { $gt: moment(shiftStart, "HH:mm").add(allowedLateMinutes, "minutes").toDate() }
        });

        // If punch-in is beyond the allowed late arrival time
        if (punchInMinutes > (shiftStartMinutes + allowedLateMinutes)) {
            let deduction = 0;
            let reason = "Late Arrival";

            if (!officePolicy.lateComingRule) {
                if (punchInMinutes > (shiftStartMinutes + (moment(officePolicy.lateArrival1, "HH:mm").hours() * 60) + moment(officePolicy.lateArrival1, "HH:mm").minutes())) {
                    deduction = officePolicy.dayDeduct1;
                }
                if (punchInMinutes > (shiftStartMinutes + (moment(officePolicy.lateArrival2, "HH:mm").hours() * 60) + moment(officePolicy.lateArrival2, "HH:mm").minutes())) {
                    deduction = officePolicy.dayDeduct2;
                }
                if (punchInMinutes > (shiftStartMinutes + (moment(officePolicy.lateArrival3, "HH:mm").hours() * 60) + moment(officePolicy.lateArrival3, "HH:mm").minutes())) {
                    deduction = officePolicy.dayDeduct3;
                }
                if (punchInMinutes > (shiftStartMinutes + (moment(officePolicy.lateArrival4, "HH:mm").hours() * 60) + moment(officePolicy.lateArrival4, "HH:mm").minutes())) {
                    deduction = officePolicy.dayDeduct4;
                }
            } else {
                if (lateDaysThisMonth > officePolicy.allowedLateDaysInMonth){
                    if(officePolicy.continuous){
                        deduction = officePolicy.salaryCutPercentage;
                        reason = "Excessive Late Arrivals";
                    }
                    else if(lateDaysThisMonth % officePolicy.allowedLateDaysInMonth == 1){
                        deduction = officePolicy.salaryCutPercentage;
                        reason = "Excessive Late Arrivals";
                    }
                }
            }
            let isPenalized = deduction>0 ? true:false;

            return {
                status:"success",
                message: "Penalty Applied",
                data :{
                    isPenalized:isPenalized,
                    deduction:deduction,
                    reason:reason
                }
            }
        }
        return {
            status:"success",
            message: "No Penalty",
            data : null
        }
    } catch (error) {
        return {
            status:"error",
            message: "An error occured while evaluating penalty",
            error:error,
        }
    }
}

const applyEarlyDeparturePenalty = async(employee,punchOutTime)=>{
    
}

module.exports = {
    applyLateArrivalPenalty,
}