const mongoose = require("mongoose");

const officeTimePolicySchema = new mongoose.Schema({
    policyId : {
        type:String,
        required:true
    },
    allowedTimeDelay :{
        type : String,
        required:true,
    },
    p_Hr:{
        type:Number,
        required:true
    },
    lateArrival1:{
        type: Date,
    },
    dayDeduct1:{
        type:Number
    },
    lateArrival2:{
        type: Date,
    },
    dayDeduct2:{
        type:Number
    }, 
    lateArrival3:{
        type: Date,
    },
    dayDeduct3:{
        type:Number
    },
    lateArrival4:{
        type: Date,
    },
    dayDeduct4:{
        type:Number
    },
    
    deductFromAttendance:{
        type:Boolean,
        default:false
    },
    deductFromLeave:{
        type:Boolean,
        default:false
    },
    noOfLateInMonth:{
        type: Number
    },
    cutDays:{
        type:Number
    },
    continuous:{
        type:Boolean,
        default:false
    },
    disContinuous:{
        type:Boolean,
        default:false
    },
    

    created_By:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Employee"
    },
    updated_By : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Employee"
    }
},{timestamps:true});

const OfficeTimePolicy  = mongoose.model("OfficeTimePolicy",officeTimePolicySchema);

module.exports = OfficeTimePolicy;