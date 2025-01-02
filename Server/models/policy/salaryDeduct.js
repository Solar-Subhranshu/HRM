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