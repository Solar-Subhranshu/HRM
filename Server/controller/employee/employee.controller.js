const Employee = require("../../models/auth/employee.model");
const bcrypt = require("bcrypt");
const {createAccessToken, createRefreshToken} = require("../../utils/tokenGeneration");
const {generateRandomNumbers} = require("../../utils/randomNumGenerator");

// done
const registerEmployee = async(req,res)=>{
    try {
        //employeeID is admin to track who is registering employee
        const employeeId=req.employeeId;
        const{employeeCode,
            password,
            name,
            father_husbandName,
            dateOfBirth,
            personalPhoneNum,
            personalEmail,
            panCard,
            aadharCard,
            qualification,
            degree,
            permanentAddress,
            permanentPinCode,
            currentAddress,
            currentPinCode,
            bankName,
            branchName,
            bankAccount,
            bankIFSC,
            bankAccountHolderName,
            bankAddress,
            reportingManager,
            companyPhoneNum,
            companyEmail,
            joiningDate,
            lastAppraisalDate,
            regisnationDate,
            company,
            branch,
            department,
            designation,
            officeTimePolicy,
            shift,
            aadharCardAttachment,
            panCardAttachment,
            bankAttachment,
            joiningFormAttachment,
            otherAttachment}=req.body;
        

        //checking necessary input fields
        if(!employeeCode ||!name ||!father_husbandName||!company||!department||!designation||!joiningDate){
            return res.status(400).json({
                success:false,
                message : "All Fields Are Required!"
            });
        }

        const isEmployeeExists = await Employee.findOne({employeeCode:employeeCode});
        
        // checking unique employee
        if(isEmployeeExists){
            return res.status(400).json({
                success:false,
                message:"Registration Failed! Employee Already Exists!"
            });
        }

        // checking unique Pan Card
        const isPanCardExists = await Employee.findOne({panCard:panCard});
        if(isPanCardExists){
            return res.status(400).json({
                success:false,
                message:"Registration Failed! Pan Card Exists!"
            });
        }

        // checking unique Aadhar Card
        const isAadharCardExists = await Employee.findOne({aadharCard:aadharCard});
        if(isAadharCardExists){
            return res.status(400).json({
                success:false,
                message:"Registration Failed! Aadhar Card Exists!"
            });
        }

        // checking unique Bank Account
        const isBankAccountExists = await Employee.findOne({bankAccount:bankAccount});
        if(isBankAccountExists){
            return res.status(400).json({
                success:false,
                message:"Registration Failed! Bank Account Exists!"
            });
        }


        let hashedPassword;
        if(password){
            hashedPassword = await bcrypt.hash(password,10);
            // console.log(hashedPassword)
        }
        else{
            hashedPassword = String(employeeCode + "-" + generateRandomNumbers());
            // console.log(hashedPassword)
        }
        
        const newEmployee = new Employee({
            employeeCode,
            name,
            father_husbandName,
            dateOfBirth,
            personalPhoneNum,
            personalEmail,
            panCard,
            aadharCard,
            qualification,
            degree,
            permanentAddress,
            permanentPinCode,
            currentAddress,
            currentPinCode,
            bankName,
            branchName,
            bankAccount,
            bankIFSC,
            bankAccountHolderName,
            bankAddress,
            reportingManager,
            companyPhoneNum,
            companyEmail,
            joiningDate,
            lastAppraisalDate,
            regisnationDate,
            company,
            branch,
            department,
            designation,
            officeTimePolicy,
            shift,
            aadharCardAttachment,
            panCardAttachment,
            bankAttachment,
            joiningFormAttachment,
            otherAttachment,
        
            password :hashedPassword,
            created_By : employeeId
        });

        // console.log(newEmployee);

        await newEmployee.save()
        .then((response,error)=>{
            if(response){
                return res.status(200).json({
                    success:true,
                    message : "Employee Successfully Registered!",
                    data : {
                        employeeId:newEmployee.employeeId,
                        name:newEmployee.name
                    }
                });
            }

            if(error){
                return res.status(401).json({
                    success:false,
                    message : "Something Went Wrong, Employee Not Registered."
                });
            }
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message : "Internal Server Error",
            error: error.message
        });
    }
}

