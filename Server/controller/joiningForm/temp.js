const generateJoiningFormPDF = async (req, res) => {
    try {
        const {formId} =req.query;
        if(!formId){
            return res.status(400).json({
                success:false,
                message:"Form Id not Found, formId is required."
            });
        }
        const data = await JoiningForm.findById(formId).lean();

        if(data.status!="Approved"){
            return res.status(400).json({
                success:false,
                message:"The joining form you want to download is not yet approved!",
            });
        }

        // console.log(data);
        const doc = new PDFDocument({ size: "A4", margin: 20 });

        // Create a buffer stream to store the PDF content
        const chunks = [];
        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(chunks);

            // Set appropriate headers for downloading the PDF
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${data.name}_Form.pdf"`);
            res.send(pdfBuffer); // Send the PDF buffer to the client
        });

        // Start coordinates
        let startX = 30;
        let startY = 60;
        let rowHeight = 30;
        let colWidth = 380;



        // Function to draw a bordered cell

        function drawCell(x, y, text, width, height, align = "left") {
            doc.rect(x, y, width, height).stroke();
            doc.font("Helvetica-Bold"); // Set font to bold
            doc.text(text, x + 5, y + 10, { width: width - 10, align });
            //doc.font("Helvetica"); // Reset font to normal after drawing (if needed)
        }

        function drawCellAlignVertically(x, y, text, width, height, align = "left") {
            doc.rect(x, y, width, height).stroke();
            doc.font("Helvetica-Bold");
            doc.text(text, x + 5, y + height / 2, { width: width - 10, align: align });
        }

        // Employee Personal Information
        drawCell(startX, startY, data.companyId.name || "", colWidth, rowHeight, "center");

        let imageUrl = data.photoAttachment; // Assuming `photoAttachment` is the URL of the image

        if (imageUrl) {
            try {
                // Fetch image using axios and convert to buffer
                const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                const imageBuffer = Buffer.from(imageResponse.data);

                // Check image dimensions (optional)
                //console.log('Image fetched, buffer length:', imageBuffer.length);

                // Add the image to the PDF (Position the image where you need)
                doc.image(imageBuffer, startX + colWidth + 2, startY, { width: 148, height: 148 });
            } catch (error) {
                console.error("Error fetching the image:", error);
            }
        } else {
            console.log("No image URL provided");
        }
        
        //drawCell(startX + colWidth, startY, data.photoAttachment || "", 150, 150);

        drawCell(startX, startY + rowHeight, "Joining Form", colWidth, rowHeight, "center");

        drawCell(startX, startY + rowHeight * 2, "Employee Personal Information", colWidth, rowHeight, "center");

        drawCellAlignVertically(startX, startY + rowHeight * 3, "Full Name", 150, rowHeight * 2);
        drawCellAlignVertically(startX + 150, startY + rowHeight * 3, data.name || "", 230, rowHeight * 2);

        drawCell(startX, startY + rowHeight * 5, "Father's Name", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 5, data.father_husbandName || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 6, "Date of Birth", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 6, moment(data.dateOfBirth).format("DD-MM-YYYY") || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 7, "Gender", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 7, data.gender || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 8, "Marital Status", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 8, data.maritalStatus || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 9, "Blood Group", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 9, data.bloodGroup || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 10, "Contact Details", colWidth + rowHeight * 5, rowHeight, "center");

        drawCell(startX, startY + rowHeight * 11, "Official Contact No.", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 11, data.officialContact || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 12, "Official Mail ID", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 12, data.officialEmail || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 13, "Personal Contact No.", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 13, data.personalPhoneNum || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 14, "Personal Mail ID", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 14, data.personalEmail || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 15, "Employee Address Information", colWidth + rowHeight * 5, rowHeight, "center");
        drawCell(startX, startY + rowHeight * 16, "Present Address Detail", colWidth + rowHeight * 5, rowHeight, "center");

        drawCellAlignVertically(startX, startY + rowHeight * 17, "Full Address", 150, rowHeight * 2);
        drawCellAlignVertically(startX + 150, startY + rowHeight * 17, data.currentAddress || "", 380, rowHeight * 2);

        drawCell(startX, startY + rowHeight * 19, "State", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 19, data.currentState || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 20, "District/City", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 20, data.currentCity || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 21, "Pin Code", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 21, data.currentPinCode || "", 380, rowHeight);

        doc.addPage();

        drawCell(startX, startY, "Permanent Address Detail", colWidth + rowHeight * 5, rowHeight, "center");

        drawCellAlignVertically(startX, startY + rowHeight, "Full Address", 150, rowHeight * 2);
        drawCellAlignVertically(startX + 150, startY + rowHeight, data.permanentAddress || "", 380, rowHeight * 2);

        drawCell(startX, startY + rowHeight * 3, "State", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 3, data.permanentState || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 4, "District/City", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 4, data.permanentCity || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 5, "Pin Code", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 5, data.permanentPinCode || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 6, "Joining Details", colWidth + rowHeight * 5, rowHeight, "center");

        drawCell(startX, startY + rowHeight * 7, "Date of Interview", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 7, moment(data.interviewDate).format("DD-MM-YYYY") || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 8, "Date of Joining", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 8, moment(data.joiningDate).format("DD-MM-YYYY") || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 9, "Department", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 9, data.department.department || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 10, "Designation", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 10, data.designation.designation || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 11, "Employee Type", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 11, data.employeeType || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 12, "Mode of Recruitment", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 12, data.modeOfRecruitment || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 13, "Reference/Consultancy", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 13, data.reference || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 14, "Bank Details", colWidth + rowHeight * 5, rowHeight, "center");

        drawCell(startX, startY + rowHeight * 15, "PAN No.", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 15, data.panCard || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 16, "Aadhar No.", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 16, data.aadharCard || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 17, "Bank", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 17, data.bankName || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 18, "Account No.", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 18, data.bankAccount || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 19, "IFSC Code", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 19, data.bankIFSC || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 20, "Branch Address", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 20, data.bankAddress || "", 380, rowHeight);

        drawCell(startX, startY + rowHeight * 21, "ESI and PF Details", colWidth + rowHeight * 5, rowHeight, "center");

        drawCell(startX, startY + rowHeight * 22, "UAN No.", 150, rowHeight);
        drawCell(startX + 150, startY + rowHeight * 22, data.uanNumber || "", 380, rowHeight);

        doc.addPage();

        drawCell(startX, startY, "Contact Details in Case of Emergency (Family Member Only)", colWidth + rowHeight * 5, rowHeight, "center");
        drawCell(startX, startY + rowHeight, "Name", 140, rowHeight, "center");
        drawCell(startX + 140, startY + rowHeight, "Relation", 130, rowHeight, "center");
        drawCell(startX + 270, startY + rowHeight, "Address", 130, rowHeight, "center");
        drawCell(startX + 400, startY + rowHeight, "Contact No.", 130, rowHeight, "center");

        if (data.emergencyContact && data.emergencyContact.length > 0) {
            // Loop through available emergency contacts
            for (let i = 0; i < 4; i++) {
                // If there's data for this contact, draw the actual cell, else draw empty cells
                if (i < data.emergencyContact.length) {
                    drawCell(startX, startY + rowHeight * (2 + i), data.emergencyContact[i].contactName || "", 140, rowHeight, "center");
                    drawCell(startX + 140, startY + rowHeight * (2 + i), data.emergencyContact[i].relation || "", 130, rowHeight, "center");
                    drawCell(startX + 270, startY + rowHeight * (2 + i), data.emergencyContact[i].address || "", 130, rowHeight, "center");
                    drawCell(startX + 400, startY + rowHeight * (2 + i), data.emergencyContact[i].phoneNumber || "", 130, rowHeight, "center");
                } else {
                    // If no more data available, draw empty cells
                    drawCell(startX, startY + rowHeight * (2 + i), "", 140, rowHeight, "center");
                    drawCell(startX + 140, startY + rowHeight * (2 + i), "", 130, rowHeight, "center");
                    drawCell(startX + 270, startY + rowHeight * (2 + i), "", 130, rowHeight, "center");
                    drawCell(startX + 400, startY + rowHeight * (2 + i), "", 130, rowHeight, "center");
                }
            }
        } else {
            // If no emergency contact data is available, add empty cells for all rows
            for (let i = 0; i < 4; i++) {
                drawCell(startX, startY + rowHeight * (2 + i), "", 140, rowHeight);
                drawCell(startX + 140, startY + rowHeight * (2 + i), "", 130, rowHeight);
                drawCell(startX + 270, startY + rowHeight * (2 + i), "", 130, rowHeight);
                drawCell(startX + 400, startY + rowHeight * (2 + i), "", 130, rowHeight);
            }
        }

        // Signature Section
        //let signY = joiningY + rowHeight * 4 + 40;

        // doc.font("Helvetica").fontSize(13)
        //     .text(
        //         "Declaration: I hereby declare that the details furnished above are true and correct to the best of my knowledge and belief and I undertake to inform you of any changes therein, immediately. In case any of the above information is found to be false or untrue or misleading or misrepresenting, I am aware that I may be held liable for it.",
        //         startX,
        //         startY + 10 + rowHeight * 6,
        //         {
        //             width: 530, // Set the width of the text box to control the line wrapping
        //             align: 'justify', // Align text to justify
        //             continued: false // Set to false if it's the end of the text block
        //         }
        //     );

        doc.font("Helvetica-Bold").fontSize(13) // Bold font for "Declaration:"
            .text("Declaration: ", startX, startY + 20 + rowHeight * 6, { continued: true });

        doc.font("Helvetica").fontSize(13) // Regular font for the remaining text
            .text(
                "I hereby declare that the details furnished above are true and correct to the best of my knowledge and belief and I undertake to inform you of any changes therein, immediately. In case any of the above information is found to be false or untrue or misleading or misrepresenting, I am aware that I may be held liable for it.",
                {
                    // Set the width of the text box to control line wrapping
                    align: 'justify' // Align text to justify
                }
            );

        doc.font("Helvetica-Bold").text("Employee Signature: ", startX, startY + 50 + rowHeight * 10);
        doc.font("Helvetica-Bold").text("Date: ", startX, startY + 50 + rowHeight * 11);

        // End PDF
        doc.end();
    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ 
            success:false,
            message: "An error occurred while generating the PDF.",
            error:error.message
        });
    }
};
