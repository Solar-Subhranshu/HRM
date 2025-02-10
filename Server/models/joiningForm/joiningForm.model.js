const mongoose = require('mongoose');

const joiningFormSchema = new mongoose.Schema({
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        // required:true
    },
    name:{
        type:String,
        required:true
    },
    father_husbandName:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type : Date,    
        required:true
    },
    gender:{
        type : String,
        required:true
    },
    maritalStatus:{
        type : String,
        required:true
    },
    bloodGroup:{
        type : String
    },
    //contact
    personalPhoneNum:{
        type : String,
        maxLength : 10,
        minLength : 10,
        required:true,
        // unique:true
    },
    personalEmail : {
        type : String,
        required:true
    },
    //current-address
    currentAddress :{
        type:String,
        required:true
    },
    currentState:{
        type:String,
        required:true
    },
    currentCity:{
        type:String,
        required:true
    },
    currentPinCode:{
        type:Number,
        required:true
    },
    //permanent-address
    permanentAddress :{
        type:String,
        required:true
    },
    permanentState:{
        type:String,
        required:true
    },
    permanentCity:{
        type:String,
        required:true
    },
    permanentPinCode:{
        type:Number,
        required:true
    },
    
    //joining-details
    interviewDate:{
        type:Date
    },
    joiningDate:{
        type:Date
    },
    //check-if it needs to be object-id or not
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "Department",
    },
    designation:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "Designation",
    },
    joiningHR:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    },
    // radio button - part-time, full time
    employeeType:{
        type:String,
        // required:true
    },
    // online / offline
    modeOfRecruitment:{
        type:String,
        // required:true
    },
    reference:{
        type:String
    },

    //bank details
    bankName : {
        type : String,
        required:true
    },
    branchName:{
        type:String,
        required:true
    },
    bankAccount :{
        type :Number,
        // unique:true,
        required:true
    },
    bankIFSC : {type :String},

    bankAccountHolderName: {
        type:String
    },
    bankAddress:{
        type:String
    },
    panCard : {
        type : String,
        maxLenght:10,
        minLength:10,
        // unique:true,
        required:true
    },
    aadharCard :{
        type:String,
        maxLenght:12,
        minLength:12,
        // unique:true,
        required:true
    },
    //esi and pf details
    uanNumber:{
        type:String
    },
    //emergency contact
    emergencyContact:{
        type:[
            {
                contactName:String,
                relation:String,
                address:String,
                phoneNumber:Number
            }
        ],
        _id:false
    },
    //upload attachments {info}
    aadharCardAttachment : {
        type :String,
        // required:true
    },
    
    panCardAttachment  :{
        type :String,
        // required:true
    },
    
    bankAttachment : {
        type:String,
        // required:true
    },
    photoAttachment:{
        type:String,
        required:true
    },
    signatureAttachment:{
        type:String,
        required:true
    },

    //upload qualification 
    class10Attachment:{
        type:String
    },
    class12Attachment:{
        type:String
    },
    graduationAttachment:{
        type:String
    },
    postGraduationAttachment:{
        type:String
    },
    //this joining form pdf file.
    joiningFormAttachment:{
        type:String
    },

    status:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending",
        required:true
    }

},{timestamps:true});

const JoiningForm = mongoose.model('JoiningForm',joiningFormSchema);

module.exports = JoiningForm;