import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FaListUl } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


function TotalEmployeeTable() {
  const navigate = useNavigate();

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [allEmployeeData, setAllEmployeeData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [isActiveFilter, setIsActiveFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(8);
  
  const [duplicateData, setDuplicateData] = useState([]);
  const [invalidData, setInvalidData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


   

  const handleEmployeeRegisterForm = () => {
    navigate('/layout/Registrationform');
  };

  const handleClose = ()=>{
    navigate('/layout/dashboard');
  }

  const handleUpdateOpenReg = () => {
    if (!selectedEmployee) {
      alert("Please select an employee to update.");
      return;
    }
    navigate('/layout/employeeupdateform');
  };

  const columns = [
    { key: "name", label: "Employee Name" },
    { key: "employeeCode", label: "Emp. Code" },
    { key: "father_husbandName", label: "Father/Husband Name" },
    { key: "dateOfBirth", label: 'Date Of Birth'},
    { key: "personalPhoneNum", label: "Personal Phone Number" },
    { key: "personalEmail", label: "Personal Email" },
    { key: "panCard", label: "Pancard Number" },
    { key: "aadharCard", label: "Aadhar Card Number" },
    { key: "qualification.name", label: "Qualification" },
    { key : "degree.name", label : "Degree"},
    { key: "permanentAddress", label: "Permanent Address" },
    { key: "permanentPinCode", label: "Permanent Pin Code" },
    { key: "currentAddress", label: "Current Address" },
    { key: "currentPinCode", label: "Current Pin Code" },
    { key : "workType.workType" , label : "Work Type"},

    { key: "bankName", label: "Bank Name" },
    { key: "branchName", label: "Branch Name" },
    { key: "bankAccount", label: "A/C Number" },
    { key: "bankIFSC", label: "IFSC Code" },
    { key: "bankAddress", label: "Bank Address" },
    { key: "bankAccountHolderName", label: "Bank Holder Name" },
    { key: "reportingManager.name", label: "Reporting Manager Name" },
    { key: "companyPhoneNum", label: "Company Phone Number" },
    { key: "companyEmail", label: "Company Email" },
    { key: "joiningDate", label: "Joining Date" },
    { key: "lastAppraisalDate", label: "Last Appraisal Date" },
    { key: "regisnationDate", label: "Regisnation Date" },

    { key: "company.name", label: "Company Name" },
    { key: "branch.name", label: "Company Branch Name" },
    { key: "department.department", label: "Department" },
    { key: "designation.designation", label: "Designation" },
     
    { key: "aadharCardAttachment", label: "Aadhar Card Attachment" },
    { key: "panCardAttachment", label: "Pan Card Attachment" },
    { key: "bankAttachment", label: "Bank Attachment" },
    { key: "joiningFormAttachment", label: "Joining Form" },
    { key: "otherAttachment", label: "Other Attachment" }
  ];

  const fetchAllEmployeeData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/showAllEmployee`);
      let employeeData = response.data.data || [];

      if (isActiveFilter !== null) {
        employeeData = employeeData.filter(employee => employee.isActive === isActiveFilter);
      }

      setAllEmployeeData(employeeData);
    } catch (error) {
      console.log("Error fetching employee data:", error);
      // alert("Error: Unable to fetch employee data.");
    }
  };

  useEffect(() => {
    fetchAllEmployeeData();
  }, [isActiveFilter]);

   
  
  //  import form excel 
  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    console.log("my form data", formData);
  
    console.log("Sending file upload request");
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/add-byExcel`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Response status:", response.status); 

      console.log("Response data:", response.data);
  
      const { success, message, invalid_data, duplicate_data } = response.data;
  
      console.log("Success:", success); 
      
      console.log("Message:", message); 
  
      if (!success || message === "The uploaded excel does not have any valid insertable entry.") {
        navigate('/layout/invalid-duplicate-data', {
          state: {
            duplicateData: duplicate_data || [],  // Ensure default empty array
            invalidData: invalid_data || [],      // Ensure default empty array
          },
        });
      } else {
        alert(message || "File imported successfully!");
      }
  
      fetchAllEmployeeData(); // Refresh employee data
    } catch (error) {
      // Default empty array if the variables are not available in the error case
      const { duplicate_data = [], invalid_data = [] } = error.response?.data || {};
  
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        console.error("Error uploading file:", error);
        alert("Error: Unable to import the file.");
      }
  
      // Navigate to the error page with fallback empty arrays
      navigate('/layout/invalid-duplicate-data', {
        state: {
          duplicateData: duplicate_data,
          invalidData: invalid_data,
        },
      });
    }
  };
  
  //export from excel 
  const exportToExcel = () => {
    if (allEmployeeData.length === 0) {
      alert("No employee data to export.");
      return;
    }
  
    // Map employee data to ensure all fields are included, even if some are missing
    const formattedData = allEmployeeData.map((employee) => {
      const formattedEmployee = {};
      columns.forEach((col) => {
        
        // Skip attachment fields
        if (
          ["aadharCardAttachment", "panCardAttachment", "bankAttachment", "joiningFormAttachment", "otherAttachment"].includes(col.key)
        ) {
          return;
        }
        const keys = col.key.split('.');
        let value = employee;
        keys.forEach((key) => {
          value = value ? value[key] : "N/A";
        });
        formattedEmployee[col.label] = value;
      });
      return formattedEmployee;
    });
  
    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
  
    // Write the workbook to a binary string
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  
    // Convert the buffer to a Blob
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  
    // Save the file using file-saver
    saveAs(blob, "employee_data.xlsx");
  };
  
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const filteredEmployees = allEmployeeData.filter(employee => {
    const searchString = searchTerm.toLowerCase();
    return (
      employee.name.toLowerCase().includes(searchString) ||
      employee.employeeCode.toLowerCase().includes(searchString)
    );
  });

  const currentRows = filteredEmployees.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div className="ml-2 mr-2 flex flex-col mt-2 md:mt-4 ">
      <div className="sticky top-0 bgMainColor flex py-4 pl-1 gap-3 justify-between z-6 rounded-md ">
        <div className="flex flex-row pl-2 gap-4">
          <FaListUl size={24} />
          <h4 className="text-white ">List of Employee (Total Employee)</h4>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => setIsActiveFilter(true)}
            className={`px-6 py-2 ${isActiveFilter === true ? 'bg-green-700' : 'bg-green-600'} text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all`}
          >
            Active
          </button>
          <button
            onClick={() => setIsActiveFilter(false)}
            className={`px-4 py-2 ${isActiveFilter === false ? 'bg-red-700' : 'bg-red-600'} text-white font-normal  md:font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all`}
          >
            Resigned Staff
          </button>

          {/* search bar section */}
          <div className="relative  max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search by Name or Code"
              className=" pl-10 mr-2 pr-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500">
              <GoSearch size={20} />
            </span>
          </div>

        </div>
      </div>

      <div className=" flex-1  overflow-auto h-[calc(100vh-14rem)]  relative">
        <table className="table-auto w-full border border-black text-sm relative h-4/5">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-blue-600 border border-black px-2 py-1">Select</th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-blue-600 border border-black px-2 py-1 whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className=''>
            {currentRows.map((employee) => (
              <tr key={employee._id} className="hover:bg-gray-200" 
                onClick={() => {
                  const data = JSON.stringify(employee);
                  Cookies.set('EmployeeDetails', data);
                  navigate('/layout/employeeDetails');
                }
              }
              >
                <td className="border border-black px-2 py-1 text-center">
                  <div onClick={(e) => e.stopPropagation() }>    
                    <input
                      type="radio"
                      name="selectedRow"
                      onClick={()=>{
                        const data=JSON.stringify(employee);
                        Cookies.set('EmployeeFormData', data);
                      }}
                      onChange={() => {setSelectedEmployee(employee)}}
                      checked={selectedEmployee?._id === employee._id}

                    />
                  </div>
                </td>
                {columns.map((col) => {
                  const keys = col.key.split('.');
                  let value = employee;
                  keys.forEach((key) => {
                    value = value ? value[key] : "N/A";
                  });

                  if ( (col.key === "joiningDate" && value !== null) || (col.key === "dateOfBirth" && value !==null) || (col.key === "lastAppraisalDate" && value !== null) || (col.key === "regisnationDate" && value !== null) ) {
                    value = formatDate(value);
                  }

                  if (
                    ["aadharCardAttachment", "panCardAttachment", "bankAttachment", "joiningFormAttachment", "otherAttachment"].includes(col.key)
                  ) {
                    return (
                      <td key={col.key} className="border  border-black px-2 py-1 text-left">
                        {value !== "N/A" && value ? (
                          <img
                            src={value}
                            alt={`${col.label}`}
                            className="h-14 w-14 object-cover"
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                    );
                  }
                  
                  // Handle large text columns
                  const cellClass =col.key === "bankAddress" || col.key === "permanentAddress"? "table-cell-multiline": "table-cell";
                  return (
                    <td
                      key={col.key}
                      // className="border border-black px-2 py-1 text-left"
                      className={`border border-black px-2 py-1 text-left ${cellClass}`}
                    >
                      {value || "N/A"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      
      {/* pagination button  */}
      <div className="flex justify-center mt-4 pb-3 relative">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-black transition-all disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-4 text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-black transition-all disabled:opacity-50"
        >
          Next
        </button>
      </div>
      
      {/* all action button  */}
      <div className="flex justify-center gap-6 mb-4  bottom-0  sticky ">
        <button onClick={handleEmployeeRegisterForm} className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all">Add</button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all"
        >
          Import From Excel
        </button>
        <button  onClick={exportToExcel} className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all">Export To Excel</button>
        <button onClick={handleUpdateOpenReg} className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all">Update</button>
        <button onClick={handleClose} className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all">Close</button>
      </div>

       {/* excel pop model open  */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Import From Excel</h3>
            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="block w-full mb-4 border border-gray-300 rounded-lg"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleFileUpload}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
      
      
      
    </div>
  );
}

export default TotalEmployeeTable;




