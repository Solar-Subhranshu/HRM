const Emp = require("../../models/Employee/employee.model");
const bcrypt = require("bcrypt");
const {createAccessToken, createRefreshToken} = require("../../utils/tokenGeneration");


const registerEmployee = async (req, res) => {
    try{
        const employeeId = req.employeeId;
        const {empId,empName, empPassword, empMob_No, empDept} = req.body;
        if(!empId || !empPassword || !empName || !empMob_No || !empDept){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const existingEmp = await Emp.findOne({empId: empId});
        if(existingEmp){
            return res.status(400).json({
                success: false,
                message: "EmpId already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(empPassword,10);
        const newEmployee = new Emp({
            empId,
            empName,
            empMob_No,
            empPassword: hashedPassword,
            empDept,
            createdBy: employeeId
        });

        await newEmployee.save();
        
        return res.status(200).json({
            success: true,
            message: "Employee Registered Successfully",
            data: {
                "empId":newEmployee.empId,
                "empName":newEmployee.empName,
                "empMob_No":newEmployee.empMob_No,
                "empDept": newEmployee.empDept
            }
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error. Couldn't Register Employee.",
            error: error.message
        });
    }
};

const login = async (req, res) => {
try{
    const {empId, password} = req.body;
    if(!empId || !password){
        return res.status(400).json({
            success : false,
            message : "All fields are required!"
        });
    }
    const empData = await Emp.findOne({empId:empId});
    if(!empData){
        return res.status(400).json({
            success : false,
            message : "Invalid creadentials"
        });
    }
    
    if(!empData.empIsActive){
        return res.status(400).json({
            success : false,
            message : "Your account is no longer active, and login is not permitted."
        });
    }
    
    const isMatch = await bcrypt.compare(password,empData.empPassword);
    if (!isMatch){
        return res.status(400).json({
            success : false,
            message : "Invalid credentials"
        });
    }
    const options = {
        withCredentials: true,
        httpOnly: true,
        secure: false
    };
    const accessTokenData ={
        id:empData._id,
        role:empData.empDept
    }
    const accessToken = createAccessToken(accessTokenData);
    const refreshToken = createRefreshToken(empId);
    const responseData = await Emp.findByIdAndUpdate(empData._id,{refreshToken:refreshToken},{new:true});
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json({
        success: true,
        message: "Login Successful",
        data: {
            empName: empData.empName,
            empDept: empData.empDept
        }
    });
}catch(error){
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message
    });
}
}




module.exports = {
    registerEmployee,
    login
};