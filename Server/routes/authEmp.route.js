const {registerEmployee,login,deactivateEmp,showAllEmployee,showSingleEmployee} = require("../controller/employee/employee.controller");
const router = require("express").Router();
const {tokenVerify} = require("../middlewares/tokenVerification");
const {showAllDepts,addDept,updateDept} = require("../controller/Common/department.controller")

router.post("/empRegister",tokenVerify,registerEmployee);
router.post("/add-department",tokenVerify, addDept);
router.get("/show-department", showAllDepts);
router.put("/update-dept",tokenVerify,updateDept);
router.put("/deactivateEmp",tokenVerify,deactivateEmp);
router.get("/showAllEmployee",showAllEmployee);
router.get("/showSingleEmployee",showSingleEmployee);
router.post("/login",login);



module.exports = router;