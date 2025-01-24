const handleBase64Images = require("../../middlewares/base64ImageHandler");
const JoiningForm = require("../../models/joiningForm/joiningForm.model");


const addJoiningForm = async(req, res) =>{
    try {
        const {
            companyId,
            name,
            father_husbandName,
            dateOfBirth,
            gender,
            maritalStatus,
            bloodGroup,
            personalPhoneNum,
            personalEmail,
            currentAddress,
            currentState,
            currentCity,
            currentPinCode,
            permanentAddress,
            permanentState,
            permanentCity,
            permanentPinCode,
            interviewDate,
            joiningDate,
            department,
            designation,
            employeeType,
            modeOfRecruitment,
            reference,
            bankName,
            branchName,
            bankAccount,
            bankIFSC,
            bankAccountHolderName,
            bankAddress,
            panCard,
            aadharCard,
            uanNumber,
            emergencyContact,
            aadharCardAttachment,
            panCardAttachment,
            bankAttachment,
            photoAttachment,
            class10Attachment,
            class12Attachment,
            graduationAttachment,
            postGraduationAttachment,
            joiningFormAttachment
        }=req.body;

        if(!companyId ||
            !name ||
            !father_husbandName ||
            !dateOfBirth ||
            !gender ||
            !maritalStatus ||
            // bloodGroup ||
            !personalPhoneNum ||
            !personalEmail ||
            !currentAddress ||
            !currentState ||
            !currentCity ||
            !currentPinCode ||
            !permanentAddress ||
            !permanentState ||
            !permanentCity ||
            !permanentPinCode ||
            // interviewDate ||
            // joiningDate ||
            // department ||
            // designation ||
            !employeeType ||
            !modeOfRecruitment ||
            // reference ||
            !bankName ||
            !branchName ||
            !bankAccount ||
            !bankIFSC ||
            !bankAccountHolderName ||
            !bankAddress ||
            !panCard ||
            !aadharCard ||
            // uanNumber ||
            !emergencyContact ||
            !aadharCardAttachment ||
            !panCardAttachment ||
            !bankAttachment ||
            !photoAttachment||
            // class10Attachment ||
            // class12Attachment ||
            // graduationAttachment ||
            // postGraduationAttachment ||
            !joiningFormAttachment
        ){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            });
        }

        const isPhoneNumberExists = await JoiningForm.findOne({personalPhoneNum:personalPhoneNum}).lean();
        if(isPhoneNumberExists){
            return res.status(400).json({
                success:false,
                message:"Joining form already submitted with same Phone Num details."
            });
        }
        
        const isAadharCardExists = await JoiningForm.findOne({aadharCard:aadharCard}).lean();
        if(isAadharCardExists){
            return res.status(400).json({
                success:false,
                message:"Joining form already submitted with same aadhar details."
            });
        }

        const isPanCardExists = await JoiningForm.findOne({panCard:panCard});
        if(isPanCardExists){
            return res.status(400).json({
                success:false,
                message:"Joining form already submitted with same pan card detail."
            });
        }

        //make sure if the base 64 value come in array or not?
        const aadharCardImage = aadharCardAttachment ? await handleBase64Images([aadharCardAttachment], "aadharCardAttachments") : [];
        const panCardImage = panCardAttachment ? await handleBase64Images([panCardAttachment], "panCardAttachments") : [];
        const bankAccountImage = bankAttachment ? await handleBase64Images([bankAttachment], "bankAttachments") : [];
        const photoImage = photoAttachment ? await handleBase64Images([photoAttachment], "photoAttachments") : [];

        const class10Image =class10Attachment? await handleBase64Images([class10Attachment],"class10Attachments") : [];
        const class12Image =class12Attachment? await handleBase64Images([class12Attachment],"class12Attachments") : [];
        const graduationImage = graduationAttachment? await handleBase64Images([graduationAttachment],"graduationAttachments") :[];
        const postGraduationImage = postGraduationAttachment? await handleBase64Images([postGraduationAttachment],"postGraduationAttachments"):[];
        const joiningFormFile = joiningFormAttachment? await handleBase64Images([joiningFormAttachment],"joiningForms") : [];


        // attachment urls
        const aadharCardUrl = `${req.protocol}://${req.get("host")}/uploads/aadharCardAttachments/${aadharCardImage[0].fileName}`;
        const panCardUrl = `${req.protocol}://${req.get("host")}/uploads/panCardAttachments/${panCardImage[0].fileName}`;
        const bankAccountUrl = `${req.protocol}://${req.get("host")}/uploads/bankAttachments/${bankAccountImage[0].fileName}`;
        const photoUrl = `${req.protocol}://${req.get("host")}/uploads/photoAttachments/${photoImage[0].fileName}`;
        const class10Url = `${req.protocol}://${req.get("host")}/uploads/class10Attachments/${class10Image[0].fileName}`;
        const class12Url = `${req.protocol}://${req.get("host")}/uploads/class12Attachments/${class12Image[0].fileName}`;
        const graduationUrl = `${req.protocol}://${req.get("host")}/uploads/graduationAttachments/${graduationImage[0].fileName}`;
        const postGraduationUrl = `${req.protocol}://${req.get("host")}/uploads/postGraduationAttachments/${postGraduationImage[0].fileName}`;
        const joiningFormUrl =  `${req.protocol}://${req.get("host")}/uploads/joiningForms/${joiningFormFile[0].fileName}`;

        if(!(dateOfBirth instanceof Date)){
            // console.log(dateOfBirth);
            var correctDateofBirth = new Date(dateOfBirth);
            // console.log(correctDateofBirth);
        }

        const newJoiningForm = new JoiningForm({
            companyId,
            name,
            father_husbandName,
            dateOfBirth:correctDateofBirth,
            gender,
            maritalStatus,
            bloodGroup,
            personalPhoneNum,
            personalEmail,
            currentAddress,
            currentState,
            currentCity,
            currentPinCode,
            permanentAddress,
            permanentState,
            permanentCity,
            permanentPinCode,
            interviewDate,
            joiningDate,
            department,
            designation,
            employeeType,
            modeOfRecruitment,
            reference,
            bankName,
            branchName,
            bankAccount,
            bankIFSC,
            bankAccountHolderName,
            bankAddress,
            panCard,
            aadharCard,
            uanNumber,
            emergencyContact,
            aadharCardAttachment:aadharCardUrl,
            panCardAttachment:panCardUrl,
            bankAttachment:bankAccountUrl,
            photoAttachment:photoUrl,
            class10Attachment:class10Url,
            class12Attachment:class12Url,
            graduationAttachment:graduationUrl,
            postGraduationAttachment:postGraduationUrl,
            joiningFormAttachment : joiningFormUrl
        })

        await newJoiningForm.save()
        .then((response,error)=>{
            if(response){
                return res.status(200).json({
                    success:true,
                    message:"Joining Form Submitted Successfully."
                })
            }
            if(error){
                return res.status(401).json({
                    success:false,
                    message : "Something Went Wrong, Employee Not Registered.",
                    error:error
                });
            }
        })
    } catch (error) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: "Please upload an image less than 5 MB!",
            });
            }

        return res.status(500).json({
            success:false,
            message : "Internal Server Error",
            error: error.message
        });

    }
}

