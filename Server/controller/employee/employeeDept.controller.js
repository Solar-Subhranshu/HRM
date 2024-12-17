const EmployeeDept = require ("../../models/auth/common/department.model")


const showAllDepts = async(req,res) => {
    try {
        const allDepts= await EmployeeDept.find({ empDept: { $ne: "Admin" } });
        if (allDepts.length===0){
            return res.status(200).json({
                success : true,
                message : "No Departments Found, Please Add Department First."
            });
        }
        else{
            const deptNames =allDepts.map(dept => ({
                id: dept._id,
                empdept : dept.empDept
            }));
            return res.status(200).json({
                success : true,
                message :{
                    deptNames
            }
        });
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

const updateDept = async (req,res) => {
    try{
    const employeeId = req.employeeId;

    const {deptId,deptName} = req.body || req.query;
    // console.log(deptId,deptName);
  
    if(!deptId){
        return res.status(400).json({
            success : false,
            message : "Department doesn't exist"
        });
    }

    const deptExists = await EmployeeDept.findOne({empDept :deptName});
    if(deptExists){
        return res.status(400).json({
            success : false,
            message : "Department Already Exists"
        });
    }

    const updatedDept = await EmployeeDept.findByIdAndUpdate(deptId,
        {empDept :deptName},
        {updatedBy : employeeId},
        {new: true}
    );

    if(!updatedDept){
        return res.status(400).json({
            success: false,
            message : "Department Updation Failed!, Try after few seconds!"
        });
    }

    return res.status(200).json({
        success : true,
        message : "Department Updation Successful !"
    });
}
catch(error){
    return res.status(500).json({
        success:false,
        message:"Internal Server Error, Couldn't update department.",
        error : error.message
    })
}

}


module.exports = {
    showAllDepts,
    addDept,
    updateDept
}