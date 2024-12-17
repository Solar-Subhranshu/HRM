const Company = require("../../models/Company/company.model")

const addCompany = async (req,res)=>{
    try{
        const employeeId = req.employeeId;
        const {name,branch, address, pin} =req.body;
        if(!name || !branch || !address || !pin){
            return res.status(400).json({
                success : false,
                message : "All fields are required!"
            });
        }

        const newCompany = new Company({
            name,branch, address, pin,
           created_By : employeeId
        });

        await newCompany.save().then((responseData,error) =>{
            if(responseData){
                return res.status(201).json({
                    success : true,
                    message : "Company Added Successfully !",
                    data : {
                        "compName" : compName,
                        "compBranch":compBranch,
                        "compAddress":compAddress,
                        "compPin":compPin
                    }
                });
            }
            if(error){
                return res.status(400).json({
                    success : false,
                    message : "Something is wrong please try again!",
                });
            }
        })
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

        const allCompany=await Company.find().select("-created_By, -updated_By");
        if(allCompany.length===0 || allCompany == null){
            return res.status(200).json({
                success : true,
                message : "No Company Found, Please Add Company First."
            });
        }
        else{
            return res.status(200).json({
                success:true,
                data:allCompany,
                message:"All Company list."
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

const updateCompanyDetails= async (req,res)=>{
    try {
        const employeeId = req.employeeId;
        const {companyId,name,branch,address,pin} = req.body || req.query;
        
        if(!companyId){
            return res.status(400).json({
                success :false,
                message : "All fields are required! Please fill all feilds."
            });
        }

        // console.log(companyId,companyName,companyBranch,companyAddress,companyPin);
        // to check if changes are same as previously saved data
        const existingCompany=await Company.findById(companyId);

        if(!existingCompany){
            return res.status(400).json({
                success:false,
                message : `Company with id: ${companyId} Not Found.`
            });
        }

        // const isUnchanged = (existingCompany.companyName===companyName)&&
        //             (existingCompany.companyBranch===companyBranch)&&
        //             (existingCompany.companyAddress===companyAddress)&&
        //             (existingCompany.companyPin===companyPin);

        // if(isUnchanged){
        //     return res.status(400).json({
        //         success:false,
        //         message : "No changes detected. The new data is same as the existing data.",
        //     });
        // }

        const newCompany= await Company.findByIdAndUpdate(companyId,
            {name,branch,address,pin,
                updated_By : employeeId
            },
        {new :true, runValidators:true});
        if(newCompany){
            return res.status(200).json({
                success : true,
                message : "Company updated Successfully !"
            })
        }
    } catch (error) {
        if(error.code===11000){
            return res.status(400).json({
                success:false,
                message : "Update Failed! The given combination of Company Name, Branch, Address & Pin already exists."
            })
        }
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Company Details could not be updated!",
            error : error.message
        });
    }
}

module.exports ={
    addCompany,
    showCompany,
    updateCompanyDetails
}