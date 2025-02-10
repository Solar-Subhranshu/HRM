const { exec } = require("node:child_process");

const filePath = "C://Users//gautam solar//Desktop//HRM machine test//BiometricApp//BiometricApp//bin//Debug//BiometricApp";

exec(`"${filePath}"`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`STDERR: ${stderr}`);
        return;
    }
    console.log(`Biometric Logs:\n${stdout}`);
});
