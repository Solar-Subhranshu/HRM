// Test code:
const ZKTeco = require("zkteco");

const test = async () => {
  try {
    // Define the IP address of the device.
    const deviceIp = "122.160.141.26";

    // //  Ips
    // const ips = ["192.168.1.201"];
    // let zkInstance = new ZKTeco(devices);

    // List of devices with their respective IP addresses and ports.
    const devices = [{ deviceIp: "122.160.141.26", devicePort: "4370" }];
    const device = { deviceIp: "122.160.141.26", devicePort: "4370" };
    let zkInstance = new ZKTeco(devices);

    // Connect all devices
    await zkInstance.connectAll();

    // Retrieve users based on device IP addresses in the machine.
    const users = await zkInstance.getUsers(deviceIp);

    // console.log(users);

    // // Retrieve all devices currently connected.
    const getAllConnectedIps = await zkInstance.getAllConnectedIps();
    console.log(getAllConnectedIps);

    // Retrieve all logs stored in the machine.
    // At the moment, there's no filter to select specific device logs, it captures everything!!
    const logs = await zkInstance.getAttendances(deviceIp);
    // console.log(`logs ${logs?.length} \nAll logs ${logs}`);
    console.log(logs);


  } catch (e) {
    console.log(e);
    if (e.code === "EADDRINUSE") {
    }
  }
};

test(); // in the end we execute the function