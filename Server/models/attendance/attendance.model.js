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
    // to store the total valid time worked on that day.
    totalMinutes:{
        type:Number,  
        // required:true

    },

    penalty:{
        type:{
            isPenalized: Boolean, // True if penalty is applied
            reason: String, // E.g., "Late Arrival", "Short Working Hours"
            deduction: {  // Salary deduction percentage
                type: Number,
                min: 0,
                max: 1, // Ensures deduction does not exceed 1
            }
        }, 
        _id:false,
        default: { isPenalized: false, reason: "", deduction: 0 }
    },
    
    
    //so that we do not need to keep updating the DB when changes occur in office-policy and shift timings 
    status:{
        type:String,
        enum:["Present","Absent","Work-off","P/2","On-Leave","Pending"],
        default:'Absent'
    },
    
    updated_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    }
},{timestamps:true});

const Attendance = mongoose.model("Attendance",attendanceSchema);

module.exports= Attendance;