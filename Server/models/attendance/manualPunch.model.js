const mongoose = require("mongoose");

const manualPunchSchema = new mongoose.Schema({
    attendanceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Attendance"
    },
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    manualPunchInTime:{
        type:Date,
    },
    manualPunchOutTime:{
        type:Date
    },
    prevPunchInTime:{
        type:Date
    },
    prevPunchOutTime:{
        type:Date
    },
    created_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    },
    updated_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    }
},{timestamps:true});

const ManualPunch = mongoose.model("ManualPunch",manualPunchSchema);

module.exports = ManualPunch;