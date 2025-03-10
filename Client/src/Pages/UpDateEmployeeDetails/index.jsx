// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from "js-cookie";
// import { useNavigate } from 'react-router-dom';

// function Registration() {

//   const navigate = useNavigate();

//   const [isImageOpen, setIsImageOpen] = useState(false);
//     const [imageSize, setImageSize] = useState(100); // Initial image size in percentage

//   const [errors, setErrors] = useState({});
//   const [departmentName, setDepartmentName] = useState([]);
//   const [DesginationData, setDeginationData] = useState([]);
//   const [companynamedata, setCompanyName] = useState([]);
//   const [branchnamedata, setBranchNameData] = useState([]);
//   const [qulificationdata, setQulificationData] = useState([]);
//   const [workTypeData, setWorkTypeData]=useState([]);
  
//   const [qualificationId, setQualificationId] = useState("");
//   const [companyId, setCompanyId]=useState("");
//   const [departmentId, setDepartmentId]=useState('');

//   const [degreeData, setDegreeData] = useState([]);
//   const [shiftName, setShiftName] = useState([]);
//   const [officeTimePolicy, setOfficeTimePolicy] = useState([]);
//   const [reportingManager, setReportingManager] = useState([]);
//   const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
//   const [selectedCompanyNameId, setSelectedCompanyNameId] = useState('');
//   const [selectedQualificationId, setSelectedQualificationId] = useState();

//   const [updatedAttachments, setUpdatedAttachments] = useState([]); // Tracks updated attachments

//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [reportingManagers, setReportingManagers] = useState([]);
//   const [selectedManager, setSelectedManager] = useState(null);

//    const [joiningHrNameData, setJoiningHrNameData]=useState([]);

//   useEffect(() => {
//     // Fetch the reporting managers data from the backend
//     axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/showAllEmployee`)
//       .then((response) => {
//         setReportingManagers(response.data.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching reporting managers:', error);
//       });
//   }, []);

//   // Toggle the dropdown visibility
//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   // Handle search input
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Handle reporting manager selection
//   const handleManagerSelect = (manager) => {
//     setSelectedManager(manager);
//     setFormData((prev) => ({
//       ...prev,
//       reportingManager: manager?._id, // Send only the ID to the backend
//     }));
//     setIsOpen(false);  // Close dropdown after selection
//   };

//   // Filter reporting managers based on search term
//   const filteredManagers = reportingManagers.filter((manager) =>
//     manager.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const [formData, setFormData] = useState({
//     employeeCode: "",
//     name: "",
//     father_husbandName: "",
//     dateOfBirth: "",
//     personalPhoneNum: "",
//     personalEmail: "",
//     panCard: "",
//     aadharCard: "",
//     qualification: "",
//     degree: "",
//     permanentAddress: "",
//     permanentPinCode: "",
//     currentAddress: "",
//     currentPinCode: "",
//     bankName: "",
//     branchName: "",
//     bankAccount: "",
//     bankIFSC: "",
//     bankAccountHolderName: "",
//     bankAddress: "",
//     reportingManager: "",
//     companyPhoneNum: "",
//     companyEmail: "",
//     joiningDate: "",
//     lastAppraisalDate: "",
//     regisnationDate: "",
//     company: "",
//     branch: "",
//     department: "",
//     designation: "",
//     aadharCardAttachment: "",
//     panCardAttachment: "",
//     bankAttachment: "",
//     joiningFormAttachment: "",
//     otherAttachment: "",
//     confirmAccountNumber: "",
//     officeTimePolicy: "",
//     shift: "",
//     workType : "",
//     joiningHR : ''
//   });
  
//   // Fetch data from cookies and set to formData state
//   useEffect(() => {
//     const employeeData = Cookies.get("EmployeeFormData");
//     console.log('My data', JSON.parse(employeeData));
    
//     if (employeeData) {
//       try {
//         const parsedData = JSON.parse(employeeData);
//         console.log("parseData",parsedData.joiningFormAttachment)
       
//       // Fetch attachments from cookies (assuming they're stored in Base64 format)
//       const attachments = {
//         aadharCardAttachment: parsedData.aadharCardAttachment || "",
//         panCardAttachment: parsedData.panCardAttachment|| "",
//         bankAttachment: parsedData.bankAttachment || "",
//         joiningFormAttachment: parsedData.joiningFormAttachment || "",
//         otherAttachment: parsedData.otherAttachment || "",
//       };

//        console.log('my attachment ', attachments)
//         setQualificationId(parsedData?.qualification?._id)
//         setCompanyId(parsedData?.company?._id);
//         setDepartmentId(parsedData?.department?._id);
//         setFormData((prev) => ({
//           ...prev,
//           ...parsedData,
//           qualification: parsedData?.qualification?._id,
//           company:parsedData?.company?._id,
//           department:parsedData?.department?._id,
//           officeTimePolicy:parsedData?.officeTimePolicy?._id,
//           shift:parsedData?.shift?._id,
//           workType:parsedData?.workType?._id,
//           reportingManager:parsedData?.reportingManager?._id,
//           joiningHR:parsedData?.joiningHR?._id,
//           dateOfBirth: parsedData?.dateOfBirth ? parsedData?.dateOfBirth.split('T')[0] : '',
//           joiningDate:parsedData?.joiningDate?parsedData?.joiningDate.split('T')[0]: "",
//           lastAppraisalDate:parsedData.lastAppraisalDate?parsedData.lastAppraisalDate.split('T')[0] : '',
//           regisnationDate:parsedData.regisnationDate?parsedData.regisnationDate.split('T')[0] : '',
//           ...attachments,
//         }));
//       } catch (error) {
//         console.error("Error parsing employee data from cookies:", error);
//       }
//     }
//   }, []);
  
//   // image are expend logic 
//     const handleImageClick = () => {
//       setIsImageOpen(true);  // Open the image and increase its size
//       setImageSize(300);     // Increase size to 300% when clicked
//     };
  
//     const handleClose = () => {
//       setIsImageOpen(false); // Close the image and revert to normal size
//       setImageSize(100);     // Revert size to 100%
//     };


//   // Fetching functions
//   const fetchDepartmentName = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-department`);
//       setDepartmentName(response.data.data);
//     } catch (error) {
//       alert('Error: Unable to fetch department Name data');
//     }
//   };

//   const fetchDeginationData = async (_id) => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-designation?departmentId=${_id}`);
//       setDeginationData(response.data.data);
//     } catch (error) {
//       alert('Error: Unable to fetch  degination data');
//     }
//   };

//   const fetchCompanyNameData = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-company`);
//       setCompanyName(response.data.data);
//     } catch (error) {
//       alert('Error: Unable to fetch company name data');
//     }
//   };

//   const fetchBranchNameData = async (_id) => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-branch?companyID=${_id}`);
//       setBranchNameData(response.data.data);
//     } catch (error) {
//       alert('Error: Unable to fetch branch name data');
//     }
//   };

//   const fetchQulificationData = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-qualification`);
//       setQulificationData(response.data.data);
//     } catch (error) {
//       alert('Error: Unable to fetch qualification name data');
//     }
//   };

//   const fetchDegreeData = async (_id) => {
//     console.log("QID",_id)
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-degree?qualificationId=${_id}`);
//       setDegreeData(response.data.data);
//     } catch (error) {
//       alert('Error: Unable to fetch degree data');
//     }
//   };

//   const fetchShiftNameData = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-shift`);
//       setShiftName(response.data.data);
//     } catch (error) {
//       alert('Error: Unable to fetch show shift data');
//     }
//   };

  

//   const fetchOfficeTimePolicyData = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-officeTimePolicy`);
//       setOfficeTimePolicy(response.data.data);
//     } catch (error) {
//       alert('Unable to Fetch Data');
//     }
//   };

//   const fetchWorkTypeData = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-workType`);
//       setWorkTypeData(response.data.data);
//     } catch (error) {
//       alert('Unable to Fetch Data work type data');
//     }
//   };
  
