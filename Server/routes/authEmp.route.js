const {registerEmployee,login,deactivateEmp,showAllEmployee,showSingleEmployee,showReportingManager} = require("../controller/Employee/employee.controller");
const router = require("express").Router();
const tokenVerify = require("../middlewares/tokenVerification")

router.post("/empRegister",tokenVerify,registerEmployee);
router.put("/deactivateEmp",tokenVerify,deactivateEmp);
router.get("/showAllEmployee",showAllEmployee);

// router.get("/showSingleEmployee",showSingleEmployee);

router.post("/login",login);

router.get("/show-reporting-manager",showReportingManager)

module.exports = router;