const mongoose =require("mongoose");

const companySchema = new mongoose.Schema({

    companyName: {
        type:String,
        required : true
    },
    companyBranch: {
        type:String,
        required : true
    },
    companyAddress: {
        type:String,
        required : true
    },
    companyPin : {
        type : Number,
        required: true
    },
    createdBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Emp"
    },
    updatedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Emp"
    }

},{timestamps: true});

companySchema.index({ companyName: 1, companyBranch: 1, companyAddress: 1 }, { unique: true });

const Company = mongoose.model("Company",companySchema);

module.exports = Company;