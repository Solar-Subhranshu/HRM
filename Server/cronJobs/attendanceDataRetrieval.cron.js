const cron = require("node-cron");
const moment = require("moment");
const { exec } = require("node:child_process");

const asyncFun =()=>{
    const filePath = "C://Users//gautam solar//Desktop//Test App Net only//BiometricApp1//BiometricApp1//bin//Debug//net8.0//BiometricApp1";
    let attendanceLog;

    const isExecuted=exec(`"${filePath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`STDERR: ${stderr}`);
            return;
        }
        console.log(`Biometric Logs:\n${stdout}`);
        attendanceLog=stdout;
    })
    
    if(isExecuted)
        return attendanceLog;
    else
        return null
}

const job1 = async()=> {
    try {
        await asyncFun()
        .then((res,rej)=>{
            console.log("\nNew line Char")
            console.log(res);
        })
        
    } catch (error) {
        console.log(error.message);
    }
}
job1();


