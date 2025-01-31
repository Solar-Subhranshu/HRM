const axios = require('axios');

const DEVICE_IP = "192.168.1.201"; // Replace with your device IP
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