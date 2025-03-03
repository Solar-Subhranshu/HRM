const Travel = require("../../../models/travel/travel.model");
const handleBase64Images = require("../../../middlewares/base64ImageHandler");

const addTravel = async(req,res)=>{
    try {
        const employeeId = req.employeeId;
        const {
            tripStartDate,
            estimatedEndDate,
            destination,
            purposeOfVisit,
            modeOfTransport,
            travelAttachments,
        }=req.body;


        const requiredFields = [
            "tripStartDate", 
            "estimatedEndDate",
            "destination",
            "purposeOfVisit", 
            "travelAttachments",
        ];

        const missingFields = requiredFields.filter((field)=> !req.body[field]);
        if(missingFields.length>0){
            return res.status(400).json({
                success:false,
                message:`The following fields are missing : ${missingFields.join(", ")}`,
            });   
        }

        if(!Array.isArray(travelAttachments) || travelAttachments.length===0){
            return res.status(400).json({
                success:false,
                message:"Travel Attachments should be an array of base-64 image strings, with atleast one string."
            });
        }

        //check if any travel request already exists with (status=pending)or is there any active trip (endDate not provided.) 
        const isExist = await Travel.findOne({
            employeeId:employeeId,
            $or: [{ approvalStatus: "Pending" }, { isActive: true }]
        }).lean();

        if(isExist){
            return res.status(400).json({
                success:false,
                message:"You currently have one active Trip or a Travel Request with pending status. Clear those first.",
                data:isExist
            });
        }

        const correctStartDate = (tripStartDate instanceof Date) ? tripStartDate : new Date(tripStartDate);
        const correctEstimatedEndDate = (estimatedEndDate instanceof Date) ? estimatedEndDate : new Date(estimatedEndDate);

        const currDate = new Date();
        if(correctStartDate < currDate){
            return res.status(400).json({
                success:false,
                message:"You Can't create Travel Request where Start-Date is lesser than Today."
            });
        }

        if(correctEstimatedEndDate < correctStartDate){
            return res.status(400).json({
                success:false,
                message:"You can't create Travel request where Estimated End-Date is Lesser than Start Date."
            });
        }

        let travelFileUrlArr=[];
        for(let i=0;i<travelAttachments.length;i++){
            let fileImg = await handleBase64Images([travelAttachments[i]],"travelAttachments");
            let fileUrl = `${req.protocol}://${req.get("host")}/uploads/travelAttachments/${fileImg[0].fileName}`;
            travelFileUrlArr.push({tripDocument:fileUrl});
        }

        const newTravel = new Travel({
            employeeId,
            tripStartDate:correctStartDate,
            estimatedEndDate:correctEstimatedEndDate,
            destination,
            purposeOfVisit,
            modeOfTransport,
            travelAttachments:travelFileUrlArr
        });

        const isSaved = await newTravel.save();

        if(isSaved){
            return res.status(200).json({
                success:true,
                message:"New Travel Request Form saved Successfully.",
                data:isSaved
            });
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Travel Request Not Saved, try again later."
            });
        }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Couldn't Add Travel Request!",
            error:error.message
        });
    }
}

const addNewSuccessiveTrip = async(req,res)=>{
    try {
        const employeeId = req.employeeId;
        const {
            tripStartDate,
            estimatedEndDate,
            destination,
            purposeOfVisit,
            modeOfTransport,
            travelAttachments,
            previousTripId,
            // previousTripEndDate,
        }=req.body;

        const requiredFields = [
            "tripStartDate",
            "estimatedEndDate",
            "destination",
            "purposeOfVisit",
            "modeOfTransport",
            "travelAttachments",
            "previousTripId",
            // "previousTripEndDate"
        ];
        
        
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `The following fields are missing: ${missingFields.join(", ")}`
            });
        }

        const prevTrip = await Travel.findById(previousTripId).lean();
        if(!prevTrip.isActive){ //prevent from adding trip to an already ended travel.
            return res.status(400).json({
                success:false,
                message:"New Trip Request can not be added to Travel as it is Not Currently Active"
            })
        }

        if(!Array.isArray(travelAttachments) || travelAttachments.length===0){
            return res.status(400).json({
                success:false,
                message:"Travel Attachments should be an array of base-64 image strings, with atleast one string."
            });
        }
        
        const correctStartDate = (tripStartDate instanceof Date) ? tripStartDate : new Date(tripStartDate);
        const correctEstimatedEndDate = (estimatedEndDate instanceof Date) ? estimatedEndDate : new Date(estimatedEndDate);
        
        const currDate = new Date();
        if(correctStartDate < currDate){
            return res.status(400).json({
                success:false,
                message:"You Can't create Travel Request where Start-Date is lesser than Today."
            });
        }

        if(correctEstimatedEndDate < correctStartDate){
            return res.status(400).json({
                success:false,
                message:"You can't create Travel request where Estimated End-Date is Lesser than Start Date."
            });
        }
        // const correctedPreviousTripEndDate = (previousTripEndDate instanceof Date) ? previousTripEndDate : new Date(previousTripEndDate);

        let travelFileUrlArr=[];
        for(let i=0;i<travelAttachments.length;i++){
            let fileImg = await handleBase64Images([travelAttachments[i]],"travelAttachments");
            let fileUrl = `${req.protocol}://${req.get("host")}/uploads/travelAttachments/${fileImg[0].fileName}`;
            travelFileUrlArr.push({tripDocument:fileUrl});
        }

        const newTravelTrip = new Travel({
            employeeId,
            tripStartDate:correctStartDate,
            estimatedEndDate:correctEstimatedEndDate,
            destination,
            purposeOfVisit,
            modeOfTransport,
            travelAttachments:travelFileUrlArr,
            previousTrip:previousTripId,
        });

        const isSaved = await newTravelTrip.save();

        if(isSaved){
            return res.status(200).json({
                success:true,
                message:"New Travel Trip Request Form Saved Successfully.",
                data:isSaved
            });
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Travel Request Not Saved, try again later."
            });
        }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Couldn't Add Travel Request!",
            error:error.message
        })
    }
}

