const mongoose = require("mongoose");

const travelSchema = new mongoose.Schema({
    employeeId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required:true
    },
    tripStartDate:{  //start date for trip
        type:Date,
        required:true
    },
    tripEndDate:{
        type:Date,
    },
    estimatedEndDate:{   // allowed days for online attendance 
        type:Date,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    purposeOfVisit:{
        type:String,
    },
    modeOfTransport:{
        type:String,
    },
    travelAttachments:{
        type:[
            {tripDocument:String,}
        ],
        _id:false
    },

    nextTrip:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Travel",
        default:null
    },
    previousTrip:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Travel",
        default:null
    },

    //for admin approval and rejection
    approvedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    },
    approvalStatus:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending"
    },
    reasonForRejection:{
        type:String,
        trim:true,
        default:null
    },
    isActive:{  // will check if a particular trip has started or not.
        type:Boolean,
        default:false
    }
},{timestamps:true});

const Travel = mongoose.model("Travel",travelSchema);

module.exports= Travel;