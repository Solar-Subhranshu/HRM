const mongoose = require("mongoose");

// this should contain the names of only Top Management.
const reportingManagerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    created_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
    },
    updated_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    }
},{timestamps:true});

const ReportingManager = mongoose.model("ReportingManager",reportingManagerSchema);

module.exports = ReportingManager;