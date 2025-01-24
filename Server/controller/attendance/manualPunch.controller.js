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

        const isExisting = await ManualPunch.findOne({employeeId,date});
        if(isExisting){
            return res.status(400).json({
                success:false,
                message:"Manual Punch for this Employee on this date already exist. So, you can not add for same date and employee, but you may update it."
            });
        }

        const attendanceRecord = await Attendance.findOne({employeeId,date}).lean();
        // console.log(attendanceRecord);

        if(attendanceRecord){
            // record exists! manipulate it.
            const prevPunchInTime = attendanceRecord.punchInTime;
            const prevPunchOutTime = attendanceRecord.punchOutTime;
            
            // manipulating attendance record
            attendanceRecord.punchInTime = manualPunchInTime;
            attendanceRecord.punchOutTime = manualPunchOutTime;

            const punchIn = moment(`${attendanceRecord.punchInTime}`);
            const punchOut = moment(attendanceRecord.punchOutTime);
            const totalMinutes = punchOut.diff(punchIn, "minutes");

            attendanceRecord.totalMinutes = totalMinutes;
            //spicy
            attendanceRecord.updated_By= empID;

            const isRecordSaved = await attendanceRecord.save();

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
                // status:"Present",
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

const viewManualPunchEnteries = async(req,res)=>{
    try {
        let {startDate,endDate}=req.body;
        if(!startDate || !endDate){
            return res.status(400).json({
                success:false,
                message:"To-Date and From-Date required."
            });
        }

        if(!(startDate instanceof Date) || !(endDate instanceof Date)){
            startDate = new Date(startDate);
            endDate = new Date(endDate);
            console.log(startDate,endDate)
        }

        const query={
            date:{
                $gte: startDate, 
                $lt: endDate
            }
        };

        const response = await ManualPunch.find(query).lean()
        .populate(
            {path:"employeeId",
             select:"name employeeCode"   
        })

        return res.status(200).json({
            success:true,
            message:"Records",
            data:response || []
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Internal Server Error!",
            error:error.message
        });
    }
}

const deleteManualPunch = async(req,res)=>{
    /*
    if manual punch is deleted then set the attendance to its previous values, from manualPunch.prevPunchInTime and manualPunch.prevPunchOutTime
    */
    try {
        const {manualPunchId}=req.query;
        if(!manualPunchId){
            return res.status(400).json({
                success:false,
                message:"Manual-Punch Id is required."
            });
        }

        const isExisting = await ManualPunch.findById(manualPunchId);
        if(isExisting){
            const attendanceRecord = await Attendance.findById(isExisting.attendanceId);
            if(!isExisting.prevPunchInTime){
                // means person didn't punch 
                //means he was absent = delete the record.
                await Attendance.findByIdAndDelete(isExisting.attendanceId);
            }
            else{
                attendanceRecord.punchInTime=isExisting.prevPunchInTime;
                attendanceRecord.punchOutTime=isExisting.prevPunchOutTime;
            }   
        }
        else{
            throw new Error("The Manual Punch you are trying to delete does not exist in DB, maybe already deleted!")
        }

        await ManualPunch.findByIdAndDelete(manualPunchId);
        
        return res.status(201).json({
            success:true,
            message:"Manual Punch Deleted Successfuly.",
            deletedItem:isDeleted
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        });
    }
}

module.exports = {
    addManualPunch,
    viewManualPunchEnteries,
    deleteManualPunch
}