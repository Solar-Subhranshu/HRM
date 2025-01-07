const express = require("express");
const router = express.Router();
const tokenVerify = require("../middlewares/tokenVerification");
const commonController = require("../controller/Common/common.controller");

router.get("/show-degree",commonController.showDegree);
router.post("/add-degree",tokenVerify,commonController.addDegree);
router.delete("/delete-degree",commonController.deleteDegree);

router.get("/show-designation",commonController.showDesignation);
router.post("/add-designation",tokenVerify,commonController.addDesignation);
router.put("/update-designation",commonController.updateDesignation);

router.get("/show-qualification",commonController.showAllQualification);
router.post("/add-qualifiaction",tokenVerify,commonController.addQualification);
router.delete("/delete-qualifiaction",commonController.deleteQualification);
router.put("/update-qualifiaction",commonController.updateQualification);

router.get("/show-department",commonController.showAllDepts);
router.post("/add-department",tokenVerify,commonController.addDept);
router.put("/update-dept",commonController.updateDept);

router.post("/add-shift",tokenVerify,commonController.addShift);
router.get("/show-shift",commonController.showShift);
router.put("/update-shift",tokenVerify,commonController.updateShift);

router.post("/add-officeTimePolicy",tokenVerify,commonController.addOfficeTimePolicy);
router.get("/show-officeTimePolicy",commonController.showOfficeTimePolicy);
router.put("/update-officeTimePolicy",tokenVerify,commonController.updateOfficeTimePolicy);
router.get("/showToUpdate-officeTimepolicy",commonController.showForUpdateOfficeTimePolicy);
//only for backend purpose
router.delete("/delete-officeTimePolicy",commonController.deleteOfficeTimePolicy);

router.post("/add-workType",commonController.addWorkType);
router.get("/show-workType",commonController.showWorkType);

//for backend purpose
router.get("/show-salaryDeductRule",commonController.showSalaryDeductRule);
router.delete("/delete-salaryDeductRule",commonController.deleteSalaryDeductRule);

module.exports = router;
