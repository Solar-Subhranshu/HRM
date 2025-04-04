require("dotenv").config();
const express=require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const moment = require("moment");
const path = require("path")
const {connectDB} = require("./db/db");
require("./middlewares/multer.middleware")
const authEmpRoute = require("./routes/authEmp.route");
const commonRoute = require('./routes/common.router');
const attendanceRoute = require('./routes/attendance.router');
const reportRoute = require("./routes/reports.router");
const biometricDevice = require("./controller/attendance/Biometric_Device/biometricConnection");

const app=express();

const PORT = process.env.PORT || 5000;
console.log(PORT);

app.use(cookieParser());
app.use(express.json({limit: '100mb'}));
app.use((req, res, next) => {
  const now = new Date();
  const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000)) // Convert to IST
    .toISOString()
    .replace("T", " ") // Replace "T" with space for readability
    .replace("Z", " IST"); // Add "IST" at the end

  console.log(`[${istTime}] ${req.method} ${req.url}`);
  next();
});
// app.use(cors({
//     origin: true,
//     credentials:true
// }));
const allowedOrigins = [
  'http://88.222.214.93:3002',
  'http://localhost:3000', // Optional for local testing
];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allow specific methods
  credentials: true, // Allow cookies if needed
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended:true,limit:'100mb' }));
// app.use((req, res, next) => {
//     console.log(`(${moment().tz("Asia/Kolkata").format("DD-MM-YYYY hh:mm A")}) ${req.method} ${req.url}`); //for show api urls
//     next();
// });



app.use("/auth", authEmpRoute);
app.use("/common",commonRoute);
app.use("/attendance",attendanceRoute);
app.use("/report",reportRoute);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.get("/",(req,res)=>{
//     res.send("Hello World");
// });

connectDB()
.then(()=>{
    app.listen(PORT, () => {
        console.log(`⚙️  Server running at port ${PORT}`);
    });
    // biometricDevice.biometricDeviceHandler();
})
.catch((err)=> console.log(`Connection Error ${err.message}`))
