const mongoose= require("mongoose");

const empDeptSchema = new mongoose.Schema({
    department : {
        type: String,
        required : true,
        unique : true,
    },
    created_By : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Employee"
    },
    updated_By : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Employee"
    }
},{timestamps : true});

const Department = mongoose.model("Department",empDeptSchema);

module.exports = Department;