const Attendance = require("../models/attendance/attendance.model");
const helper = require("../utils/common.util");
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
                    deduction = parseFloat(officePolicy.dayDeduct1/100);
                }
                if (punchInMinutes > (shiftStartMinutes + (moment(officePolicy.lateArrival2, "HH:mm").hours() * 60) + moment(officePolicy.lateArrival2, "HH:mm").minutes())) {
                    deduction = parseFloat(officePolicy.dayDeduct2/100);
                }
                if (punchInMinutes > (shiftStartMinutes + (moment(officePolicy.lateArrival3, "HH:mm").hours() * 60) + moment(officePolicy.lateArrival3, "HH:mm").minutes())) {
                    deduction = parseFloat(officePolicy.dayDeduct3/100);
                }
                if (punchInMinutes > (shiftStartMinutes + (moment(officePolicy.lateArrival4, "HH:mm").hours() * 60) + moment(officePolicy.lateArrival4, "HH:mm").minutes())) {
                    deduction = parseFloat(officePolicy.dayDeduct4/100);
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

const applyEarlyDeparturePenalty = (employee,totalWorkedMinutes)=>{
    // const employeeId = employee._id;
    const officePolicy = employee.officeTimePolicy;

    // Convert pByTwo & absent thresholds to minutes
    const pByTwoMinutes = helper.timeDurationInMinutes('00:00',officePolicy.pByTwo);
    const absentMinutes = helper.timeDurationInMinutes('00:00',officePolicy.absent);

    let deduction = 0;
    let reason = "";

    if (totalWorkedMinutes < absentMinutes) {
        deduction = 1; // Mark as absent (1 full-day deduction)
        reason = "Marked as Absent due to Early Departure";
    } else if (totalWorkedMinutes < pByTwoMinutes) {
        deduction = 0.5; // Mark as half-day (0.5 deduction)
        reason = "Marked as Half-Day due to Early Departure";
    }

    let isPenalized = deduction > 0 ? true: false;
    return {
        isPenalized,
        deduction:deduction,
        reason
    };
}

module.exports = {
    applyLateArrivalPenalty,
    applyEarlyDeparturePenalty
}