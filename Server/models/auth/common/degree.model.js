const mongoose=require("mongoose");

const degreeSchema = new mongoose.Schema({

    qualificationID :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Qualification",
        required:true
    },
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

},{timestamps:true});

const Degree = mongoose.model("Degree",degreeSchema);
module.exports=Degree;