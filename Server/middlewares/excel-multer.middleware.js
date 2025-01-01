const multer = require("multer");
const storage = multer.memoryStorage();
const uploadExcel = multer({ storage: storage });

module.exports = uploadExcel;