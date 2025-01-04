
// import React, { useEffect, useState } from 'react'
// import axios from 'axios';


// function Registration() {
  
//   const [errors, setErrors] = useState({});
//   const [departmentName, setDepartmentName]=useState([]);
//   const [DesginationData, setDeginationData]=useState([]);
//   const [companynamedata, setCompanyName]=useState([]);
//   const [branchnamedata, setBranchNameData]=useState([]);
//   const [qulificationdata, setQulificationData]=useState([]);
//   const [degreeData, setDegreeData]=useState([]);
//   const [shiftName, setShiftName]=useState([]);
//   const [officeTimePolicy, setOfficeTimePolicy]=useState([]);
//   const [reportingManager, setReportingManager]=useState([]);
//   const [employeeRegisterData, setEmployeeRegisterData]=useState([]);
//   const [ selectedDepartmentId, setSelectedDepartmentId ] = useState('');
//   const [selectedCompanyNameId, setSelectedCompanyNameId]=useState('');
//   const [selectedQualificationId, setSelectedQualificationId]=useState('');

//   const[formData, setFormData]=useState({
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
//     confirmAccountNumber : "",
//     officeTimePolicy :" ",
//     shift : " ",
//     companyBranch : " ",
//     department : " ",
//     designation : " "
//   }
//   )
  
//   const fetchDepartmentName = async () => {
//     try 
//     {
//       const response = await axios.get('http://localhost:8000/common/show-department');
//       console.log(response.data);
//       setDepartmentName(response.data.data);
//       console.log(departmentName)
//     } 
//     catch (error) 
//     {
//       alert('Error: Unable to fetch data');
//     }
//   };
  
//   const fetchDeginationData = async (_id) => {
//     try 
//     {
//       const response = await axios.get(`http://localhost:8000/common/show-designation?departmentId=${_id}`);
//       console.log(response.data);
//       setDeginationData(response.data.data);
//       console.log(DesginationData)
//     } 
//     catch (error) 
//     {
//       alert('Error: Unable to fetch data');
//     }
//   };

//   const fetchCompanyNameData=async ()=>{
//     try
//     {
//       const response=await axios.get('http://localhost:8000/company/show-company');
//       console.log(response.data);
//       setCompanyName(response.data.data);
//       console.log(companynamedata);
//     }
//     catch(error)
//     {
//       alert('error : Unable to fetch data');
//     }
//   }

//   const fetchBranchNameData=async (_id)=>{
//     try
//     {
//       const response=await axios.get(`http://localhost:8000/branch/show-branch?companyID=${_id}`);
//       console.log(response.data);
//       setBranchNameData(response.data.data);
//       console.log(branchnamedata);
//     }
//     catch(error)
//     {
//       alert('error : Unable to fetch data');
//     }
//   }

//   const fetchQulificationData=async ()=>{
//     try
//     {
//       const response=await axios.get('http://localhost:8000/common/show-qualification');
//       console.log(response.data);
//       setQulificationData(response.data.data);
//       console.log(qulificationdata);
//     }
//     catch(error)
//     {
//       alert('error : Unable to fetch data');
//     }
//   }

//   const fetchDegreeData = async (_id)=>{
//     try
//     {
//       const response=await axios.get(`http://localhost:8000/common/show-degree?qualificationId=${_id}`);
//       setDegreeData(response.data.data);
//       console.log(degreeData)
//     }
//     catch(error)
//     {
//       alert('error : Unable to fethch data');
//     }
//   }
  
//   const fetchShiftNameData=async ()=>{
//     try
//     {
//       const response=await axios.get('http://localhost:8000/common/show-shift');
//       console.log(response.data);
//       setShiftName(response.data.data);
//       console.log(shiftName);
//     }
//     catch(error)
//     {
//       alert('error : Unable to fetch data');
//     }
//   }

//   const fetchReportingManagerData=async ()=>{
//     try
//     {
//       const response=await axios.get('http://localhost:8000/auth/show-reporting-manager');
//       console.log(response.data);
//       setReportingManager(response.data.data);
//       console.log(reportingManager);
//     }
//     catch(error)
//     {
//       alert('error : Unable to fetch data');
//     }
//   }
  
