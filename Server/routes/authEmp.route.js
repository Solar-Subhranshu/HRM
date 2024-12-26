const {registerEmployee,login,deactivateEmp,showAllEmployee,seeEmpBackend,showReportingManager} = require("../controller/Employee/employee.controller");
const router = require("express").Router();
const tokenVerify = require("../middlewares/tokenVerification")
const upload =  require("../middlewares/multer.middleware")

router.post("/empRegister",tokenVerify,upload.fields([
            { name: 'aadharCardAttachment', maxCount: 1 },
            { name: 'panCardAttachment', maxCount: 1 },
            { name: 'bankAttachment', maxCount: 1 },
            { name: 'joiningFormAttachment', maxCount: 1 },
            { name: 'otherAttachment', maxCount: 1 },
]),registerEmployee);

router.put("/deactivateEmp",tokenVerify,deactivateEmp);
router.get("/showAllEmployee",showAllEmployee);

router.get("/seeEmpBackend",seeEmpBackend);

// router.get("/showSingleEmployee",showSingleEmployee);

router.post("/login",login);

router.get("/show-reporting-manager",showReportingManager)

module.exports = router;