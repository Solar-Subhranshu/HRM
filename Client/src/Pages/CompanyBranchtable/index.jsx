import React, { useEffect, useState } from "react";
import { FaListUl } from "react-icons/fa6";
import axios from "axios";
import Cookies from'js-cookie'

function AddNewCompany() {
  const [companynamedata, setCompanyName] = useState([]);
  const [showAllCompanyDetails, setAllCompanyDetails] = useState([]);
  const [selectedBranchID, setSelectedBranchID] = useState( null);
  const [selectedCompanyID, setSelectedCompanyID] = useState(null);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false); // State for "Add New Company" modal
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false); // State for "Add New Branch" modal
  const [isUpdateCompanyModalOpen, setIsUpdateCompanyModalOpen] = useState(false);
  const [isUpdateBranchModalOpen, setIsUpdateBranchModalOpen] = useState(false);

  const openCompanyModal = () => setIsCompanyModalOpen(true);
  const closeCompanyModal = () => setIsCompanyModalOpen(false);

  const openBranchModal = () => setIsBranchModalOpen(true);
  const closeBranchModal = () => setIsBranchModalOpen(false);

  const openUpdateCompanyModal = () => {
    if (!selectedCompanyID) {
      alert("Please select a company to update");
      return;
    }
    const selectedCompany = companynamedata.find(({ _id }) => _id === selectedCompanyID);
    setInputData({ ...inputData, name: selectedCompany?.name || "" });
    setIsUpdateCompanyModalOpen(true);
  };
  const closeUpdateCompanyModal = () => setIsUpdateCompanyModalOpen(false);

  const handleBranchSelect = (id) => {
    setSelectedBranchID((prev) => (prev === id ? null : id)); // Toggle branch selection
    Cookies.set("selectedBranchID", id, { expires: 7 });
  };

  const openUpdateBranchModal = () => {
    if (!selectedBranchID) {
      alert("Please select a branch to update");
      return;
    }
  
    // Find the branch data based on the selectedBranchID
    const selectedBranch = showAllCompanyDetails.find(({ _id }) => _id === selectedBranchID);
    if (selectedBranch) {
      // Set the input data with the selected branch details
      setInputData({
        ...inputData,
        branch: selectedBranch.name,
        address: selectedBranch.address,
        pin: selectedBranch.pin,
      });
      setIsUpdateBranchModalOpen(true); // Open the update branch modal
    }
  };
  
  const closeUpdateBranchModal = () => setIsUpdateBranchModalOpen(false);

  const [inputData, setInputData] = useState({
    name: "",
    branch: "",
    address: "",
    companyID: " ",
    branchId:" ",
    pin: " ",
  });
  
  // Save a new company
  const saveNewCompanyName = async (e) => {
    e.preventDefault();
    if (!inputData.name) {
      alert("Company name is required");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/common/add-company`, {
        name: inputData.name,
      });
      alert("Company added successfully");
      closeCompanyModal();
      fetchCompanyNameData(); // Refresh the company list
    } catch (error) {
      console.error(error);
      alert("Error: Unable to add company");
    }
  };

  
  const updateCompanyName = async (e) => {
    e.preventDefault();
    if (!inputData.name || !selectedCompanyID) {
      alert("Please select a company and enter a new name");
      return;
    }

    const requestData = {
      companyId: selectedCompanyID, // Send the company ID
      name: inputData.name,       // Send the new company name
    };

    try {
      await axios.put(`${process.env.REACT_APP_SERVER_ADDRESS}/common/update-company`, requestData)

      alert("Company updated successfully");
      closeUpdateCompanyModal();
      fetchCompanyNameData();
    } catch (error) {
      console.error(error);
      alert("Error: Unable to update company");
    }
  };

  
  const updateBranchName = async (e) => {
    e.preventDefault();
    if (!inputData.branch || !selectedBranchID) {
      alert("Please select a branch and enter the new details");
      return;
    }

    const finalData= {
      branchId : selectedBranchID,
      name: inputData.branch,
      address: inputData.address,
      pin: inputData.pin,
    }
    try {
      await axios.put(`${process.env.REACT_APP_SERVER_ADDRESS}/common/update-branch`, finalData);
      alert("Branch updated successfully");
      closeUpdateBranchModal();
      fetchAllCompanyDetails(); // Refresh the branch details
    } catch (error) {
      console.error(error);
      alert("Error: Unable to update branch");
    }
  };
  

  // Save a new branch
  const saveNewBranch = async (e) => {
    e.preventDefault();
    if (!inputData.companyID || !inputData.branch || !inputData.address) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/common/add-branch`, {
        companyID: inputData.companyID,
        name: inputData.branch,
        address: inputData.address,
        pin:inputData.pin,
      });
      alert("Branch added successfully");
      closeBranchModal();
    } catch (error) {
      console.log(error);
      alert("Error: Unable to add branch");
    }
  };

  const handleFormData = (e) => {
    const { value, name } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const fetchCompanyNameData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-company`);
      setCompanyName(response?.data?.data);
    } catch (error) {
      alert("Error: Unable to fetch company name data");
    }
  };

  const fetchAllCompanyDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-all-companyDetails`);
      setAllCompanyDetails(response?.data?.data);
    } catch (error) {
      alert("Unable to fetch all company data", error);
    }
  };

  const handleCompanytSelect = (id) => {
    setSelectedCompanyID((prev) => (prev === id ? null : id)); // Toggle ompany selection
    Cookies.set("selectedCompanyID", id, { expires: 7 });
  };

  useEffect(() => {
    fetchCompanyNameData();
    fetchAllCompanyDetails();
  }, []);

  const filteredBranchDetails = showAllCompanyDetails?.filter(
    (item) => item.companyID?._id === selectedCompanyID
  );

  return (
    <div className="pl-2 w-full pr-2 pt-4 ">
      {/* Header Section */}
      <div className="bgMainColor flex py-2 pl-1 pb-1 justify-between">
        <div className="flex justify-start">

          <h4 className="text-white ml-2">List of Company</h4>
        </div>
        <div className="flex justify-end">
        <button onClick={openCompanyModal} className="font-semibold mr-2 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add Company</button>
        <button onClick={openUpdateCompanyModal} className="font-semibold mr-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Update Company</button>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex gap-10 mt">
        {/* Company Table */}
        <div className="w-[20%] ">
          <table className="table-auto w-full border-collapse border border-gray-400">
            <thead className="border border-gray-400 sticky top-0 bg-white z-2">
              <tr>
                <th className="text-blue-600/100 border border-gray-400 w-14">Select</th>
                <th className="text-blue-600/100 border border-gray-400">Company</th>
              </tr>
            </thead>
          </table>
          
          <div className="max-h-[200px] overflow-y-auto">
            <table className="table-auto w-full border-collapse border border-gray-400">
              <tbody>
                {companynamedata?.map(({ _id, name }) => (
                  <tr key={_id}>
                    <td className="border border-gray-400 flex justify-center items-center  h-8 w-14">
                      <input
                        type="checkbox"
                        checked={selectedCompanyID === _id}
                        onChange={() => handleCompanytSelect(_id)}
                      />
                    </td>
                    <td className="border border-gray-400">{name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    
      {/* Header Section */}
      <div className="bgMainColor flex py-2 pl-1 pb-1 justify-between mt-4">
        <div className="flex justify-start ">
          <h4 className="text-white ml-2 mt-2">List of Branch</h4>
        </div>
        <div className="flex justify-end">
          <button onClick={openBranchModal} className="font-semibold mr-2 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add Branch</button>
          <button onClick={openUpdateBranchModal} className="font-semibold mr-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Update Branch</button>
        </div>
      </div>
      
      <div className="w-full ">
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
              {filteredBranchDetails?.map(({ _id, name, address, pin }) => (
                <tr key={_id}>
                  <td className="border-t border-gray-300 flex justify-center items-center align-middle h-8">
                    <input 
                      type="checkbox"
                      checked={selectedBranchID === _id}
                      onChange={() => handleBranchSelect(_id)}
                    />
                  </td>
                  <td className="border border-black">{name}</td>
                  <td className="border border-black">{address}</td>
                  <td className="border border-black">{pin}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

        {/* Add New Company Modal */}
        {isCompanyModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-1/3">
              <h3 className="text-lg font-bold mb-4">Add New Company</h3>
              <form onSubmit={saveNewCompanyName}>
                <div className="mb-4">
                  <label htmlFor="companyName" className="block font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={inputData.name}
                    name="name"
                    onChange={handleFormData}
                    id="companyName"
                    placeholder="Enter company name"
                    className="mt-1 py-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-red-600 text-white py-2 px-4 rounded-md mr-2"
                    onClick={closeCompanyModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-md">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Update Company Modal */}
        {isUpdateCompanyModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 w-1/3">
          <h3 className="text-lg font-bold mb-4">Update Company</h3>
          <form onSubmit={updateCompanyName}>
            <div className="mb-4">
              <label htmlFor="updateCompanyName" className="block font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                value={inputData.name}
                name="name"
                onChange={handleFormData}
                id="updateCompanyName"
                placeholder="Enter new company name"
                className="mt-1 py-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-red-600 text-white py-2 px-4 rounded-md mr-2"
                onClick={closeUpdateCompanyModal}
              >
                Cancel
              </button>
              <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-md">
                Save
              </button>
            </div>
          </form>
        </div>
        </div>
       )}

      
      {/* Add New Branch Modal */}
      {isBranchModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h3 className="text-lg font-bold mb-4">Add New Branch</h3>
            <form onSubmit={saveNewBranch}>
              <div className="mb-4">
                <label htmlFor="companySelect" className="block font-medium text-gray-700">
                  Select Company
                </label>
                <select
                  name="companyID"
                  id="companySelect"
                  value={inputData.companyID || ""}
                  onChange={handleFormData}
                  className="mt-1 py-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">---Select Company Name---</option>
                  {companynamedata?.map(({ name, _id }) => (
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="branchName" className="block font-medium text-gray-700">
                  Branch Name
                </label>
                <input
                  type="text"
                  value={inputData.branch}
                  name="branch"
                  onChange={handleFormData}
                  id="branchName"
                  placeholder="Enter branch name"
                  className="mt-1 py-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="block font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={inputData.address}
                  name="address"
                  onChange={handleFormData}
                  id="address"
                  placeholder="Enter address"
                  className="mt-1 py-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="block font-medium text-gray-700">
                  Pin
                </label>
                <input
                  type="text"
                  value={inputData.pin}
                  name="pin"
                  onChange={handleFormData}
                  id="pin"
                  placeholder="Enter pin"
                  className="mt-1 py-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-red-600 text-white py-2 px-4 rounded-md mr-2"
                  onClick={closeBranchModal}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-md">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* open update branch model  */}
      {isUpdateBranchModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h3 className="text-lg font-bold mb-4">Update Branch</h3>
            <form onSubmit={updateBranchName}>
              <div className="mb-4">
                <label htmlFor="updateBranchName" className="block font-medium text-gray-700">
                  Branch Name
                </label>
                <input
                  type="text"
                  value={inputData.branch}
                  name="branch"
                  onChange={handleFormData}
                  id="updateBranchName"
                  placeholder="Enter new branch name"
                  className="mt-1 py-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="updateAddress" className="block font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={inputData.address}
                  name="address"
                  onChange={handleFormData}
                  id="updateAddress"
                  placeholder="Enter new address"
                  className="mt-1 py-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="updatePin" className="block font-medium text-gray-700">
                  Pin Code
                </label>
                <input
                  type="text"
                  value={inputData.pin}
                  name="pin"
                  onChange={handleFormData}
                  id="updatePin"
                  placeholder="Enter new pin code"
                  className="mt-1 py-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-red-600 text-white py-2 px-4 rounded-md mr-2"
                  onClick={closeUpdateBranchModal}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-md">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default AddNewCompany;








