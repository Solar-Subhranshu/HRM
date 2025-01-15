const Attendance = require("../../models/attendance/attendance.model");
const Employee = require("../../models/auth/employee.model");
const moment = require("moment");

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

        const employee = await Employee.findById(employeeId)
                        .populate("officeTimePolicy");

        // console.log(currentDate);

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
                select:"employeeCode name",});

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
                select:"employeeCode name",});

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