//   const fetchJoiningHrNameData = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/show-joining-HR`);
//       setJoiningHrNameData(response.data.data);
//     } catch (error) {
//       alert('Error: Unable to fetch Hr Name data ');
//     }
//   };

//   useEffect(() => {
//     fetchDepartmentName();
//     fetchCompanyNameData();
//     fetchQulificationData();
//     fetchShiftNameData();
//     fetchJoiningHrNameData();

//     fetchOfficeTimePolicyData();
//     fetchWorkTypeData();
//   }, []);

//   useEffect(() => {
//     if (departmentId) fetchDeginationData(departmentId);
//     if (companyId) fetchBranchNameData(companyId);
//     if (qualificationId) fetchDegreeData(qualificationId);
//   }, [departmentId, companyId, qualificationId]);

//   // Form Validation
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name) newErrors.name = 'Name is required';
//     if (!formData.father_husbandName) newErrors.father_husbandName = 'Father Name is required';
//     if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
//     if (!formData.personalPhoneNum) newErrors.personalPhoneNum = 'Contact number is required';
//     if (!formData.personalEmail) newErrors.personalEmail = 'Email is required';
//     if (!formData.aadharCard) newErrors.aadharCard = 'Aadhar Number is required';
//     if (!formData.permanentAddress) newErrors.permanentAddress = 'Permanent Address is required';
//     if (!formData.permanentPinCode) newErrors.permanentPinCode = 'Permanent Code is required';
//     if (!formData.currentAddress) newErrors.currentAddress = 'Current Address is required';
//     if (!formData.currentPinCode) newErrors.currentPinCode = 'Current Pin Code is required';
//     if (!formData.qualification) newErrors.qualification = 'Qualification is required';
//     if (!formData.panCard) newErrors.panCard = 'Pancard Number is required';
//     if (!formData.employeeCode) newErrors.employeeCode = 'Employee Code is required';
//     if (!formData.joiningDate) newErrors.joiningDate = 'Joining Date is required';
//     if (!formData.panCardAttachment) newErrors.panCardAttachment = 'Pancard is required';
//     if (!formData.aadharCardAttachment) newErrors.aadharCardAttachment = 'Aadhar card is required';
//     if (!formData.bankAttachment) newErrors.bankAttachment = 'Bank details are required';
//     if (!formData.joiningFormAttachment) newErrors.joiningFormAttachment = 'Joining form is required';
//     if (!formData.otherAttachment) newErrors.otherAttachment = 'Other documents are required';
//     return newErrors;
//   };
 
//   const [changedFields, setChangedFields] = useState([]); // Tracks changed fields
//   // Handling form data input
//   const handleFormData = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     // Track changed fields
//   setChangedFields((prev) => {
//     if (!prev.includes(name)) {
//       return [...prev, name];
//     }
//     return prev;
//   });

//   };


