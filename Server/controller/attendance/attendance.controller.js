const Attendance = require("../../models/attendance/attendance.model");
const Employee = require("../../models/auth/employee.model");
const moment = require("moment");

//util
const commonUtil = require("../../utils/common.util");

/*
        1. check if he is right on time according to his shift
            - if arrived early than time-duration allowed in shift, decline recording the attendance
            - if departed late than time-duration allowed in shift, decline recording the attendance
        2. late office policy is applied if he is late
          -late office policy is also applied if he leaves early.  
        3. the policy is applied based on how late is he (kitna late aya h wo)
        4. absent and half-day will be decided based on punch-out.
        5. absent and half-day will also be decided based on manual punch-out.

*/ 
const recordAttendance = async(req,res)=>{
    try {
        const {employeeId} = req.body;
        if (!employeeId) {
            return res.status(400).json({
                success: false,
                message: "Employee ID is required.",
            });
        }
        const currentTimestamp = new Date();
        const currentDate = moment(currentTimestamp).format('YYYY-MM-DD');
        // console.log(currentDate);

        const employee = await Employee.findById(employeeId).lean()
                        .populate("officeTimePolicy")
                        .populate("shift")
                        .select("-password -__v");

        console.log(employee)
        //check if the employee is eligible to mark attendance
        //check according to shift - max early check
        const currTime = moment(currentTimestamp).format('HH:mm');
        const currTimeMin = commonUtil.timeDurationInMinutes(currTime,'00:00');

        if(currTimeMin < commonUtil.timeDurationInMinutes(employee.shift.maxEarlyAllowed,'00:00')){
            return res.status(401).json({
                success:false,
                message:"Punch-In too early, attendance not recorded."
            });
        }

        //stop execution here for testing purpose
        throw new Error("Execution Stopped HERE!")

        if(!employee.isActive){
            return res.status(400).json({
                success:false,
                message:"Employee is not active anymore. Can't record attendance."
            });
        }


        //attendance logic
        let attendanceRecord = await Attendance.findOne({
            employeeId : employeeId,
            date :currentDate
        });

        if(!attendanceRecord){
            attendanceRecord = new Attendance({
                employeeId:employeeId,
                date:currentDate,
                punchInTime:currentTimestamp,
                status:'Present',
            });
            const isSaved = await attendanceRecord.save();
            if(isSaved){
                return res.status(201).json({
                    success:true,
                    message:"Punch-in Time Recorded Successfully!",
                    data:attendanceRecord
                });
            }
            else{
                throw new Error("Couldn't Store record Punch-in.");
            }
        }

        if(!attendanceRecord.punchOutTime){
            //check shift - max late Allowed
            if(currTimeMin > commonUtil.timeDurationInMinutes(employee.shift.maxLateAllowed,'00:00')){
                return res.status(401).json({
                    success:false,
                    message:"Punch-Out too late, attendance not recorded."
                });
            }

            attendanceRecord.punchOutTime = currentTimestamp;

            const punchIn = moment(attendanceRecord.punchInTime);
            const punchOut = moment(attendanceRecord.punchOutTime);
            const totalMinutes = punchOut.diff(punchIn, "minutes");

            attendanceRecord.totalMinutes = totalMinutes;
            attendanceRecord.updated_By= employeeId;

            const isSaved = await attendanceRecord.save();
            if(isSaved){
                return res.status(200).json({
                    success: true,
                    message: "Punch-out recorded successfully.",
                    data: attendanceRecord,
                });
            }
        }
        // If both punch-in and punch-out are already recorded && {multi-punch=true}
        if(employee.officeTimePolicy.multiPunch){
            attendanceRecord.punchOutTime = currentTimestamp;

            const punchIn = moment(attendanceRecord.punchInTime);
            const punchOut = moment(attendanceRecord.punchOutTime);
            const totalMinutes = punchOut.diff(punchIn, "minutes");

            attendanceRecord.totalMinutes = totalMinutes;
            attendanceRecord.updated_By= employeeId;

            const isSaved = await attendanceRecord.save();
            if(isSaved){
                return res.status(200).json({
                    success: true,
                    message: "Punch-out updated successfully.",
                    data: attendanceRecord,
                });
            }
        }
        else{
            // If both punch-in and punch-out are already recorded && {multi-punch=false}
            return res.status(400).json({
                success: false,
                message: "Attendance already recorded for today.",
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while recording attendance.",
            error: error.message,
        });
    }
}

//check office time policy,
/*
    1. is late or not
    2. if late check late count, if late count> 3 then attendance status is p/2.
            -if employee leave without doing a full day(i.e. working hours < pByTwo time in Office-Policy) then the p/2 should shift to his next working day.

    3. if late and leaves within the absent hours, then his p/2 should shift to his next working day (with full time) and today should be marked as absent.

    check office policy
    if(currTimeMin > (commonUtil.timeDurationInMinutes(employee.shift.startTime,'00:00') + commonUtil.timeDurationInMinutes(employee.officeTimePolicy.permittedLateArrival,'00:00'))){
        lateCount++
    }
*/



const viewAttendance = async(req,res)=>{
    try {
        const {employeeId,date} = req.body;
        if(!employeeId && !date){
            return res.status(400).json({
                success:false,
                message:'Both Fields can-not be empty.'
            });
        }

        if(employeeId && date){
            const responseRecord= await Attendance.find({employeeId,date}).lean()
            .populate({
                path:"employeeId",
                select:"employeeCode name",})
            .select("-updatedAt -createdAt -__v -created_By -updated_By");
            const responseData = responseRecord.map((record)=>{
                return {
                    ...record,
                punchInTime : moment(record.punchInTime).format("hh:mm A"),
                punchOutTime : moment(record.punchOutTime).format("hh:mm A")
                }
            })

            if(responseRecord){
                return res.status(200).json({
                    success:true,
                    message:'Record found',
                    data:responseData
                });
            }
        }

        if(date){
            const responseRecord= await Attendance.find({date}).lean()
            .populate({
                path:"employeeId",
                select:"employeeCode name",})
            .select("-updatedAt -createdAt -__v -created_By -updated_By");

            const responseData = responseRecord.map((record)=>{
                return {
                    ...record,
                punchInTime : moment(record.punchInTime).format("hh:mm A"),
                punchOutTime : moment(record.punchOutTime).format("hh:mm A")
                }
            })

            if(responseRecord){
                return res.status(200).json({
                    success:true,
                    message:'Record found',
                    data:responseData
                });
            }
        }

        return res.status(400).json({
            success:false,
            message:"Point of No Code Execution."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while recording attendance.",
            error: error.message,
        });
    }
}



module.exports = {
    recordAttendance,
    viewAttendance
}