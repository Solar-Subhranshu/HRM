
const hrReportsController = require("../controller/Reports/hrReports.controller");
const tokenVerify = require("../middlewares/tokenVerification");

const router = require("express").Router();

router.post("/monthly-joiningReport",tokenVerify, hrReportsController.monthlyJoiningReport);



module.exports=router;