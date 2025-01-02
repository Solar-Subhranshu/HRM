const mongoose = require("mongoose");

const officeTimePolicySchema = new mongoose.Schema({
    policyName : {
        type:String,
        required:true
    },
    permittedLateArrival:{
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
    lateComingRule:{
        type:Boolean,
        default:false
    },
    lateArrival1:{
        type: String,
    },
    dayDeduct1:{
        type:Number
    },
    lateArrival2:{
        type: String,
    },
    dayDeduct2:{
        type:Number
    }, 
    lateArrival3:{
        type: String,
    },
    dayDeduct3:{
        type:Number
    },
    lateArrival4:{
        type: String,
    },
    dayDeduct4:{
        type:Number
    },
    multiPunch:{
        type:Boolean,
        default:false
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