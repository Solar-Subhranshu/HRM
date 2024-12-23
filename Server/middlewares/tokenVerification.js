const jwt = require("jsonwebtoken");
const tokenVerify = (req,res,next) =>{
    try {
        const authHeader = req.headers['authorization'] || req.cookies.accessToken;
        const token = authHeader && authHeader.split(' ')[1];
        if(!token){
            return res.status(401).json({
                success : false,
                message : "Access Denied, No Token Provided",
            });
        }
        const securityKey = process.env.SECRET_KEY;
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

module.exports = tokenVerify;