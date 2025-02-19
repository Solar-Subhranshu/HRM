const Zkteco = require("zkteco-js");

const manageZktecoDevice = async () => {
    const device = new Zkteco("122.160.141.26", 4370, 5200, 5000);

    try {
        // Create socket connection to the device
        await device.createSocket();

        const info =  await device.getAttendances(()=>{});
        console.log(info);

        // // Retrieve and log all attendance records
        // const attendanceLogs = await device.getAttendances();
        // console.log(attendanceLogs);

        //✔
        // const isSuccess = await device.voiceTest();
        // console.log(isSuccess);


        // Listen for real-time logs
        // await device.getRealTimeLogs((realTimeLog) => {
        //     console.log(realTimeLog);
        // });

        console.log("Line written after real-time function");
        // Manually disconnect after using real-time logs
        await device.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
};

manageZktecoDevice();