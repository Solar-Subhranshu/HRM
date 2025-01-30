import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { GoSearch } from "react-icons/go";
import { FaListUl } from "react-icons/fa6";

export default function Index() {
    
 const [allEmployeeData, setAllEmployeeData] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [isActiveFilter, setIsActiveFilter] = useState(null);
   const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [itemsPerPage] = useState(10); // Items per page (fixed)

    const filteredEmployees = allEmployeeData.filter(employee => {
        const searchString = searchTerm.toLowerCase();
        return (
          employee.name.toLowerCase().includes(searchString) ||
          employee.employeeCode.toLowerCase().includes(searchString)
        );
      });

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

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      };

       // Pagination calculations
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
    
  return (    
    <>
        <button 
            disabled={currentPage === 1} 
            onClick={handlePreviousPage} 
            className={`p-1 pl-5 pr-5 rounded-md absolute bottom-4 left-64 text-white ${currentPage === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700'}`}>
            Back
        </button>
        
        {/* all action button  */}
        <div className=" absolute bottom-4 left-96 pt-4 gap-2 flex">
            <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all">Add</button>
            <button
        
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all"
            >
            Import From Excel
            </button>
            <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all">Export To Excel</button>
            <button  className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all">Update</button>
            <button  className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all">Close</button>
        </div>

        <button   
            disabled={currentPage === totalPages}  
            onClick={handleNextPage} 
            className={`p-1 pl-5 pr-5 rounded-md absolute bottom-4 right-16 text-white ${currentPage === totalPages ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700'}`} >
            Forward
        </button>

        
      

        <div className="mt-4 bgMainColor flex py-4 pl-1 gap-3 justify-between z-6 rounded-md ">
            <div className="flex flex-row pl-2 gap-4">
                <FaListUl size={24} />
                <h4 className="text-white">List of Employee (Total Employee)</h4>
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
                className={`px-4 py-2 ${isActiveFilter === false ? 'bg-red-700' : 'bg-red-600'} text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all`}
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



        <div className='overflow-auto h-[calc(100vh-14rem)]'>
            <div className="relative">
                <table className=" text-gray-500 dark:text-gray-400" style={{ position: 'relative'}}>
                    <thead className="text-xs border border-gray-150 bg-gray-800 text-gray-100 uppercase dark:bg-gray-800 dark:text-gray-400">
                        <tr>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Select</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Employee Code</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Employee Name</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Father Name</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Date of Birth</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Personal Phone Number</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Personal Email</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Pancard Number</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Aadharcard Number</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Qualification</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Degree</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Permanent Address</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Permanent Pin Code</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Current Address</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Bank Name</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Branch Name</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Account Number</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">IFSC Code</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Bank Address</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Bank Holder Name</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Reporting Manager Name</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Join Hr Name</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Company Phone Number</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Company Email</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Joining Date</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Company Name</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Branch Name</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Department Name</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Designation Name</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Office Time Policy</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Shift Name</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Work Type</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">Last Appraisal Date</th>
                            {/* <th  className="px-6 py-3 text-center font-semibold text-nowrap">designation</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">designation</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">designation</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">designation</th>
                            <th  className="px-6 py-3 text-center font-semibold text-nowrap">designation</th> */} 
                        </tr>
                    </thead>
                    <tbody>
                    {
                        currentEmployees.map(({_id,employeeCode,name,father_husbandName,dateOfBirth,personalPhoneNum,personalEmail,panCard,aadharCard,qualification,degree,permanentAddress,permanentPinCode,currentAddress,currentPinCode,bankName,branchName,bankAccount,bankIFSC,bankAccountHolderName,bankAddress,reportingManager,joiningHR,companyPhoneNum,companyEmail,joiningDate,company,branch,department,designation,officeTimePolicy,shift,workType,lastAppraisalDate}) =>(
                            <>
                                <tr className="bg-white border-b hover:bg-gray-400 hover:text-gray-900" key={_id} >
                                    {/* <th scope="row" className="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {(SrNo++) + ((page - 1) * LIMIT)}
                                    </th> */}
                                    <td className='px-2 py-2'>
                                        {/* <div onClick={(e) => e.stopPropagation() }>    
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
                                                          </div> */}
                                    </td>
                                    <th scope="row" className="px-2 font-medium text-center text-gray-900 whitespace-nowrap ">{employeeCode}</th>
                                    <td className="px-2 py-2 text-center">{name || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{father_husbandName || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{dateOfBirth ? formatDate(dateOfBirth) : 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{personalPhoneNum || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{personalEmail || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{panCard || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{ aadharCard|| 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{qualification?.name || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{degree?.name || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{permanentAddress || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{permanentPinCode || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{currentAddress || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{currentPinCode || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{bankName || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{branchName || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{bankAccount || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{bankIFSC || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{bankAccountHolderName || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{bankAddress || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{reportingManager?.name || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{joiningHR?.name || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{companyPhoneNum || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{companyEmail || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{joiningDate || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{company?.name || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{branch?.name || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{department?.department || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{designation?.designation || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{officeTimePolicy?.policyName || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{shift?.name || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{workType?.workType || 'N/A'}</td>
                                    <td className="px-2 py-2 text-center">{lastAppraisalDate ? formatDate(lastAppraisalDate) : 'N/A'}</td>
                                </tr>
                            </>
                        ))
                    }
                    </tbody>
                    
                </table>
            </div>
        </div>
   </>
  )
}