const Degree = require("../../models/common/degree.model");
const Qualification = require("../../models/common/qualification.model");
const Department = require ("../../models/common/department.model");
const Branch = require("../../models/Company/branch.model");
const Designation = require("../../models/common/designation.model");
const Shift = require("../../models/common/shift.model");
const OfficeTimePolicy = require("../../models/common/officeTimePolicy.model")

const helper = require("../../utils/common.util")

const showDegree = async (req,res) =>{
    try {
        const {qualificationId} = req.query;

        const result= await Degree.find({qualificationID:qualificationId});

        if(!result){
            return res.status(400).json({
                success : false,
                message : "Degree not found."
            });
        }

        if(result.length ===0 || result == null){
            return res.status(200).json({
                success : true,
                message :"Zero Degree Found For Current Qualification, Add Degree First."
            });
        }

        return res.status(201).json({
            success:true,
            message : "All Degree List For Given Qualification",
            data : result
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Can't show you the Qualifications.",
            error:error.message
        });
    }
}
const addDegree = async(req,res) => {
    try {
        const employeeId = req.employeeId;
        const {qualificationID,degreeName } = req.body;
        if(!qualificationID || !degreeName){
            return res.status(400).json({
                success:false,
                message : "Fields can't be empty!"
            });
        }

        const isExisting = await Degree.findOne({qualificationID:qualificationID , name:degreeName});

        if(isExisting){
            return res.status(400).json({
                success:false,
                message:"Degree already exists for given Qualification"
            });
        }

        const newDegree = new Degree({
            qualificationID,
            name:degreeName,
            created_By:employeeId
        });

        const responseData = await newDegree.save();
        
        if(!responseData){
            return res.status(400).json({
                success:false,
                message:"Something went wrong! Try Again."
            });
        }

        return res.status(201).json({
            success:true,
            message:"Degree Added Successfully!",
            data : responseData
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Degree Not Added!",
            error:error.message
        });
    }
}

const deleteDegree = async (req,res)=>{
    try {
        const {degreeID} = req.body;

        const isDeleted = await Degree.findByIdAndDelete(degreeID);

        if(!isDeleted){
            return res.status(400).json({
                success:false,
                message:"Degree not deleted, Try Again!"
            })
        }

        return res.status(200).json({
            success:true,
            message : "Degree Deleted Successfully!"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Degree Not Deleted.",
            error:error.message
        });
    }
}

const showAllDepts = async(req,res) => {
    try {
        // show all departments except for Admin.
        const allDepts= await Department.find({ department: { $ne: "Admin" } });
        if (allDepts.length===0 || allDepts==null){
            return res.status(200).json({
                success : true,
                message : "No Departments Found, Please Add Department First."
            });
        }
        else{
            const deptNames =allDepts.map(dept => ({
                id: dept._id,
                empdept : dept.department
            }));
            return res.status(200).json({
                success : true,
                message :"Department List.",
                data : deptNames
        });
        }
    }
    catch(error) {

    return res.status(500).json({
        success :false,
        message: "Internal Server Error! Couldn't show Departments. ",
        error: error.message
    });        
    }
};

const addDept = async (req,res) => {
    try{
        const employeeId = req.employeeId;
        
        const {dept} = req.body || req.query;
        // console.log(dept);
        // const employeeId = req.employeeId;
       
        if(!dept){
            return res.status(400).json({
                success : false,
                message : "Field can't be empty"
            });
        }

        const deptExists = await Department.findOne({department :dept});
        if(deptExists){
            return res.status(400).json({
                success : false,
                message : "Department Already Exists"
            });
        }

        const newDept = new Department({
            department : dept,
            created_By : employeeId
        })
        const responseData = await newDept.save();
        if(responseData){
            return res.status(201).json({
                success:true,
                message:"Department insert successfully."
            })
        }
        return res.status(400).json({
            success:false,
            message:"something is wrong."
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message : "Internal Server Error! Couldn't Add Department",
            error : error.message
        })
    }
};

