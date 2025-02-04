const axios = require('axios');

const DEVICE_IP = "122.160.141.26"; // Replace with your device IP
const DEVICE_PORT = "4730"; // API port
const API_ENDPOINT = `http://${DEVICE_IP}:${DEVICE_PORT}/api/attendance`;

const fetchAttendanceLogs = async () => {
  try {
    const response = await axios.get(API_ENDPOINT);
    console.log("Attendance Data:", response.data);
  } catch (error) {
    console.error("Error fetching attendance logs:", error.message);
  }
};

// Call function to fetch logs
fetchAttendanceLogs();

// const net = require("net");

// const DEVICE_IP = "122.160.141.26";
// const DEVICE_PORT = 4370; // Check the correct port

// const client = new net.Socket();
// client.connect(DEVICE_PORT, DEVICE_IP, () => {
//   console.log("Connected to ESSL Device");
// });

// client.on("data", (data) => {
//   console.log("Received:", data.toString());
// });

// client.on("error", (err) => {
//   console.error("Connection Error:", err);
// });

// client.on("close", () => {
//   console.log("Connection Closed");
// });
