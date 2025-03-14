const mongoose =require("mongoose");

const companySchema = new mongoose.Schema({

    name: {
        type:String,
        minLength : 2,
        trim:true,
        required : true
    },
    // branch: {
    //     type:String,
    //     required : true
    // },
    // address: {
    //     type:String,
    //     required : true
    // },
    // pin : {
    //     type : Number,
    //     required: true
    // },
    
    created_By: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Employee"
    },
    updated_By : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Employee"
    }

},{timestamps: true});

const Company = mongoose.model("Company",companySchema);

module.exports = Company;