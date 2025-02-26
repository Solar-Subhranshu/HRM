import React, { useEffect, useState } from "react";
import { FaListUl } from "react-icons/fa6";
import axios from "axios";

function AddNewCompany() {
  const [showAllCompanyDetails, setAllCompanyDetails] = useState([]);

  const fetchAllCompanyDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/common/show-all-companyDetails`
      );
      setAllCompanyDetails(response?.data?.data);
      console.log(showAllCompanyDetails);
    } catch (error) {
      alert("Unable to fetch all company data", error);
    }
  };

  useEffect(() => {
    fetchAllCompanyDetails();
  }, []);

  return (
    <div className="w-[calc(100%-30%)]">
      {/* Header Section */}
      <div className="bgMainColor flex py-2 pl-1 gap-3">
        <FaListUl size={24} />
        <h4 className="text-white">Show all Company</h4>
      </div>

      {/* Table Section */}
      <div className="max-h-[250px] overflow-y-auto border border-gray-500">
        <table className="table-auto w-full border-collapse border border-gray-500">
          <thead className="bg-gray-100 sticky top-0 z-6">
            <tr>
              <th className="text-blue-600 border border-gray-500">Company</th>
              <th className="text-blue-600 border border-gray-500">Branch</th>
              <th className="text-blue-600 border border-gray-500">Address</th>
              <th className="text-blue-600 border border-gray-500">Pin</th>
            </tr>
          </thead>
          <tbody>
            {showAllCompanyDetails?.map(
              ({ _id, address, name, companyID, pin }) => (
                <tr key={_id}>
                  <td className="text-center border border-gray-500">{companyID?.name}</td>
                  <td className="text-center border border-gray-500">{name}</td>
                  <td className="text-center border border-gray-500">{address}</td>
                  <td className="text-center border border-gray-500">{pin}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddNewCompany;

