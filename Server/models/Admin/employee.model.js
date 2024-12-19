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
    created_By:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Employee",
        required: true

    },
    updated_By:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Employee"
    },
    refreshToken: {
        type: String,
    }
    },{timestamps:true})

const Employee = mongoose.model("Employee",empSchema);
module.exports = Employee;