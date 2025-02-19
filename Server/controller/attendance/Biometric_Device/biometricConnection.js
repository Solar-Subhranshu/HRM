require("dotenv").config(
    {path:"../../../.env"}
);
const zkInstance = require("zkteco-js");
//defining constants
//important for connection with the biometric machine 
const TCP_TIMEOUT = 10000;  //we want to always listen to data from device
const UDP_INPORT = 5000;

const connectBiometric = async()=>{

    console.log(`device ip ${process.env.BIOMETRIC_DEVICE_IP} \ndevice port ${process.env.BIOMETRIC_DEVICE_PORT}`);
    try {
        const device = new zkInstance(process.env.BIOMETRIC_DEVICE_IP,
            process.env.BIOMETRIC_DEVICE_PORT,
            TCP_TIMEOUT,
            UDP_INPORT
        );

        //socket-connection
        await device.createSocket();
        
        // await device.enableDevice();
        // await device.getRealTimeLogs((data)=>{
        //     console.log(`log data ${data}`);
        //     console.log(data);
        // });
       
        return device
    } catch (error) {
        // console.log("Biometric Device Connection Error\n",error);
        // await device.disconnect();
    }
}

connectBiometric()

