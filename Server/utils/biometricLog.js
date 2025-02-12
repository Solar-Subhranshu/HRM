const { exec } = require("node:child_process");

const filePath = "C://Users//gautam solar//Desktop//Biometric Connection//NewBiometricConnect//NewBiometricConnect//bin//Debug//NewBiometricConnect";

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
    console.log(typeof stdout);
});


// {00853A19-BD51-419B-9269-2DABE57EB61F}