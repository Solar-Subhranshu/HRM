// maybe this schema will get deleted by me.

const mongoose = require("mongoose");

const leaveLateBalanceSchema = new mongoose.Schema({
    employee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required:true 
    },
    monthlyAllowedLeaves :{
        type:Number,
        required:true
    },
    totalAccumulatedLeaves :{
        type:Number,
        required:true
    },
    monthlyLateDaysAllowed:{
        type:Number
    }
},{timestamps:true});

const LeaveLateBalance = mongoose.model("LeaveLateBalance",leaveLateBalanceSchema);

module.exports = LeaveLateBalance;