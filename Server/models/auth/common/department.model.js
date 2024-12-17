const mongoose= require("mongoose")

const empDeptSchema = new mongoose.Schema({
    department : {
        type: String,
        required : true,
        unique : true,
    },
    created_By : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Emp"
    },
    updated_By : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Emp"
    }
},{timestamps : true});

const Department = mongoose.model("Department",empDeptSchema);

module.exports = Department;