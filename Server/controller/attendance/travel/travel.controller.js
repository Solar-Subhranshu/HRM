const Travel = require("../../../models/travel/travel.model");
const Employee = require("../../../models/auth/employee.model");
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

        const isEmployee = await Employee.findById(employeeId).populate("workType").lean();
        if(isEmployee.workType.workType==="Office-Only"){
            return res.status(400).json({
                success:false,
                message:"Your Work-type does not allow you to Travel, as it is says Office-Only."
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
        const {travelId,extensionId}=req.query;
        if(!travelId){
            return res.status(400).json({
                success:false,
                message:"Travel-Id is required for Approval."
            });
        }

        const travelRecord = await Travel.findById(travelId).lean();

        if(extensionId){
            const extnRecord = travelRecord.extensions.filter((extItems)=>{ return extItems._id.toString()===extensionId });
            if(extnRecord[0].extensionStatus!=="Pending"){
                // console.log(extnRecord[0].extensionStatus);
                // console.log(extnRecord[0].extensionStatus==="Pending")
                return res.status(400).json({
                    success:false,
                    message:`The Extension-Request you're trying to approve, already has status : ${extnRecord[0].extensionStatus}.`,
                    data:travelRecord.extensions
                });
            }
            else{
                const isExtApproved = await Travel.findOneAndUpdate(
                    {_id:travelId,"extensions._id":extensionId},
                    {
                        $set:{
                            "extensions.$.extensionStatus":"Approved",
                            "extensions.$.reviewedBy":employeeId,
                            "extensions.$.reviewDate":new Date(),
                        }
                    },
                    {new:true}
                );
                if(isExtApproved){
                    return res.status(200).json({
                        success:true,
                        message:"The Extension-Request has been approved successfully.",
                        data: isExtApproved 
                    });
                }
                else{
                    return res.status(400).json({
                        success:false,
                        message:"The Extension-Request was not approved. Try Again"
                    })
                }
            }   
        }

        if(travelRecord.approvalStatus==="Rejected"){
            return res.status(400).json({
                success:false,
                message:"The Travel request you are trying to Approve is already Rejected. You may not Approve it now."
            })
        }
        if(travelRecord.approvalStatus==="Approved"){
            return res.status(400).json({
                success:false,
                message:"The Travel request you are trying to Approve is already Approved. You may not Approve it now."
            })
        }

        //logic for setting new successive travel request
        /*
            if approved, then change the next-head-> of the previous-travel.
            do-not change the isActive status, as it should get changed when the new travel is started.
         */
        if(travelRecord.previousTrip!==null){
            const updatedPreviousHead = await Travel.findByIdAndUpdate(travelRecord.previousTrip,{
                nextTrip:travelRecord.previousTrip
            },{new:true});

            if(!updatedPreviousHead){
                return res.status(400).json({
                    success:false,
                    message:"We faced an issue while updating the approval for this request. Try Again",
                });
            }
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
        const {travelId,reasonForRejection,extensionId}=req.body;

        if(!travelId || !reasonForRejection){
            return res.status(400).json({
                success:false,
                message:"Travel-id and Reason for Rejection is required."
            });
        }

        const travelRecord = await Travel.findById(travelId).lean();
        // console.log("record ", travelRecord.extensions);

        if(extensionId){
            const extnRecord = travelRecord.extensions.filter((extItem)=>(extItem._id.toString()===extensionId));
            // console.log("record ", extnRecord);
            if(extnRecord[0].extensionStatus!=="Pending"){

                console.log(extnRecord[0].extensionStatus==="Pending")
                return res.status(400).json({
                    success:false,
                    message:`The Extension-Request you're trying to reject, already has status : ${extnRecord[0].extensionStatus}.`,
                    data:extnRecord
                });
            }
            else{
                const isExtRejected = await Travel.findOneAndUpdate(
                    {_id:travelId,"extensions._id":extensionId},
                    {
                        $set:{
                            "extensions.$.extensionStatus":"Rejected",
                            "extensions.$.reviewedBy":employeeId,
                            "extensions.$.reviewDate":new Date(),
                            "extensions.$.extensionRejectionReason":reasonForRejection
                        }
                    },
                    {new:true}
                );

                if(isExtRejected){
                    return res.status(200).json({
                        success:false,
                        message:"The Extension-Request has been rejected successfully.",
                        data: isExtRejected
                    })
                }
                else{
                    return res.status(400).json({
                        success:false,
                        message:"The Extension-Request was not rejected. Try Again"
                    });
                }
            }
        }

        if(travelRecord.status==="Approved"){
            return res.status(400).json({
                success:false,
                message:"The Travel request you are trying to reject is already Approved. You may not reject it now."
            });
        } 
        if(travelRecord.status==="Rejected"){
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
        if(tripApprovalStatus.employeeId!=employeeId){
            return res.status(400).json({
                success:false,
                message:`You ${req.employeeCode} are not the right person to start this trip!`
            });
        }

        const previouslyActiveTrip = await Travel.findOne({employeeId,isActive:true}).lean();
        if(previouslyActiveTrip){
            return res.status(400).json({
                success:false,
                message:"You already have an active trip. Please end that to start this trip.",
                data:previouslyActiveTrip
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
                message:`List of all Travel Records for this employee ${req.employeeCode}`,
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

const deleteTrip = async(req,res)=>{
    try {
        const employeeId = req.employeeId;
        const {travelId} = req.query;

        if(!travelId){
            return res.status(400).json({
                success:false,
                message:"Travel-Id is required."
            });
        }

        const isExist = await Travel.findById(travelId).lean();

        if(!isExist){
            return res.status(400).json({
                success:false,
                message:"The Trip You are trying to delete doesn't exist in databse."
            });
        }

        if(isExist.employeeId != employeeId){
            return res.status(400).json({
                success:false,
                message:`You ${req.employeeCode} are not the right person to delete the Travel.`
            });
        }

        if(isExist.approvalStatus!="Pending"){
            return res.status(400).json({
                success:false,
                message:`You can't delete the trip now as it already reviewed by the Admin.`
            });
        }

        const isDeleted = await Travel.findByIdAndDelete(travelId);

        if(isDeleted){
            return res.status(200).json({
                success:true,
                message:"Travel Request Deleted Successfully.",
                data:isDeleted
            });
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Couldn't delete travel request. Try again later."
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Couldn't Delete Travel Request.",
            error:error.message
        })
    }
}

const endTrip = async(req,res)=>{
    try {
        const employeeId = req.employeeId;
        const {travelId}=req.query;
        
        const currTime = new Date();
        
        if(!travelId){
            return res.status(400).json({
                success:false,
                message:"Travel-Id is required."
            });
        }

        const isTravelRecord = await Travel.findById(travelId).lean();
        if(!isTravelRecord){
            return res.status(400).json({
                success:false,
                message:"Travel request with travel-id Not Found in Database."
            });
        }
        if(isTravelRecord.approvalStatus!=="Approved"){
            return res.status(400).json({
                success:false,
                message:"You can not end a Travel which is not yet Approved !"
            });
        }

        if(!isTravelRecord.isActive){
            return res.status(400).json({
                success:false,
                message:"You can not end a Travel which is not active !"
            });
        }

        if(isTravelRecord.employeeId!=employeeId){
            return res.status(400).json({
                success:false,
                message:`You ${req.employeeCode} are not the right person to end this trip. Person only who started the trip can end the trip.`
            });
        }

        const isEnded = await Travel.findByIdAndUpdate({_id:travelId},{
            isActive:false,
            tripEndDate:currTime,

        },{new:true});

        if(isEnded){
            return res.status(200).json({
                success:true,
                message:"Travel Ended Successfully!",
                data:isEnded
            });
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Travel request couldn't be Ended. Try Again Later."
            });
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error, Couldn't End the Travel",
            error:error.message
        });
    }
}

const requestEstimatedEndDateUpdation = async(req,res)=>{
    try {
        const employeeId = req.employeeId;
        const {travelId,requestedEndDateEstimate} = req.body;

        if(!travelId || !requestedEndDateEstimate){
            return res.status(400).json({
                success:false,
                message:"Travel-Id and Requested-end-date-estimate is required."
            });
        }

        const travelRecord = await Travel.findById(travelId).lean();
        if(!travelRecord){
            return res.status(400).json({
                success:false,
                message:"Travel Record couldn't be fetched using the provided Travel-id"
            })
        }

        if(travelRecord.approvalStatus!=="Approved"){
            return res.status(400).json({
                success:false,
                message:"Your Travel is not Approved."
            });
        }
        if(!travelRecord.isActive){
            return res.status(400).json({
                success:false,
                message:"This Trip is not Active."
            });
        }
        if(travelRecord.employeeId!=employeeId){
            return res.status(400).json({
                success:false,
                message:"You are not the right person to request for this new estimate."
            });
        }

        if(travelRecord.extensions){
            const isPending = travelRecord.extensions.filter((item)=>(item.extensionStatus==="Pending"));
            if(isPending.length!==0){
                return res.status(400).json({
                    success:false,
                    message:"You already have one extension request which is in pending. So you can't add more requests until it is Approved or Rejected."
                });
            }
        }

        const newExtension = {
            requestedEndDateEstimate,
            requestedOn:new Date(),
        }

        const isSaved = await Travel.findByIdAndUpdate({_id:travelId},{
            $push:{extensions:newExtension},
        },{new:true});

        if(isSaved){
            return res.status(200).json({
                success:true,
                message:"Your Extension Request has been Submitted Successfully!",

            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"We faced some issue while saving your request, try again."
            })
        }
    } catch (error) {
        return res.status(500).json({
                success:false,
                message:"Internal Server Error! Couldn't Request for new estimate.",
                error:error.message
            });
    }
}

const showTravelRequestToAdmin = async(req,res)=>{
    try {
        // const employeeId = req.employeeId;
        const {requestStatus} = req.query;

        if(!requestStatus){
            return res.status(400).json({
                success:false,
                message:"Request Status is required."
            })
        }

        const allowedRequestStatus = ['Pending','Approved','Rejected'];
        if(!allowedRequestStatus.includes(requestStatus)){
            return res.status(400).json({
                success:false,
                message:"Value of request status is wrong. Send only 'Pending','Approved','Rejected' as status."
            })
        }
        const allTravelRequests = await Travel.find({
            $or :[
                    {approvalStatus:requestStatus},
                    {approvalStatus:"Approved","extensions.extensionStatus":requestStatus}
                ]
            })
            .populate({
                path:"employeeId",
                select:"name personalPhoneNum companyPhoneNum"
            }).lean();

        if(allTravelRequests){
            return res.status(200).json({
                success:true,
                message:`List of ${requestStatus} Travel Requests`,
                data:allTravelRequests || []
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Couldn't fetch data from db, due to some network issue."
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error! Couldn't fetch data from db",
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
                isActive:false,
                tripEndDate:null,
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
    endTrip,
    deleteTrip,
    requestEstimatedEndDateUpdation,
    showTravelRequestToAdmin,
    setTravelRequestStatusToPending
}