const updateDept = async (req,res) => {
    try{
    const employeeId = req.employeeId;

    const {deptId,deptName} = req.body || req.query;
    // console.log(deptId,deptName);
  
        // we are assuming that always a valid deptId is passed 

    if(!deptId || !deptName){
        return res.status(400).json({
            success : false,
            message : "Fields can't be empty. "
        });
    }

    const deptExists = await Department.findOne({department :deptName});
    if(deptExists){
        return res.status(400).json({
            success : false,
            message : "Department Already Exists"
        });
    }

    const updatedDept = await Department.findByIdAndUpdate(deptId,
        {department :deptName},
        {updated_By : employeeId},
        {new: true}
    );

    if(!updatedDept){
        return res.status(400).json({
            success: false,
            message : "Department Updation Failed!, Try after few seconds!"
        });
    }

    return res.status(200).json({
        success : true,
        message : "Department Updation Successful !"
    });
}
catch(error){
    return res.status(500).json({
        success:false,
        message:"Internal Server Error, Couldn't update department.",
        error : error.message
    })
}

}

const addBranch = async (req,res)=>{
    try{
        const employeeId = req.employeeId;
        const {companyID, name, address, pin} =req.body;
        if(!name ||!companyID ||!address ||!pin){
            return res.status(400).json({
                success : false,
                message : "All fields are required!"
            });
        }

        const newBranch = new Branch({
            companyID,
            name,
            address,
            pin, 
            created_By : employeeId
        });

        const newBranchAdded= await newBranch.save();

        if(newBranchAdded){
            return res.status(201).json({
                success : true,
                message : "Branch Added Successfully !",
                data : {
                    "companyID":companyID,
                    "branch" : name,
                    "address" : address,
                    "pin":pin
                }
            });
        }
        else{
            return res.status(400).json({
                success : false,
                message : "Couldn't Add Branch! Something is wrong please try again!",
            });
        }

    }
    catch (error){
        if(error.code===11000){
            return res.status(400).json({
                success:false,
                message : "Duplicate entry detected. This company branch at the given address already exists.",
                error: error.message
            });
        }
        return res.status(400).json({
            success: false,
            message : "Internal Server Error! Couldn't add company.",
            error : error.message
        });
    }
}

const showBranch = async (req,res)=>{
    try{
        const {companyID}=req.query;

        if(!companyID){
            return res.status(400).json({
                success:false,
                message:"Field is required!"
            })
        }

        const allBranch = await Branch.find({companyID:companyID}).select("-created_By -updated_By -createdAt -updatedAt -__v");

        if(!allBranch){
            return res.status(400).json({
                success:false,
                message:"Invalid company ID"
            });
        }

        if(allBranch.length===0 || allBranch == null){
            return res.status(200).json({
                success : true,
                message : "No Branch Found, Please Add Branch First."
            });
        }
        else{
            return res.status(200).json({
                success:true,
                message:"All Branch list.",
                data:allBranch
            })
        }

    }
    catch (error){
        return res.status(500).json({
            success: false,
            message : "Internal Server Error! Can't show you Branch.",
            error : error.message
        });
    }
}

const updateBranchDetails= async (req,res)=>{
    try {
        const employeeId = req.employeeId;
        const {branchId,name,address,pin} = req.body;
        
        if(!branchId){
            return res.status(400).json({
                success :false,
                message : "All fields are required! Please fill all feilds."
            });
        }

        const existingBranch=await Branch.findById(branchId);

        if(!existingBranch){
            return res.status(400).json({
                success:false,
                message : `Branch with id: ${branchId} Not Found.`
            });
        }

         // to check if changes are same as previously saved data
        const isUnchanged = (existingBranch.name===name)&&
                            (existingBranch.address===address)&&
                            (existingBranch.pin===pin);
                

        if(isUnchanged){
            return res.status(400).json({
                success:false,
                message : "No changes detected. The new data is same as the existing data.",
            });
        }

        const newBranch= await Branch.findByIdAndUpdate(branchId,
            {name,address,pin,
            updated_By : employeeId
            },
        {new :true, runValidators:true});
        if(newBranch){
            return res.status(200).json({
                success : true,
                message : "Branch Name Updated Successfully !"
            })
        }
    } catch (error) {
        if(error.code===11000){
            return res.status(400).json({
                success:false,
                message : "Update Failed! The given combination of Branch Name, Branch, Address & Pin already exists."
            })
        }
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Branch Details could not be updated!",
            error : error.message
        });
    }
}

