const Degree = require("../../models/common/degree.model");
const Qualification = require("../../models/common/qualification.model");
const Department = require ("../../models/common/department.model");
const Company = require("../../models/common/company.model");
const Branch = require("../../models/common/branch.model");
const Designation = require("../../models/common/designation.model");
const Shift = require("../../models/common/shift.model");
const OfficeTimePolicy = require("../../models/common/officeTimePolicy.model");
const SalaryDeductRule =require("../../models/policy/salaryDeductRule");
const WorkType = require("../../models/common/workType.model");

const helper = require("../../utils/common.util");
const attendanceHelper = require("../../utils/attendance.util");
// const Employee = require("../../models/auth/employee.model");

//test

//degree-common operation
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
        const {qualificationID,degreeName} = req.body;
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
//should not be deleted if it is assigned to any emplpoyee
const deleteDegree = async (req,res)=>{
    try {
        const {degreeId} = req.body;
        if(!degreeId){
            return res.status(400).json({
                success:false,
                message : "Degree-Id not provided!"
            });
        }
        const response = await helper.isAssignedToEmployee({degree:degreeId});
        if(!response.success){
            return res.status(403).json({
                success: response.success,
                message: response.message,
                data : response.data
            });
        }
        const isDeleted = await Degree.findByIdAndDelete(degreeId);

        if(isDeleted){
            return res.status(201).json({
                success:true,
                message:`Degree : ${isDeleted.name} Deleted Successfully.`
            });
        }
        else{
            throw new Error("Something went Wrong, Couldn't Delete Degree. Maybe it's already deleted.");
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Degree Not Deleted.",
            error:error.message
        });
    }
}

//department-common operations
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
//only for backend
const deleteDept = async(req,res) => {
    //should not be deleted if it is assigned to any employee
    try {
        const {deptId} = req.body;
        if(!deptId){
            return res.status(400).json({
                success:false,
                message : "Department-Id not provided!"
            });
        }

        const response = await helper.isAssignedToEmployee({department:deptId});
        if(!response.success){
            return res.status(403).json({
                success: response.success,
                message: response.message,
                data : response.data
            });
        }
        
        const isDeleted = await Department.findByIdAndDelete(deptId);
        if(isDeleted){
            const relatedDesignation = await Designation.deleteMany({department:deptId});
            
            return res.status(201).json({
                success:true,
                message :`Department : ${isDeleted.department} Deleted Successfully along with ${relatedDesignation.deletedCount} Designations.`
            });
        }
        else{
            throw new Error("Something went Wrong, Couldn't Delete Department. Maybe it's Already Deleted.")
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message : "Internal Server Error. Couldn't Delete Department",
            error : error.message
        });
    }
}

