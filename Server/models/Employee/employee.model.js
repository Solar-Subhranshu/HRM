const mongoose = require("mongoose");

const empSchema= new mongoose.Schema({
    empId:{
        type: String,
        required:true,
        unique: true
    },
    empName:{
        type: String,
        required:true,
    },
    empMob_No : {
        type: Number,
        required: true,
    },
    empPassword : {
        type:String,
        required:true,
    },
    empIsActive :{
        type: Boolean,
        default: true,
        required: true,
    },
    empDept:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "EmployeeDept",
        required: true
        // enum:["HR", "Admin", "Sales", "Developer"]
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

const Emp = mongoose.model("Emp",empSchema);
module.exports = Emp;