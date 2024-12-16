const mongoose= require("mongoose")

const empDeptSchema = new mongoose.Schema({
    empDept : {
        type: String,
        required : true,
        unique : true,
    },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Emp"
    },
    updatedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Emp"
    }
},{timestamps : true});

const EmployeeDept = mongoose.model("EmployeeDept",empDeptSchema);

module.exports = EmployeeDept;