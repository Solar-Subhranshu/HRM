const jwt = require("jsonwebtoken");
securityKey = process.env.SECRET_KEY

const tokenVerify = (req,res,next) =>{
    const token= req.cookies.accessToken || req.header('Authorization')?.split('')[1];

    if(!token){
        return res.status(401).json({
            success : false,
            message : "Access Denied, No Token Provided",
        });
    }
    try {
        const decodedData = jwt.verify(token, securityKey);
        req.employeeId = decodedData?.data?.id;
        req.employeeRole = decodedData?.data?.role;
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            msg:'Invalid token!',
        })
    }
}

module.exports = {
    tokenVerify
};