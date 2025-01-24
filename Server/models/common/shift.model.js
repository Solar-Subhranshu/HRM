const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
    name :{
        type:String,
        required : true
    },
    startTime : {
        type:String,
        required : true
    },
    endTime : {
        type :String,
        required: true,
    },
    duration : {
        type:String,
        required :true
    },
    markAsAbsent :{
        type:String,
        enum :["AAA","L-WO-L"],
        default:'L-WO-L'
    },
    isNightShift:{
        type:Boolean,
        required:true,
        default:false
    },
    weekOff:{
        type:String,
        enum:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        required:true,
        default:"Sunday"
    },
    maxEarlyAllowed:{
        type:String,
        required:true
    },
    maxLateAllowed:{
        type:String,
        required:true
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

const Shift = mongoose.model("Shift",shiftSchema);
 
module.exports = Shift;