// require("dotenv").config(
//     {path:"../../../.env"}
// );

const {recordAttendanceFromMachine} = require("../attendance.controller");
const zkInstance = require("zkteco-js");
//defining constants
//important for connection with the biometric machine 
const TCP_TIMEOUT = 10000;  //we want to always listen to data from device
const UDP_INPORT = 5000;

const biometricDeviceHandler = async()=>{

    // console.log(`device ip ${process.env.BIOMETRIC_DEVICE_IP} \ndevice port ${process.env.BIOMETRIC_DEVICE_PORT}`);
    try {
        const device = new zkInstance('192.168.1.140',
            process.env.BIOMETRIC_DEVICE_PORT,
            TCP_TIMEOUT,
            UDP_INPORT
        );

        console.log("Awating the socket connection.");

        await device.createSocket();
        //socket-connection
        // const temp = await device.createSocket();
        // console.log(temp);
        // const registeredUsers = await device.getUsers();
        // console.log(registeredUsers);
        
        await device.enableDevice();
        await device.getRealTimeLogs(async (data)=>{
            // console.log(`log data of userId ${data.userId}`);
            // console.log(data);
            const isSaved = await recordAttendanceFromMachine(data);
            console.log(isSaved);
        });

    } catch (error) {
        console.log("Biometric Device Connection Error\n",error);
    }
}


module.exports={
    biometricDeviceHandler
}
