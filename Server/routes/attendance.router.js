const attendanceController = require("../controller/attendance/attendance.controller");
const manualPunchController = require("../controller/attendance/manualPunch.controller");

const reportController = require("../controller/Reports/reports.controller");

const tokenVerify = require("../middlewares/tokenVerification");
const router = require("express").Router()

//attendance
router.post("/mark-attendance",attendanceController.recordAttendance);
router.get("/view-attendance",attendanceController.viewAttendance);

//manualPunch
router.post("/add-manualEntry",tokenVerify,manualPunchController.addManualPunch);

//reports
router.post("/daily-report-download",reportController.downloadDailyReport);

module.exports = router;