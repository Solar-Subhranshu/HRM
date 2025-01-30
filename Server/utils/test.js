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

//     const date1 = new Date();
//     console.log(date1.toISOString()
//     .split('T')[0]
// );

    // let str = {
    //     "companyId":"676545d6bde9d701481ea783",
    //     "name": "Rakesh Khanna",
    //     "father_husbandName": "Ramesh Khanna",
    //     "dateOfBirth": "2005-05-25",
    //     "gender": "Male",
    //     "maritalStatus": "Un-married",
    //     "bloodGroup": "A Positive",
    //     "personalPhoneNum": "9852225321",
    //     "personalEmail": "Rakeshkhanna432@gmail.com",
    //     "currentAddress": "Plot-420 Bhangaar Market",
    //     "currentState": "Uttar Pradesh",
    //     "currentCity": "Meerut",
    //     "currentPinCode": "250001",
    //     "permanentAddress": "Plot-420 Bhangaar Market",
    //     "permanentState": "Uttar Pradesh",
    //     "permanentCity": "Meerut",
    //     "permanentPinCode": "250001",
    //     "interviewDate": "7-12-2024",
    //     "joiningDate": "10-12-2024",
    //     "department": "",
    //     "designation": "",
    //     "employeeType": "Full-Time",
    //     "modeOfRecruitment": "Offline",
    //     "reference": "",
    //     "bankName": "AXIS bank",
    //     "branchName": "Meerut",
    //     "bankAccount": "552231000254",
    //     "bankIFSC": "AXIS0025",
    //     "bankAccountHolderName": "Rakesh Khanna",
    //     "bankAddress": "Bhangaar Market, Meerut",
    //     "panCard": "BFGTL2025A",
    //     "aadharCard": "202500120010",
    //     "uanNumber": "",
    //     "emergencyContact": [{"name":"Ramesh Khanna","relation":"father","address":"Meerut","phoneNumber":9874561230}],
    // }