//   const fetchOfficeTimePolicyData=async ()=>{
//     try {
//       const response=await axios.get('http://localhost:8000/common/show-officeTimePolicy');
//       setOfficeTimePolicy(response.data.data);
//       console.log(officeTimePolicy);
//     } catch (error) {
//       alert('Unable to Fetch Data');
//     }
//   }

//   useEffect(()=>{
//     fetchDepartmentName();
//     // fetchDeginationData();
//     fetchCompanyNameData();
//     // fetchBranchNameData();
//     fetchQulificationData();
//     fetchShiftNameData();
//     fetchReportingManagerData();
//     fetchOfficeTimePolicyData();
//   }, []);

//   useEffect(() => {
//     if(selectedDepartmentId !== ''){
//       console.log(selectedDepartmentId);
//       fetchDeginationData(selectedDepartmentId);
//     }

//     if(selectedCompanyNameId !== ''){
//       console.log(selectedCompanyNameId);
//       fetchBranchNameData(selectedCompanyNameId);
//     }

//     if(selectedQualificationId !== ''){
//       console.log(selectedQualificationId);
//       fetchDegreeData(selectedQualificationId);
//     }
//   }, [selectedDepartmentId, selectedCompanyNameId, selectedQualificationId]);

//  const validateForm = () => {
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
//     if (!formData.qualification) newErrors.qualification = 'Qulification is required';
//     if (!formData.panCard) newErrors.panCard = 'Pancard Number is required';
//     if (!formData.employeeCode) newErrors.employeeCode = 'Employee Code is required';
//     if (!formData.joiningDate) newErrors.joiningDate = 'Joining Date is required';
//     if(!formData.panCardAttachment) newErrors.panCardAttachment='pancard is required';
//     if(!formData.panCardAttachment) newErrors.panCardAttachment='pancard is required';
//     if(!formData.aadharCardAttachment) newErrors.aadharCardAttachment='aadhar card is required';
//     if(!formData.bankAttachment) newErrors.bankAttachment='bank is required';
//     if(!formData.joiningFormAttachment) newErrors.joiningFormAttachment='join form is required';
//     if(!formData.otherAttachment) newErrors.otherAttachment='other is required';
//   return newErrors;
//  };

//   const handleFormData=(e)=>{
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,

//     });
//   }

