const router = require("express").Router();
const {showAllQualification,addQualification,updateQualification,deleteQualification}= require("../../controller/Common/qualification.controller");

const {tokenVerify} = require("../../middlewares/tokenVerification");

router.get("/show-qualification",showAllQualification);
router.post("/add-qualifiaction",tokenVerify,addQualification);
router.delete("/delete-qualifiaction",deleteQualification);
router.put("/update-qualifiaction",updateQualification);

module.exports= router;