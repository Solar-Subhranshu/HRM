const mongoose = require("mongoose");

const salaryDeductRuleSchema = new mongoose.Schema({
    OfficeTimePolicyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OfficeTimePolicy',
        required:true
    },
    noOfLateInMonth:{ // for salary cut days
        type: Number,
        required:true,
    },
    salaryCutPercentage:{ // for salary cut percentage
        type:Number,
        required:true
    }
});

const SalaryDeductRule  = mongoose.model("SalaryDeductRule",salaryDeductRuleSchema);

module.exports = SalaryDeductRule;


// [
//     { "noOfLateInMonth": 1, "salaryCutPercentage": 10 },
//     { "noOfLateInMonth": 2, "salaryCutPercentage": 11 },
//     { "noOfLateInMonth": 3, "salaryCutPercentage": 12 },
//     { "noOfLateInMonth": 4, "salaryCutPercentage": 13 },
//     { "noOfLateInMonth": 5, "salaryCutPercentage": 14 },
//     { "noOfLateInMonth": 6, "salaryCutPercentage": 15 },
//     { "noOfLateInMonth": 7, "salaryCutPercentage": 16 },
//     { "noOfLateInMonth": 8, "salaryCutPercentage": 17 },
//     { "noOfLateInMonth": 9, "salaryCutPercentage": 18 },
//     { "noOfLateInMonth": 10, "salaryCutPercentage": 19 },
//     { "noOfLateInMonth": 11, "salaryCutPercentage": 20 },
//     { "noOfLateInMonth": 12, "salaryCutPercentage": 21 },
//     { "noOfLateInMonth": 13, "salaryCutPercentage": 22 },
//     { "noOfLateInMonth": 14, "salaryCutPercentage": 23 },
//     { "noOfLateInMonth": 15, "salaryCutPercentage": 24 }
// ]