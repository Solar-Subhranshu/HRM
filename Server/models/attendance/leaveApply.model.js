const mongoose = require("mongoose");

const leaveApplySchema = new mongoose.Schema({
    employee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required:true 
    },
    leaveDays :{
        type:Number,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        required:true
    },
    approvedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        // required:true 
    }
},{timestamps:true});


const LeaveApply = mongoose.model("LeaveApply",leaveApplySchema);

module.exports = LeaveApply;