// done
const login = async(req,res) =>{
    try {
        //checking if both id and password are given
        const {employeeCode, password}= req.body;
        if(!employeeCode || !password){
            return res.status(400).json({
                success:false,
                message : "All fields are required!"
            });
        }

        //we call this data as admin data !
        //checking if valid id is given
        const adminData = await Employee.findOne({employeeCode:employeeCode}).populate("department");
        console.log(adminData.department.department);
        if(adminData.department.department !== 'Admin'){
            return res.status(400).json({
                success: false,
                message: "You are not authorised to login."
            });
        }

        if(!adminData){
            return res.status(401).json({
                success : false,
                message : "Invalid creadentials! Wrong ID."
            });
        }

        //checking if valid password is given
        // console.log("ADMINDATa", adminData)
        const isMatch = await bcrypt.compare(password,adminData.password);
        if(!isMatch){
            return res.status(401).json({
                success : false,
                message : "Invalid creadentials! Wrong Password."
            });
        }

        //checking if given admin-id is active or not. 
        if(!adminData.isActive){
            return res.status(400).json({
                success : false,
                message : "Your account is no longer active, and login is not permitted."
            });
        }

        //setting access-token and refresh-token
        const options ={
            withCredentials:true,
            httpOnly:true,
            secure:false
        };

        const accessTokenData= {
            id:adminData._id,
            employeeCode:adminData.employeeCode
        }
        const accessToken = createAccessToken(accessTokenData);
        const refreshToken = createRefreshToken(adminData.employeeCode);

        const setRefreshToken = await Employee.findByIdAndUpdate(adminData._id,{refreshToken:refreshToken},{new:true});
        if(!setRefreshToken){
            return res.status(401).json({
                success:false,
                message: "Login Failed! Please Try Again"
            });
        }

        return res.status(200)
        .cookie("accessToken",`Bearer ${accessToken}`,options)
        .cookie("refreshToke",`Bearer ${refreshToken}`,options)
        .json({
            success:true,
            message:"Login Successful",
            data : {
                adminCode : adminData.employeeCode,
                name : adminData.name
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error : error.message
        });
    }
}

// done
const deactivateEmp = async (req,res)=>{
    try{
        const employeeId = req.employeeId;
        // console.log(employeeId);

        const {employeeCode} = req.body || req.query || req.params;
        // console.log(empId);

        if(!employeeCode){
            return res.status(400).json({
                success:false,
                message : "Employee Code is required"
            });
        }

        const deactiveEmp = await Employee.findOneAndUpdate(
            {employeeCode : employeeCode},
            {isActive : false,
                updated_By : employeeId},
            {new : true}  
        );

        if(!deactiveEmp){
            return res.status(400).json({
                success:false,
                message : `Employee with employeeCode: ${employeeCode} Not Found.`
            });
        }
        return res.status(200).json({
            success:true,
            message : "Employee Account deleted Successfuly!"
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error, Couldn't Deactivate Employee, Try Again Later!",
            error : error.message
        })
    }
}

// done
const showAllEmployee= async (req,res) =>{
    try{
        const allEmp= await Employee.find()
        .populate({
            path:"department",
            select:"-updatedAt -createdAt -__v -created_By -updated_By"
        })
        .populate({
            path:"designation",
            select:"-updatedAt -createdAt -__v -created_By -updated_By"
        })
        .populate({
            path:"qualification",
            select:"-updatedAt -createdAt -__v -created_By -updated_By"
        })
        .populate({
            path:"degree",
            select:"-updatedAt -createdAt -__v -created_By -updated_By"
        })
        .populate({
            path:"company",
            select:"-updatedAt -createdAt -__v -created_By -updated_By"
        })
        .populate({
            path:"branch",
            select:"-updatedAt -createdAt -__v -created_By -updated_By"
        })
        .populate({
            path:"reportingManager",
            select:"-updatedAt -createdAt -__v -created_By -updated_By -password -company -department -deisgnation -joiningDate -refreshToken"
        })
        .select("-updated_By -created_By -__v -password")


        if(allEmp===0){
            return res.status(200).json({
                success:true,
                message : "No Employee Found, Please Register Employee First"
            });
        }
        else{
            // console.log(allEmp);

            // const empData = allEmp.map(emp=> ({
            //     _id:emp._id,
            //     id: emp.employeeCode,
            //     name : emp.name,
            //     department : emp.department.department,
            //     designation :emp.designation.designation,
            //     mobileNo: emp.personalPhoneNum,
            //     email:emp.personalEmail,
            //     empIsActive: emp.isActive
            // }));
            return res.status(200).json({
                success: true,
                message: "List of All Employee",
                data : allEmp
                // data : empData
            });
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error, Couldn't Show Employee Data",
            error : error.message
        });
    }
}

const showSingleEmployee = async(req,res)=>{
    try{

        const {employeeCode} = req.query || req.body;
        const employeeData = await Employee.findOne({employeeCode:employeeCode})
        .populate({
            path:"department",
            select:"-updatedAt -createdAt -__v -created_By -updated_By"
        })
        .populate({
            path:"designation",
            select:"-updatedAt -createdAt -__v -created_By -updated_By"
        })
        .populate({
            path:"qualification",
            select:"-updatedAt -createdAt -__v -created_By -updated_By"
        })
        .populate({
            path:"degree",
            select:"-updatedAt -createdAt -__v -created_By -updated_By"
        })
        .populate({
            path:"company",
            select:"-updatedAt -createdAt -__v -created_By -updated_By"
        })
        .populate({
            path:"branch",
            select:"-updatedAt -createdAt -__v -created_By -updated_By"
        })
        .populate({
            path:"reportingManager",
            select:"-updatedAt -createdAt -__v -created_By -updated_By -password -company -department -deisgnation -joiningDate -refreshToken"
        })
        .select("-updated_By -created_By -__v -password")

        // console.log(employeeData);
        
        if(!employeeData){
            return res.status(400).json({
                success:false,
                message : `Employee with ${employeeCode} Not Found.`
            });
        }

        if(employeeData.department.department==="Admin"){
            return res.status(200).json({
                success: true,
                message : "We can not show you data for this employee."
            });
        }

        return res.status(200).json({
            success:true,
            message:"Employee Found!",
            data : employeeData
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error ! Couldn't Find Employee Data.",
            error:error.message
        });
    }
}

const showReportingManager = async (req,res)=>{
    try {
        const allEmployees = await Employee.find()
        .populate({
            path:"department"
        });

        const reportingManager = allEmployees.filter(emp=>(emp.department.department==="HR"))
                                            .map(emp=>({
                                            _id:emp._id,
                                            name:emp.name,
                                            department:emp.department.department
                                        }));
        // console.log(reportingManager);

        return res.status(200).json({
            success:true,
            message : "List of all HRs",
            data : reportingManager || []
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error, No Manager For Now!",
            error : error.message
        });
    }
}


module.exports = {
    registerEmployee,
    login,    
    deactivateEmp,
    showAllEmployee,
    // showSingleEmployee,
    showReportingManager
};