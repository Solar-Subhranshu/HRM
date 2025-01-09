import React, { useState } from "react";
import Cookies from "js-cookie";

const EmployeeDetails = () => {
  const getEmployeeDetailsData = JSON.parse(Cookies.get("EmployeeDetails"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

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

  const openImageModal = (imageSrc) => {
    setModalImageSrc(imageSrc);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setModalImageSrc("");
  };

  return (
    <div className="flex flex-wrap p-6 bg-gray-50">
      {/* Debugging JSON Data */}
      {/* <pre>{JSON.stringify(getEmployeeDetailsData, null, 2)}</pre> */}

      {/* First Column */}
      <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md mb-6">

      <div className="flex justify-between ">
          <p className="text-lg font-semibold text-gray-800">Employee Name:</p>
          <span className="font-normal">{getEmployeeDetailsData?.name}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Employee Code:</p>
          <span className="font-normal">{getEmployeeDetailsData?.employeeCode}</span>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Father/Husband Name:</p>
          <span className="font-normal">{getEmployeeDetailsData?.father_husbandName}</span>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Date of Birth:</p>
          <span className="font-normal">{formatDate(getEmployeeDetailsData?.dateOfBirth)}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Personal Phone Number:</p>
          <span className="font-normal">{getEmployeeDetailsData?.personalPhoneNum}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Company Phone Number:</p>
          <span className="font-normal">{getEmployeeDetailsData?.companyPhoneNum}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Personal Email:</p>
          <span className="font-normal">{getEmployeeDetailsData?.personalEmail}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Company Email:</p>
          <span className="font-normal">{getEmployeeDetailsData?.companyEmail}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Permanent Address:</p>
          <span className="font-normal">{getEmployeeDetailsData?.permanentAddress}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Permanent Pin Code:</p>
          <span className="font-normal">{getEmployeeDetailsData?.permanentPinCode}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Current Address:</p>
          <span className="font-normal">{getEmployeeDetailsData?.currentAddress}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Current Pin Code:</p>
          <span className="font-normal">{getEmployeeDetailsData?.currentPinCode}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Aadhar Number:</p>
          <span className="font-normal">{getEmployeeDetailsData?.aadharCard}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Pancard Number:</p>
          <span className="font-normal">{getEmployeeDetailsData?.panCard}</span>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Qualification:</p>
          <span className="font-normal">{getEmployeeDetailsData?.qualification?.name}</span>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Degree:</p>
          <span className="font-normal">{getEmployeeDetailsData?.degree?.name}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">ReportingManager:</p>
          <span className="font-normal">{getEmployeeDetailsData?.reportingManager?.name}</span>
        </div>

      </div>

      {/* Second Column */}
      <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md mb-6">
        <div className="flex justify-between">
          <p className="text-lg font-semibold text-gray-800">Bank Name:</p>
          <span className="font-normal">{getEmployeeDetailsData?.bankName}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Branch Name:</p>
          <span className="font-normal">{getEmployeeDetailsData?.branchName}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Account Number:</p>
          <span className="font-normal">{getEmployeeDetailsData?.bankAccount}</span>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">IFSC Code:</p>
          <span className="font-normal">{getEmployeeDetailsData?.bankIFSC}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Account Holder Name:</p>
          <span className="font-normal">{getEmployeeDetailsData?.bankAccountHolderName}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Bank Address:</p>
          <span className="font-normal">{getEmployeeDetailsData?.bankAddress}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Joining Date:</p>
          <span className="font-normal">{formatDate(getEmployeeDetailsData?.joiningDate)}</span>
        </div>
        <div className="flex justify-between mt-4">
          <p className="text-lg font-semibold text-gray-800">Last Appraisal Date:</p>
          <span className="font-normal">{formatDate(getEmployeeDetailsData?.lastAppraisalDate)}</span>
        </div>
        <div className="flex justify-between mt-4">
          <p className="text-lg font-semibold text-gray-800">Resignation Date:</p>
          <span className="font-normal">{formatDate(getEmployeeDetailsData?.regisnationDate)}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Company Name:</p>
          <span className="font-normal">{getEmployeeDetailsData?.branchName}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Company Branch Name:</p>
          <span className="font-normal">{getEmployeeDetailsData?.branch?.name}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Department Name:</p>
          <span className="font-normal">{getEmployeeDetailsData?.department?.department}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Designation Name:</p>
          <span className="font-normal">{getEmployeeDetailsData?.designation?.designation}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Office Time Policy Name:</p>
          <span className="font-normal">{getEmployeeDetailsData?.officeTimePolicy?.policyName}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Shift Name:</p>
          <span className="font-normal">{getEmployeeDetailsData?.shift?.name}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">WorkType:</p>
          <span className="font-normal">{getEmployeeDetailsData?.workType?.workType}</span>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold text-gray-800">Joining Hr Name:</p>
          <span className="font-normal">{getEmployeeDetailsData?.joiningHR?.name}</span>
        </div>

      </div>

     

      {/* Images Section */}
      <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Attachments</h2>
        <div className="grid grid-cols-2 gap-4">
          {getEmployeeDetailsData.aadharCardAttachment && (
            <img
              src={getEmployeeDetailsData.aadharCardAttachment}
              alt="Aadhar Card"
              className="w-96 h-48 object-cover cursor-pointer"
              onClick={() => openImageModal(getEmployeeDetailsData.aadharCardAttachment)}
            />
          )}
          {getEmployeeDetailsData.panCardAttachment && (
            <img
              src={getEmployeeDetailsData.panCardAttachment}
              alt="PAN Card"
              className="w-96 h-48 cursor-pointer"
              onClick={() => openImageModal(getEmployeeDetailsData.panCardAttachment)}
            />
          )}
          {getEmployeeDetailsData.bankAttachment && (
            <img
              src={getEmployeeDetailsData.bankAttachment}
              alt="Bank Attachment"
              className="w-96 h-48 cursor-pointer"
              onClick={() => openImageModal(getEmployeeDetailsData.bankAttachment)}
            />
          )}
          {getEmployeeDetailsData.joiningFormAttachment && (
            <img
              src={getEmployeeDetailsData.joiningFormAttachment}
              alt="Joining Form"
              className="w-96 h-48 cursor-pointer"
              onClick={() => openImageModal(getEmployeeDetailsData.joiningFormAttachment)}
            />
          )}
          {getEmployeeDetailsData.otherAttachment && (
            <img
              src={getEmployeeDetailsData.otherAttachment}
              alt="Other Attachment"
              className="w-96 h-48 cursor-pointer"
              onClick={() => openImageModal(getEmployeeDetailsData.otherAttachment)}
            />
          )}
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Image Wrapper */}
            <img
              src={modalImageSrc}
              alt="Full Screen"
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Close Button */}
            <div className="">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-white text-black font-bold text-3xl rounded-full w-9 h-9  items-center"
              style={{ zIndex: 100 }}
            >
              &times;
            </button>
            </div>
          </div>
        </div>
      )}
     
      
    </div>
  );
};

