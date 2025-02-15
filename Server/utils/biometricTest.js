// const net = require("node:net");

// const DEVICE_IP = "192.168.1.140"; // Replace with your device IP
// const DEVICE_PORT = 4370;

// const client = new net.Socket();

// // Convert Comm Key (Example: 1234 → Hex 00 00 04 D2)
// // const commKey = Buffer.from("000004D2", "hex");


// // // Updated handshake command with Comm Key
// // const handshakeCommand = Buffer.concat([
// //     Buffer.from("c50d11126ba2a07ac2ef800450100400", "hex"),
// //     commKey // Appending the Comm Key
// // ]);

// // // const logRequestCommand = Buffer.from("c50d11126ba2a07ac2ef80045018040084160000", "hex");
// // // const logRequestData = Buffer.from("5050827d08000000e80317fc00000000", "hex");

// // // client.setKeepAlive(true); // Enable keep-alive


// const handshakeCommand = Buffer.from("c50d11126ba2a07ac2ef80045010040084060000", "hex");

// // Extracted log request command (from Wireshark)
// const logRequestCommand = Buffer.from("c50d11126ba2a07ac2ef80045018040084160000", "hex");
// const logRequestData = Buffer.from("5050827d08000000e80317fc00000000", "hex");

// client.connect(DEVICE_PORT, DEVICE_IP, () => {
//     console.log("✅ Connected to biometric device.");
//     // console.log(client)
//     console.log(`Connected to device at ${DEVICE_IP}:${DEVICE_PORT}`);
 
//     // // Step 1: Send Handshake
//     console.log("📤 Sending Handshake...",handshakeCommand);
//     client.write(handshakeCommand);
// })

// client.on("end",()=>{
//     console.log("This line is printed when socket ends connection.")
// })

// client.on("data", (data) => {
//     console.log("📥 Received Response (HEX):", data.toString("hex"));

//     if (data.toString("hex").includes("5010")) {
//         console.log("✅ Handshake Acknowledged. Sending Log Request...");

//         setTimeout(() => {
//             client.write(logRequestCommand);
//             client.write(logRequestData);
//         }, 2000); // Wait 2 seconds before sending log request
//     } else if (data.toString("hex").includes("5018")) {
//         console.log("✅ Attendance Data Received!");
//     }
// });

// client.on("error", (err) => {
//     console.error("❌ Connection Error:", err);
// });

// client.on("close", () => {
//     console.log("🔌 Connection closed.");
// });

//testing new console app

// const scriptPath = path.join(__dirname, "BiometricNetFramework//bin//Debug//BiometricNetFramework4.exe");

const { exec } = require("node:child_process");
const path = require("path");

// const scriptPath = path.join(__dirname, "BiometricNetFramework", "bin", "Debug", "BiometricNetFramework4.exe");
const filePath = "/root/HRM/Server/BiometricNetFramework/bin/Debug/BiometricNetFramework4.exe"

exec(`wine "${filePath}"`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`STDERR: ${stderr}`);
        return;
    }
    console.log(`Biometric Logs:\n${stdout}`);
    console.log(typeof stdout);
});
