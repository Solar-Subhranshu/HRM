const path = require("path");

const absolutePath = (localURL)=>{
    const filePath = localURL.replace('http://localhost:8000', '');
    const absolutePath = path.join(__dirname, '..', filePath);

    return absolutePath;
}

module.exports = absolutePath;