const employeeController= require("../controller/Employee/employee.controller");

const {addEmployeeByExcel} = require("../controller/Employee/addEmployeeBYExcel");
    
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

router.post("/add-byExcel",uploadExcel.single('file'),employeeController.addEmployeeByExcel);

router.put("/deactivateEmp",tokenVerify,employeeController.deactivateEmp);
router.get("/showAllEmployee",employeeController.showAllEmployee);

router.get("/seeEmpBackend",employeeController.seeEmpBackend);

router.get("/showSingleEmployee",employeeController.showSingleEmployee);

router.post("/login",employeeController.login);

router.get("/show-joining-HR",employeeController.showJoiningHR)

module.exports = router;