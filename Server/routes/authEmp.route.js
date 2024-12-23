const {registerEmployee,login,deactivateEmp,showAllEmployee,showSingleEmployee} = require("../controller/employee/employee.controller");
const router = require("express").Router();
const tokenVerify = require("../middlewares/tokenVerification")

router.post("/empRegister",tokenVerify,registerEmployee);
router.put("/deactivateEmp",tokenVerify,deactivateEmp);
router.get("/showAllEmployee",showAllEmployee);
router.get("/showSingleEmployee",showSingleEmployee);
router.post("/login",login);



module.exports = router;