const express = require("express");
const router = express.Router();
const tokenVerify = require("../middlewares/tokenVerification");
const commonController = require("../controller/Common/common.controller");

router.get("/show-degree",tokenVerify(["Admin"]),commonController.showDegree);
router.post("/add-degree",tokenVerify(["Admin"]),commonController.addDegree);
router.delete("/delete-degree",tokenVerify(["Admin"]),commonController.deleteDegree);

router.get("/show-designation",tokenVerify(["Admin"]),commonController.showDesignation);
router.post("/add-designation",tokenVerify(["Admin"]),commonController.addDesignation);
router.put("/update-designation",tokenVerify(["Admin"]),commonController.updateDesignation);
//for backend
router.delete("/delete-designation",tokenVerify(["Admin"]),commonController.deleteDesignation);

router.get("/show-qualification",tokenVerify(["Admin"]),commonController.showAllQualification);
router.post("/add-qualifiaction",tokenVerify(["Admin"]),commonController.addQualification);
router.put("/update-qualifiaction",tokenVerify(["Admin"]),commonController.updateQualification);
router.delete("/delete-qualifiaction",tokenVerify(["Admin"]),commonController.deleteQualification);

router.get("/show-department",tokenVerify(["Admin"]),commonController.showAllDepts);
router.post("/add-department",tokenVerify(["Admin"]),commonController.addDept);
router.put("/update-dept",tokenVerify(["Admin"]),commonController.updateDept);
//only for backend
router.delete("/delete-department",tokenVerify(["Admin"]),commonController.deleteDept);

router.get("/show-company",tokenVerify(["Admin"]),commonController.showCompany);
router.post("/add-company",tokenVerify(["Admin"]),commonController.addCompany);
router.put("/update-company",tokenVerify(["Admin"]),commonController.updateCompanyName);
//for backend
router.delete("/delete-company",tokenVerify(["Admin"]),commonController.deleteCompany);

router.get("/show-branch",tokenVerify(["Admin"]),commonController.showBranch);
router.post("/add-branch",tokenVerify(["Admin"]),commonController.addBranch);
router.put("/update-branch",tokenVerify(["Admin"]),commonController.updateBranchDetails);
router.get("/show-all-companyDetails",tokenVerify(["Admin"]),commonController.showAllBranch);
//only for backend
router.delete("/delete-branch",commonController.deleteBranch);

router.post("/add-shift",tokenVerify(["Admin"]),commonController.addShift);
router.get("/show-shift",tokenVerify(["Admin"]),commonController.showShift);
router.put("/update-shift",tokenVerify(["Admin"]),commonController.updateShift);
//only for backend
router.delete("/delete-shift",tokenVerify(["Admin"]),commonController.deleteShift);

router.post("/add-officeTimePolicy",tokenVerify(["Admin"]),commonController.addOfficeTimePolicy);
router.get("/show-officeTimePolicy",tokenVerify(["Admin"]),commonController.showOfficeTimePolicy);
router.put("/update-officeTimePolicy",tokenVerify(["Admin"]),commonController.updateOfficeTimePolicy);
router.get("/showToUpdate-officeTimepolicy",tokenVerify(["Admin"]),commonController.showForUpdateOfficeTimePolicy);
//only for backend purpose
router.delete("/delete-officeTimePolicy",tokenVerify(["Admin"]),commonController.deleteOfficeTimePolicy);

router.post("/add-workType",tokenVerify(["Admin"]),commonController.addWorkType);
router.get("/show-workType",tokenVerify(["Admin"]),commonController.showWorkType);

//for backend purpose
router.get("/show-salaryDeductRule",tokenVerify(["Admin"]),commonController.showSalaryDeductRule);
router.delete("/delete-salaryDeductRule",tokenVerify(["Admin"]),commonController.deleteSalaryDeductRule);

module.exports = router;
