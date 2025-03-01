const employeeController= require("../controller/emp/employee.controller");
const joiningFormController = require("../controller/joiningForm/joiningForm.controller");
const reportingManagerController = require("../controller/emp/reportingManager.controller");
const {addEmployeeByExcel,addHRByExcel} = require("../controller/emp/addEmployeeBYExcel");
    
const router = require("express").Router();
const tokenVerify = require("../middlewares/tokenVerification")
const uploadExcel =  require("../middlewares/excel-multer.middleware")
const upload = require("../middlewares/multer.middleware")

router.post("/empRegister",tokenVerify,upload.fields([
            { name: 'aadharCardAttachment', maxCount: 1 },
            { name: 'panCardAttachment', maxCount: 1 },
            { name: 'bankAttachment', maxCount: 1 },
            { name: 'joiningFormAttachment', maxCount: 1 },
            { name: 'otherAttachment', maxCount: 1 },
]),employeeController.registerEmployee);

router.patch("/empUpdate",tokenVerify,upload.fields([
    { name: 'aadharCardAttachment', maxCount: 1 },
    { name: 'panCardAttachment', maxCount: 1 },
    { name: 'bankAttachment', maxCount: 1 },
    { name: 'joiningFormAttachment', maxCount: 1 },
    { name: 'otherAttachment', maxCount: 1 },
]),employeeController.updateEmployee);

router.post("/add-byExcel",tokenVerify,uploadExcel.single('file'),addEmployeeByExcel);
router.post("/add-HRbyExcel",tokenVerify,uploadExcel.single('file'),addHRByExcel);

router.post("/add-Admin",employeeController.addAdmin);

router.put("/deactivateEmp",tokenVerify,employeeController.deactivateEmp);
router.get("/showAllEmployee",employeeController.showAllEmployee);

router.get("/seeEmpBackend",employeeController.seeEmpBackend);

router.get("/showSingleEmployee",employeeController.showSingleEmployee);

router.post("/login",employeeController.login);
router.post("/logout",employeeController.logout);

router.get("/show-joining-HR",employeeController.showJoiningHR);
router.delete("/delete-Employee",tokenVerify,employeeController.deleteEmployee);


//reporting Manager
router.get("/show-reportingManager",reportingManagerController.showReportingManager);
router.post("/add-reportingManager",tokenVerify,reportingManagerController.addReportingManager);
router.put("/update-reportingManager",tokenVerify,reportingManagerController.updateReportingManager);

router.delete("/delete-reportingManager",reportingManagerController.deleteReportingManager);

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

router.post("/show-joiningFormData",tokenVerify,joiningFormController.showJoiningFormData);
router.get("/show-allJoiningForms",tokenVerify,joiningFormController.showAllJoiningForms);
router.patch("/approve-joiningForm",tokenVerify,joiningFormController.joiningFormApproval);
router.patch("/reject-joiningForm",tokenVerify,joiningFormController.joiningFormRejection);
router.patch("/setPending-joiningForm",tokenVerify,joiningFormController.setJoiningFormStatusToPending);
router.delete("/delete-joiningForm",tokenVerify, joiningFormController.deleteJoiningForm);
router.get("/download-JoiningPdf",joiningFormController.generateJoiningFormPDF);



router.patch("/update-empPassword",employeeController.backendUpdate);

module.exports = router;    