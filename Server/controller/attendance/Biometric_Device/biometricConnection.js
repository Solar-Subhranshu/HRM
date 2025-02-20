require("dotenv").config(
    {path:"../../../.env"}
);
const zkInstance = require("zkteco-js");
//defining constants
//important for connection with the biometric machine 
const TCP_TIMEOUT = 10000;  //we want to always listen to data from device
const UDP_INPORT = 5000;

const biometricDeviceHandler = async()=>{

    // console.log(`device ip ${process.env.BIOMETRIC_DEVICE_IP} \ndevice port ${process.env.BIOMETRIC_DEVICE_PORT}`);
    try {
        const device = new zkInstance(process.env.BIOMETRIC_DEVICE_IP,
            process.env.BIOMETRIC_DEVICE_PORT,
            TCP_TIMEOUT,
            UDP_INPORT
        );

        console.log("Awating the socket connection.");

        //socket-connection
        await device.createSocket();
        
        const registeredUsers = await device.getUsers();
        
        
        await device.enableDevice();
        await device.getRealTimeLogs((data)=>{
            console.log(`log data of userId ${data.userId}`);
            console.log(data);
        });

    } catch (error) {
        console.log("Biometric Device Connection Error\n",error);
    }
}




biometricDeviceHandler()