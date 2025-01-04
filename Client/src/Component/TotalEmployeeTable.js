import React, { useEffect, useState } from 'react'
import { FaListUl } from "react-icons/fa6";
import axios from 'axios';


function TotalEmployeeTable() {
  const [allEmployeeData, setAllEmployeeData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(8);

  // Define table columns
  const columns = [
    { key: "name", label: "Employee Name" },
    { key: "employeeCode", label: "Emp. Code" },
    { key: "father_husbandName", label: "Father/Husband Name" },
    { key: "personalPhoneNum", label: "Personal Phone Number" },
    { key: "personalEmail", label: "Personal Email" },
    { key: "panCard", label: "Pancard Number" },
    { key: "qualification.name", label: "Qualification" },
    { key: "bankName", label: "Bank Name" },
    { key: "branchName", label: "Branch Name" },
    { key: "bankAccount", label: "A/C Number" },
    { key: "bankIFSC", label: "IFSC Code" },
    { key: "bankAddress", label: "Bank Address" },
    { key: "bankAccountHolderName", label: "Bank Holder Name" },
    { key: "reportingManager.name", label: "Reporting Manager Name" },
    { key: "companyPhoneNum", label: "Company Phone Number" },
    { key: "companyEmail", label: "Company Email" },
    { key: "company.name", label: "Company Name" },
    { key: "branch.name", label: "Company Branch Name" },
    { key: "department.department", label: "Department" },
    { key: "designation.designation", label: "Designation" },
    { key: "joiningDate", label: "Joining Date" },
  ];

  // Fetch employee data
  const fetchAllEmployeeData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/auth/showAllEmployee");
      setAllEmployeeData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      alert("Error: Unable to fetch employee data.");
    }
  };

  useEffect(() => {
    fetchAllEmployeeData();
  }, []);
 
  //  api is pending in this section  
  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:8000/auth/importExcel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message || "File imported successfully!");
      setIsModalOpen(false);
      fetchAllEmployeeData(); // Refresh employee data after successful import
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error: Unable to import the file.");
    }
  };



  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Get current rows for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = allEmployeeData.slice(indexOfFirstRow, indexOfLastRow);

  // Handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(allEmployeeData.length / rowsPerPage);

  return (
    <div className="ml-2 mr-2 flex flex-col h-screen">
      {/* Header Section */}
      <div className="sticky top-0 bgMainColor flex py-4 pl-1 gap-3 justify-between z-10">
        <div className="flex flex-row pl-2 gap-4">
          <FaListUl size={24} />
          <h4 className="text-white">List of Employee (Total Employee)</h4>
        </div>
        <div>
          <button className="px-8 py-2 mr-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all">Active</button>
          <button className="px-8 py-2 mr-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all">Resigned Staff</button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto flex-1 overflow-y-auto">
        <table className="table-auto w-full border border-black text-sm">
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
          <tbody>
            {currentRows.map((employee) => (
              <tr key={employee._id} className="hover:bg-gray-100">
                <td className="border border-black px-2 py-1 text-center">
                  <input type="checkbox" />
                </td>
                {columns.map((col) => {
                  const keys = col.key.split('.'); // Handle nested keys
                  let value = employee;
                  keys.forEach((key) => {
                    value = value ? value[key] : "N/A"; // Traverse nested keys
                  });

                  // Handle special formatting for dates
                  if (col.key === "joiningDate" && value !== "N/A") {
                    value = formatDate(value);
                  }

                  return (
                    <td
                      key={col.key}
                      className="border border-black px-2 py-1 text-left"
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

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 pb-3">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-black transition-all disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-4 text-lg"> Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-black transition-all disabled:opacity-50"
        >
        Next
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mb-4 mt-auto">
        <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all">Add </button>
        <button 
          onClick={ ()=>setIsModalOpen(true)}
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all">Import From Excel</button>
        <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all">Export To Excel</button>
        <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all">Update</button>
        <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all">Close</button>
      </div>
      
      {/* Modal for File Upload */}
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

