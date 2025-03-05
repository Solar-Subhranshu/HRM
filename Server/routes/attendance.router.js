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
router.post("/add-newSuccessiveTrip",tokenVerify(),travelController.addNewSuccessiveTrip);
router.get("/start-trip",tokenVerify(),travelController.startTrip);
router.delete("/delete-trip",tokenVerify(),travelController.deleteTrip);
router.get("/show-travelRecords",tokenVerify(),travelController.showTravelRecords);
router.get("/approve-travelRequest",tokenVerify(["Admin"]),travelController.approveTravelRequest);
router.put("/reject-travelRequest",tokenVerify(["Admin"]),travelController.rejectTravelRequest);
router.get("/setStatus-Pending",tokenVerify(["Admin"]),travelController.setTravelRequestStatusToPending);
router.get("/show-travelRecordToAdmin",tokenVerify(["Admin"]),travelController.showTravelRequestToAdmin);
router.get("/end-trip",tokenVerify(),travelController.endTrip);
router.post("/add-endDateExtension",tokenVerify(),travelController.requestEstimatedEndDateUpdation);


//reports
router.post("/daily-report-download",tokenVerify(["Admin"]),reportController.downloadDailyReport);
router.get("/monthly-report",tokenVerify(["Admin"]),reportController.downloadMonthlyReport);
router.get("/dashboard-data",tokenVerify(["Admin"]),reportController.dashboardReport);

module.exports = router;