const Designation=require("../../models/auth/common/designation.model");

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
        const {departmentId} = req.query;
        console.log(departmentId)
        const allDesignation = await Designation.find({ department: departmentId});

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
}

const updateDesignation =async (req,res)=>{
    try {
        const {department,designation,newDesignation}=req.body || req.query;

        if(!department || !designation || !newDesignation){
            return res.status(400).json({
                success:false,
                message : "All Fields Required!"
            });
        }

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
            message:'Internal Server Error.'
        })
        
    }
}

module.exports={
  addDesignation,
  showDesignation,
  updateDesignation   
}
