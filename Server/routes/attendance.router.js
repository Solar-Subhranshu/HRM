const attendanceController = require("../controller/attendance/attendance.controller");
const manualPunchController = require("../controller/attendance/manualPunch.controller");

const reportController = require("../controller/Reports/attendanceReports.controller");

const tokenVerify = require("../middlewares/tokenVerification");
const router = require("express").Router()

//attendance
router.post("/mark-attendance",attendanceController.recordOnlineAttendance);
// router.post("/markMachine-attendance",attendanceController.recordAttendanceFromMachine);
router.get("/view-attendance",tokenVerify,attendanceController.viewAttendance);

//manualPunch
router.post("/add-manualEntry",tokenVerify,manualPunchController.addManualPunch);
router.get("/view-manualEntry",manualPunchController.viewManualPunchEnteries);
router.delete("/delete-manualEntry",manualPunchController.deleteManualPunch);

//reports
router.post("/daily-report-download",reportController.downloadDailyReport);
router.get("/monthly-report",reportController.downloadMonthlyReport);
router.get("/dashboard-data",reportController.dashboardReport);

module.exports = router;