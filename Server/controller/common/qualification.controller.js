const Qualification = require("../../models/auth/common/qualification.model");

// in case if we have to delete any Qualification then we have to delete underlaying degree.
const Degree = require("../../models/auth/common/degree.model");

const showAllQualification = async(req,res) => {
    try {
        // show all qualification .
        const allQualifications= await Qualification.find();

        if (allQualifications.length===0 || allQualifications==null){
            return res.status(200).json({
                success : true,
                message : "No Qualification Found, Please Add Qualification First."
            });
        }
        else{
            const qualificationNames =allQualifications.map(qualification => ({
                id: qualification._id,
                names : qualification.name
            }));
            return res.status(200).json({
                success : true,
                message :"Qualification List.",
                data : qualificationNames
        });
        }
    }
    catch(error) {

    return res.status(500).json({
        success :false,
        message: "Internal Server Error! Couldn't show Qualification. ",
        error: error.message
    });        
    }
};

const addQualification = async (req,res) => {
    try{
        const employeeId = req.employeeId;
        
        const {qualificationName} = req.body || req.query;
        // console.log(qualificationName);
        // const employeeId = req.employeeId;
       
        if(!qualificationName){
            return res.status(400).json({
                success : false,
                message : "Field can't be empty"
            });
        }

        const qualificationNameExists = await Qualification.findOne({name :qualificationName});
        if(qualificationNameExists){
            return res.status(400).json({
                success : false,
                message : "Qualification Already Exists"
            });
        }

        const newqualificationName = new Qualification({
            name : qualificationName,
            created_By : employeeId
        })
        const responseData = await newqualificationName.save();
        if(responseData){
            return res.status(201).json({
                success:true,
                message:"Qualification Inserted Successfully."
            })
        }
        return res.status(400).json({
            success:false,
            message:"Something is Wrong."
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message : "Internal Server Error! Couldn't Add Qualification",
            error : error.message
        })
    }
};

const updateQualification = async (req,res) => {
    try{
    const employeeId = req.employeeId;

    const {qualificationId,qualificationName} = req.body || req.query;
    // console.log(deptId,deptName);
  
    if(!qualificationId){
        return res.status(400).json({
            success : false,
            message : "Department doesn't exist"
        });
    }

    const qualificationExists = await Qualification.findOne({department :qualificationName});
    if(qualificationExists){
        return res.status(400).json({
            success : false,
            message : "Department Already Exists"
        });
    }

    const updatedQualification = await Qualification.findByIdAndUpdate(qualificationId,
        {name :qualificationName},
        {updated_By : employeeId},
        {new: true}
    );

    if(!updatedQualification){
        return res.status(400).json({
            success: false,
            message : "Qualification Updation Failed!, Try after few seconds!"
        });
    }

    return res.status(200).json({
        success : true,
        message : "Qualification Updation Successful !"
    });
}
catch(error){
    return res.status(500).json({
        success:false,
        message:"Internal Server Error, Couldn't update qualification.",
        error : error.message
    })
}

}

const deleteQualification = async (req,res)=>{
    try {
        const {qualificationId} = req.body;

        let flag=false;
        
        await Qualification.findByIdAndDelete(qualificationId)
        .then((response,error)=>{
            if(response){
             flag=true   
            }
            if(error){
                return res.status(400).json({
                    success:true,
                    message: "Qualification Not Deleted."
                });
            }
        });

        if(flag){
            const relatedDegree = await Degree.deleteMany({qualificationID:qualificationId});

            return res.status(200).json({
                success:true,
                message:`Qualification deleted successfully along with ${relatedDegree.deletedCount} related Degree.`
            });
        }

        // return res.status(200).json({
        //     success:true,
        //     message: "Qualification Deleted Successfully."
        // });
        

    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Internal Server Error! Qualification Not Deleted !."
        });
    }
}

module.exports= {
    showAllQualification,
    addQualification,
    updateQualification,
    deleteQualification,
}