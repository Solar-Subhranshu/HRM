const mongoose = require("mongoose");

const officeTimePolicySchema = new mongoose.Schema({
    policyName : {
        type:String,
        required:true
    },
    permittedLateArrive:{
        type:String,
        required:true
    },
    absent:{
        type:String,
        required:true
    },
    pByTwo:{
        type:String,
        required:true
    },
    persent:{
        type:String,
        required:true
    },
    lunchTime:{
        type:String,
        required:true
    },
    lateArrivalAllowTime:{
        type:String,
        required:true
    },
    maxDaysLateArrival:{
        type:Number,
        required:true
    },
    noOfAllowedP2:{
        type:Number,
        required:true
    },
    deductFromAttendance:{
        type:Boolean,
        default:false
    },
    deductFromLeave:{
        type:Boolean,
        default:false
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