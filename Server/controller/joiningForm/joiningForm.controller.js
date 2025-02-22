const PDFDocument = require("pdfkit");
const axios = require("axios");
const moment = require("moment");

const handleBase64Images = require("../../middlewares/base64ImageHandler");
const JoiningForm = require("../../models/joiningForm/joiningForm.model");


const addJoiningForm = async(req, res) =>{
    try {
        const {
            // companyId,
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
            joiningHR,
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
        console.log(req.body);
        if(
            // !companyId ||
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
            // !joiningHR ||
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
            // !joiningFormAttachmentl
        ){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            });
        }
        console.log("add field work");
        const isPhoneNumberExists = await JoiningForm.findOne({
            personalPhoneNum:personalPhoneNum,
            status: { $ne: "rejected" }
        }).lean();
        console.log("isPhoneNumberExist")
        if(isPhoneNumberExists){
            console.log("Phone Already Exists");
            return res.status(400).json({
                success:false,
                message:"Joining form already submitted with same Phone Num details. Contact your HR"
            });
        }
        console.log("check adhar card")
        const isAadharCardExists = await JoiningForm.findOne({
            aadharCard:aadharCard,
            status: { $ne: "rejected" }
        }).lean();
        console.log("isAadharCardExists", isAadharCardExists)
        if(isAadharCardExists){
            console.log("Aadhar Already Exists");
            return res.status(400).json({
                success:false,
                message:"Joining form already submitted with same aadhar details. Contact your HR"
            });
        }
        console.log("is pen exist")
        const isPanCardExists = await JoiningForm.findOne({
            panCard:panCard,
            status: { $ne: "rejected" }
        });
        if(isPanCardExists){
            console.log("Pancard Already Exists");
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
            console.log("Account Already Exists");
            return res.status(400).json({
                success:false,
                message:"Joining form already submitted with same bank account detail. Contact your HR"
            });
        }
        console.log("bank exists")
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
        const signatureUrl = signatureImage.length>0 ? `${req.protocol}://${req.get("host")}/uploads/signatureAttachment/${signatureImage[0].fileName}`:null;

        let correctDateofBirth;
        if(!(dateOfBirth instanceof Date)){
            // console.log(dateOfBirth);
            correctDateofBirth = new Date(dateOfBirth);
            // console.log(correctDateofBirth);
        }
        console.log("Photo uploaded")
        const newJoiningForm = new JoiningForm({
            // companyId,
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
            joiningHR,
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
        console.log("save form")
        await newJoiningForm.save()
        .then((response,error)=>{
            if(response){
                console.log("reponse", response);
                return res.status(200).json({
                    success:true,
                    message:"Joining Form Submitted Successfully.",
                    data:newJoiningForm
                })
            }
            if(error){
                console.log("AddJoiningForm", error )
                return res.status(401).json({
                    success:false,
                    message : "Something Went Wrong, Try Again Later",
                    error:error
                });
            }
        })
    } catch (error) {
        console.log("join")
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
        .populate({
            path:"department",
            select:"department"
        })
        .populate({
            path:"designation",
            select:"designation"
        })
        .populate({
            path:"joiningHR",
            select:"name"
        })
        .populate({
            path:"companyId",
            select:"name"
        })
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
        const employeeId = req.employeeId;

        //take the remaining data from the HR and also the joining form pdf document.
        const {formId,
            companyId,
            department,
            designation,
            joiningHR,
            interviewDate,
            joiningDate, 
            employeeType,
            modeOfRecruitment,
            reference,
            officialContact,
            officialEmail,
            ctc,
            inHand,
            employeeESI,
            employeePF,
            employerESI,
            employerPF,
        } = req.body;
        if(!formId){
            return res.status(400).json({
                success:false,
                message:"Joining Form Id is required."
            });
        }
        if(!companyId || !department || !designation){
            return res.status(400).json({
                success:false,
                message:"Comnpany, Department and Designation is required, for Approval."
            });
        }

        let salary={
            ctc,
            inHand,
            employeeESI,
            employeePF,
            employerESI,
            employerPF
        }

        const isApproved = await JoiningForm.findByIdAndUpdate({_id:formId},{
            interviewDate,
            joiningDate,
            joiningHR,
            companyId,
            department,
            designation,
            employeeType,
            modeOfRecruitment,
            reference,
            officialContact,
            officialEmail,
            status:"Approved",
            salary,
            approved_By:employeeId,
            updated_By:employeeId
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

// to be used only and only for testing purpose
// -DEVELOPER
const setJoiningFormStatusToPending = async(req,res)=>{
    try {
        const {formId} = req.query;
        if(!formId){
            return res.status(400).json({
                success:false,
                message:"Form id is required"
            });
        }

        const setPending = await JoiningForm.findByIdAndUpdate({_id:formId},{
            status:"Pending"
        },{new:true});

        if(setPending){
            return res.status(200).json({
                success:true,
                message:"Joining Form is Set to Pending.",
                data:setPending
            });
        }
        else{ throw new Error("Something went wrong while setting the status pending the Joining Form.")}
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error: error.message
        });
    }
}

//only for backend
const deleteJoiningForm = async(req,res)=> {
    try {
        const {formId} = req.body;

        if(!formId){
            return res.status(400).json({
                success:false,
                message:"Form Id is required."
            });
        }

        const isExist = await JoiningForm.findById(formId);
        if(!isExist){
            return res.status(269).json({
                success:false,
                message:"The Joining Form you are trying to delete doesn't exist in Database."
            });
        }

        const isDeleted = await JoiningForm.findByIdAndDelete(formId);
        if(isDeleted){
            return res.status(200).json({
                success:true,
                message:"Joining Form Deleted Successfully.",
                data: isDeleted
            });
        }

        return res.status(400).json({
            success:false,
            message:"Could not delete Joining Form"
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        });
    }
}

const updateJoiningForm = async(req,res)=> {
    try {
        const employeeId = req.employeeId;
        // const {} =req.body;
    } catch (error) {
        
    }
}

const generateJoiningFormPDF = async (req, res) => {
    try {
        const {formId} =req.query;
        if(!formId){
            return res.status(400).json({
                success:false,
                message:"Form Id not Found, formId is required."
            });
        }
        const data = await JoiningForm.findById(formId).lean();

        if(data.status!="Approved"){
            return res.status(400).json({
                success:false,
                message:"The joining form you want to download is not yet approved!",
            });
        }

        // console.log(data);
        const doc = new PDFDocument({ size: "A4", margin: 20 });

        // Create a buffer stream to store the PDF content
        const chunks = [];
        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(chunks);

            // Set appropriate headers for downloading the PDF
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${data.name}_Form.pdf"`);
            res.send(pdfBuffer); // Send the PDF buffer to the client
        });

        // Start coordinates
        let startX = 30;
        let startY = 60;
        let rowHeight = 30;
        let colWidth = 380;



        // Function to draw a bordered cell

        function drawCell(x, y, text, width, height, align = "left") {
            doc.rect(x, y, width, height).stroke();
            doc.font("Helvetica-Bold"); // Set font to bold
            doc.text(text, x + 5, y + 10, { width: width - 10, align });
            //doc.font("Helvetica"); // Reset font to normal after drawing (if needed)
        }

        function drawCellAlignVertically(x, y, text, width, height, align = "left") {
            doc.rect(x, y, width, height).stroke();
            doc.font("Helvetica-Bold");
            doc.text(text, x + 5, y + height / 2, { width: width - 10, align: align });
        }

        // Employee Personal Information
        drawCell(startX, startY, data.companyId.name || "", colWidth, rowHeight, "center");

        let imageUrl = data.photoAttachment; // Assuming `photoAttachment` is the URL of the image

        if (imageUrl) {
            try {
                // Fetch image using axios and convert to buffer
                const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                const imageBuffer = Buffer.from(imageResponse.data);

                // Check image dimensions (optional)
                //console.log('Image fetched, buffer length:', imageBuffer.length);

                // Add the image to the PDF (Position the image where you need)
                doc.image(imageBuffer, startX + colWidth + 2, startY, { width: 148, height: 148 });
            } catch (error) {
                console.error("Error fetching the image:", error);
            }
        } else {
            console.log("No image URL provided");
        }
        
        //drawCell(startX + colWidth, startY, data.photoAttachment || "", 150, 150);

        drawCell(startX, startY + rowHeight, "Joining Form", colWidth, rowHeight, "center");

        drawCell(startX, startY + rowHeight * 2, "Employee Personal Information", colWidth, rowHeight, "center");

        drawCellAlignVertically(startX, startY + rowHeight * 3, "Full Name", 150, rowHeight * 2);
        drawCellAlignVertically(startX + 150, startY + rowHeight * 3, data.name || "", 230, rowHeight * 2);

        drawCell(startX, startY + rowHeight * 5, "Father's Name", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 5, data.father_husbandName || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 6, "Date of Birth", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 6, moment(data.dateOfBirth).format("DD-MM-YYYY") || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 7, "Gender", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 7, data.gender || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 8, "Marital Status", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 8, data.maritalStatus || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 9, "Blood Group", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 9, data.bloodGroup || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 10, "Contact Details", colWidth + rowHeight * 5, rowHeight, "center");

        drawCell(startX, startY + rowHeight * 11, "Official Contact No.", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 11, data.officialContact || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 12, "Official Mail ID", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 12, data.officialEmail || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 13, "Personal Contact No.", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 13, data.personalPhoneNum || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 14, "Personal Mail ID", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 14, data.personalEmail || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 15, "Employee Address Information", colWidth + rowHeight * 5, rowHeight, "center");
        drawCell(startX, startY + rowHeight * 16, "Present Address Detail", colWidth + rowHeight * 5, rowHeight, "center");

        drawCellAlignVertically(startX, startY + rowHeight * 17, "Full Address", 150, rowHeight * 2);
        drawCellAlignVertically(startX + 150, startY + rowHeight * 17, data.currentAddress || "", 380, rowHeight * 2);

        drawCell(startX, startY + rowHeight * 19, "State", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 19, data.currentState || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 20, "District/City", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 20, data.currentCity || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 21, "Pin Code", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 21, data.currentPinCode || "", 380, rowHeight);

        doc.addPage();

        drawCell(startX, startY, "Permanent Address Detail", colWidth + rowHeight * 5, rowHeight, "center");

        drawCellAlignVertically(startX, startY + rowHeight, "Full Address", 150, rowHeight * 2);
        drawCellAlignVertically(startX + 150, startY + rowHeight, data.permanentAddress || "", 380, rowHeight * 2);

        drawCell(startX, startY + rowHeight * 3, "State", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 3, data.permanentState || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 4, "District/City", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 4, data.permanentCity || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 5, "Pin Code", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 5, data.permanentPinCode || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 6, "Joining Details", colWidth + rowHeight * 5, rowHeight, "center");

        drawCell(startX, startY + rowHeight * 7, "Date of Interview", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 7, moment(data.interviewDate).format("DD-MM-YYYY") || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 8, "Date of Joining", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 8, moment(data.joiningDate).format("DD-MM-YYYY") || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 9, "Department", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 9, data.department.department || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 10, "Designation", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 10, data.designation.designation || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 11, "Employee Type", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 11, data.employeeType || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 12, "Mode of Recruitment", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 12, data.modeOfRecruitment || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 13, "Reference/Consultancy", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 13, data.reference || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 14, "Bank Details", colWidth + rowHeight * 5, rowHeight, "center");

        drawCell(startX, startY + rowHeight * 15, "PAN No.", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 15, data.panCard || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 16, "Aadhar No.", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 16, data.aadharCard || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 17, "Bank", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 17, data.bankName || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 18, "Account No.", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 18, data.bankAccount || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 19, "IFSC Code", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 19, data.bankIFSC || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 20, "Branch Address", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 20, data.bankAddress || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 21, "ESI and PF Details", colWidth + rowHeight * 5, rowHeight, "center");

        drawCell(startX, startY + rowHeight * 22, "UAN No.", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 22, data.uanNumber || "", 380, rowHeight);

        doc.addPage();

        drawCell(startX, startY, "Contact Details in Case of Emergency (Family Member Only)", colWidth + rowHeight * 5, rowHeight, "center");
        drawCell(startX, startY + rowHeight, "Name", 140, rowHeight, "center");
        drawCell(startX + 140, startY + rowHeight, "Relation", 130, rowHeight, "center");
        drawCell(startX + 270, startY + rowHeight, "Address", 130, rowHeight, "center");
        drawCell(startX + 400, startY + rowHeight, "Contact No.", 130, rowHeight, "center");

        if (data.emergencyContact && data.emergencyContact.length > 0) {
            // Loop through available emergency contacts
            for (let i = 0; i < 4; i++) {
                // If there's data for this contact, draw the actual cell, else draw empty cells
                if (i < data.emergencyContact.length) {
                    drawCell(startX, startY + rowHeight * (2 + i), data.emergencyContact[i].contactName || "", 140, rowHeight, "center");
                    drawCell(startX + 140, startY + rowHeight * (2 + i), data.emergencyContact[i].relation || "", 130, rowHeight, "center");
                    drawCell(startX + 270, startY + rowHeight * (2 + i), data.emergencyContact[i].address || "", 130, rowHeight, "center");
                    drawCell(startX + 400, startY + rowHeight * (2 + i), data.emergencyContact[i].phoneNumber || "", 130, rowHeight, "center");
                } else {
                    // If no more data available, draw empty cells
                    drawCell(startX, startY + rowHeight * (2 + i), "", 140, rowHeight, "center");
                    drawCell(startX + 140, startY + rowHeight * (2 + i), "", 130, rowHeight, "center");
                    drawCell(startX + 270, startY + rowHeight * (2 + i), "", 130, rowHeight, "center");
                    drawCell(startX + 400, startY + rowHeight * (2 + i), "", 130, rowHeight, "center");
                }
            }
        } else {
            // If no emergency contact data is available, add empty cells for all rows
            for (let i = 0; i < 4; i++) {
                drawCell(startX, startY + rowHeight * (2 + i), "", 140, rowHeight);
                drawCell(startX + 140, startY + rowHeight * (2 + i), "", 130, rowHeight);
                drawCell(startX + 270, startY + rowHeight * (2 + i), "", 130, rowHeight);
                drawCell(startX + 400, startY + rowHeight * (2 + i), "", 130, rowHeight);
            }
        }

        // Signature Section
        //let signY = joiningY + rowHeight * 4 + 40;

        // doc.font("Helvetica").fontSize(13)
        //     .text(
        //         "Declaration: I hereby declare that the details furnished above are true and correct to the best of my knowledge and belief and I undertake to inform you of any changes therein, immediately. In case any of the above information is found to be false or untrue or misleading or misrepresenting, I am aware that I may be held liable for it.",
        //         startX,
        //         startY + 10 + rowHeight * 6,
        //         {
        //             width: 530, // Set the width of the text box to control the line wrapping
        //             align: 'justify', // Align text to justify
        //             continued: false // Set to false if it's the end of the text block
        //         }
        //     );

        doc.font("Helvetica-Bold").fontSize(13) // Bold font for "Declaration:"
            .text("Declaration: ", startX, startY + 20 + rowHeight * 6, { continued: true });

        doc.font("Helvetica").fontSize(13) // Regular font for the remaining text
            .text(
                "I hereby declare that the details furnished above are true and correct to the best of my knowledge and belief and I undertake to inform you of any changes therein, immediately. In case any of the above information is found to be false or untrue or misleading or misrepresenting, I am aware that I may be held liable for it.",
                {
                    // Set the width of the text box to control line wrapping
                    align: 'justify' // Align text to justify
                }
            );

        doc.font("Helvetica-Bold").text("Employee Signature: ", startX, startY + 50 + rowHeight * 10);
        doc.font("Helvetica-Bold").text("Date: ", startX, startY + 50 + rowHeight * 11);

        // End PDF
        doc.end();
    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ message: "An error occurred while generating the PDF." });
    }
};

module.exports = {
    addJoiningForm,
    showJoiningFormData,
    showAllJoiningForms,
    joiningFormApproval,
    joiningFormRejection,
    setJoiningFormStatusToPending,
    deleteJoiningForm,
    generateJoiningFormPDF
}