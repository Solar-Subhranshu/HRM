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
        type:String,
        required:true
    },
    punchOutTime:{
        type:String,
        required:true
    },
    totalHours:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Present","Absent","On-Leave"]
    },
    shift:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shift",
        required:true
    },
    officeTimePolicy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"OfficeTimePolicy",
        required:true
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

const Attendance = mongoose.model("Attendance",attendanceSchema);

module.exports= Attendance;