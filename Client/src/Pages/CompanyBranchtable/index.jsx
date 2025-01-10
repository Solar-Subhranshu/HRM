
// import React, { useEffect, useState } from "react";
// import { FaListUl } from "react-icons/fa6";
// import axios from "axios";

// function AddNewCompany() {
//   const [companynamedata, setCompanyName] = useState([]);
//   const [inputData, setInputData] = useState({
//     name: "",
//     branch: "",
//     address: "",
//     companyID: " ",
//   });

//   const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false); // State for "Add New Company" modal
//   const [isBranchModalOpen, setIsBranchModalOpen] = useState(false); // State for "Add New Branch" modal
//   const [showAllCompanyDetails, setAllCompanyDetails] = useState([]);

//   const openCompanyModal = () => setIsCompanyModalOpen(true);
//   const closeCompanyModal = () => setIsCompanyModalOpen(false);

//   const openBranchModal = () => setIsBranchModalOpen(true);
//   const closeBranchModal = () => setIsBranchModalOpen(false);

//   // Fetch company names
//   const fetchCompanyNameData = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/common/show-company");
//       setCompanyName(response.data.data);
//     } catch (error) {
//       alert("Error: Unable to fetch company name data");
//     }
//   };

//   // Save a new company
//   const saveNewCompanyName = async (e) => {
//     e.preventDefault();
//     if (!inputData.name) {
//       alert("Company name is required");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:8000/common/add-company", {
//         name: inputData.name,
//       });
//       alert("Company added successfully");
//       closeCompanyModal();
//       fetchCompanyNameData(); // Refresh the company list
//     } catch (error) {
//       console.error(error);
//       alert("Error: Unable to add company");
//     }
//   };

//   // Save a new branch
//   const saveNewBranch = async (e) => {
//     e.preventDefault();
//     if (!inputData.companyID || !inputData.branch || !inputData.address) {
//       alert("All fields are required");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:8000/common/add-branch", {
//         companyID: inputData.companyID,
//         name: inputData.branch,
//         address: inputData.address,
//       });
//       alert("Branch added successfully");
//       closeBranchModal();
//     } catch (error) {
//       console.log(error);
//       alert("Error: Unable to add branch");
//     }
//   };

//   const fetchAllCompanyDetails = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/common/show-all-companyDetails');
//       setAllCompanyDetails(response.data.data);
//     } catch (error) {
//       alert("Unable to fetch all company data", error);
//     }
//   };

//   const handleFormData = (e) => {
//     const { value, name } = e.target;
//     setInputData({
//       ...inputData,
//       [name]: value,
//     });
//   };

//   useEffect(() => {
//     fetchCompanyNameData();
//     fetchAllCompanyDetails();
//   }, [isBranchModalOpen]);

//   return (
//     <div className="pl-2 w-full pr-2 pt-4">
//       {/* Header Section */}
//       <div className="bgMainColor flex py-4 pl-1 gap-3">
//         <FaListUl size={24} />
//         <h4 className="text-white">List of Company</h4>
//       </div>

//       {/* Table Section */}
//       <div className="flex gap-28">
//         <table className="table-auto w-1/4 border border-black">
//           <thead className="border border-black">
//             <tr>
//               <th className="text-blue-600/100 border border-black w-20">Select</th>
//               <th className="text-blue-600/100 border border-black">Company</th>
             
             
//             </tr>
//           </thead>
//           <tbody>
//             {showAllCompanyDetails.map(({ _id, companyID }) => (
//               <tr key={_id}>
//                 <td className="border-t border-gray-300 flex justify-center items-center align-middle h-8">
//                   <input type="checkbox" />
//                 </td>
//                 <td className="border border-black">{companyID?.name}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <table className="table-auto w-[calc(100%-25%)] border border-black">
//           <thead className="border border-black">
//             <tr>
//               <th className="text-blue-600/100 border border-black w-20">Select</th>
//               <th className="text-blue-600/100 border border-black">Branch</th>
//               <th className="text-blue-600/100 border border-black">Address</th>
//               <th className="text-blue-600/100 border border-black">Pin</th>
             
             
//             </tr>
//           </thead>
//           <tbody>
//             {showAllCompanyDetails.map(({ _id, companyID, name,address,pin }) => (
//               <tr key={_id}>
//                 <td className="border-t border-gray-300 flex justify-center items-center align-middle h-8">
//                   <input type="checkbox" />
//                 </td>
//                 <td className="border border-black">{address}</td>
//                 <td className="border border-black">{name}</td>
//                 <td className="border border-black">{pin}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//       </div>

//       {/* Add New Company Link */}
//       <div className="mt-4 flex gap-4">
//         <button
//           className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
//           onClick={openCompanyModal}
//         >
//           Add New Company
//         </button>
//         <button
//           className="bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
//           onClick={openBranchModal}
//         >
//           Add New Branch
//         </button>
//       </div>

