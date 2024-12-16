const {registerEmployee,login} = require("../controller/employee/employee.controller");
const router = require("express").Router();
const {tokenVerify} = require("../middlewares/tokenVerification");
const {showAllDepts,addDept} = require("../controller/employee/employeeDept.controller")

router.post("/empRegister", tokenVerify, registerEmployee);
router.post("/add-department", tokenVerify, addDept);
router.get("/show-department", showAllDepts);
router.post("/login",login);

module.exports = router;