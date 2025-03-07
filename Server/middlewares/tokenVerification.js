const jwt = require("jsonwebtoken");
const tokenVerify = (roles=[]) =>{
    
    return (req,res,next)=>{
        try {
            const authHeader = req.headers['authorization'] || req.cookies.accessToken;
            const token = authHeader && authHeader.split(' ')[1];
            // console.log(token)
    
            if(!token){
                return res.status(401).json({
                    success : false,
                    message : "Access Denied, No Token Provided",
                });
            }
            const securityKey = process.env.SECRET_KEY;
            const decodedData = jwt.verify(token, securityKey);
            req.employeeId = decodedData?.data?.id;
            req.employeeCode = decodedData?.data?.employeeCode;
            req.employeeRole = decodedData?.data?.role;

            const userRole= decodedData?.data?.role;

            // if(!Array.isArray(roles)){
            //     return res.status(403).json({
            //         success:false,
            //         message:"The Route you want to access does not have a defined role, contact your backend dev."
            //     });
            // }

            // Check if user has required role
            if (roles.length && !roles.includes(userRole)) {
                return res.status(403).json({ 
                    success: false, 
                    message: "Access denied. Insufficient permissions." 
                });
            }

            next();
        } catch (error) {
            return res.status(401).json({
                success:false,
                msg:'Invalid token!',
            })
        }
    }

}

module.exports = tokenVerify;