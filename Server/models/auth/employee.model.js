const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
        employeeCode : {
            type:String,
            required: true,
            unique : true,
            trim:true,
            minLength : 6,
            maxLength : 9
        },
        password:{
            type :String,
            required : true
        },

        // Employee-Personal Details
        name : {
            type :String , 
            trim:true,
            required : true
        },

        father_husbandName :{
            type : String,
            trim:true,
            required :true
        },

        dateOfBirth :{ 
            type : Date,
            required:true
         },

        personalPhoneNum : {
            type : Number,
            maxLength : 10,
            minLength : 10,
            required:true
        },

        personalEmail : {
            type : String,
            trim:true,
            required:true
        },
   
        panCard : {
            type : String,
            maxLenght:10,
            minLength:10,
            unique:true,
            required:true
        },

        aadharCard :{
            type:Number,
            maxLenght:12,
            minLength:12,
            unique:true,
            required:true
        },

        qualification :{
            type:mongoose.Schema.Types.ObjectId,
            ref : "Qualification",
            required:true
        },

        degree :{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Degree",
            required:true
        },
        permanentAddress : {
            type:String,
            required:true
        },

        permanentPinCode:{
            type:Number,
            required:true
        },

        currentAddress :{
            type:String,
            required:true
        },
        currentPinCode:{
            type:Number,
            required:true
        },
        

        // Employee Bank-Details

        bankName : {type : String,   trim:true,},

        branchName:{
            type:String,
            trim:true,
        },

        bankAccount :{
            type :Number,
            unique:true
        },
 
        bankIFSC : {type :String},

        bankAccountHolderName: {
            type:String,
            trim:true,
        },
        bankAddress:{
            type:String,
            trim:true,
        },
   

        //Other Details 

        reportingManager : {
            type:mongoose.Schema.Types.ObjectId,
            ref : "Employee",
            required:true
        },
        joiningHR : {
            type:mongoose.Schema.Types.ObjectId,
            ref : "Employee",
            required:true
        },
        companyPhoneNum : {
            type :Number,
            maxLenght:10,
            minLength:10
        },

        companyEmail: {type:String,   trim:true,},

        joiningDate : {
            type : Date,
            required:true
        },
   
        lastAppraisalDate : { type : Date },
    
        regisnationDate : {type : Date},
       
        company: {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Company",
            required : true
        },
   
        branch : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            required:true
        },
      
        department : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Department",
            required : true
        },
        
        designation : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Designation",
            required : true,
        },

        officeTimePolicy :{
            type : mongoose.Schema.Types.ObjectId,
            ref : "OfficeTimePolicy",
            required : true
        },
 
        shift : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Shift",
            required : true
        },
        workType:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"WorkType",
            required:true
        },
        biometricPunchId:{
            type:Number,
            required:true
        },
        salary:{
            type:{
                ctc:{type:Number},
                inHand:{type:Number},
                employeeESI:{type:Number},
                employeePF:{type:Number},
                employerESI:{type:Number},
                employerPF:{type:Number},
            },
            _id:false
        },
        // Attachments

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
          
        // joiningFormAttachment : {
        //     type :String,
        //     // required:true
        //     },
       
        otherAttachment : {
            type:String,
            // required:true
        },


        isActive : {
            type :Boolean,
            default :true
        }, 
    
        created_By :{type :String},
    
        updated_By :{type :String},
  
        refreshToken:{type:String} 

    },{timestamps:true});

const Employee = mongoose.model("Employee",employeeSchema);

module.exports = Employee;
