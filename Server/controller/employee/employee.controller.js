const Employee = require("../../models/auth/employee.model");
const bcrypt = require("bcrypt");
const {createAccessToken, createRefreshToken} = require("../../utils/tokenGeneration");
const {generateRandomNumbers} = require("../../utils/randomNumGenerator");

// const registerEmployee = async (req, res) => {
//     try{
//         // const employeeId = req.employeeId;
//         const {empId,name, password, mobile_No, department} = req.body;
//         if(!empId || !password || !name || !mobile_No || !department){
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required"
//             });
//         }
//         const existingEmp = await Employee.findOne({empId: empId});
//         if(existingEmp){
//             return res.status(400).json({
//                 success: false,
//                 message: "EmpId already exists"
//             });
//         }
//         const hashedPassword = await bcrypt.hash(password,10);
//         const newEmployee = new Employee({
//             empId,
//             name, 
//             mobile_No, 
//             department,
//             password: hashedPassword,
//             created_By: employeeId
//         });

//         await newEmployee.save().then((responseData, error) =>{
//             if(responseData){
//                 return res.status(201).json({
//                     success: true,
//                     message: "Employee Registered Successfully",
//                     data: {
//                         "empId":newEmployee.empId,
//                         "empName":newEmployee.name,
//                         "empMob_No":newEmployee.mobile_No,
//                         "empDept": newEmployee.department
//                     }
//                 });
//             }
//             if(error){
//                 return res.status(400).json({
//                     success:false,
//                     message:"Somthing is wrong please try again."
//                 })
//             }
//         });
        
//     }catch(error){
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error. Couldn't Register Employee.",
//             error: error.message
//         });
//     }
// };


const registerEmployee = async(req,res)=>{
    try {
        const{employeeCode,name,father_husbandName,company,department,designation,joiningDate} = req.body;
        
        const{password,dateOfBirth,personalPhoneNum,personalEmail,companyPhoneNum,
            companyEmail,permanentAddress,qualification,panCard,aadharCard,
            bankName,bankAccount,bankIFSC,reportingManager,lastAppraisalDate,
            isActive,regisnationDate,aadharCardAttachment,panCardAttachment,
            bankAttachment,joiningFormAttachment,attachment5
        }=req.body;

        //checking necessary input fields
        if(!employeeCode ||!name ||!father_husbandName||!company||!department||!designation||!joiningDate){
            return res.status(400).json({
                success:false,
                message : "All Fields Are Required!"
            });
        }

        const isEmployeeExists = await Employee.findOne({employeeCode:employeeCode});
        
        if(isEmployeeExists){
            return res.status(400).json({
                success:false,
                message:"Registration Failed! Employee Already Exists!"
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
            employeeCode,name,father_husbandName,company,department,designation,joiningDate,
            password:hashedPassword,
            dateOfBirth,personalPhoneNum,personalEmail,companyPhoneNum,
            companyEmail,permanentAddress,qualification,panCard,aadharCard,
            bankName,bankAccount,bankIFSC,reportingManager,lastAppraisalDate,
            isActive,regisnationDate,aadharCardAttachment,panCardAttachment,
            bankAttachment,joiningFormAttachment,attachment5
        });

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

// const login = async (req, res) => {
// try{
//     const {employeeCode, password} = req.body;
//     if(!employeeCode || !password){
//         return res.status(400).json({
//             success : false,
//             message : "All fields are required!"
//         });
//     }
//     const empData = await Employee.findOne({employeeCode:employeeCode});
//     if(!empData){
//         return res.status(400).json({
//             success : false,
//             message : "Invalid creadentials"
//         });
//     }
    
//     if(!empData.isActive){
//         return res.status(400).json({
//             success : false,
//             message : "Your account is no longer active, and login is not permitted."
//         });
//     }
    
//     const isMatch = await bcrypt.compare(password,empData.password);
//     if (!isMatch){
//         return res.status(400).json({
//             success : false,
//             message : "Invalid credentials"
//         });
//     }
//     const options = {
//         withCredentials: true,
//         httpOnly: true,
//         secure: false
//     };
//     const accessTokenData ={
//         id:empData._id,
//         role:empData.department
//     }
//     const accessToken = createAccessToken(accessTokenData);
//     const refreshToken = createRefreshToken(employeeCode);
//     await Employee.findByIdAndUpdate(empData._id,{refreshToken:refreshToken},{new:true});
//     return res.status(200)
//     .cookie("accessToken", accessToken, options)
//     .cookie("refreshToken", refreshToken, options)
//     .json({
//         success: true,
//         message: "Login Successful",
//         data: {
//             empName: empData.name,
//             empDept: empData.department
//         }
//     });
// }catch(error){
//     return res.status(500).json({
//         success: false,
//         message: "Internal Server Error",
//         error: error.message
//     });
// }
// }

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
        const adminData = await Admin.find({employeeCode:employeeCode});
        if(!adminData){
            return res.status(401).json({
                success : false,
                message : "Invalid creadentials! Wrong ID."
            });
        }

        //checking if valid password is given
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

        const setRefreshToken = await Admin.findByIdAndUpdate(adminData._id,{refreshToken:refreshToken},{new:true});
        if(!setRefreshToken){
            return res.status(401).json({
                success:false,
                message: "Login Failed! Please Try Again"
            });
        }

        return res.status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToke",refreshToken,options)
        .json({
            success:true,
            message:"Login Successful",
            data : {
                adminCode : adminData.employeeCode,
                name : adminData.name
            }
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error : error.message
        });
    }
}


const deactivateEmp = async (req,res)=>{
    try{
        const employeeId = req.employeeId;
        const {empId} = req.body || req.query || req.params;
        // console.log(empId);

        if(!empId){
            return res.status(400).json({
                success:false,
                message : "Employee ID is required"
            });
        }

        const deactiveEmp = await Employee.findOneAndUpdate(
            {empId : empId},
            {isActive : false,
                updated_By : employeeId},
            {new : true}  
        );

        if(!deactiveEmp){
            return res.status(400).json({
                success:false,
                message : `Employee with empId: ${empId} Not Found.`
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

const showAllEmployee= async (req,res) =>{
    try{
        const allEmp= await Employee.find();
        if(allEmp===0){
            return res.status(200).json({
                success:true,
                message : "No Employee Found, Please Register Employee First"
            });
        }
        else{
            const empData = allEmp.map(emp=> ({
                id: emp.empId,
                name : emp.name,
                mobNo : emp.mobile_NoNo,
                empIsActive: emp.isActive
            }));
            return res.status(200).json({
                success: true,
                message: {
                    empData
                }
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

module.exports = {
    registerEmployee,
    login,    
    deactivateEmp,
    showAllEmployee
};