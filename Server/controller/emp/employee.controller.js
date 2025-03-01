const Employee = require("../../models/auth/employee.model");
const bcrypt = require("bcrypt");
const {createAccessToken, createRefreshToken} = require("../../utils/tokenGeneration");
const generateRandomNumbers = require("../../utils/randomNumGenerator");
const excelToJSON = require("../../utils/excelToJson");
const fs = require("fs/promises"); 
const handleBase64Images = require("../../middlewares/base64ImageHandler");
const absolutePath = require("../../utils/absolutePath");

// attendance for when deleting employee
const Attendance = require("../../models/attendance/attendance.model");
//strictly for backend
const addAdmin = async(req,res)=>{
    try {
        const {employeeCode,password,name}= req.body;

        if(!employeeCode || !password || !name){
            return res.status(400).json({
                success:false,
                message:"EmployeeCode, password, name are required."
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newAdmin = new Employee({
            employeeCode,
            password:hashedPassword,
            name,
            department:"676274bfc79be89a2e977b28",
            designation:"6763f82ef2d8d720efa42f6a"
        });

        const isSaved = await newAdmin.save();

        if(!isSaved){
            return res.status(400).json({
                success:false,
                message:"Admin not saved.",
            })
        }

        return res.status(200).json({
            success:true,
            message:"new Admin Added",
            data : isSaved
        });
        // const {}
    } catch (error) {
        return res
        .status(400)
        .json({
            success:false,
            message:"Unable to add admin.",
            error:error.message
        })
    }
}

// done
const registerEmployee = async(req,res)=>{ 
    try {
        //employeeID is "admin ID" used to track who is registering employee
        const employeeId=req.employeeId;
        const{employeeCode,
            // password,
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
            joiningHR,
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
            workType,
            biometricPunchId,
            //salary
            ctc,
            inHand,
            employeeESI,
            employeePF,
            employerESI,
            employerPF,

            aadharCardAttachment,
            panCardAttachment,
            bankAttachment,
            otherAttachment
        }=req.body;

        console.log(req.body);
        
        // //checking necessary input fields
        // if(!employeeCode || !name || !father_husbandName 
        //     || !dateOfBirth || !personalPhoneNum || !personalEmail 
        //     || !panCard || !aadharCard || !qualification || !degree
        //     || !permanentAddress || !permanentPinCode ||!currentAddress 
        //     || !currentPinCode || !reportingManager 
        //     || !joiningHR 
        //     || !joiningDate 
        //     || !company || !branch || !department || !designation 
        //     || !workType || !shift || !officeTimePolicy 
        //     || !biometricPunchId
        //     || !aadharCardAttachment || !panCardAttachment 
        //     || !bankAttachment  
        //     || !otherAttachment
        // ){
        //     return res.status(400).json({
        //         success:false,
        //         message : "All Fields Are Required!"
        //     });
        // }

        //required fields
        const requiredFields =[
            "employeeCode", "name", "father_husbandName", 
            "dateOfBirth", "personalPhoneNum", "personalEmail", 
            "panCard", "aadharCard", "qualification", "degree",
            "permanentAddress", "permanentPinCode", "currentAddress",
            "currentPinCode", "reportingManager", 
            "joiningHR", "joiningDate", 
            "company", "branch", "department", "designation", 
            "workType", "shift", "officeTimePolicy", 
            "biometricPunchId", "ctc", "inHand",
            "aadharCardAttachment", "panCardAttachment", 
            "bankAttachment", "otherAttachment",
        ];

        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `The following fields are missing: ${missingFields.join(", ")}`
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

        // --------x used in first version x------------ 
        // let hashedPassword;
        // if(password){
        //     hashedPassword = await bcrypt.hash(password,10);
        //     // console.log(hashedPassword)
        // }
        // else{
        //     // hashedPassword = String(employeeCode + "-" + generateRandomNumbers());
        //     hashedPassword = String(employeeCode);3
        //     // console.log(hashedPassword)
        // }

        const hashedPassword = await bcrypt.hash(employeeCode,10);

        const salary={
            ctc,
            inHand,
            employeeESI,
            employeePF,
            employerESI,
            employerPF
        }

        //check if the images are already stored in server
        console.log("aadharCardAttachment ",aadharCardAttachment);

        let aadharCardUrl;
        if(aadharCardAttachment){
            const folderPath=`${req.protocol}://${req.get("host")}/uploads/aadharCardAttachments/`;
            if(folderPath===aadharCardAttachment.slice(0,folderPath.length)){
                aadharCardUrl=aadharCardAttachment;
            }
            else{
                const aadharCardImage = aadharCardAttachment ? await handleBase64Images([aadharCardAttachment], "aadharCardAttachments") : [];
                aadharCardUrl = `${req.protocol}://${req.get("host")}/uploads/aadharCardAttachments/${aadharCardImage[0].fileName}`;
            }
        }
        console.log("aadharCardUrl ",aadharCardUrl);

        console.log("panCardAttachment ",panCardAttachment);
        let panCardUrl;
        if(panCardAttachment){
            const folderPath=`${req.protocol}://${req.get("host")}/uploads/panCardAttachment/`;
            if(folderPath === panCardAttachment.slice(0,folderPath.length)){
                panCardUrl = panCardAttachment;
            }
            else{
                const panCardImage = panCardAttachment ? await handleBase64Images([panCardAttachment], "panCardAttachments") : [];
                panCardUrl = `${req.protocol}://${req.get("host")}/uploads/panCardAttachments/${panCardImage[0].fileName}`;

            }
        }
        console.log("panCardUrl ", panCardUrl);


        console.log("bankAttachment ", bankAttachment);
        let bankAccountUrl;
        if(bankAttachment){
            const folderPath = `${req.protocol}://${req.get("host")}/uploads/bankAttachments/`;
            if(folderPath === bankAttachment.slice(0,folderPath.length)){
                bankAccountUrl = bankAttachment
            }
            else{
                const bankAccountImage = bankAttachment ? await handleBase64Images([bankAttachment], "bankAttachments") : [];
                bankAccountUrl = `${req.protocol}://${req.get("host")}/uploads/bankAttachments/${bankAccountImage[0].fileName}`;
            }
        }
        console.log("bankAccountUrl ", bankAccountUrl);

        console.log("otherAttachment ",otherAttachment);
        let otherAttachmentUrl;
        if(otherAttachment){
            const folderPath = `${req.protocol}://${req.get("host")}/uploads/otherAttachments/`;
            if(folderPath === otherAttachment.slice(0,folderPath.length)){
                otherAttachmentUrl = otherAttachment;
            }
            else{
                const otherAttachmentImage = otherAttachment ? await handleBase64Images([otherAttachment], "otherAttachments") : [];
                otherAttachmentUrl = `${req.protocol}://${req.get("host")}/uploads/otherAttachments/${otherAttachmentImage[0].fileName}`;
            }
        }
        console.log("otherAttachmentUrl ",otherAttachmentUrl);

        // const joiningFormImage = joiningFormAttachment ? await handleBase64Images([joiningFormAttachment], "joiningForms") : [];
        // const joiningFormUrl = `${req.protocol}://${req.get("host")}/uploads/joiningForms/${joiningFormImage[0].fileName}`;
        
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
            joiningHR,
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
            workType,
            biometricPunchId,
            salary,
            aadharCardAttachment: aadharCardUrl,
            panCardAttachment: panCardUrl,
            bankAttachment: bankAccountUrl,
            // joiningFormAttachment: joiningFormUrl,
            otherAttachment: otherAttachmentUrl,
        
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
                    message : "Something Went Wrong, Employee Not Registered.",
                    error:error
                });
            }
        })
    } catch (error) {

        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: "Please upload an image less than 5 MB!",
            });
        }

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
        let {employeeCode, password}= req.body;
        
        employeeCode=String(employeeCode).trim();
        if(!employeeCode || !password){
            return res.status(400).json({
                success:false,
                message : "All fields are required!"
            });
        }

        //we call this data as admin data !
        //checking if valid id is given
        const adminData = await Employee.findOne({employeeCode:employeeCode}).populate("department");
        // console.log(adminData.department.department);
        if(adminData?.department?.department !== 'Admin'){
            return res.status(400).json({
                success: false,
                message: "You are not authorized to login."
            });
        }

        if(!adminData){
            return res.status(401).json({
                success : false,
                message : "Invalid credentials! Wrong ID."
            });
        }

        //checking if valid password is given
        // console.log("ADMINDATa", adminData)
        const isMatch = await bcrypt.compare(password,adminData.password);
        if(!isMatch){
            return res.status(401).json({
                success : false,
                message : "Invalid credentials! Wrong Password."
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
0
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
        .cookie("refreshToken",`Bearer ${refreshToken}`,options)
        .json({
            success:true,
            message:"Login Successful",
            data : {
                adminCode : adminData.employeeCode,
                name : adminData.name
            }
        });

    } catch (error) {
        console.log("Login Error: ", error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error : error.message
        });
    }
}

