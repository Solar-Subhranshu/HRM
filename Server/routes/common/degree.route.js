const router = require("express").Router();
const {showDegree,addDegree,deleteDegree} = require("../../controller/Common/degree.controller")

const {tokenVerify} = require("../../middlewares/tokenVerification");

router.get("/show-degree",showDegree);
router.post("/add-degree",tokenVerify,addDegree);
router.delete("/delete-degree",deleteDegree);

module.exports = router;