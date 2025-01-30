const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
    employee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required:true 
    },
    leaveAllowedPerMonth :{
        type:Number,
        required:true
    },
    leavesAccumulated :{
        type:Number,
        min:0,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    updated_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    }
},{timestamps:true});


const Leave = mongoose.model("Leave",leaveSchema);

module.exports = Leave;