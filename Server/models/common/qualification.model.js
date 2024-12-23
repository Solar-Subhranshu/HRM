const mongoose = require("mongoose");

const qualificationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    created_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    },
    updated_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    }
    
},{timestamps:true})


const Qualification = mongoose.model("Qualification",qualificationSchema);

module.exports=Qualification;