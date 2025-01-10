const express = require("express");
const router = express.Router();
const tokenVerify = require("../middlewares/tokenVerification");
const commonController = require("../controller/Common/common.controller");

router.get("/show-degree",commonController.showDegree);
router.post("/add-degree",tokenVerify,commonController.addDegree);
router.delete("/delete-degree",tokenVerify,commonController.deleteDegree);

router.get("/show-designation",commonController.showDesignation);
router.post("/add-designation",tokenVerify,commonController.addDesignation);
router.put("/update-designation",commonController.updateDesignation);

router.get("/show-qualification",commonController.showAllQualification);
router.post("/add-qualifiaction",tokenVerify,commonController.addQualification);
router.delete("/delete-qualifiaction",tokenVerify,commonController.deleteQualification);
router.put("/update-qualifiaction",commonController.updateQualification);

router.get("/show-department",commonController.showAllDepts);
router.post("/add-department",tokenVerify,commonController.addDept);
router.put("/update-dept",tokenVerify,commonController.updateDept);
//only for backend
router.delete("/delete-department",tokenVerify,commonController.deleteDept);

router.get("/show-company",commonController.showCompany);
router.post("/add-company",tokenVerify,commonController.addCompany);
router.put("/update-company",tokenVerify,commonController.updateCompanyName);

router.get("/show-branch",commonController.showBranch);
router.post("/add-branch",tokenVerify,commonController.addBranch);
router.put("/update-branch",tokenVerify,commonController.updateBranchDetails);
router.get("/show-all-companyDetails",commonController.showAllBranch);


router.post("/add-shift",tokenVerify,commonController.addShift);
router.get("/show-shift",commonController.showShift);
router.put("/update-shift",tokenVerify,commonController.updateShift);
//only for backend
router.delete("/delete-shift",tokenVerify,commonController.deleteShift);

router.post("/add-officeTimePolicy",tokenVerify,commonController.addOfficeTimePolicy);
router.get("/show-officeTimePolicy",commonController.showOfficeTimePolicy);
router.put("/update-officeTimePolicy",tokenVerify,commonController.updateOfficeTimePolicy);
router.get("/showToUpdate-officeTimepolicy",commonController.showForUpdateOfficeTimePolicy);
//only for backend purpose
router.delete("/delete-officeTimePolicy",tokenVerify,commonController.deleteOfficeTimePolicy);

router.post("/add-workType",commonController.addWorkType);
router.get("/show-workType",commonController.showWorkType);

//for backend purpose
router.get("/show-salaryDeductRule",commonController.showSalaryDeductRule);
router.delete("/delete-salaryDeductRule",tokenVerify,commonController.deleteSalaryDeductRule);

module.exports = router;
