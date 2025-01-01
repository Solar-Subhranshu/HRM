const Employee = require("../../models/auth/employee.model");
const excelToJSON = require("../../utils/excelToJson");

async function findOne(model,data){
    await model.findOne(data)
    .then((response,error)=>{
        if(response) return response._id;
        if(error)  return [];
    }) 
}

const addEmployeeByExcel = async(req,res) =>{
    try {
        const JSON_Data = await excelToJSON(req.file.buffer);
        // console.log(JSON_Data)
            // Process each row to convert date strings into valid Date objects
        
        const employees=JSON_Data.map((row)=>({
            employeeCode: row['employeeCode'],
            name:row['name'],
            father_husbandName:row['father_husbandName'],
            dateOfBirth: row['dateOfBirth'],
            personalPhoneNum: row['personalPhoneNum'],
            personalEmail: row['personalEmail'],
            panCard : row['panCard'],
            aadharCard : row['aadharCard'],
            qualification : "",   //check for reference
            degree :"",            //check for reference
            permanentAddress : row['permanentAddress'],
            permanentPinCode : row['permanentPinCode'],
            currentAddress : row['currentAddress'],
            currentPinCode : row['currentPinCode'],
            bankName : row['bankName'],
            branchName : row['branchName'],
            bankAccount : row['bankAccount'],
            bankIFSC : row['bankIFSC'],
            bankAccountHolderName : row['bankAccountHolderName'],
            bankAddress : row['bankAddress'],
            reportingManager : "",          //check for reference
            companyPhoneNum : row['companyPhoneNum'],
            companyEmail : row['companyEmail'],
            joiningDate : row['joiningDate'],
            company : "",           //check for reference
            branch : "",            //check for reference
            department : "",        //check for reference
            designation : "",       //check for reference
            officeTimePolicy : "",      //check for reference
            shift : ""              //check for reference
        }));

        

        const insertResponse = await Employee.insertMany(employees);

        if(insertResponse){
            return res.status(200).json({
                success:true,
                message:'File Uploaded Successfully.'
            });
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.',
            error:error.message
        });
    }
}

module.exports={addEmployeeByExcel}