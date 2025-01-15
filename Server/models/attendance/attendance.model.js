const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    punchInTime:{
        type:Date,
        required:true
    },
    punchOutTime:{
        type:Date,
        // required:true
    },
    totalMinutes:{
        type:Number,  
        // required:true
    },
    status:{
        type:String,
        enum:["Present","Absent","Work-off" ],
        default:'Absent'
    },
    updated_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    }
},{timestamps:true});

const Attendance = mongoose.model("Attendance",attendanceSchema);

module.exports= Attendance;