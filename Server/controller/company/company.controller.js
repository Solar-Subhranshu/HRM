const Company = require("../../models/Company/company.model")

const addCompany = async (req,res)=>{
    try{
        const employeeId = req.employeeId;
        const {name} =req.body;
        if(!name){
            return res.status(400).json({
                success : false,
                message : "All fields are required!"
            });
        }

        const isExisting = await Company.findOne({name:name});
        if(isExisting){
            return res.status(400).json({
                success:false,
                message:"Company with same name already registered."
            })
        };

        const newCompany = new Company({
            name, 
           created_By : employeeId
        });

        const newCompanyAdded= await newCompany.save();

        if(newCompanyAdded){
            return res.status(201).json({
                success : true,
                message : "Company Added Successfully !",
                data : {
                    "company" : name,
                }
            });
        }
        else{
            return res.status(400).json({
                success : false,
                message : "Couldn't Add Company! Something is wrong please try again!",
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

const showCompany = async (req,res)=>{
    try{

        const allCompany=await Company.find().select("-created_By -updated_By -createdAt -updatedAt -__v");
        if(allCompany.length===0 || allCompany == null){
            return res.status(200).json({
                success : true,
                message : "No Company Found, Please Add Company First."
            });
        }
        else{
            return res.status(200).json({
                success:true,
                message:"All Company list.",
                data:allCompany
            })
        }

    }
    catch (error){
        return req.status(500).json({
            success: false,
            message : "Internal Server Error! Can't show you company.",
            error : error.message
        });
    }
}

const updateCompanyName= async (req,res)=>{
    try {
        const employeeId = req.employeeId;
        const {companyId,name} = req.body || req.query;
        
        if(!companyId){
            return res.status(400).json({
                success :false,
                message : "All fields are required! Please fill all feilds."
            });
        }

        const existingCompany=await Company.findById(companyId);

        if(!existingCompany){
            return res.status(400).json({
                success:false,
                message : `Company with id: ${companyId} Not Found.`
            });
        }

         // to check if changes are same as previously saved data
        const isUnchanged = (existingCompany.name===name);
                

        if(isUnchanged){
            return res.status(400).json({
                success:false,
                message : "No changes detected. The new data is same as the existing data.",
            });
        }

        const newCompany= await Company.findByIdAndUpdate(companyId,
            {name,
            updated_By : employeeId
            },
        {new :true, runValidators:true});
        if(newCompany){
            return res.status(200).json({
                success : true,
                message : "Company Name Updated Successfully !"
            })
        }
    } catch (error) {
        // if(error.code===11000){
        //     return res.status(400).json({
        //         success:false,
        //         message : "Update Failed! The given combination of Company Name, Branch, Address & Pin already exists."
        //     })
        // }
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Company Details could not be updated!",
            error : error.message
        });
    }
}

// const deleteCompany = async(req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }
// }

module.exports ={
    addCompany,
    showCompany,
    updateCompanyName
}