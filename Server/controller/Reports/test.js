const moment = require("moment");

const monthDate = new Date("2025-10-22");
let today = moment(monthDate);


let startOfGivenMonth = moment(today).startOf("month");
let endOfGivenMonth = moment(today).endOf("month");

// let tempStart = today.month();

console.log(today);
console.log(startOfGivenMonth);
console.log(endOfGivenMonth);