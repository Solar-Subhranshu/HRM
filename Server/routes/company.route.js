const router= require("express").Router();
const {addCompany,showCompany,updateCompanyName} = require("../controller/company/company.controller");
const tokenVerify = require("../middlewares/tokenVerification");

router.get("/show-company",showCompany);
router.post("/add-company",tokenVerify,addCompany);
router.put("/update-company",tokenVerify,updateCompanyName);

module.exports = router;