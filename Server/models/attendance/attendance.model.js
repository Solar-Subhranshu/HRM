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

    //we will not store status statically in DB but computing it dynamically when needed,
    //so that we do not need to keep updating the DB when changes occur in office-policy and shift timings 
    // status:{
    //     type:String,
    //     enum:["Present","Absent","Work-off","P/2","On-Leave"],
    //     default:'Absent'
    // },
    
    updated_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    }
},{timestamps:true});

const Attendance = mongoose.model("Attendance",attendanceSchema);

module.exports= Attendance;