const mongoose = require("mongoose");

const officeTimePolicySchema = new mongoose.Schema({
    policyId : {
        type:String,
        required:true
    },
    allowedTimeDelay :{
        type : Date,
        required:true,
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