//   // file related change 
//   const convertToBase64 = (file) => {
//     console.log(convertToBase64)
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const validateFile = (file) => {
//     const validTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Customize allowed types
//     const maxSize = 5 * 1024 * 1024; // 5MB
  
//     if (!validTypes.includes(file.type)) {
//       alert('Invalid file type!');
//       return false;
//     }
  
//     if (file.size > maxSize) {
//       alert('File size exceeds 5MB!');
//       return false;
//     }
  
//     return true;
//   };
  
//   const handleFileChange = async (e, fieldName) => {
//     const file = e.target.files[0];
//     if (file && validateFile(file)) {
//       const base64 = await convertToBase64(file);
//       setFormData({ ...formData, [fieldName]: base64 });


//       // Track updated attachments
//       setUpdatedAttachments((prev) => {
//         if (!prev.includes(fieldName)) {
//           return [...prev, fieldName];
//         }
//         return prev;
//       });

//     }
//   };
 
//   const prepareAttachments = () => {
//     return updatedAttachments.map((field) => ({
//       fieldName: field,
//       fileData: formData[field],
//     }));
//   };
  
  
  

//   // Handle form submit for updating employee data
//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     const formErrors = validateForm();
//     setErrors(formErrors);
     


//     // If there are errors, stop the form submission
//     if (Object.keys(formErrors).length > 0) {
//       alert("Please correct the highlighted fields.");
//       return;
//     }
// //  // Prepare payload with only changed fields + updated attachments
// //  const updatedData = {};
// //  changedFields.forEach((field) => {
// //    updatedData[field] = formData[field];
// //  });
// // Prepare payload with only changed fields + updated attachments
// const updatedData = { employeeCode: formData.employeeCode };  // Ensure employeeCode is always included
// changedFields.forEach((field) => {
//   updatedData[field] = formData[field];
// });
//     const attachments = prepareAttachments();


//     try {
       
//       const payload = {
//         ...updatedData,  // Only changed form data
//         attachments, // Include only updated attachments
//       };

//       console.log("my payloda data is ", payload);

//         const response = await axios.patch(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/empUpdate`,payload,{
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//       if (response.status === 200 || response.status === 201) {
//         alert("Employee updated successfully!");
//         navigate('/layout/listofallemployee')
//       } else {
//         alert("Something went wrong during the update.");
//       }
//     } catch (error) {
//       console.error("Update error:", error);
//       alert("Error: Unable to update employee.");
//     }
//   };

 
  
//   return (
//     <div>
//       <div className=' py-4 text-center font-semibold text-2xl mt-4 ml-2 mr-2' style={{backgroundColor : '#740FD6'}}>
//         <h2 className='text-white'>Update Employee Registration</h2>
//       </div>
//       <div className='mx-10 pt-6'>
//         <form method='post' onSubmit={handleUpdateSubmit}>
//           <fieldset className='border-2  rounded-md mb-4' style={{ borderColor: '#740FD6'}}>
//             <legend className='font-semibold text-lg ml-8 ' style={{color : '#740FD6'}}> &nbsp;&nbsp; Employee Details &nbsp;&nbsp;</legend>
//             <div className='grid gap-3 m-6 md:grid-cols-4'>

//               {/* name input field   */}
//               <div>
//                 <label>
//                   <span>Name</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <input type='text' 
//                   value={formData.name}
//                   name='name'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {errors.name && <span className="text-red-600">{errors.name}</span>}
//               </div>
              
//               {/* father husband input field  */}
//               <div>
//                 <label>
//                   <span>Father/Husband Name</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <input type='text' 
//                   value={formData.father_husbandName}
//                   name='father_husbandName'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {errors.father_husbandName && <span className="text-red-600">{errors.father_husbandName}</span>}
//               </div>
              
//               {/* date of birth input field  */}
//               <div>
//                 <label>
//                   <span>Date Of Birth</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <input type='date' 
//                   value={formData.dateOfBirth}
//                   name='dateOfBirth'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {errors.dateOfBirth && <span className="text-red-600">{errors.dateOfBirth}</span>}
//               </div>
              
//               {/* personal phone number field  */}
//               <div>
//                 <label>
//                   <span>Contact Number</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <input type='text' 
//                   value={formData.personalPhoneNum}
//                   name='personalPhoneNum'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {errors.personalPhoneNum && <span className="text-red-600">{errors.personalPhoneNum}</span>}
//               </div>
              
//               {/* personal email if input field  */}
//               <div>
//                 <label>
//                   <span>Email</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <input type='email' 
//                   value={formData.personalEmail}
//                   name='personalEmail'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {errors.personalEmail && <span className="text-red-600">{errors.personalEmail}</span>}
//               </div>
              
//               {/* aadhar number field  */}
//               <div>
//                 <label>
//                   <span>Aadhar Number</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <input type='text' 
//                   value={formData.aadharCard}
//                   name='aadharCard'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {errors.aadharCard && <span className="text-red-600">{errors.aadharCard}</span>}
//               </div>
              
//               {/* permanent Address field  */}
//               <div>
//                 <label>
//                   <span>Permanent Address</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <input type='text' 
//                   value={formData.permanentAddress}
//                   name='permanentAddress'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {errors.permanentAddress && <span className="text-red-600">{errors.permanentAddress}</span>}
//               </div>
             
//              {/* permanent pin code field  */}
//               <div>
//                 <label>
//                   <span>Permanent Pin Code</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <input type='text' 
//                   value={formData.permanentPinCode}
//                   name='permanentPinCode'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {errors.permanentPinCode && <span className="text-red-600">{errors.permanentPinCode}</span>}
//               </div>
              
//               {/* current address field */}
//               <div>
//                 <label>
//                   <span>Current Address</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <input type='text' 
//                   value={formData.currentAddress}
//                   name='currentAddress'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {errors.currentAddress && <span className="text-red-600">{errors.currentAddress}</span>}
//               </div>
              
//               {/* current pin code field  */}
//               <div>
//                 <label>
//                   <span>Current Pin Code</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <input type='text' 
//                   value={formData.currentPinCode}
//                   name='currentPinCode'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {errors.currentPinCode && <span className="text-red-600">{errors.currentPinCode}</span>}
//               </div>
              
//               {/* higher Qualification field  */}
//               <div>
//                 <label>
//                   <span>Higher Qualification</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <select 
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                   onChange={(e) => {
                    
//                     setFormData(prevState => ({
//                       ...prevState,
//                       [e.target.name]: e.target.value
//                     }));
//                     setSelectedQualificationId(e.target.value);
//                   }}
//                   name="qualification"
//                 >
//                   <option>--Select Qualification--</option>
//                   {qulificationdata?.map(({names, id})=>(
//                     <option key={id} value={id}  selected={formData.qualification === id} >{names}</option>
//                   ))}
//                 </select>
//                 {errors.qualification && <span className="text-red-600">{errors.qualification}</span>}
//               </div>
              
//               {/* degree field  */}
//               <div>
//                 <label>
//                   <span>Degree</span>
//                 </label>
//                 <select 
//                 name='degree'
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                   onChange={(event) => {
//                     const { name, value} = event.target;
//                     setFormData((prev) => ({ ...prev, [name] : value}))
//                   }}
//                 >
//                   {degreeData?.map(({_id,name})=>(
//                     <option key={_id} value={_id} selected={formData.degree === _id} name={name}>{name}</option>
//                   ))}
//                 </select>
//                 {errors.degree && <span className="text-red-600">{errors.degree}</span>}
//                 {/* <span>{formData.degree}</span> */}
//               </div>
              
//               {/* pan card number field  */}
//               <div>
//                 <label>
//                   <span>Pancard Number</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <input type='text' 
//                   value={formData.panCard}
//                   name='panCard'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {errors.panCard && <span className="text-red-600">{errors.panCard}</span>}
//               </div>
              
//                {/* Work Type Field   */}
//                <div>
//                 <label>
//                   <span>Work Type</span>
//                 </label>
//                 <select
//                   name='workType'
//                   // value={formData.degree}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                   onChange={(event) => {
//                     const { name, value} = event.target;
//                     // console.log("name", name, "value", value);
//                     setFormData((prev) => ({ ...prev, [name] : value}))
//                   }}
//                 >
//                   <option>--Select Work Type--</option>
//                   {workTypeData?.map(({_id, workType})=>(
//                     <option key={_id} value={_id} name={workType} selected={formData.workType === _id} >{workType}</option>
//                   ))}
//                 </select>
//               </div>

//             </div>
//           </fieldset>
          
//           <fieldset className='border-2  rounded-md mb-4' style={{ borderColor: '#740FD6'}}>
//             <legend className='font-semibold text-lg ml-8' style={{color : '#740FD6'}}>&nbsp;&nbsp; Bank Details &nbsp;&nbsp;</legend>
//             <div className='grid gap-3 m-6 md:grid-cols-4'>
              
//               {/* bank name field  */}
//               <div>
//                 <label>
//                   <span>Bank Name</span>
//                 </label>
//                 <input type='text' 
//                   value={formData.bankName || " "}
//                   name='bankName'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//               </div>
              
//               {/* branch name field  */}
//               <div>
//                 <label>
//                   <span>Branch Name</span>
//                 </label>
//                 <input type='text' 
//                   value={formData.branchName || " "}
//                   name='branchName'
//                   onChange={(event) => setFormData((prev) => ({ ...prev, branchName: event.target.value}))}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//               </div>
              
//               {/* account number field  */}
//               <div>
//                 <label>
//                   <span>Account Number</span>
//                 </label>
//                 <input type='text' 
//                   value={formData.bankAccount || " "}
//                   name='bankAccount'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//               </div>
              
//               {/* confirm account number field  */}
//               <div>
//                 <label>
//                   <span>Confirm Account Number</span>
//                 </label>
//                 <input type='text' 
//                   value={formData.confirmAccountNumber || " "}
//                   name='confirmAccountNumber'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//               </div>
              
//               {/* ifsc code field  */}
//               <div>
//                 <label>
//                   <span>IFSC Code</span>
//                 </label>
//                 <input type='text' 
//                   value={formData.bankIFSC || " "}
//                   name='bankIFSC'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//               </div>
              
//               {/* account holder name  */}
//               <div>
//                 <label>
//                   <span>Account Holder Name</span>
//                 </label>
//                 <input type='text' 
//                   value={formData.bankAccountHolderName || " "}
//                   name='bankAccountHolderName'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//               </div>
              
//               {/* bank address field  */}
//               <div>
//                 <label>
//                   <span>Bank Address</span>
//                 </label>
//                 <input type='text' 
//                   value={formData.bankAddress || " "}
//                   name='bankAddress'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//               </div>

//             </div>
//           </fieldset>
          
//           <fieldset className='border-2  rounded-md mb-4' style={{ borderColor: '#740FD6'}}>
//             <legend className='font-semibold text-lg ml-8' style={{color : '#740FD6'}}> &nbsp;&nbsp; Other Details &nbsp;&nbsp;</legend>
//             <div className='grid gap-3 m-6 md:grid-cols-4'>
               
//                {/* Hr Name field    */}
//               <div>
//                 <label>
//                   <span>Joining Hr Name</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <select 
//                     name="joiningHR"
//                     onChange={(e) => {
//                       setFormData(prevState => ({
//                         ...prevState,
//                         [e.target.name]: e.target.value
//                       }));
                  
//                     }}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black">
//                   <option>--Select Joining Hr--</option>
//                   {joiningHrNameData?.map(({name, _id})=>(
//                     <option key={_id} value={_id} selected={formData.joiningHR === _id}>{name}</option>
//                   ))}
//                 </select>
//                 {errors.joiningHR && (
//                     <p className="text-red-600">{errors.joiningHR}</p>
//                   )}
//               </div>

//                {/* Reporting Manager field    */}
//               <div className="relative">
//                 <label >
//                   <span>Reporting Manager</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <button
//                   className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   onClick={toggleDropdown}
//                   type="button"
//                 >
//                   <span>
//                     {selectedManager ? selectedManager?.name : 'Select Reporting Manager'}
//                   </span>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-5 h-5 ml-2 -mr-1"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </button>

//                 {isOpen && (
//                   <div className="absolute z-10 right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-full max-h-60 overflow-y-auto">
//                     <input
//                       className="block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-t-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       type="text"
//                       placeholder="Search managers"
//                       value={searchTerm}
//                       onChange={handleSearchChange}
//                     />
//                     {filteredManagers.length > 0 ? (
//                       filteredManagers.map((manager) => (
//                         <button
//                           key={manager?._id}
//                           className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:bg-gray-100"
//                           onClick={() => handleManagerSelect(manager)}
//                         >
//                           {manager?.name}
//                         </button>
//                       ))
//                     ) : (
//                       <p className="px-4 py-2 text-gray-500">No results found</p>
//                     )}
//                   </div>
//                 )}
//                   {errors.reportingManager && (
//                     <p className="mt-1  text-red-600">{errors.reportingManager}</p>
//                   )}
//               </div>

//               {/* employee code field  */}
//               <div>
//                 <label>
//                   <span>Employee Code</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <input type='text' 
//                   value={formData.employeeCode || " "}
//                   name='employeeCode'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {errors.employeeCode && <span className="text-red-600">{errors.employeeCode}</span>}
//               </div>
              
//               {/* company employee mail id field  */}
//               <div>
//                 <label>
//                   <span>Company Mail Id</span>
//                 </label>
//                 <input type='email' 
//                   value={formData.companyEmail || " "}
//                   name='companyEmail'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//               </div>
              
//               {/* company phone number field  */}
//               <div>
//                 <label>
//                   <span>Company Phone Number</span>
//                 </label>
//                 <input type='text' 
//                   value={formData.companyPhoneNum || " "}
//                   name='companyPhoneNum'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//               </div>
              
//               {/* joining data field  */}
//               <div>
//                 <label>
//                   <span>Joining Date</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <input type='date' 
//                   value={formData.joiningDate || " "}
//                   name='joiningDate'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {errors.joiningDate && <span className="text-red-600">{errors.joiningDate}</span>}
//               </div>

//               {/* last Appraisal date field      */}
//               <div>
//                 <label>
//                   <span>Last Appraisal Date</span>
//                 </label>
//                 <input type='date' 
//                   value={formData.lastAppraisalDate}
//                   name='lastAppraisalDate'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {/* {errors.lastAppraisalDate && <span className="text-red-600">{errors.lastAppraisalDate}</span>} */}
//               </div>
              
//               {/* resign date field  */}
//               <div>
//                 <label>
//                   <span>Resign Date</span>
//                 </label>
//                 <input type='date' 
//                   value={formData.regisnationDate}
//                   name='regisnationDate'
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {/* {errors.regisnationDate && <span className="text-red-600">{errors.regisnationDate}</span>} */}
//               </div>
              
//               {/* office time policy field  */}
//               <div>
//                 <label>
//                   <span>Office Time Policy</span>
//                 </label>
//                 <select 
//                   name="officeTimePolicy"
//                   onChange={(event) => {
//                     const { name, value} = event.target;
//                     // console.log("name", name, "value", value);
//                     setFormData((prev) => ({ ...prev, [name] : value}))
//                   }}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 >
//                   <option>--Select Office Time--</option>
//                   {officeTimePolicy?.map(({policyName, _id})=>(
//                     <option key={_id} selected={formData.officeTimePolicy === _id}>{policyName}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* shift field    */}
//               <div>
//                 <label>
//                   <span>Shift</span>
//                 </label>
//                 <select 
//                   name="shift"
//                   value={formData.shift || ""}
//                   onChange={handleFormData}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black">
//                 <option>--Select Shift--</option>
//                   {shiftName?.map(({name, _id})=>(
//                     <option key={_id} value={_id}>{name}</option>
//                   ))}
//                 </select>
//               </div>
              
//               {/* company name field  */}
//               <div>
//                 <label>
//                   <span>Company Name</span>
//                 </label>
//                 <select 
//                   name="company"
//                   onChange={(e) => {
//                     handleFormData(e);
//                     setSelectedCompanyNameId(e.target.value);
//                   }}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 >
//                   <option>---Select Company Name--- </option>
//                   {companynamedata?.map(({name, _id})=>(
//                     <option key={_id} value={_id} selected={formData.company=== _id} >{name}</option>
//                   ))}
//                 </select>
//               </div>
              
//               {/* company branch field  */}
//               <div>
//                 <label>
//                   <span>Company Branch</span>
//                 </label>
//                 <select 
//                   name="branch"
//                   onChange={(event) => setFormData((prev) => ({ ...prev, branch: event.target.value}))}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black">
//                   {branchnamedata?.map(({name, _id})=>(
//                     <option key={_id} value={_id} selected={formData.branch=== _id}>{name}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* department field    */}
//               <div>
//                 <label>
//                   <span>Department</span>
//                 </label>
//                 <select 
//                    name="department"
//                    value={formData.department || ""}
//                    onChange={(e) => {
//                      handleFormData(e);
//                      setSelectedDepartmentId(e.target.value);
//                    }}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                   // onChange={(e) => {setSelectedDepartmentId(e.target.value)}}
//                 >
//                   <option value=''>--Select Department --</option>
//                   {departmentName?.map(({ empdept, id }) => (
//                    <option key={id} value={id}  selected={formData.department === id}>{empdept}</option>
//                   ))}
//                 </select>
//               </div>
                  
//               {/* designation field  */}
//               <div>
//                 <label>
//                   <span>Designation</span>            
//                 </label>
//                 <select 
//                   name="designation"
//                   onChange={(event) => {
//                     const { name, value} = event.target;
//                     console.log("name", name, "value", value);
//                     setFormData((prev) => ({ ...prev, [name] : value}))
//                   }}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black">
//                   {DesginationData.map(({designation, _id})=>(
//                    <option key={_id} value={_id} selected={formData.designation === _id}>{designation}</option>
//                   ))}
//                 </select>
//               </div>

//             </div>
//           </fieldset>

//           <fieldset className='border-2  rounded-md' style={{ borderColor: '#740FD6'}}>
//             <legend className='font-semibold text-lg ml-8' style={{color : '#740FD6'}}> &nbsp;&nbsp; Attachments &nbsp;&nbsp;</legend>
//             <div className='grid gap-3 m-6 md:grid-cols-4'>
              
//               {/* aadhar card attachments field  */}
//               <div>
//                 <label>
//                   <span>Aadhar Card</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <input type='file' 
//                   // value={formData.aadharCardAttachment}
//                   name='aadharCardAttachment'
//                   // onChange={handleFormData}
//                   onChange={(e) => handleFileChange(e, 'aadharCardAttachment')}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {errors.aadharCardAttachment && <span className="text-red-600">{errors.aadharCardAttachment}</span>}
//                 {/* <span>njfgjfg{parsedData?.joiningFormAttachment}</span> */}
//                 {formData?.aadharCardAttachment && (
//                   <div>
//                     <img
//                       src={formData.aadharCardAttachment} // Replace with your image URL
//                       alt="Image"
//                       onClick={handleImageClick}
//                       className={`cursor-pointer transition-all duration-300 ease-in-out w-[${imageSize}%]`} 
//                     />
//                   </div>
//                 )}
//                  {isImageOpen && (
//                   <div className="mt-4">
//                     <button
//                       onClick={handleClose}
//                       className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 )}

//               </div>
              
//               {/* pan card attachments field  */}
//               <div>
//                 <label>
//                   <span>Pan Card</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <input type='file' 
//                   // value={formData.panCardAttachment}
//                   name='panCardAttachment'
//                   onChange={(e) => handleFileChange(e, 'panCardAttachment')}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {errors.panCardAttachment && <span className="text-red-600">{errors.panCardAttachment}</span>}
               
//                 {formData?.panCardAttachment && (
//                   <div>
//                     <img
//                       src={formData.panCardAttachment} // Replace with your image URL
//                       alt="Image"
//                       onClick={handleImageClick}
//                       className={`cursor-pointer transition-all duration-300 ease-in-out w-[${imageSize}%]`} 
//                     />
//                   </div>
//                 )}
//                  {isImageOpen && (
//                   <div className="mt-4">
//                     <button
//                       onClick={handleClose}
//                       className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 )}

//               </div>
              
//               {/* bank passbook attachments field  */}
//               <div>
//                 <label>
//                   <span>Bank Passbook</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <input type='file' 
//                   // value={formData.bankAttachment}
//                   name='bankAttachment'
//                   onChange={(e) => handleFileChange(e, 'bankAttachment')}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {errors.bankAttachment && <span className="text-red-600">{errors.bankAttachment}</span>}
                
//                 {formData?.bankAttachment && (
//                   <div>
//                     <img
//                       src={formData.bankAttachment} // Replace with your image URL
//                       alt="Image"
//                       onClick={handleImageClick}
//                       className={`cursor-pointer transition-all duration-300 ease-in-out w-[${imageSize}%]`} 
//                     />
//                   </div>
//                 )}
//                  {isImageOpen && (
//                   <div className="mt-4">
//                     <button
//                       onClick={handleClose}
//                       className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* joining form attachments field   */}
//               <div>
//                 <label>
//                   <span>Joining Form</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <input type='file' 
//                   // value={formData.joiningFormAttachment}
//                   name='joiningFormAttachment'
//                   onChange={(e) => handleFileChange(e, 'joiningFormAttachment')}
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {errors.joiningFormAttachment && <span className="text-red-600">{errors.joiningFormAttachment}</span>}
               
//                 {formData?.joiningFormAttachment && (
//                   <div>
//                     <img
//                       src={formData.joiningFormAttachment} // Replace with your image URL
//                       alt="Image"
//                       onClick={handleImageClick}
//                       className={`cursor-pointer transition-all duration-300 ease-in-out w-[${imageSize}%]`} 
//                     />
//                   </div>
//                 )}
//                  {isImageOpen && (
//                   <div className="mt-4">
//                     <button
//                       onClick={handleClose}
//                       className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 )}

//               </div>
              
//               {/* other document field  */}
//               <div>
//                 <label>
//                   <span>Other Document</span>
//                   <span className='text-red-600'>*</span>
//                 </label>
//                 <input type='file' 
//                   onChange={(e) => handleFileChange(e, 'otherAttachment')}
//                   name='otherAttachment'
//                   className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//                 {errors.otherAttachment && <span className="text-red-600">{errors.otherAttachment}</span>}
                
//                 {formData?.otherAttachment && (
//                   <div>
//                     <img
//                       src={formData.otherAttachment} // Replace with your image URL
//                       alt="Image"
//                       onClick={handleImageClick}
//                       className={`cursor-pointer transition-all duration-300 ease-in-out w-[${imageSize}%]`} 
//                     />
//                   </div>
//                 )}
//                  {isImageOpen && (
//                   <div className="mt-4">
//                     <button
//                       onClick={handleClose}
//                       className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 )}

//               </div>

//             </div>
//           </fieldset>

//           <div className='text-right mt-4 pb-4'>
//             <button  type='submit' className="  px-6 py-2 text-white font-semibold rounded-md shadow-md hover:bg-blue-800 transition-all" style={{backgroundColor : '#740FD6'}}>
//               Update
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   )
// }

// export default Registration


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { showQulification } from '../../Utils/Api/ShowQulification';
import { showDegree } from '../../Utils/Api/ShowDegree';
import { showDepartment } from '../../Utils/Api/ShowDepartment';
import { showDesignation } from '../../Utils/Api/ShowDesignation';
import { showCompany } from '../../Utils/Api/ShowCompany';
import { showBranch } from '../../Utils/Api/showBranch';
import { showOfficyTimePolicy } from '../../Utils/Api/showOfficeTimePolicy';
import { showJoiningHrName } from '../../Utils/Api/showJoiningHrName';
import { showWorkType } from '../../Utils/Api/showWorkType';
import { showShiftName } from '../../Utils/Api/showShiftName';
import { showReportingManager } from '../../Utils/Api/showReportingManager';

function Registration() {

  const navigate = useNavigate();

  const [isImageOpen, setIsImageOpen] = useState(false);
  const [imageSize, setImageSize] = useState(20); // Initial image size in percentage

  const [errors, setErrors] = useState({});
  const [departmentName, setDepartmentName] = useState([]);
  const [DesginationData, setDeginationData] = useState([]);
  const [companynamedata, setCompanyName] = useState([]);
  const [branchnamedata, setBranchNameData] = useState([]);
  const [qulificationdata, setQulificationData] = useState([]);
  const [workTypeData, setWorkTypeData]=useState([]);
  
  const [degreeData, setDegreeData] = useState([]);
  const [shiftName, setShiftName] = useState([]);
  const [officeTimePolicy, setOfficeTimePolicy] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
  const [selectedCompanyNameId, setSelectedCompanyNameId] = useState('');
  const [selectedQualificationId, setSelectedQualificationId] = useState();
  const [updatedAttachments, setUpdatedAttachments] = useState([]); // Tracks updated attachments
  const [reportingManager, setReportingManagers] = useState([]);
  const [joiningHrNameData, setJoiningHrNameData]=useState([]);

  const [formData, setFormData] = useState({
    employeeCode: "",
    name: "",
    father_husbandName: "",
    dateOfBirth: "",
    personalPhoneNum: "",
    personalEmail: "",
    panCard: "",
    aadharCard: "",
    qualification: "",
    degree: "",
    permanentAddress: "",
    permanentPinCode: "",
    currentAddress: "",
    currentPinCode: "",
    bankName: "",
    branchName: "",
    bankAccount: "",
    bankIFSC: "",
    bankAccountHolderName: "",
    bankAddress: "",
    reportingManager: "",
    companyPhoneNum: "",
    companyEmail: "",
    joiningDate: "",
    lastAppraisalDate: "",
    regisnationDate: "",
    company: "",
    branch: "",
    department: "",
    designation: "",
    aadharCardAttachment: "",
    panCardAttachment: "",
    bankAttachment: "",
    joiningFormAttachment: "",
    otherAttachment: "",
    confirmAccountNumber: "",
    officeTimePolicy: "",
    shift: "",
    workType : "",
    joiningHR : ''
  });
  
  // Fetch data from cookies and set to formData state
  useEffect(() => {
    const employeeData = Cookies.get("selectedEmployees");
    // console.log('my cookies data are sorte is', JSON.parse(employeeData));
    
    if (employeeData) {
      try {
        const parsedData = JSON.parse(employeeData);

        // Ensure parsedData is an array and has at least one item
        if (!Array.isArray(parsedData) || parsedData.length === 0) {
          console.warn("Parsed data is empty or invalid.");
          return;
        }
       
        // Fetch attachments from cookies (assuming they're stored in Base64 format)
        const attachments = {
          aadharCardAttachment: parsedData[0].aadharCardAttachment || "",
          panCardAttachment: parsedData[0].panCardAttachment|| "",
          bankAttachment: parsedData[0].bankAttachment || "",
          joiningFormAttachment: parsedData[0].joiningFormAttachment || "",
          otherAttachment: parsedData[0].otherAttachment || "",
        };

       setSelectedQualificationId(parsedData[0]?.qualification?._id)
       setSelectedCompanyNameId(parsedData[0]?.company?._id);
       setSelectedDepartmentId(parsedData[0]?.department?._id);
       setFormData((prev) => ({
        ...prev,
        employeeCode: parsedData[0]?.employeeCode,
        name: parsedData[0]?.name,
        father_husbandName: parsedData[0]?.father_husbandName,
        personalPhoneNum: parsedData[0]?.personalPhoneNum,
        personalEmail: parsedData[0]?.personalEmail,
        panCard: parsedData[0]?.panCard,
        aadharCard: parsedData[0]?.aadharCard,
        permanentAddress: parsedData[0]?.permanentAddress,
        permanentPinCode: parsedData[0]?.permanentPinCode,
        currentAddress: parsedData[0]?.currentAddress,
        currentPinCode: parsedData[0]?.currentPinCode,
        bankName: parsedData[0]?.bankName,
        branchName: parsedData[0]?.branchName,
        bankAccount: parsedData[0]?.bankAccount,
        bankIFSC: parsedData[0]?.bankIFSC,
        bankAccountHolderName:parsedData[0]?. bankAccountHolderName,
        bankAddress:parsedData[0]?.bankAddress,
        // companyPhoneNum:parsedData[0]?. ,
        // companyEmail:parsedData[0]?. ,
          designation:parsedData[0]?.designation?.designation,
          degree: parsedData[0]?.degree?.name,
          qualification: parsedData[0]?.qualification?._id,
          company:parsedData[0]?.company?._id,
          department:parsedData[0]?.department?._id,
          officeTimePolicy:parsedData[0]?.officeTimePolicy?._id,
          shift:parsedData[0]?.shift?._id,
          workType:parsedData[0]?.workType?._id,
          reportingManager:parsedData[0]?.reportingManager?._id,
          joiningHR:parsedData[0]?.joiningHR?._id,
          dateOfBirth: parsedData[0]?.dateOfBirth?parsedData[0]?.dateOfBirth.split('T')[0]: "",
          joiningDate:parsedData[0]?.joiningDate?parsedData[0]?.joiningDate.split('T')[0]: "",
          // lastAppraisalDate:parsedData[0]?.lastAppraisalDate[0]?parsedData.lastAppraisalDate.split('T')[0] : '',
          // regisnationDate:parsedData[0]?.regisnationDate?parsedData[0].regisnationDate.split('T')[0] : '',
          ...attachments,
        }));

      } catch (error) {
        console.error("Error parsing employee data from cookies:", error);
      }
    }
  }, []);
  
  // image are expend logic 
    const handleImageClick = () => {
      setIsImageOpen(true);  // Open the image and increase its size
      setImageSize(100);     // Increase size to 300% when clicked
    };
  
    const handleClose = () => {
      setIsImageOpen(false); // Close the image and revert to normal size
      setImageSize(20);     // Revert size to 100%
    };
 
    useEffect(() => {
      showDepartment(setDepartmentName);
      showCompany(setCompanyName);
      showQulification(setQulificationData);
      showShiftName(setShiftName);
      showWorkType(setWorkTypeData);
      showOfficyTimePolicy(setOfficeTimePolicy);
      showJoiningHrName(setJoiningHrNameData);
      showReportingManager(setReportingManagers)
    }, []);

  useEffect(() => {
    if (selectedDepartmentId) showDesignation(setDeginationData, selectedDepartmentId);
    if (selectedCompanyNameId) showBranch(setBranchNameData, selectedCompanyNameId);
    if (selectedQualificationId) showDegree(selectedQualificationId, setDegreeData);
  }, [selectedDepartmentId, selectedCompanyNameId, selectedQualificationId]);

  
  
  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.father_husbandName) newErrors.father_husbandName = 'Father Name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
    if (!formData.personalPhoneNum) newErrors.personalPhoneNum = 'Contact number is required';
    if (!formData.personalEmail) newErrors.personalEmail = 'Email is required';
    if (!formData.aadharCard) newErrors.aadharCard = 'Aadhar Number is required';
    if (!formData.permanentAddress) newErrors.permanentAddress = 'Permanent Address is required';
    if (!formData.permanentPinCode) newErrors.permanentPinCode = 'Permanent Code is required';
    if (!formData.currentAddress) newErrors.currentAddress = 'Current Address is required';
    if (!formData.currentPinCode) newErrors.currentPinCode = 'Current Pin Code is required';
    if (!formData.qualification) newErrors.qualification = 'Qualification is required';
    if (!formData.panCard) newErrors.panCard = 'Pancard Number is required';
    if (!formData.employeeCode) newErrors.employeeCode = 'Employee Code is required';
    if (!formData.joiningDate) newErrors.joiningDate = 'Joining Date is required';
    if (!formData.panCardAttachment) newErrors.panCardAttachment = 'Pancard is required';
    if (!formData.aadharCardAttachment) newErrors.aadharCardAttachment = 'Aadhar card is required';
    if (!formData.bankAttachment) newErrors.bankAttachment = 'Bank details are required';
    if (!formData.joiningFormAttachment) newErrors.joiningFormAttachment = 'Joining form is required';
    if (!formData.otherAttachment) newErrors.otherAttachment = 'Other documents are required';
    return newErrors;
  };
 
  const [changedFields, setChangedFields] = useState([]); // Tracks changed fields
  // Handling form data input
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Track changed fields
  setChangedFields((prev) => {
    if (!prev.includes(name)) {
      return [...prev, name];
    }
    return prev;
  });

  };


  // file related change 
  const convertToBase64 = (file) => {
    console.log(convertToBase64)
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Customize allowed types
    const maxSize = 5 * 1024 * 1024; // 5MB
  
    if (!validTypes.includes(file.type)) {
      alert('Invalid file type!');
      return false;
    }
  
    if (file.size > maxSize) {
      alert('File size exceeds 5MB!');
      return false;
    }
  
    return true;
  };
  
  const handleFileChange = async (e, fieldName) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      const base64 = await convertToBase64(file);
      setFormData({ ...formData, [fieldName]: base64 });


      // Track updated attachments
      setUpdatedAttachments((prev) => {
        if (!prev.includes(fieldName)) {
          return [...prev, fieldName];
        }
        return prev;
      });

    }
  };
 
  const prepareAttachments = () => {
    return updatedAttachments.map((field) => ({
      fieldName: field,
      fileData: formData[field],
    }));
  };
  
  
  // Handle form submit for updating employee data
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
     
    // If there are errors, stop the form submission
    if (Object.keys(formErrors).length > 0) {
      alert("Please correct the highlighted fields.");
      return;
    }

    // Prepare payload with only changed fields + updated attachments
    const updatedData = { employeeCode: formData.employeeCode };  // Ensure employeeCode is always included
    changedFields.forEach((field) => {
      updatedData[field] = formData[field];
    });
    const attachments = prepareAttachments();

    try {
      const payload = {
        ...updatedData,  // Only changed form data
        attachments, // Include only updated attachments
      };

      const response = await axios.patch(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/empUpdate`,payload,{
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert("Employee updated successfully!");
        navigate('/layout/listofallemployee')
      } else {
        alert("Something went wrong during the update.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Error: Unable to update employee.");
    }
  };

  return (
    <div>
      <div className=' py-1 text-center font-semibold text-xl mt-4 ml-8 mr-8 rounded-md' style={{backgroundColor : '#740FD6'}}>
        <h2 className='text-white'>Update Employee Registration</h2>
      </div>
      <div className='mx-10 pt-4'>
        <form method='post' onSubmit={handleUpdateSubmit}>
          <fieldset className='border-2  rounded-md mb-4' style={{ borderColor: '#740FD6'}}>
            <legend className='font-semibold text-lg ml-8 ' style={{color : '#740FD6'}}> &nbsp;&nbsp; Employee Details &nbsp;&nbsp;</legend>
            <div className='grid gap-1 md:gap-3 m-3 md:m-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

              {/* name input field   */}
              <div>
                <label>
                  <span>Name</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='text' 
                  defaultValue={formData?.name}
                  name='name'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors?.name && <span className="text-red-600">{errors?.name}</span>}
              </div>
              
              {/* father husband input field  */}
              <div>
                <label>
                  <span>Father Name</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='text' 
                  defaultValue={formData?.father_husbandName}
                  name='father_husbandName'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors?.father_husbandName && <span className="text-red-600">{errors?.father_husbandName}</span>}
              </div>
              
              {/* date of birth input field  */}
              <div>
                <label>
                  <span>Date Of Birth</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='date' 
                  defaultValue={formData?.dateOfBirth}
                  name='dateOfBirth'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors?.dateOfBirth && <span className="text-red-600">{errors?.dateOfBirth}</span>}
              </div>
              
              {/* personal phone number field  */}
              <div>
                <label>
                  <span>Contact Number</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='text' 
                  defaultValue={formData?.personalPhoneNum}
                  name='personalPhoneNum'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors?.personalPhoneNum && <span className="text-red-600">{errors?.personalPhoneNum}</span>}
              </div>
              
              {/* personal email if input field  */}
              <div>
                <label>
                  <span>Email</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input 
                  type='email' 
                  defaultValue={formData?.personalEmail}
                  name='personalEmail'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors?.personalEmail && <span className="text-red-600">{errors?.personalEmail}</span>}
              </div>
              
              {/* aadhar number field  */}
              <div>
                <label>
                  <span>Aadhar Number</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='text' 
                  defaultValue={formData?.aadharCard}
                  name='aadharCard'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors?.aadharCard && <span className="text-red-600">{errors?.aadharCard}</span>}
              </div>
              
              {/* permanent Address field  */}
              <div>
                <label>
                  <span>Permanent Address</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input 
                  type='text' 
                  defaultValue={formData?.permanentAddress}
                  name='permanentAddress'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors?.permanentAddress && <span className="text-red-600">{errors?.permanentAddress}</span>}
              </div>
             
             {/* permanent pin code field  */}
              <div>
                <label>
                  <span>Permanent Pin Code</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input 
                  type='text' 
                  defaultValue={formData?.permanentPinCode}
                  name='permanentPinCode'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors?.permanentPinCode && <span className="text-red-600">{errors?.permanentPinCode}</span>}
              </div>
              
              {/* current address field */}
              <div>
                <label>
                  <span>Current Address</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input 
                  type='text' 
                  defaultValue={formData?.currentAddress}
                  name='currentAddress'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors?.currentAddress && <span className="text-red-600">{errors?.currentAddress}</span>}
              </div>
              
              {/* current pin code field  */}
              <div>
                <label>
                  <span>Current Pin Code</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input 
                  type='text' 
                  defaultValue={formData?.currentPinCode}
                  name='currentPinCode'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors?.currentPinCode && <span className="text-red-600">{errors?.currentPinCode}</span>}
              </div>
              
              {/* higher Qualification field  */}
              <div>
                <label>
                  <span>Higher Qualification</span>
                  <span className='text-red-600'>*</span>
                </label>
                <select 
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={(e) => {
                    setFormData(prevState => ({
                      ...prevState,
                      [e.target.name]: e.target.value
                    }));
                    setSelectedQualificationId(e.target.value);
                  }}
                  name="qualification"
                >
                  <option>--Select Qualification--</option>
                  {qulificationdata?.map(({names, id})=>(
                    <option key={id} value={id}  selected={formData?.qualification === id} >{names}</option>
                  ))}
                </select>
                {errors?.qualification && <span className="text-red-600">{errors?.qualification}</span>}
              </div>
              
              {/* degree field  */}
              <div>
                <label>Degree</label>
                <select 
                  name='degree'
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={(event) => {
                    const { name, value} = event.target;
                    setFormData((prev) => ({ ...prev, [name] : value}))
                  }}
                >
                  <option>--Select Degree--</option>
                  {degreeData?.map(({_id,name})=>(
                    <option key={_id} value={_id} selected={formData?.degree === name} name={name}>{name}</option>
                  ))}
                </select>
                {errors?.degree && <span className="text-red-600">{errors?.degree}</span>}
              </div>
              
              {/* pan card number field  */}
              <div>
                <label>
                  <span>Pancard Number</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input 
                  type='text' 
                  defaultValue={formData?.panCard}
                  name='panCard'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors?.panCard && <span className="text-red-600">{errors?.panCard}</span>}
              </div>
              
               {/* Work Type Field   */}
               <div>
                <label>Work Type</label>
                <select
                  name='workType'
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={(event) => {
                    const { name, value} = event.target;
                    setFormData((prev) => ({ ...prev, [name] : value}))
                  }}
                >
                  <option>--Select Work Type--</option>
                  {workTypeData?.map(({_id, workType})=>(
                    <option key={_id} value={_id} name={workType} selected={formData?.workType === _id} >{workType}</option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>
          
          <fieldset className='border-2  rounded-md mb-4' style={{ borderColor: '#740FD6'}}>
            <legend className='font-semibold text-lg ml-8' style={{color : '#740FD6'}}>&nbsp;&nbsp; Bank Details &nbsp;&nbsp;</legend>
            <div className='grid gap-3 m-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              
              {/* bank name field  */}
              <div>
                <label>Bank Name</label>
                <input 
                  type='text' 
                  defaultValue={formData?.bankName || " "}
                  name='bankName'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* branch name field  */}
              <div>
                <label>Branch Name</label>
                <input 
                  type='text' 
                  value={formData?.branchName || " "}
                  name='branchName'
                  onChange={(event) => setFormData((prev) => ({ ...prev, branchName: event.target.value}))}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* account number field  */}
              <div>
                <label>Account Number</label>
                <input 
                  type='text' 
                  defaultValue={formData?.bankAccount || " "}
                  name='bankAccount'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* confirm account number field  */}
              <div>
                <label>Confirm Account Number</label>
                <input 
                  type='text' 
                  defaultValue={formData?.confirmAccountNumber || " "}
                  name='confirmAccountNumber'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* ifsc code field  */}
              <div>
                <label>IFSC Code</label>
                <input 
                  type='text' 
                  defaultValue={formData?.bankIFSC || " "}
                  name='bankIFSC'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* account holder name  */}
              <div>
                <label>Account Holder Name</label>
                <input 
                  type='text' 
                  defaultValue={formData?.bankAccountHolderName || " "}
                  name='bankAccountHolderName'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* bank address field  */}
              <div>
                <label>Bank Address</label>
                <input 
                  type='text' 
                  defaultValue={formData?.bankAddress || " "}
                  name='bankAddress'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

            </div>
          </fieldset>
          
          <fieldset className='border-2  rounded-md mb-4' style={{ borderColor: '#740FD6'}}>
            <legend className='font-semibold text-lg ml-8' style={{color : '#740FD6'}}> &nbsp;&nbsp; Other Details &nbsp;&nbsp;</legend>
            <div className='grid gap-3 m-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
               
               {/* Hr Name field    */}
              <div>
                <label>
                  <span>Joining Hr Name</span>
                  <span className='text-red-600'>*</span>
                </label>
                <select 
                    name="joiningHR"
                    onChange={(e) => {
                      setFormData(prevState => ({
                        ...prevState,
                        [e.target.name]: e.target.value
                      }));
                  
                    }}
                   className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black">
                  <option>--Select Joining Hr--</option>
                  {joiningHrNameData?.map(({name, _id})=>(
                    <option key={_id} value={_id} selected={formData?.joiningHR === _id}>{name}</option>
                  ))}
                </select>
                {errors?.joiningHR && (<p className="text-red-600">{errors?.joiningHR}</p>)}
              </div>

               {/* Reporting Manager field    */}
              <div >
                <label >
                  <span>Reporting Manager</span>
                  <span className='text-red-600'>*</span>
                </label>
                <select 
                    name="reportingManager"
                    onChange={(e) => {
                      setFormData(prevState => ({
                        ...prevState,
                        [e.target.name]: e.target.value
                      }));
                  
                    }}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black">
                  <option>--Reporting Manager--</option>
                  {reportingManager?.map(({name, _id})=>(
                    <option key={_id} value={_id} selected={formData?.joiningHR === _id}>{name}</option>
                  ))}
                </select>
                  {errors.reportingManager && (<p className="mt-1  text-red-600">{errors.reportingManager}</p>)}
              </div>

              {/* employee code field  */}
              <div>
                <label>
                  <span>Employee Code</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input 
                  type='text' 
                  defaultValue={formData?.employeeCode || " "}
                  name='employeeCode'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors?.employeeCode && <span className="text-red-600">{errors?.employeeCode}</span>}
              </div>
              
              {/* company employee mail id field  */}
              <div>
                <label>Company Mail Id</label>
                <input 
                  type='email' 
                  defaultValue={formData?.companyEmail || " "}
                  name='companyEmail'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* company phone number field  */}
              <div>
                <label>Company Phone Number</label>
                <input 
                  type='text' 
                  defaultValue={formData?.companyPhoneNum || " "}
                  name='companyPhoneNum'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* joining data field  */}
              <div>
                <label>
                  <span>Joining Date</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='date' 
                  defaultValue={formData?.joiningDate || " "}
                  name='joiningDate'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors?.joiningDate && <span className="text-red-600">{errors?.joiningDate}</span>}
              </div>

              {/* last Appraisal date field      */}
              <div>
                <label>Last Appraisal Date</label>
                <input 
                  type='date' 
                  defaultValue={formData?.lastAppraisalDate}
                  name='lastAppraisalDate'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* resign date field  */}
              <div>
                <label>Resign Date</label>
                <input 
                  type='date' 
                  value={formData?.regisnationDate}
                  name='regisnationDate'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* office time policy field  */}
              <div>
                <label>Office Time Policy</label>
                <select 
                  name="officeTimePolicy"
                  onChange={(event) => {
                    const { name, value} = event.target;
                    setFormData((prev) => ({ ...prev, [name] : value}))
                  }}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option>--Select Office Time--</option>
                  {officeTimePolicy?.map(({policyName, _id})=>(
                    <option key={_id} selected={formData?.officeTimePolicy === _id}>{policyName}</option>
                  ))}
                </select>
              </div>

              {/* shift field    */}
              <div>
                <label>Shift</label>
                <select 
                  name="shift"
                  defaultValue={formData?.shift || ""}
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black">
                <option>--Select Shift--</option>
                  {shiftName?.map(({name, _id})=>(
                    <option key={_id} value={_id}>{name}</option>
                  ))}
                </select>
              </div>
              
              {/* company name field  */}
              <div>
                <label>Company Name</label>
                <select 
                  name="company"
                  onChange={(e) => {
                    handleFormData(e);
                    setSelectedCompanyNameId(e.target.value);
                  }}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option>---Select Company Name--- </option>
                  {companynamedata?.map(({name, _id})=>(
                    <option key={_id} value={_id} selected={formData?.company=== _id} >{name}</option>
                  ))}
                </select>
              </div>
              
              {/* company branch field  */}
              <div>
                <label>Company Branch</label>
                <select 
                  name="branch"
                  onChange={(event) => setFormData((prev) => ({ ...prev, branch: event.target.value}))}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black">
                  {branchnamedata?.map(({name, _id})=>(
                    <option key={_id} value={_id} selected={formData?.branch=== _id}>{name}</option>
                  ))}
                </select>
              </div>

              {/* department field    */}
              <div>
                <label>Department</label>
                <select 
                   name="department"
                   defaultValue={formData.department || ""}
                   onChange={(e) => {
                     handleFormData(e);
                     setSelectedDepartmentId(e.target.value);
                   }}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value=''>--Select Department --</option>
                  {departmentName?.map(({ empdept, id }) => (
                   <option key={id} value={id}  selected={formData?.department === id}>{empdept}</option>
                  ))}
                </select>
              </div>
                  
              {/* designation field  */}
              <div>
                <label>Designation</label>
                <select 
                  name="designation"
                  onChange={(event) => {
                    const { name, value} = event.target;
                    setFormData((prev) => ({ ...prev, [name] : value}))
                  }}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black">
                  <option>---select Designation---</option>
                  {DesginationData?.map(({designation, _id})=>(
                   <option key={_id} value={_id} selected={formData?.designation === designation}>{designation}</option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset className='border-2  rounded-md' style={{ borderColor: '#740FD6'}}>
            <legend className='font-semibold text-lg ml-8' style={{color : '#740FD6'}}> &nbsp;&nbsp; Attachments &nbsp;&nbsp;</legend>
            <div className='grid gap-3 m-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              
              {/* aadhar card attachments field  */}
              <div>
                <label>
                  <span>Aadhar Card</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input 
                  type='file' 
                  name='aadharCardAttachment'
                  onChange={(e) => handleFileChange(e, 'aadharCardAttachment')}
                  className="w-full rounded-md border border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors?.aadharCardAttachment && <span className="text-red-600">{errors?.aadharCardAttachment}</span>}
                {formData?.aadharCardAttachment && (
                  <div>
                    <img
                      src={formData?.aadharCardAttachment} // Replace with your image URL
                      alt="Image"
                      onClick={handleImageClick}
                      className={`cursor-pointer transition-all duration-300 ease-in-out w-[${imageSize}%]`} 
                    />
                  </div>
                )}
                 {isImageOpen && (
                  <div className="mt-4">
                    <button
                      onClick={handleClose}
                      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
              
              {/* pan card attachments field  */}
              <div>
                <label>
                  <span>Pan Card</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input 
                  type='file' 
                  name='panCardAttachment'
                  onChange={(e) => handleFileChange(e, 'panCardAttachment')}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors?.panCardAttachment && <span className="text-red-600">{errors?.panCardAttachment}</span>}
               
                {formData?.panCardAttachment && (
                  <div>
                    <img
                      src={formData?.panCardAttachment} // Replace with your image URL
                      alt="Image"
                      onClick={handleImageClick}
                      className={`cursor-pointer transition-all duration-300 ease-in-out w-[${imageSize}%]`} 
                    />
                  </div>
                )}
                 {isImageOpen && (
                  <div className="mt-4">
                    <button
                      onClick={handleClose}
                      className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Close
                    </button>
                  </div>
                )}

              </div>
              
              {/* bank passbook attachments field  */}
              <div>
                <label>
                  <span>Bank Passbook</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='file' 
                  name='bankAttachment'
                  onChange={(e) => handleFileChange(e, 'bankAttachment')}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors?.bankAttachment && <span className="text-red-600">{errors?.bankAttachment}</span>}
                
                {formData?.bankAttachment && (
                  <div>
                    <img
                      src={formData?.bankAttachment} // Replace with your image URL
                      alt="Image"
                      onClick={handleImageClick}
                      className={`cursor-pointer transition-all duration-300 ease-in-out w-[${imageSize}%]`} 
                    />
                  </div>
                )}
                 {isImageOpen && (
                  <div className="mt-4">
                    <button
                      onClick={handleClose}
                      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>

              {/* joining form attachments field   */}
              <div>
                <label>
                  <span>Joining Form</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input 
                  type='file' 
                  name='joiningFormAttachment'
                  onChange={(e) => handleFileChange(e, 'joiningFormAttachment')}
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors?.joiningFormAttachment && <span className="text-red-600">{errors?.joiningFormAttachment}</span>}
               
                {formData?.joiningFormAttachment && (
                  <div>
                    <img
                      src={formData?.joiningFormAttachment} // Replace with your image URL
                      alt="Image"
                      onClick={handleImageClick}
                      className={`cursor-pointer transition-all duration-300 ease-in-out w-[${imageSize}%]`} 
                    />
                  </div>
                )}
                 {isImageOpen && (
                  <div className="mt-4">
                    <button
                      onClick={handleClose}
                      className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Close
                    </button>
                  </div>
                )}

              </div>
              
              {/* other document field  */}
              <div>
                <label>
                  <span>Other Document</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input 
                  type='file' 
                  onChange={(e) => handleFileChange(e, 'otherAttachment')}
                  name='otherAttachment'
                  className="w-full rounded-md border-2 border-gray-500 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors?.otherAttachment && <span className="text-red-600">{errors.otherAttachment}</span>}
                
                {formData?.otherAttachment && (
                  <div>
                    <img
                      src={formData?.otherAttachment} // Replace with your image URL
                      alt="Image"
                      onClick={handleImageClick}
                      className={`cursor-pointer transition-all duration-300 ease-in-out w-[${imageSize}%]`} 
                    />
                  </div>
                )}
                 {isImageOpen && (
                  <div className="mt-4">
                    <button
                      onClick={handleClose}
                      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>

            </div>
          </fieldset>

          <div className='text-right mt-4 pb-4'>
            <button  type='submit' className="  px-6 py-2 text-white font-semibold rounded-md shadow-md hover:bg-blue-800 transition-all" style={{backgroundColor : '#740FD6'}}>
              Update
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Registration