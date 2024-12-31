const Branch = require("../../models/Company/branch.model");

const addBranch = async (req,res)=>{
    try{
        const employeeId = req.employeeId;
        const {companyID, name, address, pin} =req.body;
        if(!name ||!companyID ||!address){
            return res.status(400).json({
                success : false,
                message : "All fields are required!"
            });
        }

        const newBranch = new Branch({
            companyID,
            name,
            address,
            pin, 
            created_By : employeeId
        });

        const newBranchAdded= await newBranch.save();

        if(newBranchAdded){
            return res.status(201).json({
                success : true,
                message : "Branch Added Successfully !",
                data : {
                    "companyID":companyID,
                    "branch" : name,
                    "address" : address,
                    "pin":pin
                }
            });
        }
        else{
            return res.status(400).json({
                success : false,
                message : "Couldn't Add Branch! Something is wrong please try again!",
            });
        }

    }
    catch (error){
        if(error.code===11000){
            return res.status(400).json({
                success:false,
                message : "Duplicate entry detected. This company branch at the given address already exists.",
                error: error.message
            });
        }
        return res.status(400).json({
            success: false,
            message : "Internal Server Error! Couldn't add company.",
            error : error.message
        });
    }
}

const showBranch = async (req,res)=>{
    try{
        const {companyID}=req.query;

        if(!companyID){
            return res.status(400).json({
                success:false,
                message:"Field is required!"
            })
        }

        const allBranch = await Branch.find({companyID:companyID}).select("-created_By -updated_By -createdAt -updatedAt -__v");

        if(!allBranch){
            return res.status(400).json({
                success:false,
                message:"Invalid company ID"
            });
        }

        if(allBranch.length===0 || allBranch == null){
            return res.status(200).json({
                success : true,
                message : "No Branch Found, Please Add Branch First."
            });
        }
        else{
            return res.status(200).json({
                success:true,
                message:"All Branch list.",
                data:allBranch
            })
        }

    }
    catch (error){
        return res.status(500).json({
            success: false,
            message : "Internal Server Error! Can't show you Branch.",
            error : error.message
        });
    }
}

const showAllBranch = async (req,res)=>{
    try{
    
        const allBranch = await Branch.find()
        .populate({
            path:"companyID",
            select:"-created_By -updated_By -createdAt -updatedAt -__v"
        })
        .select("-created_By -updated_By -createdAt -updatedAt -__v");


        if(allBranch.length===0 || allBranch == null){
            return res.status(200).json({
                success : true,
                message : "No Details Found."
            });
        }
        else{
            return res.status(200).json({
                success:true,
                message:"All Details list.",
                data:allBranch
            })
        }

    }
    catch (error){
        return res.status(500).json({
            success: false,
            message : "Internal Server Error! Can't show you Branch.",
            error : error.message
        });
    }
}

const updateBranchDetails= async (req,res)=>{
    try {
        const employeeId = req.employeeId;
        const {branchId,name,address,pin} = req.body;
        
        if(!branchId){
            return res.status(400).json({
                success :false,
                message : "All fields are required! Please fill all feilds."
            });
        }

        const existingBranch=await Branch.findById(branchId);

        if(!existingBranch){
            return res.status(400).json({
                success:false,
                message : `Branch with id: ${branchId} Not Found.`
            });
        }

         // to check if changes are same as previously saved data
        const isUnchanged = (existingBranch.name===name)&&
                            (existingBranch.address===address)&&
                            (existingBranch.pin===pin);
                

        if(isUnchanged){
            return res.status(400).json({
                success:false,
                message : "No changes detected. The new data is same as the existing data.",
            });
        }

        const newBranch= await Branch.findByIdAndUpdate(branchId,
            {name,address,pin,
            updated_By : employeeId
            },
        {new :true, runValidators:true});
        if(newBranch){
            return res.status(200).json({
                success : true,
                message : "Branch Name Updated Successfully !"
            })
        }
    } catch (error) {
        if(error.code===11000){
            return res.status(400).json({
                success:false,
                message : "Update Failed! The given combination of Branch Name, Branch, Address & Pin already exists."
            })
        }
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Branch Details could not be updated!",
            error : error.message
        });
    }
}

module.exports={
    addBranch,
    showBranch,
    updateBranchDetails,
    showAllBranch
}
