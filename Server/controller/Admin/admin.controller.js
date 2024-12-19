const Admin = require("../../models/Admin/admin.model");
const bcrypt = require("bcrypt");
const {createAccessToken, createRefreshToken} = require("../../utils/tokenGeneration");


const registerAdmin = async(req,res) =>{
    try {
        const {adminId,name,password}= req.body;
        
        // checking if all fields are provided or not.
        if(!adminId ||!name ||!password){
            return res.status(400).json({
                success : false,
                message: 'All fields are required.'
            });
        }

        const isAdminExist = await Admin.find({adminId:adminId});
        if(isAdminExist){
            res.status(400).json({
                success:false,
                message:"Admin already exists!"
            });
        }
        
        const hashedPassword = await bcrypt.hash(password,10);
        if(!hashedPassword){
            return res.status(401).json({
                success : false,
                message : "Something Went Wrong, Try Again Later !"
            })
        }

        const newAdmin = new Admin({
            adminId,
            name,
            password: hashedPassword
        });

        const adminRegistered = await newAdmin.save();
        if(!adminRegistered){
            return res.status(401).json({
                success:false,
                message : "Something went wrong, admin couldn't be registered. Try Again Later !"
            });
        }
        else{
            return res.status(200).json({
                success:true,
                message : "New Admin Registered Successfully!"
            });
        }

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal Server Error, Admin Not Registered!",
            error : error.message
        });
    }
}

const loginAdmin = async(req,res) =>{
    try {
        //checking if both id and password are given
        const {adminId, password}= req.body;
        if(!adminId || !password){
            return res.status(400).json({
                success:false,
                message : "All fields are required!"
            });
        }

        //checking if valid id is given
        const adminData = await Admin.find({adminId:adminId});
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
            adminId:adminData.adminId
        }
        const accessToken = createAccessToken(accessTokenData);
        const refreshToken = createRefreshToken(adminData.adminId);

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
                adminid : adminData.adminId,
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

module.exports={
    registerAdmin,
    loginAdmin
}
