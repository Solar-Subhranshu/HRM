const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    adminId:{
        type:String,
        required :true,
        unique :true,
        maxLength:7,
        minLength :7
    },
    name :{
        type:String,
        required:true
    },
    password :{
        type:String,
        required : true
    },
    isActive:{
        type:Boolean,
        default:true,
        required:true
    },
    refreshToken : {
        type:String
    }
},{timestamps:true})

const Admin = mongoose.model("Admin",adminSchema);
module.exports = Admin;