export default EmployeeDetails;

// import Cookies from "js-cookie";

// const EmployeeDetails = () => {
//   const getEmployeeDetailsData = JSON.parse(Cookies.get("EmployeeDetails"));
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalImageSrc, setModalImageSrc] = useState("");

//   // Format Dates
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const openImageModal = (imageSrc) => {
//     setModalImageSrc(imageSrc);
//     setIsModalOpen(true);
//   };

//   const closeImageModal = () => {
//     setIsModalOpen(false);
//     setModalImageSrc("");
//   };

//   return (
//     <div className="flex flex-wrap p-6 bg-gray-50">
//       {/* Other columns */}
//       <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md mb-6">
//         {/* Employee Details (left and right sections are here) */}
//         {/* First Column */}
//         <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md mb-6">

//           <div className="flex justify-between ">
//               <p className="text-lg font-semibold text-gray-800">Employee Name:</p>
//               <span className="font-normal">{getEmployeeDetailsData.name}</span>
//             </div>

//             <div className="flex justify-between mt-2">
//               <p className="text-lg font-semibold text-gray-800">Employee Code:</p>
//               <span className="font-normal">{getEmployeeDetailsData.employeeCode}</span>
//             </div>
//             <div className="flex justify-between mt-2">
//               <p className="text-lg font-semibold text-gray-800">Father/Husband Name:</p>
//               <span className="font-normal">{getEmployeeDetailsData.father_husbandName}</span>
//             </div>
//             <div className="flex justify-between mt-2">
//               <p className="text-lg font-semibold text-gray-800">Date of Birth:</p>
//               <span className="font-normal">{formatDate(getEmployeeDetailsData.dateOfBirth)}</span>
//             </div>

//             <div className="flex justify-between mt-2">
//               <p className="text-lg font-semibold text-gray-800">Personal Phone Number:</p>
//               <span className="font-normal">{getEmployeeDetailsData.personalPhoneNum}</span>
//             </div>

//             <div className="flex justify-between mt-2">
//               <p className="text-lg font-semibold text-gray-800">Company Phone Number:</p>
//               <span className="font-normal">{getEmployeeDetailsData.companyPhoneNum}</span>
//             </div>

//             <div className="flex justify-between mt-2">
//               <p className="text-lg font-semibold text-gray-800">Personal Email:</p>
//               <span className="font-normal">{getEmployeeDetailsData.personalEmail}</span>
//             </div>

//             <div className="flex justify-between mt-2">
//               <p className="text-lg font-semibold text-gray-800">Company Email:</p>
//               <span className="font-normal">{getEmployeeDetailsData.companyEmail}</span>
//             </div>

//             <div className="flex justify-between mt-2">
//               <p className="text-lg font-semibold text-gray-800">Permanent Address:</p>
//               <span className="font-normal">{getEmployeeDetailsData.permanentAddress}</span>
//             </div>

//             <div className="flex justify-between mt-2">
//               <p className="text-lg font-semibold text-gray-800">Permanent Pin Code:</p>
//               <span className="font-normal">{getEmployeeDetailsData.permanentPinCode}</span>
//             </div>

//             <div className="flex justify-between mt-2">
//               <p className="text-lg font-semibold text-gray-800">Current Address:</p>
//               <span className="font-normal">{getEmployeeDetailsData.currentAddress}</span>
//             </div>

//             <div className="flex justify-between mt-2">
//               <p className="text-lg font-semibold text-gray-800">Current Pin Code:</p>
//               <span className="font-normal">{getEmployeeDetailsData.currentPinCode}</span>
//             </div>

//             <div className="flex justify-between mt-2">
//               <p className="text-lg font-semibold text-gray-800">Aadhar Number:</p>
//               <span className="font-normal">{getEmployeeDetailsData.aadharCard}</span>
//             </div>




//             <div className="flex justify-between mt-2">
//               <p className="text-lg font-semibold text-gray-800">Pancard Number:</p>
//               <span className="font-normal">{getEmployeeDetailsData.panCard}</span>
//             </div>
//             <div className="flex justify-between mt-2">
//               <p className="text-lg font-semibold text-gray-800">Qualification:</p>
//               <span className="font-normal">{getEmployeeDetailsData.qualification.name}</span>
//             </div>
//             <div className="flex justify-between mt-2">
//               <p className="text-lg font-semibold text-gray-800">Degree:</p>
//               <span className="font-normal">{getEmployeeDetailsData.degree.name}</span>
//             </div>

//             <div className="flex justify-between mt-2">
//               <p className="text-lg font-semibold text-gray-800">ReportingManager:</p>
//               <span className="font-normal">{getEmployeeDetailsData.reportingManager.name}</span>
//             </div>

//         </div>

//         {/* Second Column */}
//       <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md mb-6">
//         <div className="flex justify-between">
//           <p className="text-lg font-semibold text-gray-800">Bank Name:</p>
//           <span className="font-normal">{getEmployeeDetailsData?.bankName}</span>
//         </div>

//         <div className="flex justify-between mt-2">
//           <p className="text-lg font-semibold text-gray-800">Branch Name:</p>
//           <span className="font-normal">{getEmployeeDetailsData?.branchName}</span>
//         </div>

//         <div className="flex justify-between mt-2">
//           <p className="text-lg font-semibold text-gray-800">Account Number:</p>
//           <span className="font-normal">{getEmployeeDetailsData?.bankAccount}</span>
//         </div>
//         <div className="flex justify-between mt-2">
//           <p className="text-lg font-semibold text-gray-800">IFSC Code:</p>
//           <span className="font-normal">{getEmployeeDetailsData?.bankIFSC}</span>
//         </div>

//         <div className="flex justify-between mt-2">
//           <p className="text-lg font-semibold text-gray-800">Account Holder Name:</p>
//           <span className="font-normal">{getEmployeeDetailsData?.bankAccountHolderName}</span>
//         </div>

//         <div className="flex justify-between mt-2">
//           <p className="text-lg font-semibold text-gray-800">Bank Address:</p>
//           <span className="font-normal">{getEmployeeDetailsData?.bankAddress}</span>
//         </div>

//         <div className="flex justify-between mt-2">
//           <p className="text-lg font-semibold text-gray-800">Joining Date:</p>
//           <span className="font-normal">{formatDate(getEmployeeDetailsData?.joiningDate)}</span>
//         </div>
//         <div className="flex justify-between mt-4">
//           <p className="text-lg font-semibold text-gray-800">Last Appraisal Date:</p>
//           <span className="font-normal">{formatDate(getEmployeeDetailsData?.lastAppraisalDate)}</span>
//         </div>
//         <div className="flex justify-between mt-4">
//           <p className="text-lg font-semibold text-gray-800">Resignation Date:</p>
//           <span className="font-normal">{formatDate(getEmployeeDetailsData?.regisnationDate)}</span>
//         </div>

//         <div className="flex justify-between mt-2">
//           <p className="text-lg font-semibold text-gray-800">Company Name:</p>
//           <span className="font-normal">{getEmployeeDetailsData?.branchName}</span>
//         </div>

//         <div className="flex justify-between mt-2">
//           <p className="text-lg font-semibold text-gray-800">Company Branch Name:</p>
//           <span className="font-normal">{getEmployeeDetailsData?.branch?.name}</span>
//         </div>

//         <div className="flex justify-between mt-2">
//           <p className="text-lg font-semibold text-gray-800">Department Name:</p>
//           <span className="font-normal">{getEmployeeDetailsData?.department?.department}</span>
//         </div>

//         <div className="flex justify-between mt-2">
//           <p className="text-lg font-semibold text-gray-800">Designation Name:</p>
//           <span className="font-normal">{getEmployeeDetailsData?.designation?.designation}</span>
//         </div>

//         <div className="flex justify-between mt-2">
//           <p className="text-lg font-semibold text-gray-800">Office Time Policy Name:</p>
//           <span className="font-normal">{getEmployeeDetailsData?.officeTimePolicy?.policyName}</span>
//         </div>

//         <div className="flex justify-between mt-2">
//           <p className="text-lg font-semibold text-gray-800">Shift Name:</p>
//           <span className="font-normal">{getEmployeeDetailsData?.shift?.name}</span>
//         </div>

//         <div className="flex justify-between mt-2">
//           <p className="text-lg font-semibold text-gray-800">WorkType:</p>
//           <span className="font-normal">{getEmployeeDetailsData?.workType?.workType}</span>
//         </div>

//         <div className="flex justify-between mt-2">
//           <p className="text-lg font-semibold text-gray-800">Office Time Policy Name:</p>
//           <span className="font-normal">{getEmployeeDetailsData?.branchName}</span>
//         </div>

//       </div>
//       </div>

//       {/* Images Section */}
//       <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md mb-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">Attachments</h2>
//         <div className="grid grid-cols-1 gap-4">
//           {getEmployeeDetailsData.aadharCardAttachment && (
//             <img
//               src={getEmployeeDetailsData.aadharCardAttachment}
//               alt="Aadhar Card"
//               className="w-full h-auto cursor-pointer"
//               onClick={() => openImageModal(getEmployeeDetailsData.aadharCardAttachment)}
//             />
//           )}
//           {getEmployeeDetailsData.panCardAttachment && (
//             <img
//               src={getEmployeeDetailsData.panCardAttachment}
//               alt="PAN Card"
//               className="w-full h-auto cursor-pointer"
//               onClick={() => openImageModal(getEmployeeDetailsData.panCardAttachment)}
//             />
//           )}
//           {getEmployeeDetailsData.bankAttachment && (
//             <img
//               src={getEmployeeDetailsData.bankAttachment}
//               alt="Bank Attachment"
//               className="w-full h-auto cursor-pointer"
//               onClick={() => openImageModal(getEmployeeDetailsData.bankAttachment)}
//             />
//           )}
//           {getEmployeeDetailsData.joiningFormAttachment && (
//             <img
//               src={getEmployeeDetailsData.joiningFormAttachment}
//               alt="Joining Form"
//               className="w-full h-auto cursor-pointer"
//               onClick={() => openImageModal(getEmployeeDetailsData.joiningFormAttachment)}
//             />
//           )}
//           {getEmployeeDetailsData.otherAttachment && (
//             <img
//               src={getEmployeeDetailsData.otherAttachment}
//               alt="Other Attachment"
//               className="w-full h-auto cursor-pointer"
//               onClick={() => openImageModal(getEmployeeDetailsData.otherAttachment)}
//             />
//           )}
//         </div>
//       </div>

//       {/* Image Modal */}
//       {/* {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <div className="relative">
//             <img src={modalImageSrc} alt="Full Screen" className="max-w-full max-h-full" />
//             <button
//               onClick={closeImageModal}
//               className="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center focus:outline-none shadow-md"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )} */}

// {isModalOpen && (
//   <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//     <div className="relative w-full h-full flex items-center justify-center">
//       {/* Image Wrapper */}
//       <img
//         src={modalImageSrc}
//         alt="Full Screen"
//         className="max-w-full max-h-full object-contain"
//       />
      
//       {/* Close Button */}
//       <div className="">
//       <button
//         onClick={closeImageModal}
//         className="absolute top-4 right-4 bg-white text-black font-bold text-3xl rounded-full w-9 h-9  items-center"
//         style={{ zIndex: 100 }}
//       >
//         &times;
//       </button>
//       </div>
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// export default EmployeeDetails;









