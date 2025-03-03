const employeeController= require("../controller/emp/employee.controller");
const joiningFormController = require("../controller/joiningForm/joiningForm.controller");
const reportingManagerController = require("../controller/emp/reportingManager.controller");
const {addEmployeeByExcel,addHRByExcel} = require("../controller/emp/addEmployeeBYExcel");
    
const router = require("express").Router();
const tokenVerify = require("../middlewares/tokenVerification")
const uploadExcel =  require("../middlewares/excel-multer.middleware")
const upload = require("../middlewares/multer.middleware")

router.post("/empRegister",tokenVerify(["Admin"]),upload.fields([
            { name: 'aadharCardAttachment', maxCount: 1 },
            { name: 'panCardAttachment', maxCount: 1 },
            { name: 'bankAttachment', maxCount: 1 },
            { name: 'joiningFormAttachment', maxCount: 1 },
            { name: 'otherAttachment', maxCount: 1 },
]),employeeController.registerEmployee);

router.patch("/empUpdate",tokenVerify(["Admin"]),upload.fields([
    { name: 'aadharCardAttachment', maxCount: 1 },
    { name: 'panCardAttachment', maxCount: 1 },
    { name: 'bankAttachment', maxCount: 1 },
    { name: 'joiningFormAttachment', maxCount: 1 },
    { name: 'otherAttachment', maxCount: 1 },
]),employeeController.updateEmployee);

router.post("/add-byExcel",tokenVerify(["Admin"]),uploadExcel.single('file'),addEmployeeByExcel);
router.post("/add-HRbyExcel",tokenVerify(["Admin"]),uploadExcel.single('file'),addHRByExcel);

router.post("/add-Admin",tokenVerify(["Admin"]),employeeController.addAdmin);

router.put("/deactivateEmp",tokenVerify(["Admin"]),employeeController.deactivateEmp);
router.get("/showAllEmployee",tokenVerify(["Admin"]),employeeController.showAllEmployee);

router.get("/seeEmpBackend",tokenVerify(["Admin"]),employeeController.seeEmpBackend);

router.get("/showSingleEmployee",tokenVerify(["Admin"]),employeeController.showSingleEmployee);

router.post("/login",employeeController.login);
router.post("/logout",employeeController.logout);

router.get("/show-joining-HR",tokenVerify(["Admin"]),employeeController.showJoiningHR);
router.delete("/delete-Employee",tokenVerify(["Admin"]),employeeController.deleteEmployee);


//reporting Manager
router.get("/show-reportingManager",tokenVerify(["Admin"]),reportingManagerController.showReportingManager);
router.post("/add-reportingManager",tokenVerify(["Admin"]),reportingManagerController.addReportingManager);
router.put("/update-reportingManager",tokenVerify(["Admin"]),reportingManagerController.updateReportingManager);

router.delete("/delete-reportingManager",tokenVerify(["Admin"]),reportingManagerController.deleteReportingManager);

//joining form
router.post("/add-joiningForm",upload.fields([
    { name: 'aadharCardAttachment', maxCount: 1 },
    { name: 'panCardAttachment', maxCount: 1 },
    { name: 'bankAttachment', maxCount: 1 },
    { name: 'joiningFormAttachment', maxCount: 1 },
    { name: 'photoAttachment', maxCount: 1 },
    { name: 'class10Attachment', maxCount: 1 },
    { name: 'class12Attachment', maxCount: 1 },
    { name: 'graduationAttachment', maxCount: 1 },
    { name: 'postGraduationAttachment', maxCount: 1 },
    { name: 'signatureAttachment', maxCount: 1 },
]),joiningFormController.addJoiningForm);

router.post("/show-joiningFormData",tokenVerify(["Admin"]),joiningFormController.showJoiningFormData);
router.get("/show-allJoiningForms",tokenVerify(["Admin"]),joiningFormController.showAllJoiningForms);
router.patch("/approve-joiningForm",tokenVerify(["Admin"]),joiningFormController.joiningFormApproval);
router.patch("/reject-joiningForm",tokenVerify(["Admin"]),joiningFormController.joiningFormRejection);
router.patch("/setPending-joiningForm",tokenVerify(["Admin"]),joiningFormController.setJoiningFormStatusToPending);
router.delete("/delete-joiningForm",tokenVerify(["Admin"]), joiningFormController.deleteJoiningForm);
router.get("/download-JoiningPdf",tokenVerify(["Admin"]),joiningFormController.generateJoiningFormPDF);



router.patch("/update-empPassword",tokenVerify(["Admin"]),employeeController.backendUpdate);

module.exports = router;    