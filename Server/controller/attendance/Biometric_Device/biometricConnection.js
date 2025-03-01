
const {recordAttendanceFromMachine} = require("../attendance.controller");
const zkInstance = require("zkteco-js");
//defining constants
//important for connection with the biometric machine 
const TCP_TIMEOUT = 10000;  //we want to always listen to data from device
const UDP_INPORT = 5000;

var lastLogSize=null;
const device = new zkInstance(process.env.BIOMETRIC_DEVICE_IP,
    process.env.BIOMETRIC_DEVICE_PORT,
    TCP_TIMEOUT,
    UDP_INPORT
);

function handleSocketError(){
    console.log("We will handle socket error in this function.");
}

function handleSocketClosure(){
    console.log("We will handle socket closure in this function.");

    // console.log("Attempting to Re-Connect (Fresh-Connection)");
    // let attempts = 0;
    // const maxAttempts = 10;

    // while(attempts < maxAttempts){
    //     try{
    //         console.log(`Reconnection attempt ${attempts + 1}/${maxAttempts}...`);
    //         const connectionRestored = await device.createSocket();

    //         if(connectionRestored){
    //             console.log("Device Connected Successfully! (Fresh-Connection)");

    //             await device.enableDevice();
    //             await device.getRealTimeLogs(async (data)=>{
    //                 const isSaved = await recordAttendanceFromMachine(data);
    //                 console.log(isSaved);
    //             });

    //             monitorConnectionHealth();
    //             return;
    //         }
    //     }
    //     catch(error){
    //         console.log(`Reconnection Failed: ${error.message}`);
    //     }

    //     attempts++;         
    //     await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 sec before retrying
    // }
    // console.log("Max reconnection attempts reached. Manual intervention required.");     // only 5 attempts when a fresh connection attemps fails. Check the server log after restarting.

    if(!lastLogSize){
        handleDeviceReconnection(10);
    }
    else{
        handleDeviceReconnection(50);
    }
}

function monitorConnectionHealth(){
    // console.log("Device in monitoringConnectionHealth, ",device);
    const intervalId = setInterval(
        async()=>{
            try {
            const currLogSize = await device.getAttendanceSize();
            console.log("currLogSize ",currLogSize);
            lastLogSize = currLogSize;
            console.log("lastLogSize ",lastLogSize);
        } catch (error) {
            console.log(`Device connection lost. Attempting recovery...`);
            clearInterval(intervalId);
            await device.disconnect();
            // handleDeviceReconnection(50);
        }
    }, 10000);
}

async function handleDeviceReconnection(maxAttempts=50){

    let attempts=0;
    // const maxAttempts=50;

    console.log("Device in handleDeviceReconnection func ",typeof(device));

    while(attempts < maxAttempts){
        try{
            console.log(`Reconnection attempt ${attempts + 1}/${maxAttempts}...`);
            //this is the test connection
            const connectionRestored = await device.createSocket();
            console.log("Connection Restored variable status ",connectionRestored);

            if(connectionRestored){ //if the above socket connection is successful, then create dispose the test connection.
                device.ztcp.socket.end(() => {
                    console.log("Test Connection Socket Ended Successfully.");
                });
                device.ztcp.socket.destroy();
                // Wait for the socket to be fully closed
                await new Promise(resolve => setTimeout(resolve, 1000)); //this is a critical line of code, don't f#cking remove it.

                await device.createSocket(handleSocketError,handleSocketClosure);
                console.log("Device Connected Successfully!");

                await device.enableDevice();
                await device.getRealTimeLogs(async (data)=>{
                    const isSaved = await recordAttendanceFromMachine(data);
                    console.log(isSaved);
                });
                
                monitorConnectionHealth();
                return;
            }
        }
        catch(error){
            console.log(`Reconnection Failed: ${error}`);
            // console.log(error);
        }
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 1 min before retrying
    }
    console.log("Max reconnection attempts reached. Manual intervention required.");
    //convey or contact via whatsapp or any other method.
    //send message that all device connection attemps failed. some manual intervention is required.

}

const biometricDeviceHandler = async()=>{
    // console.log(`device ip ${process.env.BIOMETRIC_DEVICE_IP} \ndevice port ${process.env.BIOMETRIC_DEVICE_PORT}`);
    try {
        //socket-connection
        console.log("Awating the Fresh-Socket connection.");

        const connectionEstablished = await device.createSocket(handleSocketError,handleSocketClosure); 
        
        if(connectionEstablished){
            await device.enableDevice();
            console.log("Fresh Connection Established.");
            await device.getRealTimeLogs(async (data)=>{
                // console.log(`log data of userId ${data.userId}`);
                // console.log(data);
                const isSaved = await recordAttendanceFromMachine(data);
                console.log(isSaved);
            });

            monitorConnectionHealth();
        }
        
    } catch (error) {
        console.log("Biometric Device Connection Error\n",error);
    }
}


module.exports={
    biometricDeviceHandler
}
