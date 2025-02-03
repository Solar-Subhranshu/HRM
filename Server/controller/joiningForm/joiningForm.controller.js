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
                //Joining Details to be filled by Hr
            // interviewDate,
            // joiningDate, 
            // department,
            // designation,
            // employeeType,
            // modeOfRecruitment,
            // reference,
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
            signatureAttachment,
            class10Attachment,
            class12Attachment,
            graduationAttachment,
            postGraduationAttachment,
            // joiningFormAttachment
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
            // !employeeType ||
            // !modeOfRecruitment ||
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
            // !aadharCardAttachment ||
            // !panCardAttachment ||
            // !bankAttachment ||
            !photoAttachment ||
            !signatureAttachment
            // class10Attachment ||
            // class12Attachment ||
            // graduationAttachment ||
            // postGraduationAttachment ||
            // !joiningFormAttachment
        ){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            });
        }

        const isPhoneNumberExists = await JoiningForm.findOne({
            personalPhoneNum:personalPhoneNum,
            status: { $ne: "rejected" }
        }).lean();
        if(isPhoneNumberExists){
            return res.status(400).json({
                success:false,
                message:"Joining form already submitted with same Phone Num details. Contact your HR"
            });
        }
        
        const isAadharCardExists = await JoiningForm.findOne({
            aadharCard:aadharCard,
            status: { $ne: "rejected" }
        }).lean();
        if(isAadharCardExists){
            return res.status(400).json({
                success:false,
                message:"Joining form already submitted with same aadhar details. Contact your HR"
            });
        }

        const isPanCardExists = await JoiningForm.findOne({
            panCard:panCard,
            status: { $ne: "rejected" }
        });
        if(isPanCardExists){
            return res.status(400).json({
                success:false,
                message:"Joining form already submitted with same pan card detail. Contact your HR"
            });
        }

        const isBankAccountExists = await JoiningForm.findOne({
            bankAccount:bankAccount,
            status: { $ne: "rejected" }
        });
        if(isBankAccountExists){
            return res.status(400).json({
                success:false,
                message:"Joining form already submitted with same bank account detail. Contact your HR"
            });
        }

        //make sure if the base 64 value come in array or not?
        const aadharCardImage = aadharCardAttachment ? await handleBase64Images([aadharCardAttachment], "aadharCardAttachments") : [];
        const panCardImage = panCardAttachment ? await handleBase64Images([panCardAttachment], "panCardAttachments") : [];
        const bankAccountImage = bankAttachment ? await handleBase64Images([bankAttachment], "bankAttachments") : [];
        const photoImage = photoAttachment ? await handleBase64Images([photoAttachment], "photoAttachments") : [];
        const signatureImage = signatureAttachment ? await handleBase64Images([signatureAttachment], "signatureAttachment") : []; 

        const class10Image =class10Attachment? await handleBase64Images([class10Attachment],"class10Attachments") : [];
        const class12Image =class12Attachment? await handleBase64Images([class12Attachment],"class12Attachments") : [];
        const graduationImage = graduationAttachment? await handleBase64Images([graduationAttachment],"graduationAttachments") :[];
        const postGraduationImage = postGraduationAttachment? await handleBase64Images([postGraduationAttachment],"postGraduationAttachments"):[];
        // const joiningFormFile = joiningFormAttachment? await handleBase64Images([joiningFormAttachment],"joiningForms") : [];


        // attachment urls
        const aadharCardUrl = aadharCardImage.length>0 ? `${req.protocol}://${req.get("host")}/uploads/aadharCardAttachments/${aadharCardImage[0].fileName}` : null;
        const panCardUrl = panCardImage.length>0 ? `${req.protocol}://${req.get("host")}/uploads/panCardAttachments/${panCardImage[0].fileName}` : null;
        const bankAccountUrl = bankAccountImage.length>0 ? `${req.protocol}://${req.get("host")}/uploads/bankAttachments/${bankAccountImage[0].fileName}` : null;
        const photoUrl = photoImage.length>0 ? `${req.protocol}://${req.get("host")}/uploads/photoAttachments/${photoImage[0].fileName}` : null;
        const class10Url = class10Image.length>0 ? `${req.protocol}://${req.get("host")}/uploads/class10Attachments/${class10Image[0].fileName}` :null;
        const class12Url = class12Image.length>0 ? `${req.protocol}://${req.get("host")}/uploads/class12Attachments/${class12Image[0].fileName}`:null;
        const graduationUrl = graduationImage.length>0 ? `${req.protocol}://${req.get("host")}/uploads/graduationAttachments/${graduationImage[0].fileName}`:null;
        const postGraduationUrl = postGraduationImage.length>0 ? `${req.protocol}://${req.get("host")}/uploads/postGraduationAttachments/${postGraduationImage[0].fileName}`:null;
        // const joiningFormUrl =  `${req.protocol}://${req.get("host")}/uploads/joiningForms/${joiningFormFile[0].fileName}`;
        const signatureUrl = signatureImage.length>0 ? `${req.protocol}://${req.get("host")}/uploads/joiningForms/${signatureImage[0].fileName}`:null;

        let correctDateofBirth;
        if(!(dateOfBirth instanceof Date)){
            // console.log(dateOfBirth);
            correctDateofBirth = new Date(dateOfBirth);
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
            // interviewDate,
            // joiningDate,
            // department,
            // designation,
            // employeeType,
            // modeOfRecruitment,
            // reference,
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
            // joiningFormAttachment : joiningFormUrl,
            signatureAttachment : signatureUrl
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
                    message : "Something Went Wrong, Try Again Later",
                    error:error
                });
            }
        })
    } catch (error) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: "Please upload an image less than 2MB!",
                error: error.message
            });
            }

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Duplicate key error",
                error: error.message
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
            
            if(isFound && isFound.status==="Approved"){
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
            
            if(isFound && isFound.status==="Approved"){
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
            
            if(isFound && isFound.status==="Approved"){
                return res.status(200).json({
                    success:true,
                    message:"Record found",
                    data:isFound
                });
            }
        }
        return res.status(400).json({
            success: false,
            message : 'No record found. Maybe the joining form is not yet approved.',
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

const showAllJoiningForms = async(req,res)=> {
    try {
        const {status}=req.query;
        if(!status){
            return res.status(400).json({
                success:false,
                message:"Joining Form Status, is needed."
            });
        }
        const response = await JoiningForm.find({status})
        .lean().select("-createdAt -updatedAt -__v");

        if(response){
            return res.status(200).json({
                success:true,
                message :"Joining Forms till now",
                data: response || []
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error: error.message
        })
    }
}

const joiningFormApproval = async(req,res)=> {
    try {
        //take the remaining data from the HR and also the joining form pdf document.
        const {formId,
            interviewDate,
            joiningDate, 
            department,
            designation,
            employeeType,
            modeOfRecruitment,
            reference,
            joiningFormAttachment
        } = req.body;
        if(!formId){
            return res.status(400).json({
                success:false,
                message:"Joining Form Id is required."
            });
        }
        if(!department || !designation){
            return res.status(400).json({
                success:false,
                message:"Department and Designation is required, for Approval."
            });
        }

        const isApproved = await JoiningForm.findByIdAndUpdate({_id:formId},{
            interviewDate,
            joiningDate,
            department,
            designation,
            employeeType,
            modeOfRecruitment,
            reference,
            joiningFormAttachment,
            status:"Approved"
        },{new:true});
        
        if (isApproved){
            return res.status(200).json({
                success:true,
                message:"Joining Form Approved",
                data: isApproved
            });
        }
        else{
            throw new Error("Something went wrong while approving the Joining Form")
        }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        });
    }
}

const joiningFormRejection = async(req,res)=> {
    try {
        const {formId} = req.query;
        if(!formId){
            return res.status(400).json({
                success:false,
                message:"Form id is required"
            });
        }

        const currentStatus = (await JoiningForm.findById(formId))?.status ?? null;
        if(!currentStatus || currentStatus==="Approved"){
            return res
            .status(400)
            .json({
                success:false,
                message:"This Joining Form may already be approved, so it can't be rejected."
            });
        }

        const isRejected = await JoiningForm.findByIdAndUpdate({_id:formId},{
            status:"Rejected"
        },{new:true});

        if(isRejected){
            return res.status(200).json({
                success:true,
                message:"Joining Form Rejected.",
                data:isRejected
            });
        }
        else{ throw new Error("Something went wrong while rejecting the Joining Form.")}
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error: error.message
        });
    }
}

module.exports = {
    addJoiningForm,
    showJoiningFormData,
    showAllJoiningForms,
    joiningFormApproval,
    joiningFormRejection
}