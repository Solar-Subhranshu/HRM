const attendanceController = require("../controller/attendance/attendance.controller");
const manualPunchController = require("../controller/attendance/manualPunch.controller");
const travelController = require("../controller/attendance/travel/travel.controller.js");
const reportController = require("../controller/Reports/attendanceReports.controller");

const tokenVerify = require("../middlewares/tokenVerification");
const router = require("express").Router()

//attendance
router.post("/mark-attendance",attendanceController.recordOnlineAttendance);
// router.post("/markMachine-attendance",attendanceController.recordAttendanceFromMachine);
router.get("/view-attendance",tokenVerify,attendanceController.viewAttendance);

//manualPunch
router.post("/add-manualEntry",tokenVerify(["Admin"]),manualPunchController.addManualPunch);
router.get("/view-manualEntry",tokenVerify(["Admin"]),manualPunchController.viewManualPunchEnteries);
router.delete("/delete-manualEntry",tokenVerify(["Admin"]),manualPunchController.deleteManualPunch);

//travel request and attendance
router.post("/add-travel",tokenVerify(),travelController.addTravel);
router.post("/add-newTrip",tokenVerify(),travelController.addNewTrip);
router.get("/approve-travelRequest",tokenVerify(["Admin"]),travelController.approveTravelRequest);
router.get("/reject-travelRequest",tokenVerify(["Admin"]),travelController.rejectTravelRequest);
router.get("/setStatus-Pending",tokenVerify(["Admin"]),travelController.setTravelRequestStatusToPending);

//reports
router.post("/daily-report-download",tokenVerify(["Admin"]),reportController.downloadDailyReport);
router.get("/monthly-report",tokenVerify(["Admin"]),reportController.downloadMonthlyReport);
router.get("/dashboard-data",tokenVerify(["Admin"]),reportController.dashboardReport);

module.exports = router;