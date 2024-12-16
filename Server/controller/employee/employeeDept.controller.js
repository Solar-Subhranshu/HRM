const EmployeeDept = require ("../../models/Employee/employeeDept")


const showAllDepts = async(req,res) => {
    try {
        const allDepts= await EmployeeDept.find();
        if (allDepts.length===0){
            return res.status(200).json({
                success : true,
                message : "No Departments Found"
            });
        }
        else{
            return res.status(200).json({
                success : true,
                message :allDepts
            })
        }
    }
    catch(error) {

    return res.status(500).json({
        success :false,
        message: "Internal Server Error! Couldn't show Departments. ",
        error: error.message
    });        
    }
};

const addDept = async (req,res) => {
    try{
        const {dept} = req.body || req.query;
        // console.log(dept);
        const employeeId = req.employeeId;
        // console.log("empID", employeeId)
        if(!dept){
            return res.status(400).json({
                success : false,
                message : "Field can't be empty"
            });
        }

        const deptExists = await EmployeeDept.findOne({empDept :dept});
        if(deptExists){
            return res.status(400).json({
                success : false,
                message : "Department Already Exists"
            });
        }

        const newDept =new EmployeeDept({
            empDept : dept,
            createdBy : employeeId
        })
        const responseData = await newDept.save();
        if(responseData){
            return res.status(201).json({
                success:true,
                message:"Department insert successfully."
            })
        }
        return res.status(400).json({
            success:false,
            message:"something is wrong."
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message : "Internal Server Error! Couldn't Add Department",
            error : error.message
        })
    }
};

module.exports = {
    showAllDepts,
    addDept
}