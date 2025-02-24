const Attendance = require("../models/attendance/attendance.model");
const Employee = require("../models/auth/employee.model");
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

        // If punch-in is beyond the allowed late arrival time
        if (punchInMinutes > (shiftStartMinutes + allowedLateMinutes)) {
            let deduction = 0;
            let reason = "Late Arrival";

            if (!officePolicy.lateComingRule) {
                if ((officePolicy.lateArrival1) && (punchInMinutes > (shiftStartMinutes + (moment(officePolicy.lateArrival1, "HH:mm").hours() * 60) + moment(officePolicy.lateArrival1, "HH:mm").minutes()))) {
                    deduction = parseFloat(officePolicy.dayDeduct1/100);
                }
                if ((officePolicy.lateArrival2)&&(punchInMinutes > (shiftStartMinutes + (moment(officePolicy.lateArrival2, "HH:mm").hours() * 60) + moment(officePolicy.lateArrival2, "HH:mm").minutes()))) {
                    deduction = parseFloat(officePolicy.dayDeduct2/100);
                }
                if ((officePolicy.lateArrival3)&&(punchInMinutes > (shiftStartMinutes + (moment(officePolicy.lateArrival3, "HH:mm").hours() * 60) + moment(officePolicy.lateArrival3, "HH:mm").minutes()))) {
                    deduction = parseFloat(officePolicy.dayDeduct3/100);
                }
                if ((officePolicy.lateArrival4)&&(punchInMinutes > (shiftStartMinutes + (moment(officePolicy.lateArrival4, "HH:mm").hours() * 60) + moment(officePolicy.lateArrival4, "HH:mm").minutes()))) {
                    deduction = parseFloat(officePolicy.dayDeduct4/100);
                }
            } else {

                    const lateDaysThisMonth = await Attendance.countDocuments({
                        employeeId,
                        date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
                        punchInTime: { $gt: moment(shiftStart, "HH:mm").add(allowedLateMinutes, "minutes").toDate() }
                    });

                if (lateDaysThisMonth > officePolicy.allowedLateDaysInMonth){
                    if(officePolicy.continuous){
                        deduction = parseFloat(officePolicy.salaryCutPercentage/100);
                        reason = "Excessive Late Arrivals";
                    }
                    else if(lateDaysThisMonth % officePolicy.allowedLateDaysInMonth == 1){
                        deduction = parseFloat(officePolicy.salaryCutPercentage/100);
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

const recalculateAttendance = async(policyId)=>{
    try {
        //find employees who have policy = policyId
        const employees = await Employee.find({ officeTimePolicy: policyId }).lean().select("_id");
        const employeeIds = employees.map(emp => emp._id);

        const firstDayOfMonth = moment().startOf("month").toDate();
        const lastDayOfMonth = moment().endOf("month").toDate();

        const attendanceRecords = await Attendance.find({
            employeeId: { $in: employeeIds },
            date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
        }).populate({
            path:"employeeId",
            populate: {
                path: "shift"
            },
            select:"shift"
        })
        .lean();

        const updates = [];

        for (let record of attendanceRecords) {
            let newPenalty = { isPenalized: false, reason: "", deduction: 0 };
            let newStatus = "Present";
            //checking record for late arrival penalty
            console.log("one of many attendance records. ",record);

            let response = await applyLateArrivalPenalty(record.employeeId,record.punchInTime);
            if(response.status==="success" && response.data!=null){
                newPenalty = response.data;
                if(response.data.deduction>=0.5){
                    newStatus = "P/2"
                }
                if(response.data.deduction===1){
                    newStatus = "Absent"
                }
            }
            else if(response.status==="error"){
                throw response.error
            }

            //checking for early departure penalty
            if(record.punchOutTime){
                let punchIn, punchOut;
                if(helper.timeDurationInMinutes(record.employeeId.shift.startTime,moment(record.punchInTime).format("HH:mm"))<0)
                {
                    punchIn = record.employeeId.shift.startTime;
                }
                else{
                    punchIn = moment(record.punchInTime).format("HH:mm");
                }
    
                if(helper.timeDurationInMinutes(record.employeeId.shift.endTime,moment(record.punchOutTime).format("HH:mm"))>0){
                    punchOut = record.employeeId.shift.endTime;
                }
                else{
                    punchOut = moment(record.punchOutTime).format("HH:mm");
                }
                const totalMinutes = helper.timeDurationInMinutes(punchIn,punchOut);

                let nextResponse = applyEarlyDeparturePenalty(record.employeeId,totalMinutes);
                if(nextResponse.isPenalized)
                {
                    newPenalty = nextResponse;
                    if(nextResponse.deduction>=0.5){
                        newStatus = "P/2"
                    }
                    if(nextResponse.deduction===1){
                        newStatus = "Absent"
                    }
                }
            }

            // Update only if penalty has changed
            if (
                newPenalty.isPenalized !== record.penalty.isPenalized ||
                newPenalty.reason !== record.penalty.reason ||
                newPenalty.deduction !== record.penalty.deduction ||
                newStatus !== record.status
            ) {
                updates.push({
                    updateOne: {
                        filter: { _id: record._id },
                        update: { $set: { penalty: newPenalty,
                                        status: newStatus
                                        } 
                        }
                    }
                });
            }
        }
        // Perform bulk update if necessary
        if (updates.length > 0) {
            await Attendance.bulkWrite(updates);
        }
        return { success: true, updatedRecords: updates.length };

    } catch (error) {
        throw new Error(`Recalculation failed: ${error.message}`); 
    }
}

module.exports = {
    applyLateArrivalPenalty,
    applyEarlyDeparturePenalty,
    recalculateAttendance
}
