const addFarmerByExcel = async(req,res) =>{
    try {
        const JSON_Data = await excelToJSON(req.file.buffer);
        // console.log(JSON_Data)
            // Process each row to convert date strings into valid Date objects

        const farmers = JSON_Data.map((row) => ({
            saralId: row['saralId'],
            farmerName: row['farmerName'],
            fatherOrHusbandName: row['fatherOrHusbandName'],
            contact: row['contact'].toString(), // Ensure contact is a string
            state: row['state'],
            district: row['district'] || '', // Default to empty string if undefined
            department: row['department'],
            product: row['product'],
            project: row['project'] || '',
            block: row['block'] || '',
            gram_Panchayat: row['gram_Panchayat'] || '',
            village: row['village'] || '',
            pin: parseInt(row['pin'], 10), // Ensure pin is a number
            address: row['address'] || '',
            installationDate: new Date((row['installationDate'] - 25569) * 86400 * 1000), // Convert to Date
            pump_type: row['pump_type'] || '',
            installer_name: row['installer_name'] || '',
            survey_done: row['survey_done'] === 'true' || row['survey_done'] === true, // Boolean conversion
            survey_done_date: row['survey_done_date'] ? new Date(row['survey_done_date']) : null,
            Supplier_selection: row['supplier_selection'] || '',
            Supplier_selection_come_in_office: row['Supplier_selection_come_in_office'] || '',
            HP: row['HP'] || '',
            AC_DC: row['AC_DC'] || '',
            remark: row['remark'] || ''
        }));
        const insertResponse = await insertMany(Farmer, farmers);
        if(insertResponse){
            return res.status(200).json({
                success:true,
                message:'Excel Uploaded successfully.'
            })
        }
        return res.status(400).json({
            success:false,
            message:'something is wrong'
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}