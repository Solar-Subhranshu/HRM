const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
    name :{
        type:String,
        required : true
    },
    code :{
        type : String,
        required :true
    },
    startTime : {
        type:Date,
        required : true
    },
    endTime : {
        type :Date,
        required: true,
    },
    duration : {
        type:Number,
        required :true
    },
    markAsAbsent :{
        type:String,
        enum :["AAA","L-WO-L"],
    },
    isNightShift:{
        type:Boolean,
        required:true,
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

const Shift = mongoose.model("Shift",shiftSchema);

module.exports = Shift;