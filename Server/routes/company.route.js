const router= require("express").Router();
const {addCompany,showCompany} = require("../controller/company/company.controller");

router.get("/show-company",showCompany);
router.post("/add-company",addCompany);

module.exports = router;