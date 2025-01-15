const ManualPunch = require("../../models/attendance/manualPunch.model");
const Attendance = require("../../models/attendance/attendance.model");

const moment = require("moment");

const addManualPunch = async(req,res)=>{
    try {
        const empID = req.employeeId;
        const {employeeId,date,manualPunchInTime,
            manualPunchOutTime} = req.body;

        if(!employeeId || !date || !manualPunchInTime || !manualPunchOutTime){
            return res.status(400).json({
                success:false,
                message:"Selecting Employee-Id, Date, Manual Punch-in and Punch-out Required!"
            });
        }
        const attendanceRecord = await Attendance.findOne({employeeId,date}).lean();
        
        // console.log(attendanceRecord);

        if(attendanceRecord){
            // record exists! manipulate it.
            const prevPunchInTime = attendanceRecord.punchInTime;
            const prevPunchOutTime = attendanceRecord.punchOutTime;
            
            console.log("Hi-1");
            
            // manipulating attendance record
            attendanceRecord.punchInTime = manualPunchInTime;
            attendanceRecord.punchOutTime = manualPunchOutTime;

            console.log("Hi-1.2",typeof(attendanceRecord.punchInTime));
            console.log("Hi-1.2",attendanceRecord.punchInTime);

            const punchIn = moment(`${attendanceRecord.punchInTime}`);
            console.log("Hi-1.2.1");
            const punchOut = moment(attendanceRecord.punchOutTime);

            console.log("Hi-1.3");
            const totalMinutes = punchOut.diff(punchIn, "minutes");

            console.log("Hi-2");

            attendanceRecord.totalMinutes = totalMinutes;
            //spicy
            attendanceRecord.updated_By= empID;

            console.log("Hi-3");
            return;
            
            const isRecordSaved = await attendanceRecord.save();
            // console.log(isRecordSaved)
            console.log("Hi-4");

            if(isRecordSaved){
                // saving manual-entry
                const newManualEntry = new ManualPunch({
                    employeeId,
                    date,
                    attendanceId:attendanceRecord._id.toString(),
                    manualPunchInTime,
                    manualPunchOutTime,
                    prevPunchInTime,
                    prevPunchOutTime,
                    created_By:empID
                });

                const isEntrySaved = await newManualEntry.save();
                if(isEntrySaved){
                    return res.status(201).json({
                        success:true,
                        message:"Manual Entry Saved Successfully",
                        data:newManualEntry
                    });
                }
            }
            else{throw new Error("Problem! Attendance Record Not Changed!")}
        }
        else{
            //attendance doesn't exist! create new attendance record
            const punchIn = moment(manualPunchInTime);
            const punchOut = moment(manualPunchOutTime);
            const totalMinutes = punchOut.diff(punchIn, "minutes");

            const newAttendanceRecord = new Attendance({
                employeeId,
                date,
                punchInTime : manualPunchInTime,
                punchOutTime : manualPunchOutTime,
                status:"Present",
                totalMinutes,
                updated_By:empID
            });

            const isRecordSaved = await newAttendanceRecord.save();
            if(isRecordSaved){
                const newManualEntry = new ManualPunch({
                    employeeId,
                    date,
                    attendanceId:isRecordSaved._id,
                    manualPunchInTime,
                    manualPunchOutTime,
                    prevPunchInTime:null,
                    prevPunchOutTime:null,
                    created_By:empID
                });

                const isEntrySaved = await newManualEntry.save();
                if(isEntrySaved){
                    return res.status(201).json({
                        success:true,
                        message:"Manual Entry Saved Successfully",
                        data:newManualEntry
                    });
                }
            }
            else{throw new Error("Problem! Attendance Record Not Changed!")}
        }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Couldn't Enter Manual Punch!"
        });
    }

}

module.exports = {
    addManualPunch
}