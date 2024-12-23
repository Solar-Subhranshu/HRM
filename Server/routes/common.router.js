const express = require("express");
const router = express.Router();
const tokenVerify = require("../middlewares/tokenVerification");
const commonController = require("../controller/Common/common.controller");

router.get("/show-degree",commonController.showDegree);
router.post("/add-degree",tokenVerify,commonController.addDegree);
router.delete("/delete-degree",commonController.deleteDegree);
router.get("/show-designation",commonController.showDesignation);
router.post("/add-designation",commonController.addDesignation);
router.put("/update-designation",commonController.updateDesignation);
router.get("/show-qualification",commonController.showAllQualification);
// router.post("/add-qualifiaction",tokenVerify,commonController.addQualification);
router.delete("/delete-qualifiaction",commonController.deleteQualification);
router.put("/update-qualifiaction",commonController.updateQualification);

router.post("/add-shift",commonController.addShift);
router.get("/show-shift",commonController.showShift);

module.exports = router;