const showAllQualification = async(req,res) => {
    try {
        // show all qualification .
        const allQualifications= await Qualification.find();

        if (allQualifications.length===0 || allQualifications==null){
            return res.status(200).json({
                success : true,
                message : "No Qualification Found, Please Add Qualification First."
            });
        }
        else{
            const qualificationNames =allQualifications.map(qualification => ({
                id: qualification._id,
                names : qualification.name
            }));
            return res.status(200).json({
                success : true,
                message :"Qualification List.",
                data : qualificationNames
        });
        }
    }
    catch(error) {

    return res.status(500).json({
        success :false,
        message: "Internal Server Error! Couldn't show Qualification. ",
        error: error.message
    });        
    }
};

const addQualification = async (req,res) => {
    try{
        const employeeId = req.employeeId;
        
        const {qualificationName} = req.body || req.query;
        // console.log(employeeId);
        // const employeeId = req.employeeId;
       
        if(!qualificationName){
            return res.status(400).json({
                success : false,
                message : "Field can't be empty"
            });
        }

        const qualificationNameExists = await Qualification.findOne({name :qualificationName});
        if(qualificationNameExists){
            return res.status(400).json({
                success : false,
                message : "Qualification Already Exists"
            });
        }

        const newqualificationName = new Qualification({
            name : qualificationName,
            created_By : employeeId
        })
        const responseData = await newqualificationName.save();
        if(responseData){
            return res.status(201).json({
                success:true,
                message:"Qualification Inserted Successfully."
            })
        }
        return res.status(400).json({
            success:false,
            message:"Something is Wrong."
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message : "Internal Server Error! Couldn't Add Qualification",
            error : error.message
        })
    }
};

const updateQualification = async (req,res) => {
    try{
    const employeeId = req.employeeId;

    const {qualificationId,qualificationName} = req.body || req.query;
    // console.log(deptId,deptName);
  
    if(!qualificationId){
        return res.status(400).json({
            success : false,
            message : "Department doesn't exist"
        });
    }

    const qualificationExists = await Qualification.findOne({department :qualificationName});
    if(qualificationExists){
        return res.status(400).json({
            success : false,
            message : "Department Already Exists"
        });
    }

    const updatedQualification = await Qualification.findByIdAndUpdate(qualificationId,
        {name :qualificationName},
        {updated_By : employeeId},
        {new: true}
    );

    if(!updatedQualification){
        return res.status(400).json({
            success: false,
            message : "Qualification Updation Failed!, Try after few seconds!"
        });
    }

    return res.status(200).json({
        success : true,
        message : "Qualification Updation Successful !"
    });
}
catch(error){
    return res.status(500).json({
        success:false,
        message:"Internal Server Error, Couldn't update qualification.",
        error : error.message
    })
}

}

const deleteQualification = async (req,res)=>{
    try {
        const {qualificationId} = req.body;

        let flag=false;
        
        await Qualification.findByIdAndDelete(qualificationId)
        .then((response,error)=>{
            if(response){
             flag=true   
            }
            if(error){
                return res.status(400).json({
                    success:true,
                    message: "Qualification Not Deleted."
                });
            }
        });

        if(flag){
            const relatedDegree = await Degree.deleteMany({qualificationID:qualificationId});

            return res.status(200).json({
                success:true,
                message:`Qualification deleted successfully along with ${relatedDegree.deletedCount} related Degree.`
            });
        }

        // return res.status(200).json({
        //     success:true,
        //     message: "Qualification Deleted Successfully."
        // });
        

    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Internal Server Error! Qualification Not Deleted !."
        });
    }
}