const showJoiningFormData = async(req,res)=> { 
    try {
        const {phoneNumber,aadharCard,panCard} = req.body;

        if(!phoneNumber && !aadharCard && !panCard){
            return res.status(400).json({
                success:false,
                message:"You need to give atleast one field"
            });
        }

        if(phoneNumber){
            const isFound = await JoiningForm.findOne({personalPhoneNum:phoneNumber})
            .lean().select("-createdAt -updatedAt -__v");
            
            if(isFound){
                return res.status(200).json({
                    success:true,
                    message:"Record found",
                    data:isFound
                });
            }
        }

        if(aadharCard){
            const isFound = await JoiningForm.findOne({aadharCard:aadharCard})
            .lean().select("-createdAt -updatedAt -__v");
            
            if(isFound){
                return res.status(200).json({
                    success:true,
                    message:"Record found",
                    data:isFound
                });
            }
        }

        if(panCard){
            const isFound = await JoiningForm.findOne({panCard:panCard})
            .lean().select("-createdAt -updatedAt -__v");
            
            if(isFound){
                return res.status(200).json({
                    success:true,
                    message:"Record found",
                    data:isFound
                });
            }
        }

        return res.status(400).json({
            success: false,
            message : 'No record found',
            data :[]
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message : 'Internal Server Error',
            error:error.message
        });
    }
}

module.exports = {
    addJoiningForm,
    showJoiningFormData
}