const router= require("express").Router();
const {addBranch,showBranch,updateBranchDetails} = require("../controller/Company/branch.controller");
const tokenVerify = require("../middlewares/tokenVerification");

router.get("/show-branch",showBranch);
router.post("/add-branch",tokenVerify,addBranch);
router.put("/update-branch",tokenVerify,updateBranchDetails);

module.exports = router;