const addDesignation = async(req,res)=>{
    try{
        const {department,designation}=req.body || req.query;
        const employeeId = req.employeeId;
        
        if(!department || !designation){
            return res.status(400).json({
                success:false,
                message : "Field can't be Empty."
            });
        }

        const existingDesignation  =await Designation.findOne({department:department , designation:designation});
        if(existingDesignation){
            return res.status(400).json({
                success :false,
                message : "Designation Already Exists!"
            });
        }

        const newDesignation = new Designation({
            department:department,
            designation :designation,
            created_By :employeeId
        });

        const responseData=await newDesignation.save();
        if(responseData){
            return res.status(200).json({
                success : true,
                message : "Designation added Successfully! "
            });
        }
    }   
    catch(error){
        return res.status(500).json({
            success:false,
            message : "Internal Server Error! Couldn't Add Designation.",
            error : error.message
        })
    }
}

const showDesignation = async(req,res)=>{
    try {
        const {departmentId} = req.query;
        // console.log(departmentId)
        const allDesignation = await Designation.find({ department: departmentId});

        if(allDesignation){
            return res.status(200).json({
                success:true,
                message:"All designation",
                data: allDesignation || []
            })
        }
    } catch (error) {
        return res.status(500).json({
            success :false,
            message:"Internal Server Error! Couldn't show designation.",
            error : error.message
        });

    }
}

const updateDesignation =async (req,res)=>{
    try {
        const {department,designation,newDesignation}=req.body || req.query;

        if(!department || !designation || !newDesignation){
            return res.status(400).json({
                success:false,
                message : "All Fields Required!"
            });
        }

        if(designation === newDesignation){
            return res.status(400).json({
                success:false,
                message :'Action Denied! New designation is same as old one.'
            });
        }

        // const isExisting = await Designation.findOne({department:department , designation:designation});

        const updatingDesignation = await Designation.findOneAndUpdate(
            {department:department , designation:designation},
            {designation:newDesignation},
            {new:true}
        );

        if(!updatingDesignation){
            return res.status(401).json({
                success:false,
                message : "Something went wrong! Couldn't Update."
            });
        }else{
            return res.status(201).json({
                success:true,
                message : "Designation Successfully Updated!"
            });
        }

    } catch (error) {
        return res.status(500).json({
            success : false,
            message:'Internal Server Error.',
            error:error.message
        });
    }
}

// shift controllers
const addShift = async (req,res)=>{
    try {
        const employeeId = req.employeeId;
        const {name,startTime,endTime,markAsAbsent,isNightShift,weekOff,maxEarlyAllowed,maxLateAllowed} = req.body;

        if(!name || !startTime || !endTime || !weekOff || !maxEarlyAllowed || !maxLateAllowed){
            return res.status(400).json({
                success : false,
                message : `Required fields can't be empty.`
            });
        }

        const check= helper.timeFormatValidator(startTime,endTime,maxEarlyAllowed,maxLateAllowed);
        if(check!='Pass'){
            return res.status(400).json({
                success:false,
                message:`${check}`
            });
        }
      
        const timeDurationInMin = helper.timeDurationInMinutes(startTime,endTime);
        if(timeDurationInMin<0){
            return res.status(400).json({
                success:false,
                message:"Shift End-Time can't be less than Start-Time"
            })
        }
        const duration= `${Math.floor(timeDurationInMin / 60)}:${timeDurationInMin % 60}`;

        const maxEarlyMinute = helper.timeDurationInMinutes(maxEarlyAllowed,startTime);
        if(maxEarlyMinute<0){
            return res.status(400).json({
                success:false,
                message:"Max-Early-Allowed-Time can't be after Start-Time."
            });
        }

        const maxLateMinute = helper.timeDurationInMinutes(startTime,maxLateAllowed);
        if(maxLateMinute<0){
            return res.status(400).json({
                success:false,
                message : "Max-Late-Allowed-Time can't be before Start Time."
            });
        }

        const existShift = await Shift.findOne({name :name});
        if(existShift){
            return res.status(400).json({
                success : false,
                message : "Shift already exists!"
            });
        }

        const newShift = new Shift({
            name,
            startTime,
            endTime,
            markAsAbsent,
            duration,
            markAsAbsent,
            isNightShift,
            weekOff,
            maxEarlyAllowed,
            maxLateAllowed,
            created_By:employeeId
        });

        await newShift.save();

        return res.status(200).json({
            success:true,
            message: "Shift Added Successfully!"
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message : "Internal Server Error! Couldn't Add Shift.",
            error : error.message
        });
    }
    
}

