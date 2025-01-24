const moment = require("moment");

let str = "2025-01-14T00:00:00.000Z"

console.log(str);
console.log(moment(str).format("HH:mm"));
console.log(moment(str).hours());
console.log(moment(str).minutes());
