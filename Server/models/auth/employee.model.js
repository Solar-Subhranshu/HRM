const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    //1
        employeeCode : {
            type:String,
            required: true,
            unique : true,
            minLength : 6,
            maxLenght : 9
        },
        password:{
            type :String,
            required : true
        },
    //2
        name : {
            type :String , 
            required : true
        },
    //3
        father_husbandName :{
            type : String,
            required :true
        },
    //4
        dateOfBirth :{ type : Date },
    //5
        personalPhoneNum : {
            type : Number,
            maxLength : 10,
            minLength : 10
        },
    //6
        personalEmail : {type : String},
    //7
        companyPhoneNum : {
            type :Number,
            maxLenght:10,
            minLength:10
        },
    //8
        companyEmail: {type:String},
    //9
        permanentAddress : {type:String},
    //10
        qualification :{type:String},
    //11
        panCard : {
            type : String,
            // maxLenght:10,
            // minLength:10,
            // unique:true
        },
    //12
        aadharCard :{
            type:Number,
            // maxLenght:12,
            // minLength:12,
            // unique:true
        },
    //13
        bankName : {type : String},
    //14    
        bankAccount :{
            type :Number,
            // unique:true
        },
    //15
        bankIFSC : {type :String},
    //16
        reportingManager : {
            type:mongoose.Schema.Types.ObjectId,
            ref : "Employee"
        },
    //17
        lastAppraisalDate : { type : Date },
    //18
        isActive : {
            type :Boolean,
            default :true
        }, 
    //19    
        company: {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Company",
            required : true
        },
    //20
        branch : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            // required:true
        },
    //21    
        department : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Department",
            required : true
        },
    //22    
        designation : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Designation",
            required : true,
        },
    //23
        joiningDate : {
            type : Date,
            required:true
        },
    //24
        officeTimePolicy :{
            type : mongoose.Schema.Types.ObjectId,
            ref : "TimePolicy",
            // requi red : true
        },
    //25
        regisnationDate : {type : Date},
    //26 
        shift : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Shift",
            // required : true
        },
    //27
        aadharCardAttachment : {type :String},
    //28        
        panCardAttachment  :{type :String},
    //29        
        bankAttachment : {type:String},
    //30        
        joiningFormAttachment : {type : String},
    //31        
        attachment5 : {type:String},
    //32
        created_By :{type :String},
    //33
        updated_By :{type :String},
    //34
        refreshToken:{type:String}        
    },{timestamps:true});

const Employee = mongoose.model("Employee",employeeSchema);

module.exports = Employee;