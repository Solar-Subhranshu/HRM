import React from "react";
import Cookies from "js-cookie";

const EmployeeDetails = () => {
  const getEmployeeDetailsData = JSON.parse(Cookies.get("EmployeeDetails"));

  // Format Dates
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-wrap p-6 bg-gray-50">
      {/* Debugging JSON Data */}
      <pre>{JSON.stringify(getEmployeeDetailsData, null, 2)}</pre>

      {/* First Column */}
      <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md mb-6">

      <div className="flex justify-between ">
          <p className="text-lg font-semibold text-gray-800">Employee Name:</p>
          <span className="font-normal">{getEmployeeDetailsData.name}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Employee Code:</p>
          <span className="font-normal">{getEmployeeDetailsData.employeeCode}</span>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Father/Husband Name:</p>
          <span className="font-normal">{getEmployeeDetailsData.father_husbandName}</span>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Date of Birth:</p>
          <span className="font-normal">{formatDate(getEmployeeDetailsData.dateOfBirth)}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Personal Phone Number:</p>
          <span className="font-normal">{getEmployeeDetailsData.personalPhoneNum}</span>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Personal Email:</p>
          <span className="font-normal">{getEmployeeDetailsData.personalEmail}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Permanent Address:</p>
          <span className="font-normal">{getEmployeeDetailsData.permanentAddress}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Permanent Pin Code:</p>
          <span className="font-normal">{getEmployeeDetailsData.permanentPinCode}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Current Address:</p>
          <span className="font-normal">{getEmployeeDetailsData.currentAddress}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Current Pin Code:</p>
          <span className="font-normal">{getEmployeeDetailsData.currentPinCode}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Aadhar Number:</p>
          <span className="font-normal">{getEmployeeDetailsData.aadharCard}</span>
        </div>




        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Pancard Number:</p>
          <span className="font-normal">{getEmployeeDetailsData.panCard}</span>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Qualification:</p>
          <span className="font-normal">{getEmployeeDetailsData.qualification.name}</span>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Degree:</p>
          <span className="font-normal">{getEmployeeDetailsData.degree.name}</span>
        </div>
      </div>

      {/* Second Column */}
      <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md mb-6">
        <div className="flex justify-between">
          <p className="text-lg font-semibold text-gray-800">Bank Name:</p>
          <span className="font-normal">{getEmployeeDetailsData.bankName}</span>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Branch Name:</p>
          <span className="font-normal">{getEmployeeDetailsData.branchName}</span>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Account Number:</p>
          <span className="font-normal">{getEmployeeDetailsData.bankAccount}</span>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">IFSC Code:</p>
          <span className="font-normal">{getEmployeeDetailsData.bankIFSC}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Account Holder Name:</p>
          <span className="font-normal">{getEmployeeDetailsData.bankAccountHolderName}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Bank Address:</p>
          <span className="font-normal">{getEmployeeDetailsData.bankAddress}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Joining Date:</p>
          <span className="font-normal">{formatDate(getEmployeeDetailsData.joiningDate)}</span>
        </div>
        <div className="flex justify-between mt-4">
          <p className="text-lg font-semibold text-gray-800">Last Appraisal Date:</p>
          <span className="font-normal">{formatDate(getEmployeeDetailsData.lastAppraisalDate)}</span>
        </div>
        <div className="flex justify-between mt-4">
          <p className="text-lg font-semibold text-gray-800">Resignation Date:</p>
          <span className="font-normal">{formatDate(getEmployeeDetailsData.regisnationDate)}</span>
        </div>
      </div>

      {/* Images Section */}
      <div className="w-full p-4 bg-white rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Attachments</h2>
        <div className="flex">
          <img
            src={getEmployeeDetailsData.aadharCardAttachment}
            alt="Aadhar Card"
            className="w-32 h-auto mr-4"
          />
          <img
            src={getEmployeeDetailsData.panCardAttachment}
            alt="PAN Card"
            className="w-32 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;




