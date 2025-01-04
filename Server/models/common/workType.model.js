const mongoose = require("mongoose");

const workTypeSchema = new mongoose.Schema({
    workType:{
        type:String,
        required:true,
        unique:true
    },
    created_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    },
    updated_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    }
},{timestamps:true});

const WorkType = mongoose.model("WorkType",workTypeSchema);

module.exports = WorkType;