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

        if(!tripStartDate || !estimatedEndDate || !destination
            || !purposeOfVisit || !travelAttachments){
            return res.status(400).json({
                success:false,
                message:"Trip-Start-Date, Estimated-End-Date, Destination, PurposeOfVisit, & TravelAttachments are required.",
            });    
        }

        if(!Array.isArray(travelAttachments) || travelAttachments.length===0){
            return res.status(400).json({
                success:false,
                message:"Travel Attachments should be an array of base-64 image strings, with atleast one string."
            });
        }

        //check if any travel request already exists
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

const addNewTrip = async(req,res)=>{
    try {
        const employeeId = req.employeeId;
        const {
            tripStartDate,
            estimatedEndDate,
            destination,
            purposeOfVisit,
            modeOfTransport,
            travelAttachments,
            previousTrip
        }=req.body;

        
    } catch (error) {
        
    }
}