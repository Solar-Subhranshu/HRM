const router= require("express").Router();
const {addBranch,showBranch,updateBranchDetails,showAllBranch} = require("../controller/Company/branch.controller");
const tokenVerify = require("../middlewares/tokenVerification");

router.get("/show-branch",showBranch);
router.post("/add-branch",tokenVerify,addBranch);
router.put("/update-branch",tokenVerify,updateBranchDetails);
router.get("/show-all-companyDetails",showAllBranch)

module.exports = router;