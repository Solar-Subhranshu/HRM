const router= require("express").Router();
const {addDesignation,showDesignation   } = require("../../controller/common/designation.controller");

router.get("/show-designation",showDesignation);
router.post("/add-designation",addDesignation);
// router.put("/update-designation",updateDesignation);

module.exports = router;
