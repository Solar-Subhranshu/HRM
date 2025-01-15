require("dotenv").config();
const express=require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app=express();
const path = require("path")
require("./db/db");
require("./middlewares/multer.middleware")
const authEmpRoute = require("./routes/authEmp.route");
const commonRoute = require('./routes/common.router');
const attendanceRoute = require('./routes/attendance.router');

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json({limit: '5mb'}));
app.use(cors({
    origin: true,
    credentials:true
}));
app.use(express.urlencoded({ extended:true }));
app.use("/auth", authEmpRoute);
app.use("/common",commonRoute);
app.use("/attendance",attendanceRoute);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})