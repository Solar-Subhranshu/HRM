const router= require("express").Router();
const {addCompany,showCompany,updateCompanyDetails} = require("../controller/company/company.controller");

router.get("/show-company",showCompany);
router.post("/add-company",addCompany);
router.put("/update-company",updateCompanyDetails);

module.exports = router;