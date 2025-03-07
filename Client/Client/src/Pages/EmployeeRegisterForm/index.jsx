import React, { useEffect, useState } from 'react';
import { FiSearch } from "react-icons/fi";
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
  const [workTypeData, setWorkTypeData]=useState([]);

  const [officeTimePolicy, setOfficeTimePolicy] = useState([]);
  
  const [joiningHrNameData, setJoiningHrNameData]=useState([]);

  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
  const [selectedCompanyNameId, setSelectedCompanyNameId] = useState('');
  const [selectedQualificationId, setSelectedQualificationId] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [reportingManagers, setReportingManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);

  useEffect(() => {
    // Fetch the reporting managers data from the backend
    axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/show-reportingManager`)
      .then((response) => {
        setReportingManagers(response?.data?.data);
      })
      .catch((error) => {
        console.error('Error fetching reporting managers:', error);
      });
  }, []);

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle reporting manager selection
  const handleManagerSelect = (manager) => {
    setSelectedManager(manager);
    setFormData((prev) => ({
      ...prev,
      reportingManager: manager._id, // Send only the ID to the backend
    }));
    setIsOpen(false);  // Close dropdown after selection
  };

  // Filter reporting managers based on search term
  const filteredManagers = reportingManagers.filter((manager) =>
    manager.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  const [formData, setFormData] = useState({
    employeeCode: "",
    name: "",
    father_husbandName: "",
    dateOfBirth: "",
    personalPhoneNum: "",
    personalEmail: "",
    panCard: "",
    aadharCard: "",
    degree : "",
    qualification: "",
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
    // regisnationDate: "",
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
    department: "",
    designation: "",
    workType:'',
    joiningHR : " ",
    biometricPunchId: " ",
    ctc: "",
    inHand: "",
    employeeESI: "",
    employeePF: "",
    employerESI: "",
    employerPF: "",
  });

  // Fetching functions
  const fetchDepartmentName = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-department`);
      setDepartmentName(response?.data?.data);
    } catch (error) {
      alert('Error: Unable to fetch Department data');
    }
  };

  const fetchDeginationData = async (_id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-designation?departmentId=${_id}`);
      setDeginationData(response?.data?.data);
    } catch (error) {
      alert('Error: Unable to fetch Degination Name data');
    }
  };

  const fetchCompanyNameData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-company`);
      setCompanyName(response?.data?.data);
    } catch (error) {
      alert('Error: Unable to fetch Company Name data');
    }
  };

  const fetchBranchNameData = async (_id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-branch?companyID=${_id}`);
      setBranchNameData(response?.data?.data);
    } catch (error) {
      alert('Error: Unable to fetch Branch Name data');
    }
  };

  const fetchQulificationData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-qualification`);
      setQulificationData(response?.data?.data);
    } catch (error) {
      alert('Error: Unable to fetch  Qualification data');
    }
  };

  const fetchDegreeData = async (_id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-degree?qualificationId=${_id}`);
      setDegreeData(response?.data?.data);
    } catch (error) {
      alert('Error: Unable to fetch Degree data');
    }
  };

  const fetchShiftNameData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-shift`);
      setShiftName(response?.data?.data);
    } catch (error) {
      alert('Error: Unable to fetch  Shift Name data');
    }
  };

  const fetchJoiningHrNameData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/show-joining-HR`);
      setJoiningHrNameData(response?.data?.data);
    } catch (error) {
      alert('Error: Unable to fetch Hr Name data ');
    }
  };

  const fetchOfficeTimePolicyData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-officeTimePolicy`);
      setOfficeTimePolicy(response?.data?.data);
    } catch (error) {
      alert('Unable to Fetch office time policy Data');
    }
  };

  const fetchWorkTypeData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-workType`);
      setWorkTypeData(response?.data?.data);
    } catch (error) {
      alert('Unable to Fetch Data work type data');
    }
  };

  useEffect(() => {
    fetchDepartmentName();
    fetchCompanyNameData();
    fetchQulificationData();
    fetchShiftNameData();
    fetchJoiningHrNameData();
    fetchOfficeTimePolicyData();
    fetchWorkTypeData();
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
    // if (!formData.employeeCode) newErrors.employeeCode = 'Employee Code is required';
    if (!formData.employeeCode) {
      newErrors.employeeCode = "Employee Code is required ";
    } else if (formData.employeeCode.length < 6 || formData.employeeCode.length > 9) {
      newErrors.employeeCode = "Employee Code must be between 6 and 9 characters";
    }
    if (!formData.joiningDate) newErrors.joiningDate = 'Joining Date is required';
    if (!formData.panCardAttachment) newErrors.panCardAttachment = 'Pancard is required';
    if (!formData.aadharCardAttachment) newErrors.aadharCardAttachment = 'Aadhar card is required';
    if (!formData.bankAttachment) newErrors.bankAttachment = 'Bank details are required';
    
    
    if (!formData.reportingManager) newErrors.reportingManager = 'Reporting Manager is required';
    if (!formData.joiningHR) newErrors.joiningHR = 'Joining Hr Name is required';
    if (!formData.biometricPunchId) newErrors.biometricPunchId = 'Biometric Punch Id is required';
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
  
  // file related change 
  const convertToBase64 = (file) => {
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
    }
  };

 
  

  const fetchEmployeeData = async (phoneNumber) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/auth/show-joiningFormData`,
        {phoneNumber}
      );
  
      if (response?.data?.data) {
        const fetchedData = response?.data?.data;
        
        setFormData((prev) => ({
          ...prev,
          name: fetchedData?.name ?? prev.name,
          father_husbandName: fetchedData?.father_husbandName ?? prev?.father_husbandName,
          dateOfBirth: fetchedData?.dateOfBirth ? fetchedData.dateOfBirth.split("T")[0] : prev?.dateOfBirth,
          personalPhoneNum: fetchedData?.personalPhoneNum ?? prev.personalPhoneNum,
          personalEmail: fetchedData?.personalEmail ?? prev.personalEmail,
          panCard: fetchedData?.panCard ?? prev.panCard,
          aadharCard: fetchedData?.aadharCard ?? prev.aadharCard,
          permanentAddress: fetchedData?.permanentAddress ?? prev.permanentAddress,
          permanentPinCode: fetchedData?.permanentPinCode ?? prev.permanentPinCode,
          currentAddress: fetchedData?.currentAddress ?? prev.currentAddress,
          currentPinCode: fetchedData?.currentPinCode ?? prev.currentPinCode,
          bankName: fetchedData.bankName ?? prev.bankName,
          branchName: fetchedData?.branchName ?? prev.branchName,
          bankAccount: fetchedData?.bankAccount ?? prev.bankAccount,
          bankIFSC: fetchedData.bankIFSC ?? prev.bankIFSC,
          bankAccountHolderName: fetchedData.bankAccountHolderName ?? prev.bankAccountHolderName,
          bankAddress: fetchedData.bankAddress ?? prev.bankAddress,
          department: fetchedData.department ?? prev.department,
          designation: fetchedData.designation ?? prev.designation,
          aadharCardAttachment: fetchedData.aadharCardAttachment ?? prev.aadharCardAttachment,
          panCardAttachment: fetchedData.panCardAttachment ?? prev.panCardAttachment,
          bankAttachment: fetchedData.bankAttachment ?? prev.bankAttachment,
          // otherAttachment: fetchedData.photoAttachment ?? prev.photoAttachment,
          // otherAttachment: fetchedData.photoAttachment ?? prev.otherAttachment ?? "",
          signatureAttachment: fetchedData.signatureAttachment ?? prev.signatureAttachment,
          // status: fetchedData.status ?? prev.status,
          company: fetchedData.companyId ?? prev.company,
          branch: fetchedData.branch ?? prev.branch,
          
         // Salary-related fields (handling missing data safely)
          ctc: fetchedData?.salary?.ctc ?? "",
          inHand: fetchedData?.salary?.inHand ?? "",
          employeeESI: fetchedData?.salary?.employeeESI ?? "",
          employeePF: fetchedData?.salary?.employeePF ?? "",
          employerESI: fetchedData?.salary?.employerESI ?? "",
          employerPF: fetchedData?.salary?.employerPF ?? "",
        }));

        console.log("my actual form data ", formData);
        
      } else {
        alert("No employee found with this phone number.");
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
      alert("Error fetching employee data.");
    }
  };
  

  // Handling form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    
    console.log(formData?.degree , " my degree data")
    console.log("my branch is ", formData?.branch);

    if (Object.keys(formErrors).length > 0) {
      alert('Please correct the highlighted fields.');
      return;
    }

    try {
      console.log(" employee formData is ", formData);
      const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/empRegister`, formData, {
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
          // regisnationDate: "",
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
          department: "",
          designation: "",
          workType:" ",
          joiningHR: " ",
          biometricPunchId: " ",
          ctc: "",
          inHand: "",
          employeeESI: "",
          employeePF: "",
          employerESI: "",
          employerPF: "",

        });
      } else {
        alert('Something went wrong during registration.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      // alert('Error: Employee registration failed.');
    }
  };
  return (
    <div>
      <div className=' py-3 text-center font-semibold text-xl mt-4 ml-10 mr-10 rounded-md' style={{backgroundColor : '#740FD6'}}>
        <h2 className='text-white'>Employee Registration</h2>
      </div>
      <div className='mx-10 pt-6'>
        <form method='post' onSubmit={handleFormSubmit}>
          <fieldset className='border-2  rounded-md mb-4' style={{ borderColor: '#740FD6'}}>
            <legend className='font-semibold text-lg ml-8 ' style={{color : '#740FD6'}}> &nbsp;&nbsp; Personal Details &nbsp;&nbsp;</legend>
            <div className='grid gap-3 m-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>


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
                  className="w-full rounded-md border-2 py-1 px-4 border-gray-400"
                />
                {errors.name && <span className="text-red-600">{errors.name}</span>}
              </div>
              
              {/* father husband input field  */}
              <div>
                <label>
                  <span>Father Name</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='text' 
                  value={formData.father_husbandName}
                  name='father_husbandName'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                />
                {errors.dateOfBirth && <span className="text-red-600">{errors.dateOfBirth}</span>}
              </div>
              
              {/* personal phone number field  */}
              {/* <div>
                <label>
                  <span>Contact Number</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='text' 
                  value={formData.personalPhoneNum}
                  name='personalPhoneNum'
                  onChange={handleFormData}
                  // onBlur={(e) => fetchEmployeeData(e.target.value)}
                  onBlur={(e) => {
                    const phoneNumber = e.target.value.trim();
                    if (/^\d{10}$/.test(phoneNumber)) {
                      fetchEmployeeData(phoneNumber);
                    }
                  }}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                />
                <FiSearch />
                {errors.personalPhoneNum && <span className="text-red-600">{errors.personalPhoneNum}</span>}
              </div> */}

              <div className="relative">
                <label>
                  <span>Contact Number</span>
                  <span className="text-red-600">*</span>
                </label>

                {/* Input with Search Icon */}
                <div className="relative">
                  <input
                    type="text"
                    value={formData.personalPhoneNum}
                    name="personalPhoneNum"
                    onChange={handleFormData}
                    // onBlur={(e) => {
                    //   const phoneNumber = e.target.value.trim();
                    //   if (/^\d{10}$/.test(phoneNumber)) {
                    //     fetchEmployeeData(phoneNumber);
                    //   }
                    // }}
                    className="w-full rounded-md border-2 py-1 px-4 border-gray-400 pr-10" // pr-10 for space for the icon
                  />
                  
                  {/* Search Icon */}
                  <FiSearch 
                  onClick={() => fetchEmployeeData(formData.personalPhoneNum)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" 
                    size={20} 
                  />
                </div>

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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                <select
                  name='degree'
                  // value={formData.degree}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                  onChange={(event) => {
                    const { name, value} = event.target;
                    // console.log("name", name, "value", value);
                    setFormData((prev) => ({ ...prev, [name] : value}))
                  }}
                >
                  {degreeData?.map(({_id, name})=>(
                    <option key={_id} value={_id} name={name}>{name}</option>
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                />
                {errors.panCard && <span className="text-red-600">{errors.panCard}</span>}
              </div>

            </div>
          </fieldset>
          
          <fieldset className='border-2  rounded-md mb-4' style={{ borderColor: '#740FD6'}}>
            <legend className='font-semibold text-lg ml-8' style={{color : '#740FD6'}}>&nbsp;&nbsp; Bank Details &nbsp;&nbsp;</legend>
            <div className='grid gap-3 m-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              
              {/* bank name field  */}
              <div>
                <label>
                  <span>Bank Name</span>
                </label>
                <input type='text' 
                  value={formData.bankName || " "}
                  name='bankName'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                  onChange={(event) => setFormData((prev) => ({ ...prev, branchName: event.target.value}))}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                />
              </div>

              

            </div>
          </fieldset>
          
          <fieldset className='border-2  rounded-md mb-4' style={{ borderColor: '#740FD6'}}>
            <legend className='font-semibold text-lg ml-8' style={{color : '#740FD6'}}> &nbsp;&nbsp; Company Details &nbsp;&nbsp;</legend>
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400">
                  <option>--Select Joining Hr--</option>
                  {joiningHrNameData?.map(({name, _id})=>(
                    <option key={_id} value={_id}>{name}</option>
                  ))}
                </select>
                {errors.joiningHR && (
                    <p className="text-red-600">{errors.joiningHR}</p>
                  )}
              </div>

              {/* Reporting Manager field    */}
              <div className="relative">
                <label >
                  <span>Reporting Manager</span>
                  <span className='text-red-600'>*</span>
                </label>
                <button
                  className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={toggleDropdown}
                  type="button"
                >
                  <span>
                    {selectedManager ? selectedManager.name : 'Select Reporting Manager'}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 ml-2 -mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div className="absolute z-10 right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-full max-h-60 overflow-y-auto">
                    <input
                      className="block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-t-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      placeholder="Search managers"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    {filteredManagers.length > 0 ? (
                      filteredManagers.map((manager) => (
                        <button
                          key={manager._id}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:bg-gray-100"
                          onClick={() => handleManagerSelect(manager)}
                        >
                          {manager.name}
                        </button>
                      ))
                    ) : (
                      <p className="px-4 py-2 text-gray-500">No results found</p>
                    )}
                  </div>
                )}
                  {errors.reportingManager && (
                    <p className="mt-1  text-red-600">{errors.reportingManager}</p>
                  )}
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                />
                {/* {errors.lastAppraisalDate && <span className="text-red-600">{errors.lastAppraisalDate}</span>} */}
              </div>
              
              {/* resign date field  */}
              {/* <div>
                <label>
                  <span>Resign Date</span>
                </label>
                <input type='date' 
                  value={formData.regisnationDate}
                  name='regisnationDate'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                />
              </div>
               */}
              {/* office time policy field  */}
              <div>
                <label>
                  <span>Office Time Policy</span>
                </label>
                <select 
                  name="officeTimePolicy"
                  onChange={(event) => {
                    const { name, value} = event.target;
                    // console.log("name", name, "value", value);
                    setFormData((prev) => ({ ...prev, [name] : value}))
                  }}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                >
                  <option>--Select Office Time--</option>
                  {officeTimePolicy?.map(({policyName, _id})=>(
                    <option key={_id} value={_id}>{policyName}</option>
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
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400">
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
                  <span className='text-red-600'>*</span>
                </label>
                <select 
                  name="company"
                  value={formData.company || ""}
                  onChange={(e) => {
                    handleFormData(e);
                    setSelectedCompanyNameId(e.target.value);
                  }}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                  <span className='text-red-600'>*</span>
                </label>
                <select 
                  name="branch"
                  defaultValue={formData.branch || ""}
                  onChange={(event) => {
                    const { name, value } = event.target;
                    console.log(event.target.value);
                    console.log("name", name, "value", value);
                    setFormData((prev) => ({ ...prev, [name] : value}));
                  }}

                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                >
                  <option >--Select the Branch--</option>
                  {branchnamedata?.map(({name, _id})=>(
                    <option key={_id} value={_id}>{name}</option>
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
                   onChange={(e) => {
                     handleFormData(e);
                     setSelectedDepartmentId(e.target.value);
                   }}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
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
                  onChange={(event) => {
                    const { name, value} = event.target;
                    console.log("name", name, "value", value);
                    setFormData((prev) => ({ ...prev, [name] : value}))
                  }}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400">
                  {DesginationData.map(({designation, _id})=>(
                   <option key={_id} value={_id}>{designation}</option>
                  ))}
                </select>
              </div>

               {/* punch input field   */}
               <div>
                <label>
                  <span>Biometric Punch Id</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='text' 
                  value={formData.biometricPunchId}
                  name='biometricPunchId'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4   border-gray-400 "
                />
                {errors.name && <span className="text-red-600">{errors.name}</span>}
              </div>

              {/* Work Type Field   */}
              <div>
                <label>
                  <span>Work Type</span>
                </label>
                <select
                  name='workType'
                  // value={formData.degree}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                  onChange={(event) => {
                    const { name, value} = event.target;
                    // console.log("name", name, "value", value);
                    setFormData((prev) => ({ ...prev, [name] : value}))
                  }}
                >
                  <option>--Select Work Type--</option>
                  {workTypeData?.map(({_id, workType})=>(
                    <option key={_id} value={_id} name={workType}>{workType}</option>
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
                <input type='file' 
                  // value={formData.aadharCardAttachment}
                  name='aadharCardAttachment'
                  // onChange={handleFormData}
                  onChange={(e) => handleFileChange(e, 'aadharCardAttachment')}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                />
                {errors.aadharCardAttachment && <span className="text-red-600">{errors.aadharCardAttachment}</span>}
                {formData.aadharCardAttachment && (
                  <div className="mt-2">
                    <a href={formData.aadharCardAttachment} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      View Uploaded Document
                    </a>
                  </div>
                )}
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
                  onChange={(e) => handleFileChange(e, 'panCardAttachment')}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                />
                {errors.panCardAttachment && <span className="text-red-600">{errors.panCardAttachment}</span>}
                {formData.panCardAttachment && (
                  <div className="mt-2">
                    <a href={formData.panCardAttachment} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      View Uploaded Document
                    </a>
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
                  // value={formData.bankAttachment}
                  name='bankAttachment'
                  onChange={(e) => handleFileChange(e, 'bankAttachment')}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                />
                {errors.bankAttachment && <span className="text-red-600">{errors.bankAttachment}</span>}
                {formData.bankAttachment && (
                  <div className="mt-2">
                    <a href={formData.bankAttachment} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      View Uploaded Document
                    </a>
                  </div>
                )}
              </div>

              {/* joining form attachments field   */}
              <div>
                <label>
                  <span>Joining Form</span>
                </label>
                <input type='file' 
                  // value={formData.joiningFormAttachment}
                  name='joiningFormAttachment'
                  onChange={(e) => handleFileChange(e, 'joiningFormAttachment')}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                />
               
               
                
              </div>
              
              {/* other document field  */}
              <div>
                <label>
                  <span>Other Document</span>
                </label>
                <input type='file' 
                  onChange={(e) => handleFileChange(e, 'otherAttachment')}
                  name='otherAttachment'
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                />
              </div>

            </div>
          </fieldset>

          
          <fieldset className='border-2  rounded-md mb-4' style={{ borderColor: '#740FD6'}}>
            <legend className='font-semibold text-lg ml-8 ' style={{color : '#740FD6'}}> &nbsp;&nbsp; Salary Details &nbsp;&nbsp;</legend>
            <div className='grid gap-3 m-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>


              {/* ctc input field   */}
              <div>
                <label>
                  <span>CTC</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='text' 
                  value={formData.ctc}
                  name='ctc'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4 border-gray-400"
                />
                
                
              </div>
              
              {/* inhand salary input field  */}
              <div>
                <label>
                  <span>Inhand Salary</span>
                  <span className='text-red-600'>*</span>
                </label>
                <input type='text' 
                  value={formData.inHand}
                  name='inHand'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                />
                
                
              </div>
              
              {/* employee pf  input field  */}
              <div>
                <label><span>Employee PF</span></label>
                <input type='text' 
                  value={formData.employeePF}
                  name='employeePF'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                />
               
               
              </div>
              
              {/* employee esi input field  */}
              <div>
                <label><span>Employee ESI</span></label>
                <input 
                  type='text' 
                  value={formData.employeeESI}
                  name='employeeESI'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                />
              </div>
              
              {/* employer pf input field  */}
              <div>
                <label><span>Employer PF</span></label>
                <input 
                  type='text' 
                  value={formData.employerPF}
                  name='employerPF'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                />
              </div>
              
              {/* employer esi input field  */}
              <div>
                <label><span>Employer ESI</span></label>
                <input type='text' 
                  value={formData.employerESI}
                  name='employerESI'
                  onChange={handleFormData}
                  className="w-full rounded-md border-2 py-1 px-4  border-gray-400"
                />
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