const showShift = async (req,res)=>{

    try {
        const allShift= await Shift.find().select("-__v -createdAt -updatedAt");

        if(allShift){
            return res.status(200).json({
                success:true,
                message:"All Shifts",
                data: allShift || []
            });
        }

    } catch (error) {
        return res.status(500).json({
            success :false,
            message:"Internal Server Error! Couldn't show shifts.",
            error : error.message
        });
    }
}

const updateShift = async(req,res)=>{
    try {
        const employeeId=req.employeeId;
        let {_id,name,startTime,endTime,markAsAbsent,isNightShift,weekOff,maxEarlyAllowed,maxLateAllowed} = req.body ||req.query;

        if(!name ||!startTime ||!endTime ||!markAsAbsent ||!weekOff || !maxEarlyAllowed || !maxLateAllowed){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            });
        }

        const check= helper.timeFormatValidator(startTime,endTime,maxEarlyAllowed,maxLateAllowed);
        if(check!='Pass'){
            return res.status(400).json({
                success:false,
                message:`${check}`
            });
        }
        
        //  // calculating duration
        const timeDurationInMin = helper.timeDurationInMinutes(startTime,endTime);
        if(timeDurationInMin<0){
            return res.status(400).json({
                success:false,
                message:"Shift End-Time can't be less than Start-Time"
            })
        }
        const duration= `${Math.floor(timeDurationInMin / 60)}:${timeDurationInMin % 60}`;

        const maxEarlyMinute = helper.timeDurationInMinutes(maxEarlyAllowed,startTime);
        if(maxEarlyMinute<0){
            return res.status(400).json({
                success:false,
                message:"Max-Early-Allowed-Time can't be after Start-Time."
            });
        }

        const maxLateMinute = helper.timeDurationInMinutes(startTime,maxLateAllowed);
        if(maxLateMinute<0){
            return res.status(400).json({
                success:false,
                message : "Max-Late-Allowed-Time can't be before Start Time."
            });
        }

        await Shift.findByIdAndUpdate({_id},{
            name,startTime,endTime,markAsAbsent,isNightShift,weekOff,maxEarlyAllowed,maxLateAllowed,
            duration,
            updated_By:employeeId
        },{new:true});

        return res.status(201).json({
            success:true,
            message:"Shift Updated Successfully!"
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Couldn't Update Shift.",
            error:error.message
        })
    }
}