const approveTravelRequest = async(req,res)=>{
    try {
        const employeeId = req.employeeId;
        const {travelId}=req.query;
        if(!travelId){
            return res.status(400).json({
                success:false,
                message:"Travel-Id is required for Approval."
            });
        }

        const isAlreadyRejected = await Travel.findById(travelId).lean();
        if(isAlreadyRejected.approvalStatus==="Rejected"){
            return res.status(400).json({
                success:false,
                message:"The Travel request you are trying to Approve is already Rejected. You may not Approve it now."
            })
        }
        if(isAlreadyRejected.approvalStatus==="Approved"){
            return res.status(400).json({
                success:false,
                message:"The Travel request you are trying to Approve is already Approved. You may not Approve it now."
            })
        }

        const isSaved = await Travel.findByIdAndUpdate({_id:travelId},
            {   
                approvedBy:employeeId,
                approvalStatus:"Approved",
            },
            {new:true});
        if(isSaved){
            return res.status(200).json({
                success:true,
                message:"Travel Request Approved Successfully !",
                data:isSaved
            });
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Travel Request Couldn't be Approved, due to some external (network) factors."
            })
        }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error, Couldn't Approve Request.",
            error:error.message
        });
    }
}

const rejectTravelRequest = async(req,res)=>{
    try {
        const employeeId = req.employeeId;
        const {travelId,reasonForRejection}=req.body;

        if(!travelId || !reasonForRejection){
            return res.status(400).json({
                success:false,
                message:"Travel-id and Reason for Rejection is required."
            });
        }

        const isAlreadyApproved = await Travel.findById(travelId).lean();
        if(isAlreadyApproved.status==="Approved"){
            return res.status(400).json({
                success:false,
                message:"The Travel request you are trying to reject is already Approved. You may not reject it now."
            });
        } 
        if(isAlreadyApproved.status==="Rejected"){
            return res.status(400).json({
                success:false,
                message:"The Travel request you are trying to reject is already Rejected. You may not reject it now."
            });
        }

        const isRejected = await Travel.findByIdAndUpdate({_id:travelId},
            {
                approvalStatus:"Rejected",
                reasonForRejection,
                approvedBy:employeeId
            },
            {new:true}
        );
        if(isRejected){
            return res.status(200).json({
                success:true,
                message:"Travel Request Rejected Successfully!",
                data:isRejected
            });
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Travel Request Couldn't be Rejected, due to some external (network) factors."
            });
        }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error, Travel Form Couldn't be Rejected!",
            error:error.message
        });
    }
}

const startTrip = async(req,res)=>{
    try {
        const employeeId= req.employeeId;
        const {travelId} = req.query;

        if(!travelId){
            return res.status(400).json({
                success:false,
                message:"Travel-Id is required."
            });
        }

        const tripApprovalStatus = await Travel.findById(travelId).lean();
        if(tripApprovalStatus.approvalStatus!="Approved"){
            return res.status(400).json({
                success:false,
                message:"The Trip you are trying to start is not yet approved."
            });
        }
        if(tripApprovalStatus._id!=employeeId){
            return res.status(400).json({
                success:false,
                message:`You ${req.employeeCode} are not the right person to start this trip!`
            });
        }

        const isStarted = await Travel.findByIdAndUpdate({_id:travelId},{
            isActive:true,
        },{new:true});

        if(isStarted){
            return res.status(200).json({
                success:true,
                message:"You Trip Has Started, Wish You A Safe Journey!",
                data:isStarted
            });
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Your Trip Couldn't be Started. Try Again."
            });
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Couldn't Start Your Trip.",
            error:error.message
        });
    }
}

const showTravelRecords = async(req,res)=>{
    try {
        const employeeId = req.employeeId;

        const employeeTravelRecords = await Travel.find({employeeId}).lean();

        if(employeeTravelRecords){
            return res.status(200).json({
                success:true,
                message:`List of all Travel Records for this employee ${employeeId}`,
                data:employeeTravelRecords || []
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Unable to fetch data for employee"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error, unable to fetch travel record.",
            error:error.message
        });
    }
}

//to be used only for testing purpose...
const setTravelRequestStatusToPending = async(req,res)=>{
    try {
        const {travelId}= req.query;
        if(!travelId){
            return res.status(400).json({
                success:false,
                message:"Travel-id is required."
            });
        }

        //check if the travel form exists or not
        const isExists= await Travel.findById(travelId).lean();
        if(!isExists){
            return res.status(400).json({
                success:false,
                message:"The Travel Request Form you are trying find does not exist in Database."
            });
        }

        //we will set the status of the travelRequest to "Pending", irrespective of its Approval or Rejection
        const isSetPending = await Travel.findByIdAndUpdate({_id:travelId},
            {
                approvalStatus:"Pending",
                approvedBy:null,
                reasonForRejection:null
            },
            {new:true}
        );

        if(isSetPending){
            return res.status(200).json({
                success:true,
                message:'Travel Request Set to Pending Successfully.',
                data:isSetPending
            });
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Travel Request Status Couldn't be set to Pending."
            });
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Couldn't Set Status to pending!",
            error:error.message
        });
    }
}

module.exports={
    addTravel,
    addNewSuccessiveTrip,
    approveTravelRequest,
    rejectTravelRequest,
    showTravelRecords,
    startTrip,
    setTravelRequestStatusToPending
}