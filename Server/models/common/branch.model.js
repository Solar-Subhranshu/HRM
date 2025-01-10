const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({

    companyID : {
        type:mongoose.Schema.Types.ObjectId,
        ref : "Company",
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    pin:{
        type:Number,
        maxLength:6,
        minLength:6
    },
    created_By: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Employee"
    },
    updated_By : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Employee"
    }
},{timestamps:true});

branchSchema.index({companyID:1, name: 1, address: 1 }, { unique: true });

const Branch = mongoose.model("Branch",branchSchema); 

module.exports=Branch;
