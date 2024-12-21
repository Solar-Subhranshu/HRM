const Degree = require("../../models/auth/common/degree.model");

const showDegree = async (req,res) =>{
    try {
        const {qualificationId} = req.body;

        const result= await Degree.find({qualificationID:qualificationId});

        if(!result){
            return res.status(400).json({
                success : false,
                message : "Degree not found."
            });
        }

        if(result.length ===0 || result == null){
            return res.status(200).json({
                success : true,
                message :"Zero Degree Found For Current Qualification, Add Degree First."
            });
        }

        return res.status(201).json({
            success:true,
            message : "All Degree List For Given Qualification",
            data : result
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Can't show you the Qualifications.",
            error:error.message
        });
    }
}

const addDegree = async (req,res)=>{
    try {
    
        const employeeId = req.employeeId;
        const {qualificationID,degreeName } = req.body;
        
        if(!qualificationID || !degreeName){
            return res.status(400).json({
                success:false,
                message : "Fields can't be empty!"
            });
        }

        const isExisting = await Degree.findOne({qualificationID:qualificationID , name:degreeName});

        if(isExisting){
            return res.status(400).json({
                success:false,
                message:"Degree already exists for given Qualification"
            });
        }

        const newDegree = new Degree({
            qualificationID,
            name:degreeName,
            created_By:employeeId
        });

        const responseData = await newDegree.save();
        
        if(!responseData){
            return res.status(400).json({
                success:false,
                message:"Something went wrong! Try Again."
            });
        }

        return res.status(201).json({
            success:true,
            message:"Degree Added Successfully!",
            data : responseData
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Degree Not Added!",
            error:error.message
        });
    }

}

const deleteDegree = async (req,res)=>{
    try {
        const {degreeID} = req.body;

        const isDeleted = await Degree.findByIdAndDelete(degreeID);

        if(!isDeleted){
            return res.status(400).json({
                success:false,
                message:"Degree not deleted, Try Again!"
            })
        }

        return res.status(200).json({
            success:true,
            message : "Degree Deleted Successfully!"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Degree Not Deleted.",
            error:error.message
        });
    }
}

module.exports={
    showDegree,
    addDegree,
    deleteDegree
}