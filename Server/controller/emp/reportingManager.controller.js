const ReportingManager = require("../../models/auth/reportingManager.model");

const addReportingManager = async(req,res)=>{
    try {
        const employeeId = req.employeeId;
        const {name} = req.body;
        if(!name){
            return res.status(400).json({
                success:false,
                message:"Name is required!",
            });
        }
        const newReportingManager = new ReportingManager({
            name,
            created_By:employeeId
        });

        const isSaved = await newReportingManager.save();
        if(isSaved){
            return res.status(200).json({
                success:true,
                message:"New Reporting Manager Added Successfully",
                data:isSaved
            });
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Reporting Manager Not Saved. Try Again Later",
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error!",
            error:error.message
        });
    }
}

const updateReportingManager = async(req,res)=>{
    try {
        const employeeId = req.employeeId;
        const {managerId,name}= req.body;

        if(!managerId || !name){
            return res.status(400).json({
                success:false,
                message:"Manager ID and new name is required for update.",
            })
        }

        const isUpdated = await ReportingManager.findByIdAndUpdate(managerId,{
            name:name,
            updated_By:employeeId
        },{new:true});

        if(isUpdated){
            return res.status(200).json({
                success:true,
                message:"Reporting Manager name has been updated successfully.",
                data:isUpdated
            });
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Failed to update Reporting Manager."
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        });
    }
}

const showReportingManager = async(req,res)=>{
    try {
        const allReportingManagers = await ReportingManager.find().lean().select("name");

        if(allReportingManagers){
            if(allReportingManagers.length===0){
                return res.status(200).json({
                    success:true,
                    message:"There are no Reporting Managers to show.",
                    data:[]
                }); 
            }

            return res.status(200).json({
                success:true,
                message:"List of all reporting managers",
                data:allReportingManagers
            });
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Could not fetch data.",
                data:[]
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        });
    }
}


//to be used only by backend
const deleteReportingManager = async(req,res)=>{
    try {
        const {managerId} = req.body;
        if(!managerId){
            return res.status(400).json({
                success:false,
                message:"Manager id is not provided."
            });
        }

        
    } catch (error) {
        
    }
}

module.exports={
    addReportingManager,
    updateReportingManager,
    showReportingManager
}