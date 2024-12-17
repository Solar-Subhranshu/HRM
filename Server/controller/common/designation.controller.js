const Designation=require("../../models/auth/common/designation.model");

const addDesignation = async(req,res)=>{
    try{
        const {designation}=req.body || req.query;
        const employeeId = req.employeeId;
        
        if(!designation){
            return res.status(400).json({
                success:false,
                message : "Field can't be Empty."
            });
        }

        const existingDesignation  =await Designation.findOne({designation:designation});
        if(existingDesignation){
            return res.status(400).json({
                success :false,
                message : "Designation Already Exists!"
            });
        }

        const newDesignation = new Designation({
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
        const allDesignation = await Designation.find();

        if(allDesignation.length===0 || allDesignation==null){
            return res.status(200).json({
                success :true,
                message:"No Designation Found! please add designation first."
            });
        }

        else{
            const designationNames= allDesignation.map(desig=> ({
                id:desig._id,
                empDesignation : desig.designation
            }));
            return res.status(200).json({
                success : true,
                message:{
                    designationNames
                }
            });
        }

    } catch (error) {
        
        return res.status(500).json({
            success :false,
            message:"Internal Server Error! Couldn't show designation.",
            error : error.message
        });

    }
}


module.exports={
  addDesignation,
  showDesignation   
}