//company-common operations
const addCompany = async (req,res)=>{
    try{
        const employeeId = req.employeeId;
        const {name} =req.body;
        if(!name){
            return res.status(400).json({
                success : false,
                message : "All fields are required!"
            });
        }

        const isExisting = await Company.findOne({name:name});
        if(isExisting){
            return res.status(400).json({
                success:false,
                message:"Company with same name already registered."
            })
        };

        const newCompany = new Company({
            name, 
           created_By : employeeId
        });

        const newCompanyAdded= await newCompany.save();

        if(newCompanyAdded){
            return res.status(201).json({
                success : true,
                message : "Company Added Successfully !",
                data : {
                    "company" : name,
                }
            });
        }
        else{
            return res.status(400).json({
                success : false,
                message : "Couldn't Add Company! Something is wrong please try again!",
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
const showCompany = async (req,res)=>{
    try{

        const allCompany=await Company.find().select("-created_By -updated_By -createdAt -updatedAt -__v");
        if(allCompany.length===0 || allCompany == null){
            return res.status(200).json({
                success : true,
                message : "No Company Found, Please Add Company First."
            });
        }
        else{
            return res.status(200).json({
                success:true,
                message:"All Company list.",
                data:allCompany
            })
        }

    }
    catch (error){
        return req.status(500).json({
            success: false,
            message : "Internal Server Error! Can't show you company.",
            error : error.message
        });
    }
}
const updateCompanyName= async (req,res)=>{
    try {
        const employeeId = req.employeeId;
        const {companyId,name} = req.body || req.query;
        
        if(!companyId){
            return res.status(400).json({
                success :false,
                message : "All fields are required! Please fill all feilds."
            });
        }

        const existingCompany=await Company.findById(companyId);

        if(!existingCompany){
            return res.status(400).json({
                success:false,
                message : `Company with id: ${companyId} Not Found.`
            });
        }

         // to check if changes are same as previously saved data
        const isUnchanged = (existingCompany.name===name);
                

        if(isUnchanged){
            return res.status(400).json({
                success:false,
                message : "No changes detected. The new data is same as the existing data.",
            });
        }

        const newCompany= await Company.findByIdAndUpdate(companyId,
            {name,
            updated_By : employeeId
            },
        {new :true, runValidators:true});
        if(newCompany){
            return res.status(200).json({
                success : true,
                message : "Company Name Updated Successfully !"
            })
        }
    } catch (error) {
        // if(error.code===11000){
        //     return res.status(400).json({
        //         success:false,
        //         message : "Update Failed! The given combination of Company Name, Branch, Address & Pin already exists."
        //     })
        // }
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Company Details could not be updated!",
            error : error.message
        });
    }
}
//only for backend
const deleteCompany = async(req,res)=>{
    try {
        const {companyId} = req.body;
        if(!companyId){
            return res.status(400).jaon({
                success:false,
                message:"Company-Id not provided!"
            });
        }

        const response = await helper.isAssignedToEmployee({company:companyId});
        if(!response.success){
            return res.status(403).json({
                success: response.success,
                message: response.message,
                data : response.data
            });
        }

        const isDeleted = await Company.findByIdAndDelete(companyId);
        
        if(isDeleted){
            const isRelatedBranchDeleted = await Branch.deleteMany({companyID:companyId});
            
            return res.status(201).json({
                success:true,
                message :`Company : ${isDeleted.name} Deleted Successfully along with ${isRelatedBranchDeleted.deletedCount} Branches.`
            });
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message : "Internal Server Error, Couldn't Delete Company.",
            error:error.message
        });
    }
}

//branch-common operations
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
//showes all branches along with their company name -> for dashboard purpose. 
const showAllBranch = async (req,res)=>{
    try{
    
        const allBranch = await Branch.find()
        .populate({
            path:"companyID",
            select:"-created_By -updated_By -createdAt -updatedAt -__v"
        })
        .select("-created_By -updated_By -createdAt -updatedAt -__v");


        if(allBranch.length===0 || allBranch == null){
            return res.status(200).json({
                success : true,
                message : "No Details Found."
            });
        }
        else{
            return res.status(200).json({
                success:true,
                message:"All Details list.",
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
//only for backend
const deleteBranch = async(req,res)=>{  
    try {
        const {branchId} = req.body || req.query;
        if(!branchId){
            return res.status(400).json({
                success:false,
                message : "Branch-Id not provided!"
            });
        }

        const response = await helper.isAssignedToEmployee({branch:branchId});
        if(!response.success){
            return res.status(403).json({
                success: response.success,
                message: response.message,
                data : response.data
            });
        }

        const isDeleted = await Branch.findByIdAndDelete(branchId);
        if(isDeleted){
            return res.status(201).json({
                success:true,
                message :`Branch : ${isDeleted.name} Deleted Successfully.`
            });
        }
        else{
            throw new Error("Something went Wrong, Couldn't Delete Branch. Maybe it's already deleted.");
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message : "Internal Server Error, Couldn't Delete Branch.",
            error:error.message
        });
    }
};

//qualification-common operations
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

};
const deleteQualification = async (req,res)=>{
    try {
        const {qualificationId} = req.body;
        if(!qualificationId){
            return res.status(400).json({
                success: false,
                message : "Qualification Id not provided!"
            });
        }

        const response = await helper.isAssignedToEmployee({qualification : qualificationId});
        if(!response.success){
            return res.status(403).json({
                success: response.success,
                message: response.message,
                data : response.data
            });
        }

        const isDeleted = await Qualification.findByIdAndDelete(qualificationId);

        if(isDeleted){
            const relatedDegree = await Degree.deleteMany({qualificationID:qualificationId});

            return res.status(200).json({
                success:true,
                message:`Qualification deleted successfully along with ${relatedDegree.deletedCount} related Degree.`
            });
        }
        else{
            return res.status(400).json({
            success:false,
            message: "Qualification Not Deleted."
            });
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Internal Server Error! Qualification Not Deleted !.",
            error: error.message
        });
    }
}

//designation-common operations
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
        else{
            return res.status(400).json({
                success:false,
                message:"DB Network Issue, Couldn't save data."
            })
        }
    }   
    catch(error){
        return res.status(500).json({
            success:false,
            message : "Internal Server Error! Couldn't Add Designation.",
            error : error.message
        })
    }
};
const showDesignation = async(req,res)=>{
    try {
        const {departmentId} = req.query || req.body;
        // console.log(departmentId)
        const allDesignation = await Designation.find({ department: departmentId}).select("-created_By -createdAt -updatedAt -updated_By -__v");

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
};
const updateDesignation =async (req,res)=>{
    try {
        const {department,designation,newDesignation}=req.body || req.query;

        if(!department || !designation || !newDesignation){
            return res.status(400).json({
                success:false,
                message : "All Fields Required!"
            });
        }

        console.log("check the thing ",department, designation,newDesignation);
        
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
//for backend
const deleteDesignation = async(req,res)=>{
    try {
        const {designationId} = req.body;
        if(!designationId){
            return res.status(400).json({
                success : false,
                message : "Designation Id not provided!"
            });
        }

        const response = await helper.isAssignedToEmployee({designation : designationId});
        if(!response.success){
            return res.status(403).json({
                success: response.success,
                message: response.message,
                data : response.data
            });
        }

        const isDeleted = await Designation.findByIdAndDelete(designationId);

        if(isDeleted){
            return res.status(201).json({
                success:true,
                message:"Designation Deleted Successfully !"
            });
        }
        else{
            throw new Error("Something went Wrong, Couldn't Delete Designation. Maybe it's already deleted.")
        }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message : "Internal Server Error, Couldn't Delete Designation.",
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

        if(!_id){
            return res.status(400).json({
                success:false,
                message:"Can't Proceed without id"
            });
        }

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
//only for backend
const deleteShift = async (req,res)=>{
    // should not be deleted if shift is assigned to an employee
    try {
        const {shiftId}=req.body;
        if(!shiftId){
            return res.status(400).json({
                success:false,
                message:"Shift Id Not Provided."
            });
        }

        const response = await helper.isAssignedToEmployee({shift : shiftId});
        if(!response.success){
            return res.status(403).json({
                success: response.success,
                message: response.message,
                data : response.data
            });
        }

        console.log("Shift not assigned to any employee, good to delete it.");
        const isDeleted = await Shift.findByIdAndDelete(shiftId);

        if(isDeleted){
            // console.log(isDeleted)
            return res.status(200).json({
                success:true,
                message:`Shift : ${isDeleted.name} Deleted Successfully`
            });
        }
        else{
            throw new Error("Something Went Wrong At Our End, Couldn't Delete Shift!")
        }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error, Couldn't Delete Shift",
            error:error.message
        });
    }
};

// office time policy controllers
const addOfficeTimePolicy = async (req,res)=>{
    try {
        const employeeId=req.employeeId;
        const {policyName,
            permittedLateArrival,
            pByTwo,
            absent,
            multiPunch,
            lateComingRule, 
        }=req.body;

        let { lateArrival1,
            lateArrival2,
            lateArrival3,
            lateArrival4,
            dayDeduct1,
            dayDeduct2,
            dayDeduct3,
            dayDeduct4,

            deductFromAttendance,
            deductFromLeave,
            allowedLateDaysInMonth,
            salaryCutPercentage,
            continuous,
        }=req.body;


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

        const existingPolicy = await OfficeTimePolicy.findOne({policyName:policyName});
        // console.log(existingPolicy)

        if(existingPolicy){
            return res.status(400).json({
                success:false,
                message:"Policy Already Exists!"
            });
        }

        //imp- validation
        //check for late-coming rule
        if(lateComingRule){
            //check all the fields required in lateComingRule
            if( !allowedLateDaysInMonth || !salaryCutPercentage){
                return res.status(400).json({
                    success:false,
                    message:"If late coming setting is enabled then late days allowed and salary cut percentage is required."
                });
            }

            if(!deductFromLeave && !deductFromAttendance){
                return res.status(400).json({
                    success:false,
                    message:"If late coming setting is enabled then either of deduct from attendance or deduct from leave is required."
                });
            }

            if(deductFromAttendance && deductFromLeave){
                return res.status(400).json({
                    success:false,
                    message:"If late coming setting is enabled then both deduct from attendance and deduct from leave can't be selected at same time."
                });
            }

            lateArrival1=null;
            lateArrival2=null;
            lateArrival3=null;
            lateArrival4=null;

            dayDeduct1=null;
            dayDeduct2=null;
            dayDeduct3=null;
            dayDeduct4=null;
        }

        if(lateArrival1 || lateArrival2 || lateArrival3 || lateArrival4){
            deductFromAttendance=false;
            deductFromLeave=false;
            allowedLateDaysInMonth=null;
            salaryCutPercentage=null;
            continuous=false;

            if(lateArrival1 && (helper.timeDurationInMinutes('00:00',lateArrival1)>59)){
                return res.status(400).json({
                    success:false,
                    message:"Late Rule 1 can not have time more than 59 minutes"
                });
            }
            if(lateArrival2 && ((15>helper.timeDurationInMinutes('00:00',lateArrival2))||(helper.timeDurationInMinutes('00:00',lateArrival2)>120))){
                console.log(helper.timeDurationInMinutes('00:00',lateArrival2));
                return res.status(400).json({
                    success:false,
                    message:"Late Rule 2 can not have time more than 2 hrs and less than 15 minutes"
                });
            }
            if(lateArrival3 && ((30>helper.timeDurationInMinutes('00:00',lateArrival3))||(helper.timeDurationInMinutes('00:00',lateArrival3)>180))){
                console.log(120<helper.timeDurationInMinutes('00:00',lateArrival3)<180)
                return res.status(400).json({
                    success:false,
                    message:"Late Rule 3 can not have time more than 3 hrs and less than 30 minutes"
                });
            }
            if(lateArrival4 && ((60>helper.timeDurationInMinutes('00:00',lateArrival4)) || (helper.timeDurationInMinutes('00:00',lateArrival4)>240))){
                return res.status(400).json({
                    success:false,
                    message:"Late Rule 4 can not have time more than 4 hrs and less than 1 Hr"
                });
            }
        }

        const newPolicy= new OfficeTimePolicy({
            policyName,
            permittedLateArrival,
            pByTwo,
            absent,
            multiPunch,

            lateArrival1,
            lateArrival2,
            lateArrival3,
            lateArrival4,
            
            dayDeduct1,
            dayDeduct2,
            dayDeduct3,
            dayDeduct4,

            lateComingRule,
            deductFromAttendance,
            deductFromLeave,
            allowedLateDaysInMonth,
            salaryCutPercentage,
            continuous,
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
            data : allPolicy || []
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message :"Internal Server Error! Can't show Policy",
            error:error.message
        });
    }
}
const showForUpdateOfficeTimePolicy = async (req,res)=>{
    try { 
        // const {policyId}= req.body || req.query;
        const policyId = req.body.policyId || req.query.policyId || req.params.policyId;
        console.log("policyId", policyId);
        if(!policyId){
            throw new Error("Policy id Not Provided");
        }     
        const response = await OfficeTimePolicy.findById({_id:policyId}).select("-created_By -createdAt -updatedAt -__v");

        if(!response){
            return res.status(400).json({
                success:false,
                message : "Policy Data Not Found"
            });
        }

        return res.status(200).json({
            success:true,
            message: `Policy details for ${response.policyName}`,
            data:response.toObject(),
                
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error, can't show data",
            error:error.message
        });
    }
}
const updateOfficeTimePolicy=async (req,res)=>{
    try {
        const employeeId=req.employeeId;
        const {_id,
                policyName,
                permittedLateArrival,
                pByTwo,
                absent,
                multiPunch,
                lateComingRule,
        }=req.body;
        let {lateArrival1,
                lateArrival2,
                lateArrival3,
                lateArrival4,
                dayDeduct1,
                dayDeduct2,
                dayDeduct3,
                dayDeduct4,

                deductFromAttendance,
                deductFromLeave,
                allowedLateDaysInMonth,
                salaryCutPercentage,
                continuous,
            }=req.body;

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

         //imp- validation
        //check for late-coming rule
        if(lateComingRule){
            //check all the fields required in lateComingRule
            if( !allowedLateDaysInMonth || !salaryCutPercentage){
                return res.status(400).json({
                    success:false,
                    message:"If late coming setting is enabled then late days allowed and salary cut percentage is required."
                });
            }

            if(!deductFromLeave && !deductFromAttendance){
                return res.status(400).json({
                    success:false,
                    message:"If late coming setting is enabled then either of deduct from attendance or deduct from leave is required."
                });
            }

            if(deductFromAttendance && deductFromLeave){
                return res.status(400).json({
                    success:false,
                    message:"If late coming setting is enabled then both deduct from attendance and deduct from leave can't be selected at same time."
                });
            }

            lateArrival1=null;
            lateArrival2=null;
            lateArrival3=null;
            lateArrival4=null;

            dayDeduct1=null;
            dayDeduct2=null;
            dayDeduct3=null;
            dayDeduct4=null;
        }

        if(lateArrival1 || lateArrival2 || lateArrival3 || lateArrival4){
            deductFromAttendance=false;
            deductFromLeave=false;
            allowedLateDaysInMonth=null;
            salaryCutPercentage=null;
            continuous=false;

            if(lateArrival1 && (helper.timeDurationInMinutes('00:00',lateArrival1)>59)){
                return res.status(400).json({
                    success:false,
                    message:"Late Rule 1 can not have time more than 59 minutes"
                });
            }
            if(lateArrival2 && ((15>helper.timeDurationInMinutes('00:00',lateArrival2))||(helper.timeDurationInMinutes('00:00',lateArrival2)>120))){
                console.log(helper.timeDurationInMinutes('00:00',lateArrival2));
                return res.status(400).json({
                    success:false,
                    message:"Late Rule 2 can not have time more than 2 hrs and less than 15 minutes"
                });
            }
            if(lateArrival3 && ((30>helper.timeDurationInMinutes('00:00',lateArrival3))||(helper.timeDurationInMinutes('00:00',lateArrival3)>180))){
                console.log(120<helper.timeDurationInMinutes('00:00',lateArrival3)<180)
                return res.status(400).json({
                    success:false,
                    message:"Late Rule 3 can not have time more than 3 hrs and less than 30 minutes"
                });
            }
            if(lateArrival4 && ((60>helper.timeDurationInMinutes('00:00',lateArrival4)) || (helper.timeDurationInMinutes('00:00',lateArrival4)>240))){
                return res.status(400).json({
                    success:false,
                    message:"Late Rule 4 can not have time more than 4 hrs and less than 1 Hr"
                });
            }
        }

        await OfficeTimePolicy.findByIdAndUpdate({_id:_id},{
            policyName,
            permittedLateArrival,
            pByTwo,
            absent,
            multiPunch,

            lateArrival1,
            lateArrival2,
            lateArrival3,
            lateArrival4,
            dayDeduct1,
            dayDeduct2,
            dayDeduct3,
            dayDeduct4,

            lateComingRule,
            deductFromAttendance,
            deductFromLeave,
            allowedLateDaysInMonth,
            salaryCutPercentage,
            continuous,
            updated_By:employeeId
        },{new:true});

        // we will re-calculate the attendance record according to new policy at the time of policy updation.
        // console.log("Policy updated, now updating the attendance of current month.");
        const reply = await attendanceHelper.recalculateAttendance(_id);
        // console.log(reply.updatedRecords);

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

//strictly for backend
//should not be deleted if policy is assigned to an employee
const deleteOfficeTimePolicy = async (req,res)=>{
    try {
        const {policyId} = req.body;
        
        if(!policyId){
            throw new Error("Policy id is not provided");
        }
        const isExisting = await OfficeTimePolicy.findById({_id:policyId});
        if(!isExisting){
            return res.status(400).json({
                success:false,
                message:"No data found to delete"
            });
        }
        //should not be deleted if policy is assigned to an employee
        const response = await helper.isAssignedToEmployee({officeTimePolicy : policyId});
        if(!response.success){
            return res.status(403).json({
                success: response.success,
                message: response.message,
                data : response.data
            });
        }

        const isDeleted = await OfficeTimePolicy.findByIdAndDelete({_id:policyId})
    
        if(isDeleted){
            console.log("Policy Deleted Successfully")
            return res.status(202).json({
            success:true,
            message:`Policy : ${isDeleted.policyName} deleted Successfully`
        });
        }
        else{
            throw new Error("Something Went Wrong At Our End, Couldn't Delete Policy.")
        }
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        });
    }
}

//salaryDeduct Rule
const showSalaryDeductRule = async(req,res)=>{
    try {
        const {policyId} = req.body || req.params;

        if(!policyId){
            throw new Error("Policy Id not provided.")
        }
    
        const policySalaryRule = await SalaryDeductRule.find({OfficeTimePolicy : policyId});

        if(policySalaryRule.length===0){
            return res.status(200).json({
                success:true,
                message:"No Data Found for policy id",
                data: policySalaryRule
            });
        }

        return res.status(200).json({
            success:true,
            message:"Data Fetched",
            data: policySalaryRule
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Data Not Fetched AF",
            error:error.message
        })   
    }
}
const deleteSalaryDeductRule= async(req,res)=>{
    try {
        const {policyId} = req.body || req.params;
        if(!policyId){
            throw new Error("Policy Id not provided.");
        }

        const isExisting = await SalaryDeductRule.find({OfficeTimePolicyId : policyId});
        if(isExisting.length===0){
            return res.status(400).json({
                success:false,
                message: "NO Data to Delete"
            });
        }
        
        await SalaryDeductRule.deleteMany({OfficeTimePolicyId : policyId})
        .then(
            console.log("Fields deleted successfully")
        )
        return res.status(202).json({
            success:true,
            message: "Data deleted Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message : "Data Not Deleted",
            error:error.message
        })
    }
}

// Work Type Controller
//addWorkType api should not be given to frontend 
const addWorkType = async(req,res) =>{
    try {
        const employeeId = req.employeeId;
        const {workType}= req.body || req.params;
        if(!workType){
            return res.status(400).json({
                success : false,
                message : "Field Can't be empty"
            });
        }
        const isExisting = await WorkType.findOne({workType:workType});
        if(isExisting){
            return res.status(400).json({
                success:false,
                message:"Work-Type already exists!"
            });
        }
        const newWorkType = new WorkType({
            workType,
            created_By:employeeId
        });
        const saveWork = await newWorkType.save();
        if(!saveWork){
            return res.status(401).json({
                success:false,
                message:"Work Type Couldn't be Saved, Try Again!"
            });
        }
        return res.status(200).json({
            success:true,
            message :"Work Type Added Successfully!"
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Work-Type Not Added!"
        });
    }
}
const showWorkType = async(req,res)=>{
    try {
        const allWorkType = await WorkType.find().select("-updatedAt -createdAt -__v -created_By -updated_By");
        
        return res.status(200).json({
            success:true,
            message:"All Work Types",
            data: allWorkType || []
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Internal Server Error! Can't Show Work-Type",
            error:error.message
        });
    }
}

module.exports={
    
    showAllDepts,
    addDept,
    updateDept,
    // only for backend
    deleteDept,

    showDegree,
    addDegree,
    deleteDegree,

    addCompany,
    showCompany,
    updateCompanyName,
    //only for backend
    deleteCompany,

    addBranch,
    showBranch,
    updateBranchDetails,
    showAllBranch,
    // only for backend
    deleteBranch,

    showAllQualification,
    addQualification,
    updateQualification,
    deleteQualification,
    
    addDesignation,
    showDesignation,
    updateDesignation,
    //only for backend
    deleteDesignation,

    addShift,
    showShift,
    updateShift,
    //only for backend
    deleteShift,

    addOfficeTimePolicy,
    showOfficeTimePolicy,
    updateOfficeTimePolicy,
    showForUpdateOfficeTimePolicy,
    //only for backend testing
    deleteOfficeTimePolicy,

    addWorkType,
    showWorkType,

    //for backend purpose
    showSalaryDeductRule,
    deleteSalaryDeductRule
}