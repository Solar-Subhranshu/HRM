const cron = require("node-cron");
const moment = require("moment");

cron.schedule("*/10 * * * * *",()=>{
    console.log("Cron Job Running at ",moment().format("hh:mm:ss A"));
})