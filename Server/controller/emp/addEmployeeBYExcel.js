const Employee = require("../../models/auth/employee.model");
const excelToJSON = require("../../utils/excelToJson");
const Qualification = require("../../models/common/qualification.model");
const Degree = require("../../models/common/degree.model");
const Company = require("../../models/common/company.model");
const Branch = require("../../models/common/branch.model");
const Department = require("../../models/common/department.model");
const Designation = require("../../models/common/designation.model");
const Shift = require("../../models/common/shift.model");
const OfficeTimePolicy = require("../../models/common/officeTimePolicy.model");
const WorkType = require("../../models/common/workType.model");

const generateRandomNumbers = require("../../utils/randomNumGenerator");
// const xlsx = require("xlsx");

//here we are not inserting images through excel.
const addEmployeeByExcel = async(req,res) =>{
    try {
        const employeeId = req.employeeId;
        const JSON_Data = await excelToJSON(req.file.buffer);
        // console.log(JSON_Data)

        //Pre-Fetchin the data from database
        const employeeData = await Employee.find().lean();
        const departmentData = await Department.find().lean();
        const designationData = await Designation.find().lean();
        const qualificationData = await Qualification.find().lean();
        const degreeData = await Degree.find().lean();
        const companyData = await Company.find().lean();
        const branchData = await Branch.find().lean();
        const shiftData = await Shift.find().lean();
        const officeTimePolicyData = await OfficeTimePolicy.find().lean();
        const workTypeData = await WorkType.find().lean();

        //@Array - dbData is pre-Fetched Data from db
        //@Object - filter is object that contains fieldname and value to be searched in dbData 
        const getId = (dbData,filter)=>{
            const key= Object.keys(filter)[0];
            const value= filter[key];
            const result = dbData.find((d)=> {return d[key]===value});
            return result? result._id.toString() : "NA";
        }
        
        // Process each row to convert date strings into valid Date objects  
        const employeesMap=JSON_Data.map((row)=>({
            employeeCode: row['employeeCode'],
            name:row['name'],
            password:String(row['employeeCode'] + "-" + generateRandomNumbers()),
            father_husbandName:row['father_husbandName'],
            dateOfBirth: row['dateOfBirth'],
            personalPhoneNum: row['personalPhoneNum'],
            personalEmail: row['personalEmail'],
            panCard : row['panCard'],
            aadharCard : row['aadharCard'],
            qualification : getId(qualificationData,{name:`${row['qualification']}`}),   //check for reference
            degree : getId(degreeData,{name:`${row['degree']}`}),            //check for reference
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
            reportingManager : getId(employeeData,{name:`${row['reportingManager']}`}),          //check for reference
            companyPhoneNum : row['companyPhoneNum'],
            companyEmail : row['companyEmail'],
            joiningDate : row['joiningDate'],
            company : getId(companyData,{name:`${row['company']}`}),           //check for reference
            branch : getId(branchData,{name:`${row['branch']}`}),            //check for reference
            department : getId(departmentData,{department:`${row['department']}`}),        //check for reference
            designation : getId(designationData,{designation:`${row['designation']}`}),       //check for reference
            officeTimePolicy : getId(officeTimePolicyData,{policyName:`${row['officeTimePolicy']}`}),      //check for reference
            shift : getId(shiftData,{name:`${row['shift']}`}),
            joiningHR : getId(employeeData,{name:`${row['joiningHR']}`}),
            workType : getId(workTypeData,{workType : `${row['workType']}`}),        //check for reference
            created_By:employeeId
        }));

        //filtering invalid data to return to user as excel
        const invalidEntries = employeesMap.filter(
            (employee)=> Object.values(employee).includes("NA")
        )

        //filtering out valid Enteries
        const validEntries = employeesMap.filter(
            (employee)=> !Object.values(employee).includes("NA")
        )

        //filtering duplicate entries that's already in DB
        const duplicateEntries = validEntries.filter((entry) => {
            return employeeData.some(existingEmployee =>{return (existingEmployee.employeeCode === entry.employeeCode) 
                                                            || (existingEmployee.aadharCard===entry.aadharCard)
                                                            ||(existingEmployee.panCard===entry.panCard)
                                                            || (existingEmployee.bankAccount===entry.bankAccount) 
                                                        } );
        });

        //filtering out that no duplicate data gets back into database
        const insertableEntries = validEntries.filter((entry) => {
            return !employeeData.some(existingEmployee =>{return (existingEmployee.employeeCode === entry.employeeCode) 
                                                            || (existingEmployee.aadharCard===entry.aadharCard)
                                                            ||(existingEmployee.panCard===entry.panCard)
                                                            || (existingEmployee.bankAccount===entry.bankAccount) 
                                                        } );
        });

        if(validEntries.length>0){
            console.log(`You have ${validEntries.length} valid-Enteries`)
        }
        if(invalidEntries.length>0){
            console.log(`You have ${invalidEntries.length} invalid-Enteries`);
        }
        if(duplicateEntries.length>0){
            console.log(`You have ${duplicateEntries.length} duplicate-Enteries`);
        }
        if(insertableEntries){
            console.log(`You have ${insertableEntries.length} insertable-Enteries.`)
        }

        // const worksheet1 = invalidEntries.length>0 ? xlsx.utils.json_to_sheet(invalidEntries) : null;
        // const worksheet2 = duplicateEntries.length>0 ? xlsx.utils.json_to_sheet(duplicateEntries) : null;
        
        // let workbook=null;
        // if(worksheet1 || worksheet2){
        //     workbook = xlsx.utils.book_new();
        //     if(worksheet1) xlsx.utils.book_append_sheet(workbook,worksheet1,"Invalid Enteries");
        //     if(worksheet2) xlsx.utils.book_append_sheet(workbook,worksheet2,"Duplicate Enteries");
        // }

        // let myBuffer=null;
        // if(workbook){
        //     myBuffer = xlsx.write(workbook,{bookType:'xlsx', type:'buffer'});
        //     res.setHeader('Content-Disposition', 'attachment; filename="Rejected_Entries.xlsx"');
        //     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        // }

        if(insertableEntries>0){
            const insertResponse = await Employee.insertMany(insertableEntries);

            if(insertResponse){
                return res.status(201).json({
                    success:true,
                    message:"Excel-Data Saved Successfully to Database.",
                    invalid_data: invalidEntries.length>0 ? invalidEntries : [],
                    duplicate_data: duplicateEntries.length>0 ? duplicateEntries : []
                }); 
            }
            else{
                throw new Error("Insert Operation Failed! Excel-Data Not Saved! Try Again");
            }
        }
        else{
            return res.status(400).json({
                success:false,
                message: "The uploaded excel does not have any valid insertable entry. ",
                invalid_data: invalidEntries.length>0 ? invalidEntries : [],
                duplicate_data: duplicateEntries.length>0 ? duplicateEntries : []
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

const addHRByExcel = async(req,res)=>{
    try {
        const employeeId = req.employeeId;
        const JSON_Data = await excelToJSON(req.file.buffer);
        //console.log(JSON_Data);

        const hrMap = JSON_Data.map((row)=>({
            employeeCode: row['employeeCode'] ? row['employeeCode'] : 'NA',
            name: row['name'] ? row['name'] : "NA",
            personalPhoneNum : row['phoneNum'] ? row['phoneNum'] : "NA",
            created_By : employeeId
        }));
        console.log(hrMap);

        const insertableEntries = hrMap.filter(
            (employee)=> !Object.values(employee).includes("NA")
        );

        const insertResponse = await Employee.insertMany(insertableEntries);
        if(insertResponse){
            return res.status(201).json({
                success:true,
                message:"Excel-Data Saved Successfully.",
                data:insertResponse
            });
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Excel Data wrong!",
                data:hrMap
            })
        }
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.',
            error:error.message
        });
    }
}

module.exports={
    addEmployeeByExcel,
    addHRByExcel
}