//   const handleFormSubmit= async (e)=>{
//     e.preventDefault();
//     const formErrors = validateForm();
//     setErrors(formErrors);
//     console.log(formData);
//     try {
//       const response = await axios.post('http://localhost:8000/auth/empRegister', formData, {
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.status === 200 || response.status === 201) {
//         alert('Employee registered successfully!');
//         setFormData({
//           employeeCode: "",
//           name: "",
//           father_husbandName: "",
//           dateOfBirth: "",
//           personalPhoneNum: "",
//           personalEmail: "",
//           panCard: "",
//           aadharCard: "",
//           qualification: "",
//           degree: "",
//           permanentAddress: "",
//           permanentPinCode: "",
//           currentAddress: "",
//           currentPinCode: "",
//           bankName: "",
//           branchName: "",
//           bankAccount: "",
//           bankIFSC: "",
//           bankAccountHolderName: "",
//           bankAddress: "",
//           reportingManager: "",
//           companyPhoneNum: "",
//           companyEmail: "",
//           joiningDate: "",
//           lastAppraisalDate: "",
//           regisnationDate: "",
//           company: "",
//           branch: "",
//           department: "",
//           designation: "",
//           aadharCardAttachment: "",
//           panCardAttachment: "",
//           bankAttachment: "",
//           joiningFormAttachment: "",
//           otherAttachment: "",
//           confirmAccountNumber : "",
//           officeTimePolicy : " ",
//           shift : " ",
//           companyBranch : " ",
//           department : " ",
//           designation : " "

//         });
//       } else {
//         alert('Something went wrong during registration.');
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       alert('Error: Employee registration failed.');
//     }

//   }
 
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Registration() {
  const [errors, setErrors] = useState({});
  const [departmentName, setDepartmentName] = useState([]);
  const [DesginationData, setDeginationData] = useState([]);
  const [companynamedata, setCompanyName] = useState([]);
  const [branchnamedata, setBranchNameData] = useState([]);
  const [qulificationdata, setQulificationData] = useState([]);
  const [degreeData, setDegreeData] = useState([]);
  const [shiftName, setShiftName] = useState([]);
  const [officeTimePolicy, setOfficeTimePolicy] = useState([]);
  const [reportingManager, setReportingManager] = useState([]);
  // const [employeeRegisterData, setEmployeeRegisterData] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
  const [selectedCompanyNameId, setSelectedCompanyNameId] = useState('');
  const [selectedQualificationId, setSelectedQualificationId] = useState('');

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
    companyBranch: "",
    department: "",
    designation: "",
  });

  // Fetching functions
  const fetchDepartmentName = async () => {
    try {
      const response = await axios.get('http://localhost:8000/common/show-department');
      setDepartmentName(response.data.data);
    } catch (error) {
      alert('Error: Unable to fetch data');
    }
  };

  const fetchDeginationData = async (_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/common/show-designation?departmentId=${_id}`);
      setDeginationData(response.data.data);
    } catch (error) {
      alert('Error: Unable to fetch data');
    }
  };

  const fetchCompanyNameData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/company/show-company');
      setCompanyName(response.data.data);
    } catch (error) {
      alert('Error: Unable to fetch data');
    }
  };

  const fetchBranchNameData = async (_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/branch/show-branch?companyID=${_id}`);
      setBranchNameData(response.data.data);
    } catch (error) {
      alert('Error: Unable to fetch data');
    }
  };

  const fetchQulificationData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/common/show-qualification');
      setQulificationData(response.data.data);
    } catch (error) {
      alert('Error: Unable to fetch data');
    }
  };

  const fetchDegreeData = async (_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/common/show-degree?qualificationId=${_id}`);
      setDegreeData(response.data.data);
    } catch (error) {
      alert('Error: Unable to fetch data');
    }
  };

  const fetchShiftNameData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/common/show-shift');
      setShiftName(response.data.data);
    } catch (error) {
      alert('Error: Unable to fetch data');
    }
  };

  const fetchReportingManagerData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/auth/show-reporting-manager');
      setReportingManager(response.data.data);
    } catch (error) {
      alert('Error: Unable to fetch data');
    }
  };

  const fetchOfficeTimePolicyData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/common/show-officeTimePolicy');
      setOfficeTimePolicy(response.data.data);
    } catch (error) {
      alert('Unable to Fetch Data');
    }
  };

  useEffect(() => {
    fetchDepartmentName();
    fetchCompanyNameData();
    fetchQulificationData();
    fetchShiftNameData();
    fetchReportingManagerData();
    fetchOfficeTimePolicyData();
  }, []);

  useEffect(() => {
    if (selectedDepartmentId) fetchDeginationData(selectedDepartmentId);
    if (selectedCompanyNameId) fetchBranchNameData(selectedCompanyNameId);
    if (selectedQualificationId) fetchDegreeData(selectedQualificationId);
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

  // Handling form data input
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handling form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      alert('Please correct the highlighted fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/auth/empRegister', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200 || response.status === 201) {
        alert('Employee registered successfully!');
        setFormData({
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
          companyBranch: "",
          department: "",
          designation: "",
        });
      } else {
        alert('Something went wrong during registration.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error: Employee registration failed.');
    }
  };
  return (
    <div>
      <div className=' py-4 text-center font-semibold text-2xl' style={{backgroundColor : '#740FD6'}}>
        <h2 className='text-white'>Employee Registration</h2>
      </div>
      <div className='mx-10 pt-6'>
        <form method='post' onSubmit={handleFormSubmit}>
          <fieldset className='border-2  rounded-md mb-4' style={{ borderColor: '#740FD6'}}>
            <legend className='font-semibold text-lg ml-8 ' style={{color : '#740FD6'}}> &nbsp;&nbsp; Employee Details &nbsp;&nbsp;</legend>
            <div className='grid gap-3 m-6 md:grid-cols-4'>

              {/* name input field   */}
              <div>
                <label>
                  <span>Name</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='text' 
                  value={formData.name}
                  name='name'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.name && <span className="text-red-600">{errors.name}</span>}
              </div>
              
              {/* father husband input field  */}
              <div>
                <label>
                  <span>Father/Husband Name</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='text' 
                  value={formData.father_husbandName}
                  name='father_husbandName'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.father_husbandName && <span className="text-red-600">{errors.father_husbandName}</span>}
              </div>
              
              {/* date of birth input field  */}
              <div>
                <label>
                  <span>Date Of Birth</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='date' 
                  value={formData.dateOfBirth}
                  name='dateOfBirth'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.dateOfBirth && <span className="text-red-600">{errors.dateOfBirth}</span>}
              </div>
              
              {/* personal phone number field  */}
              <div>
                <label>
                  <span>Contact Number</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='text' 
                  value={formData.personalPhoneNum}
                  name='personalPhoneNum'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.personalPhoneNum && <span className="text-red-600">{errors.personalPhoneNum}</span>}
              </div>
              
              {/* personal email if input field  */}
              <div>
                <label>
                  <span>Email</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='email' 
                  value={formData.personalEmail}
                  name='personalEmail'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.personalEmail && <span className="text-red-600">{errors.personalEmail}</span>}
              </div>
              
              {/* aadhar number field  */}
              <div>
                <label>
                  <span>Aadhar Number</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='text' 
                  value={formData.aadharCard}
                  name='aadharCard'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.aadharCard && <span className="text-red-600">{errors.aadharCard}</span>}
              </div>
              
              {/* permanent Address field  */}
              <div>
                <label>
                  <span>Permanent Address</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='text' 
                  value={formData.permanentAddress}
                  name='permanentAddress'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.permanentAddress && <span className="text-red-600">{errors.permanentAddress}</span>}
              </div>
             
             {/* permanent pin code field  */}
              <div>
                <label>
                  <span>Permanent Pin Code</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='text' 
                  value={formData.permanentPinCode}
                  name='permanentPinCode'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.permanentPinCode && <span className="text-red-600">{errors.permanentPinCode}</span>}
              </div>
              
              {/* current address field */}
              <div>
                <label>
                  <span>Current Address</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='text' 
                  value={formData.currentAddress}
                  name='currentAddress'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.currentAddress && <span className="text-red-600">{errors.currentAddress}</span>}
              </div>
              
              {/* current pin code field  */}
              <div>
                <label>
                  <span>Current Pin Code</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='text' 
                  value={formData.currentPinCode}
                  name='currentPinCode'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.currentPinCode && <span className="text-red-600">{errors.currentPinCode}</span>}
              </div>
              
              {/* higher Qualification field  */}
              <div>
                <label>
                  <span>Higher Qualification</span>
                  <span className='text-red-600'>*</span>
                </label>
                <select 
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
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
                    <option key={id} value={id}>{names}</option>
                  ))}
                </select>
                {errors.qualification && <span className="text-red-600">{errors.qualification}</span>}
              </div>
              
              {/* degree field  */}
              <div>
                <label>
                  <span>Degree</span>
                </label>
                <select className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black">
                  {degreeData?.map(({_id,name})=>(
                    <option key={_id} name={name}>{name}</option>
                  ))}
                </select>
                {errors.degree && <span className="text-red-600">{errors.degree}</span>}
              </div>
              
              {/* pan card number field  */}
              <div>
                <label>
                  <span>Pancard Number</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='text' 
                  value={formData.panCard}
                  name='panCard'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.panCard && <span className="text-red-600">{errors.panCard}</span>}
              </div>

            </div>
          </fieldset>
          
          <fieldset className='border-2  rounded-md mb-4' style={{ borderColor: '#740FD6'}}>
            <legend className='font-semibold text-lg ml-8' style={{color : '#740FD6'}}>&nbsp;&nbsp; Bank Details &nbsp;&nbsp;</legend>
            <div className='grid gap-3 m-6 md:grid-cols-4'>
              
              {/* bank name field  */}
              <div>
                <label>
                  <span>Bank Name</span>
                </label>
                <input type='text' 
                  value={formData.bankName || " "}
                  name='bankName'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* branch name field  */}
              <div>
                <label>
                  <span>Branch Name</span>
                </label>
                <input type='text' 
                  value={formData.branchName || " "}
                  name='branchName'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* account number field  */}
              <div>
                <label>
                  <span>Account Number</span>
                </label>
                <input type='text' 
                  value={formData.bankAccount || " "}
                  name='bankAccount'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* confirm account number field  */}
              <div>
                <label>
                  <span>Confirm Account Number</span>
                </label>
                <input type='text' 
                  value={formData.confirmAccountNumber || " "}
                  name='confirmAccountNumber'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* ifsc code field  */}
              <div>
                <label>
                  <span>IFSC Code</span>
                </label>
                <input type='text' 
                  value={formData.bankIFSC || " "}
                  name='bankIFSC'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* account holder name  */}
              <div>
                <label>
                  <span>Account Holder Name</span>
                </label>
                <input type='text' 
                  value={formData.bankAccountHolderName || " "}
                  name='bankAccountHolderName'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* bank address field  */}
              <div>
                <label>
                  <span>Bank Address</span>
                </label>
                <input type='text' 
                  value={formData.bankAddress || " "}
                  name='bankAddress'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

            </div>
          </fieldset>
          
          <fieldset className='border-2  rounded-md mb-4' style={{ borderColor: '#740FD6'}}>
            <legend className='font-semibold text-lg ml-8' style={{color : '#740FD6'}}> &nbsp;&nbsp; Other Details &nbsp;&nbsp;</legend>
            <div className='grid gap-3 m-6 md:grid-cols-4'>

              {/* Reporting manager field    */}
              <div>
                <label>
                  <span>Reporting Manager</span>
                </label>
                <select 
                    name="reportingManager"
                    value={formData.reportingManager || ""}
                    onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black">
                  <option>--Select Reporting Manager--</option>
                  {reportingManager?.map(({name, _id})=>(
                    <option key={_id} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              
              {/* employee code field  */}
              <div>
                <label>
                  <span>Employee Code</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='text' 
                  value={formData.employeeCode || " "}
                  name='employeeCode'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.employeeCode && <span className="text-red-600">{errors.employeeCode}</span>}
              </div>
              
              {/* company employee mail id field  */}
              <div>
                <label>
                  <span>Company Mail Id</span>
                </label>
                <input type='email' 
                  value={formData.companyEmail || " "}
                  name='companyEmail'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* company phone number field  */}
              <div>
                <label>
                  <span>Company Phone Number</span>
                </label>
                <input type='text' 
                  value={formData.companyPhoneNum || " "}
                  name='companyPhoneNum'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* joining data field  */}
              <div>
                <label>
                  <span>Joining Date</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='date' 
                  value={formData.joiningDate || " "}
                  name='joiningDate'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.joiningDate && <span className="text-red-600">{errors.joiningDate}</span>}
              </div>

              {/* last Appraisal date field      */}
              <div>
                <label>
                  <span>Last Appraisal Date</span>
                </label>
                <input type='date' 
                  value={formData.lastAppraisalDate}
                  name='lastAppraisalDate'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {/* {errors.lastAppraisalDate && <span className="text-red-600">{errors.lastAppraisalDate}</span>} */}
              </div>
              
              {/* resign date field  */}
              <div>
                <label>
                  <span>Resign Date</span>
                </label>
                <input type='date' 
                  value={formData.regisnationDate}
                  name='regisnationDate'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {/* {errors.regisnationDate && <span className="text-red-600">{errors.regisnationDate}</span>} */}
              </div>
              
              {/* office time policy field  */}
              <div>
                <label>
                  <span>Office Time Policy</span>
                </label>
                <select 
                  name="officeTimePolicy"
                  value={formData.officeTimePolicy || ""}
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option>--Select Office Time--</option>
                  {officeTimePolicy?.map(({policyId, _id})=>(
                    <option key={_id}>{policyId}</option>
                  ))}
                </select>
              </div>

              {/* shift field    */}
              <div>
                <label>
                  <span>Shift</span>
                </label>
                <select 
                  name="shift"
                  value={formData.shift || ""}
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black">
                <option>--Select Shift--</option>
                  {shiftName?.map(({name, _id})=>(
                    <option key={_id} value={_id}>{name}</option>
                  ))}
                </select>
              </div>
              
              {/* company name field  */}
              <div>
                <label>
                  <span>Company Name</span>
                </label>
                <select 
                  name="company"
                  value={formData.company || ""}
                  onChange={(e) => {
                    handleFormData(e);
                    setSelectedCompanyNameId(e.target.value);
                  }}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option>---Select Company Name--- </option>
                  {companynamedata?.map(({name, _id})=>(
                    <option key={_id} value={_id}>{name}</option>
                  ))}
                </select>
              </div>
              
              {/* company branch field  */}
              <div>
                <label>
                  <span>Company Branch</span>
                </label>
                <select 
                  name="companyBranch"
                  value={formData.companyBranch || ""}
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black">
                  {branchnamedata?.map(({name, _id})=>(
                    <option key={_id} value={name}>{name}</option>
                  ))}
                </select>
              </div>

              {/* department field    */}
              <div>
                <label>
                  <span>Department</span>
                </label>
                <select 
                   name="department"
                   value={formData.department || ""}
                   onChange={(e) => {
                     handleFormData(e);
                     setSelectedDepartmentId(e.target.value);
                   }}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                  // onChange={(e) => {setSelectedDepartmentId(e.target.value)}}
                >
                  <option value=''>--Select Department --</option>
                  {departmentName?.map(({ empdept, id }) => (
                   <option key={id} value={id}>{empdept}</option>
                  ))}
                </select>
              </div>
              
              {/* designation field  */}
              <div>
                <label>
                  <span>Designation</span>            
                </label>
                <select 
                  name="designation"
                  value={formData.designation || ""}
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black">
                  {DesginationData.map(({designation, id})=>(
                   <option key={id} value={designation}>{designation}</option>
                  ))}
                </select>
              </div>

            </div>
          </fieldset>

          <fieldset className='border-2  rounded-md' style={{ borderColor: '#740FD6'}}>
            <legend className='font-semibold text-lg ml-8' style={{color : '#740FD6'}}> &nbsp;&nbsp; Attachments &nbsp;&nbsp;</legend>
            <div className='grid gap-3 m-6 md:grid-cols-4'>
              
              {/* aadhar card attachments field  */}
              <div>
                <label>
                  <span>Aadhar Card</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='file' 
                  // value={formData.aadharCardAttachment}
                  name='aadharCardAttachment'
                  // onChange={handleFormData}
                  onChange={(e) =>
                    setFormData({ ...formData, aadharCardAttachment: e.target.files[0] })
                  }
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.aadharCardAttachment && <span className="text-red-600">{errors.aadharCardAttachment}</span>}
              </div>
              
              {/* pan card attachments field  */}
              <div>
                <label>
                  <span>Pan Card</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='file' 
                  // value={formData.panCardAttachment}
                  name='panCardAttachment'
                  onChange={(e) => setFormData({ ...formData, panCardAttachment: e.target.files[0] })}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.panCardAttachment && <span className="text-red-600">{errors.panCardAttachment}</span>}
              </div>
              
              {/* bank passbook attachments field  */}
              <div>
                <label>
                  <span>Bank Passbook</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='file' 
                  // value={formData.bankAttachment}
                  name='bankAttachment'
                  onChange={(e) => setFormData({ ...formData, bankAttachment: e.target.files[0] })}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.bankAttachment && <span className="text-red-600">{errors.bankAttachment}</span>}
              </div>

              {/* joining form attachments field   */}
              <div>
                <label>
                  <span>Joining Form</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='file' 
                  // value={formData.joiningFormAttachment}
                  name='joiningFormAttachment'
                  onChange={(e) => setFormData({ ...formData, joiningFormAttachment: e.target.files[0] })}
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.joiningFormAttachment && <span className="text-red-600">{errors.joiningFormAttachment}</span>}
              </div>
              
              {/* other document field  */}
              <div>
                <label>
                  <span>Other Document</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='file' 
                  onChange={(e) => setFormData({ ...formData, otherAttachment: e.target.files[0] })}
                  name='otherAttachment'
                  className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.otherAttachment && <span className="text-red-600">{errors.otherAttachment}</span>}
              </div>

            </div>
          </fieldset>

          <div className='text-right mt-4 pb-4'>
            <button  type='submit' className="  px-6 py-2 text-white font-semibold rounded-md shadow-md hover:bg-blue-800 transition-all" style={{backgroundColor : '#740FD6'}}>
              Register
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Registration