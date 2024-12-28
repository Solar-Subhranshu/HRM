require("dotenv").config();
const express=require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app=express();
const path = require("path")
require("./db/db");
require("./middlewares/multer.middleware")
const authEmpRoute = require("./routes/authEmp.route");
const companyRoute= require("./routes/company.route");
const branchRoute =require("./routes/branch.route");
const commonRoute = require('./routes/common.router');

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: true,
    credentials:true
}));
app.use(express.urlencoded({ extended:true }));
app.use("/auth", authEmpRoute);
app.use("/company",companyRoute);
app.use("/common",commonRoute);
app.use("/branch",branchRoute);

app.use("/uploads", express.static(path.join(__dirname, "uploads/temp")));

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})