//       {/* Add New Company Modal */}
//       {isCompanyModalOpen && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg p-6 w-1/3">
//             <h3 className="text-lg font-bold mb-4">Add New Company</h3>
//             <form onSubmit={saveNewCompanyName}>
//               <div className="mb-4">
//                 <label htmlFor="companyName" className="block font-medium text-gray-700">
//                   Company Name
//                 </label>
//                 <input
//                   type="text"
//                   value={inputData.name}
//                   name="name"
//                   onChange={handleFormData}
//                   id="companyName"
//                   placeholder="Enter company name"
//                   className="mt-1 py-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   className="bg-red-600 text-white py-2 px-4 rounded-md mr-2"
//                   onClick={closeCompanyModal}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-md">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Add New Branch Modal */}
//       {isBranchModalOpen && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg p-6 w-1/3">
//             <h3 className="text-lg font-bold mb-4">Add New Branch</h3>
//             <form onSubmit={saveNewBranch}>
//               <div className="mb-4">
//                 <label htmlFor="companySelect" className="block font-medium text-gray-700">
//                   Select Company
//                 </label>
//                 <select
//                   name="companyID"
//                   id="companySelect"
//                   value={inputData.companyID || ""}
//                   onChange={handleFormData}
//                   className="mt-1 py-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="">---Select Company Name---</option>
//                   {companynamedata?.map(({ name, _id }) => (
//                     <option key={_id} value={_id}>
//                       {name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="branchName" className="block font-medium text-gray-700">
//                   Branch Name
//                 </label>
//                 <input
//                   type="text"
//                   value={inputData.branch}
//                   name="branch"
//                   onChange={handleFormData}
//                   id="branchName"
//                   placeholder="Enter branch name"
//                   className="mt-1 py-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="address" className="block font-medium text-gray-700">
//                   Address
//                 </label>
//                 <input
//                   type="text"
//                   value={inputData.address}
//                   name="address"
//                   onChange={handleFormData}
//                   id="address"
//                   placeholder="Enter address"
//                   className="mt-1 py-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   className="bg-red-600 text-white py-2 px-4 rounded-md mr-2"
//                   onClick={closeBranchModal}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-md">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AddNewCompany;






import React, { useEffect, useState } from "react";
import { FaListUl } from "react-icons/fa6";
import axios from "axios";

function AddNewCompany() {
  const [companynamedata, setCompanyName] = useState([]);
  const [showAllCompanyDetails, setAllCompanyDetails] = useState([]);
  const [selectedCompanyID, setSelectedCompanyID] = useState(null);

  const fetchCompanyNameData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/common/show-company");
      setCompanyName(response.data.data);
    } catch (error) {
      alert("Error: Unable to fetch company name data");
    }
  };

  const fetchAllCompanyDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8000/common/show-all-companyDetails");
      setAllCompanyDetails(response.data.data);
    } catch (error) {
      alert("Unable to fetch all company data", error);
    }
  };

  const handleCompanytSelect = (id) => {
    setSelectedCompanyID((prev) => (prev === id ? null : id)); // Toggle ompany selection
  };

  useEffect(() => {
    fetchCompanyNameData();
    fetchAllCompanyDetails();
  }, []);

  const filteredBranchDetails = showAllCompanyDetails.filter(
    (item) => item.companyID?._id === selectedCompanyID
  );

  return (
    <div className="pl-2 w-full pr-2 pt-4">
      {/* Header Section */}
      <div className="bgMainColor flex py-4 pl-1 gap-3">
        <FaListUl size={24} />
        <h4 className="text-white">List of Company</h4>
      </div>

      {/* Table Section */}
      <div className="flex gap-10 mt-4">
        {/* Company Table */}
        <div className="w-[20%] overflow-auto max-h-[400px] border border-black">
          <table className="table-auto w-full border border-black">
            <thead className="border border-black">
              <tr >
                <th className="text-blue-600/100 border border-black w-20 ">Select</th>
                <th className="text-blue-600/100 border border-black">Company</th>
              </tr>
            </thead>
            <tbody>
              {companynamedata.map(({ _id, name }, index) => (
                <tr key={_id}>
                  <td className="border-t border-gray-300 flex justify-center items-center align-middle h-8">
                    <input
                      type="checkbox"
                      checked={selectedCompanyID === _id}
                      onChange={() => handleCompanytSelect(_id)}
                    />
                  </td>
                  <td className="border border-black">{name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {/* Branch Details Table */}
        <div className="w-[80%] ">
          <table className="table-auto w-full border border-black">
            <thead className="border border-black">
              <tr>
              <th className="text-blue-600/100 border border-black w-20">Select</th>
                <th className="text-blue-600/100 border border-black ">Branch</th>
                <th className="text-blue-600/100 border border-black">Address</th>
                <th className="text-blue-600/100 border border-black">Pin</th>
              </tr>
            </thead>
            <tbody>
              {filteredBranchDetails.map(({ _id, name, address, pin }) => (
                <tr key={_id}>
                  <td className="border-t border-gray-300 flex justify-center items-center align-middle h-8">
                    <input type="checkbox"/>
                  </td>
                  <td className="border border-black">{name}</td>
                  <td className="border border-black">{address}</td>
                  <td className="border border-black">{pin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    
      </div>

      <div >
      <button 
        className=" ml-28 px-3 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all"
      >
        Add Company
      </button>
      </div>

    </div>
  );
}

export default AddNewCompany;