// office time policy controllers
const addOfficeTimePolicy = async (req,res)=>{
    try {
        const employeeId=req.employeeId;
        const {policyName,permittedLateArrival,pByTwo,absent,lateComingRule,lateArrival1,lateArrival2,lateArrival3,lateArrival4,
            dayDeduct1,dayDeduct2,dayDeduct3,dayDeduct4,multiPunch,deductFromAttendance,deductFromLeave,continuous,disContinuous
        }=req.body || req.params;

        console.log(req.body);
        console.log(dayDeduct1);

        if(!policyName || !permittedLateArrival ||!pByTwo || !absent){
            return res.status(400).json({
                success:false,
                message: "Required Fields Can't be Empty"
            });
        }

        // do the data-type check at front-end.
        const check = helper.timeFormatValidator(permittedLateArrival, pByTwo, absent,lateArrival1,lateArrival2,lateArrival3,lateArrival4);
        if(check!='Pass'){
            return res.status(400).json({
                success:false,
                message:`${check}`
            });
        }

        const existingPolicy = await OfficeTimePolicy.find({policyName:policyName});
        // console.log(existingPolicy)

        if(existingPolicy.length!==0){
            return res.status(400).json({
                success:false,
                message:"Policy Already Exists!"
            });
        }

        const newPolicy= new OfficeTimePolicy({
            policyName,
            permittedLateArrival,
            pByTwo,
            absent,lateComingRule,lateArrival1,lateArrival2,lateArrival3,lateArrival4,
            dayDeduct1,dayDeduct2,dayDeduct3,dayDeduct4,multiPunch,deductFromAttendance,deductFromLeave,continuous,disContinuous,
            created_By:employeeId
        });

        await newPolicy.save();

        return res.status(200).json({
            success:true,
            message:"Policy Added Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success :false,
            message:"Internal Server Error! Policy Not Added!",
            error : error.message
        });
    }
}

const showOfficeTimePolicy = async (req,res)=> {
    try {
        const allPolicy = await OfficeTimePolicy.find().select("-updatedAt -createdAt -__v -created_By -updated_By");

        return res.status(200).json({
            success:true,
            message : "All Policy",
            data : allPolicy
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message :"Internal Server Error! Can't show Policy",
            error:error.message
        });
    }
}

const updateOfficeTimePolicy=async (req,res)=>{
    try {
        const employeeId=req.employeeId;
        const {_id,policyName,permittedLateArrival,pByTwo,absent,lateComingRule,lateArrival1,lateArrival2,lateArrival3,lateArrival4,
            dayDeduct1,dayDeduct2,dayDeduct3,dayDeduct4,multiPunch,deductFromAttendance,deductFromLeave,continuous,disContinuous
        }=req.body ||req.query;

        if(!_id){
            return res.status(400).json({
                success:false,
                message:"Can't Update without selecting ID."
            });
        }

        if(!policyName || !permittedLateArrival ||!pByTwo ||!absent){
            return res.status(400).json({
                success:false,
                message: "Required fields Can't be Empty."
            });
        }

         // do the data-type check at front-end.
         const check = helper.timeFormatValidator(permittedLateArrival, pByTwo, absent,lateArrival1,lateArrival2,lateArrival3,lateArrival4);
         if(check!='Pass'){
             return res.status(400).json({
                 success:false,
                 message:`${check}`
             });
         }

        await OfficeTimePolicy.findByIdAndUpdate({_id:_id},{
            policyName,permittedLateArrival,pByTwo,absent,lateComingRule,lateArrival1,lateArrival2,lateArrival3,lateArrival4,
            dayDeduct1,dayDeduct2,dayDeduct3,dayDeduct4,multiPunch,deductFromAttendance,deductFromLeave,continuous,disContinuous,
            updated_By:employeeId
        },{new:true});

        return res.status(200).json({
            success:true,
            message:"Policy updated Successfully!"
        });
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error, Couldn't Update.",
            error:error.message
        });
    }
}

module.exports={
    showAllDepts,
    addDept,
    updateDept,

    showDegree,
    addDegree,
    deleteDegree,

    addBranch,
    showBranch,
    updateBranchDetails,

    showAllQualification,
    addQualification,
    updateQualification,
    deleteQualification,
    
    addDesignation,
    showDesignation,
    updateDesignation,

    addShift,
    showShift,
    updateShift,

    addOfficeTimePolicy,
    showOfficeTimePolicy,
    updateOfficeTimePolicy
}