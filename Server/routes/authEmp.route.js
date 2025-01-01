const {registerEmployee,login,deactivateEmp,showAllEmployee,showSingleEmployee,
    seeEmpBackend,showReportingManager,updateEmployee} = require("../controller/Employee/employee.controller");

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
]),registerEmployee);

router.patch("/empUpdate",tokenVerify,upload.fields([
    { name: 'aadharCardAttachment', maxCount: 1 },
    { name: 'panCardAttachment', maxCount: 1 },
    { name: 'bankAttachment', maxCount: 1 },
    { name: 'joiningFormAttachment', maxCount: 1 },
    { name: 'otherAttachment', maxCount: 1 },
]),updateEmployee);

router.post("/add-byExcel",uploadExcel.single('file'),addEmployeeByExcel);

router.put("/deactivateEmp",tokenVerify,deactivateEmp);
router.get("/showAllEmployee",showAllEmployee);

router.get("/seeEmpBackend",seeEmpBackend);

router.get("/showSingleEmployee",showSingleEmployee);

router.post("/login",login);

router.get("/show-reporting-manager",showReportingManager)

module.exports = router;