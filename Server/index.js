require("dotenv").config();
const express=require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const moment = require("moment");
const path = require("path")
require("./db/db");
require("./middlewares/multer.middleware")
const authEmpRoute = require("./routes/authEmp.route");
const commonRoute = require('./routes/common.router');
const attendanceRoute = require('./routes/attendance.router');

const app=express();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json({limit: '20mb'}));
app.use(cors({
    origin: true,
    credentials:true
}));
app.use(express.urlencoded({ extended:true }));
app.use((req, res, next) => {
    console.log(`(${moment().format("DD-MM-YYYY hh:mm A")}) ${req.method} ${req.url}`); //for show api urls
    next();
});
app.use("/auth", authEmpRoute);
app.use("/common",commonRoute);
app.use("/attendance",attendanceRoute);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.get("/",(req,res)=>{
//     res.send("Hello World");
// });

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})