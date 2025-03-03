
const hrReportsController = require("../controller/Reports/hrReports.controller");
const tokenVerify = require("../middlewares/tokenVerification");

const router = require("express").Router();

router.post("/monthly-joiningReport",tokenVerify(["Admin"]), hrReportsController.monthlyJoiningReport);
router.post("/monthly-resignationReport",tokenVerify(["Admin"]), hrReportsController.monthlyResignationReport);


module.exports=router;