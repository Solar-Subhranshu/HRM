const mongoose= require("mongoose")

const designationSchema = new mongoose.Schema({
    designation : {
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

const Designation = mongoose.model("Designation",designationSchema);

module.exports = Designation;