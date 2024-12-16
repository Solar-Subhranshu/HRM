const Company = require("../../models/Company/company.model")

const addCompany = async (req,res)=>{
    try{
        const employeeId = req.employeeId;
        const {compName,compBranch, compAddress, compPin} =req.body;
        if(!compName || !compBranch || !compAddress || !compPin){
            return res.status(400).json({
                success : false,
                message : "All fields are required!"
            });
        }

        const newCompany = new Company({
           companyName: compName,
           companyBranch: compBranch,
           companyAddress: compAddress,
           companyPin : compPin,
           createdBy : employeeId
        });

        await newCompany.save();
        
        return res.status(200).json({
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
    catch (error){
        if(error.code===11000){
            return res.status(400).json({
                success:false,
                message : "Duplicate entry detected. This company branch at the given address already exists.",
                error: error.message
            });
        }
        return res.status(500).json({
            success: false,
            message : "Internal Server Error! Couldn't add company.",
            error : error.message
        });
    }
}

const showCompany = async (req,res)=>{
    try{

        const allCompany=await Company.find();
        if(allCompany.length===0){
            return res.status(200).json({
                success : true,
                message : "No Company Found, Please Add Company First."
            });
        }
        else{
            console.log(allCompany);
            const companyData = allCompany.map(comp =>({
                compName : comp.companyName,
                compBranch : comp.companyBranch,
                compAddress: comp.companyAddress,
                compPin: comp.companyPin
            }));
            return res.status(200).json({
                success:true,
                message: {
                    companyData
                }
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

module.exports ={
    addCompany,
    showCompany
}