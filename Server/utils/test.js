const moment = require("moment");

// let str = "2025-01-14T00:00:00.000Z"

// console.log(str);
// console.log(moment(str).format("HH:mm"));
// console.log(moment(str).hours());
// console.log(moment(str).minutes());


    const firstDayOfMonth = moment().startOf("month").toDate();
    const lastDayOfMonth = moment().endOf("month").toDate();

    console.log(firstDayOfMonth);
    console.log(lastDayOfMonth);
    console.log(moment(firstDayOfMonth).format("DD-MM-YYYY"));
    console.log(moment(lastDayOfMonth).format("DD-MM-YYYY"));




    