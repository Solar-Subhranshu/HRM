const xlsx = require("xlsx");

const excelToJSON = async(buffer)=>{
    try {
        const workbook=xlsx.read(buffer,{type:'buffer'});
        const sheetName=workbook.SheetNames[0];
        const workSheet = workbook.Sheets[sheetName];
        const excelData = xlsx.utils.sheet_to_json(workSheet,{
            defval : "",
            raw:true
        });

        
        return excelData;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

module.exports= excelToJSON;