const logout = async(req,res)=> {
    const employeeId =  req.employeeId;
    await Employee.findByIdAndUpdate(employeeId,{
        $unset:{
            refreshToken:1
        }
    },{new:true});

    const options ={
        withCredentials:true,
        httpOnly:true,
        secure:false
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json({
        success:true,
        message:"User Logged Out"
    })
}

const addHR = async(req,res)=>{
    try {
        const employeeId = req.employeeId;
        const {name,phoneNum,employeeCode} = req.body;

        if(!name || !phoneNum || !employeeCode){
            return res.status(400).json({
                success:false,
                message:"Name and Phone Number are required!"
            });
        }

        const isExist = await Employee.findOne(employeeCode).lean();
        if(isExist){
            return res.status(400).json({
                success:false,
                message:"HR with this employee code already exists."
            });
        }

        const newHR = new Employee({
            employeeCode,
            name,
            personalPhoneNum: phoneNum,

            created_By:employeeId
        });

        const isSaved = await newHR.save();
        if(isSaved){
            return res.status(200).json({
                success:true,
                message:"New Hr saved successfully.",
                data:newHR
            });
        }

        return res.status(400).json({
            success:false,
            message:"Could not save new HR data."
        })


    } catch (error) {
        
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
        const allEmp = await Employee.find({department :{$not : { $eq:"676274bfc79be89a2e977b28" }}}) //hide admin data
        .populate({
            path:"department",
            select:"-updatedAt -createdAt -__v -created_By -updated_By"
        })
        .populate({
            path:"designation",
            select:"-updatedAt -createdAt -__v -created_By -updated_By -department"
        })
        .populate({
            path:"qualification",
            select:"-updatedAt -createdAt -__v -created_By -updated_By"
        })
        .populate({
            path:"degree",
            select:"name"
        })
        .populate({
            path:"company",
            select:"-updatedAt -createdAt -__v -created_By -updated_By"
        })
        .populate({
            path:"branch",
            select:"name"
        })
        .populate({
            path:"reportingManager",
            select:"name"
        })
        .populate({
            path:"joiningHR",
            select:"name"
        })
        .populate({
            path:"officeTimePolicy",
            select:"policyName"
        })
        .populate({
            path:"shift",
            select:"name"
        })
        .populate({
            path:"workType",
            select:"workType"
        })
        .select("-createdAt -updatedAt -updated_By -created_By -__v -password -refreshToken ")
        .lean()

        if(allEmp.length===0){
            return res.status(200).json({
                success:true,
                message : "No Employee Found, Please Register Employee First",
                data:[]
            });
        }
        
        else{
            return res.status(200).json({
                success: true,
                message: "List of All Employee",
                data : allEmp
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

const seeEmpBackend= async (req,res) =>{
    try{
        const allEmp= await Employee.find()
        // .populate({
        //     path:"department",
        //     select:"-updatedAt -createdAt -__v -created_By -updated_By"
        // })
        // .populate({
        //     path:"designation",
        //     select:"-updatedAt -createdAt -__v -created_By -updated_By -department"
        // })
        // .populate({
        //     path:"qualification",
        //     select:"-updatedAt -createdAt -__v -created_By -updated_By"
        // })
        // .populate({
        //     path:"degree",
        //     select:"name"
        // })
        // .populate({
        //     path:"company",
        //     select:"-updatedAt -createdAt -__v -created_By -updated_By"
        // })
        // .populate({
        //     path:"branch",
        //     select:"name"
        // })
        // .populate({
        //     path:"reportingManager",
        //     select:"name"
        // })
        // .select("-createdAt -aadharCardAttachment -panCardAttachment -bankAttachment -joiningFormAttachment -otherAttachment -updatedAt -updated_By -created_By -__v -password -refreshToken -dateOfBirth -aadharCard -lastAppraisalDate -regisnationDate -permanentAddress -permanentPinCode -currentAddress -currentPinCode")


        if(allEmp===0){
            return res.status(200).json({
                success:true,
                message : "No Employee Found, Please Register Employee First"
            });
        }
        else{
            return res.status(200).json({
                success: true,
                message: "List of All Employee",
                data : allEmp
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

        console.log(employeeData);

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

const showJoiningHR = async (req,res)=>{
    try {
        const allEmployees = await Employee.find()
        .populate({
            path:"department"
        });

        const joiningHR = allEmployees.filter(emp=>(emp.department.department==="HR"))
                                            .map(emp=>({
                                            _id:emp._id,
                                            name:emp.name,
                                            department:emp.department.department
                                        }));
        // console.log(joiningHR);

        return res.status(200).json({
            success:true,
            message : "List of all HRs",
            data : joiningHR || []
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error, No Manager For Now!",
            error : error.message
        });
    }
}

// const addEmployeeByExcel = async(req,res)=>{
//     try{
//         const JSON_Data= await excelToJSON(req.file.buffer);

//         console.log(JSON_Data);
        
        
//     }
//     catch(error){
//         return res.status(500).json({
//             success:false,
//             message: "Internal Server Error, Couldn't add by Excel."
//         })
//     }
// }

const updateEmployee= async(req,res)=>{
    try {
        const employeeId=req.employeeId;

        const {employeeCode,
            // password,
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
            joiningHR,
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
            workType,
            biometricPunchId,
            //salary
            ctc,
            inHand,
            employeeESI,
            employeePF,
            employerESI,
            employerPF,

            aadharCardAttachment,
            panCardAttachment,
            bankAttachment,
            // joiningFormAttachment,
            otherAttachment
        } = req.body;

        // const attachedFiles=req.files;
        if(!employeeCode){
            return res.status(400).json({
                success:false,
                message:"Employee Code is Required."
            });
        }
        
        const employeeToUpdate= await Employee.findOne({employeeCode:employeeCode});
        if(!employeeToUpdate){
            return res.status(400).json({
                success:false,
                message: "Employee Not Found!"
            });
        }

        if(!employeeToUpdate.isActive){
            return res.status(401).json({
                success:false,
                message: "The employee you are trying to update is no longer active."
            });
        }

        let aadharCardAttachmentUrl=employeeToUpdate.aadharCardAttachment;
        let panCardAttachmentUrl=employeeToUpdate.panCardAttachment;
        let bankAttachmentUrl=employeeToUpdate.bankAttachment;
        // let joiningFormAttachmentUrl=employeeToUpdate.joiningFormAttachment;
        let otherAttachmentUrl=employeeToUpdate.otherAttachment;

        //checking each 
        if(Array.isArray(aadharCardAttachment)){
            const actualPath = absolutePath(aadharCardAttachmentUrl);
            await fs.unlink(actualPath);
            const aadharCardImage = await handleBase64Images(aadharCardAttachment, "aadharCardAttachments");
            aadharCardAttachmentUrl = `${req.protocol}://${req.get("host")}/uploads/aadharCardAttachments/${aadharCardImage[0].fileName}`;
        }
        if(Array.isArray(panCardAttachment)){
            const actualPath = absolutePath(panCardAttachmentUrl);
            await fs.unlink(actualPath);
            const panCardImage = await handleBase64Images(panCardAttachment, "panCardAttachments");
            panCardAttachmentUrl = `${req.protocol}://${req.get("host")}/uploads/panCardAttachments/${panCardImage[0].fileName}`;
            // console.log(panCardAttachmentUrl);
        }
        if(Array.isArray(bankAttachment)){
            const actualPath = absolutePath(bankAttachmentUrl);
            await fs.unlink(actualPath);
            const bankAccountImage = await handleBase64Images(bankAttachment, "bankAttachments");
            bankAttachmentUrl = `${req.protocol}://${req.get("host")}/uploads/bankAttachments/${bankAccountImage[0].fileName}`;
            // console.log(bankAttachmentUrl);
        }
        // if(Array.isArray(joiningFormAttachment)){
        //     const actualPath = absolutePath(joiningFormAttachmentUrl);
        //     await fs.unlink(actualPath);
        //     const joiningFormImage = await handleBase64Images(joiningFormAttachment, "joiningForms");
        //     joiningFormAttachmentUrl = `${req.protocol}://${req.get("host")}/uploads/joiningForms/${joiningFormImage[0].fileName}`;
        //     // console.log(joiningFormAttachmentUrl);
        // }
        if(Array.isArray(otherAttachment)){
            const actualPath = absolutePath(otherAttachmentUrl);
            await fs.unlink(actualPath);
            const otherAttachmentImage= await handleBase64Images(otherAttachment, "otherAttachments");
            otherAttachmentUrl = `${req.protocol}://${req.get("host")}/uploads/otherAttachments/${otherAttachmentImage[0].fileName}`;
            // console.log(otherAttachmentUrl);
        }

        const salary={
            ctc,
            inHand,
            employeeESI,
            employeePF,
            employerESI,
            employerPF,
        }

        // code that updates
        const isUpdated = await Employee.findByIdAndUpdate(employeeToUpdate._id,{
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
            joiningHR,
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
            workType,
            biometricPunchId,
            salary,
            aadharCardAttachment:aadharCardAttachmentUrl,
            panCardAttachment:panCardAttachmentUrl,
            bankAttachment:bankAttachmentUrl,
            // joiningFormAttachment:panCardAttachmentUrl,
            otherAttachment:otherAttachmentUrl,
            updated_By : employeeId
        },{new:true});

        if(isUpdated){
            return res.status(201).json({
                success:true,
                message : "Employee Successfully Updated!"
            });
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Employee Not Updated. DB network error."
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message : "Internal Server Error! Couldn't Update Employee.",
            error: error.message
        });
    }
}

const deleteEmployee = async(req,res)=>{
    try {
        // only to run from backend

        const {empId} = req.body;

        if(!empId){
            return res.status(400).json({
                success:false,
                message:"Employee ID is required"
            });
        }

        const isExist = await Employee.findById(empId);
        if(!isExist){
            return res.status(269).json({
                success:false,
                message:"The employee you are trying to delete does not exist in Database"
            });
        }

        const isDeleted = await Employee.findByIdAndDelete(empId);
        const deleteAttendance = await Attendance.deleteMany({employeeId:empId});
        if(isDeleted){
            return res.status(200).json({
                success:true,
                message:`Employee Deleted Successfully along with its ${deleteAttendance.deletedCount} attendance logs.`,
                data:isDeleted
            });
        }

        return res.status(400).json({
            success:false,
            message:"Could Not Delete Employee"
        });

    } catch (error) {
        return res
        .status(500)
        .json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        });
    }
}

module.exports = {
    addAdmin,
    registerEmployee,
    login,
    logout,   
    deactivateEmp,
    showAllEmployee,
    showSingleEmployee,
    showJoiningHR,
    updateEmployee,
    seeEmpBackend,
    deleteEmployee,
    addHR
};

