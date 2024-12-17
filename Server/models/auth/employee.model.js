const mongoose = require("mongoose");

const empSchema= new mongoose.Schema({
    empId:{
        type: String,
        required:true,
        unique: true
    },
    name:{
        type: String,
        required:true,
    },
    mobile_No : {
        type: Number,
        required: true,
    },
    password : {
        type:String,
        required:true,
    },
    isActive :{
        type: Boolean,
        default: true,
        required: true,
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "Department",
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Emp",
        required: true

    },
    updatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Emp"
    },
    refreshToken: {
        type: String,
    }
    },{timestamps:true})

const Emp = mongoose.model("Employee",empSchema);
module.exports = Emp;