import React from 'react'
import { useEffect } from 'react'
import { showDepartment } from '../../Utils/Api/ShowDepartment'
import { showDesignation } from '../../Utils/Api/ShowDesignation'
import { showCompany } from '../../Utils/Api/ShowCompany'
import { useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Index() {
 
    const location = useLocation();
    const { formId } = location.state || {}; // Retrieve formId
    const [joiningHrNameData, setJoiningHrNameData]=useState([]);
    

    const [showDepartmentList, setShowDepartmentList]=useState([]);
    const [showDesignationList, setShowDeginationList]=useState([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
    const [showCompanyList, setShowCompanyList]=useState([]);

    const [formData, setFormData]=useState({
        formId: formId || "",
        companyId : "",
        joiningHR: " ",
        officialEmail:"",
        officialContact: "",
        department: "",
        designation : "",
        joiningDate: "",
        employeeType : "",
        interviewDate: " ",
        modeOfRecruitment :"",
        reference : "",
        ctc : "",
        inHand :"",
        employeeESI: "",
        employeePF:"",
        employerESI:"",
        employerPF :"",
    })

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('my form data is ', formData)
            const response = await axios.patch(
                `${process.env.REACT_APP_SERVER_ADDRESS}/auth/approve-joiningForm`,
                { ...formData, formId },
                { withCredentials: true }
            );

            console.log("my formdata is ", formData)
          
            // Show success toast
            toast.success("Form submitted successfully!", {
                position: "top-right",
                autoClose: 3000, // Closes after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            

            // Reset form data after submission
            setFormData({
                formId: formId || "",
                companyId: "",
                officialEmail:"",
                officialContact: "",
                department: "",
                designation: "",
                joiningDate: "",
                employeeType: "",
                interviewDate: "",
                modeOfRecruitment: "",
                reference: "",
                ctc: "",
                inHand: "",
                employeeESI: "",
                employeePF: "",
                employerESI: "",
                employerPF: "",
                joiningHR: "",
            });

            await downloadJoiningPDF();

        } catch (error) {
            // console.error("Error submitting form", error);
            toast.error("Form submission failed!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    // Function to download the PDF
    const downloadJoiningPDF = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_ADDRESS}/auth/download-JoiningPdf?formId=${formId}`,
                { responseType: 'blob' } // Ensure the response is a Blob
            );
            
            // Create a blob URL for the response data
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', 'JoiningForm.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success("PDF downloaded successfully!", {
                position: "top-right",
                autoClose: 3000,
            });

        } catch (error) {
            toast.error("Failed to download PDF!", {
                position: "top-right",
                autoClose: 3000,
            });
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

      useEffect(()=>{
        fetchJoiningHrNameData();
      }, []);

    
    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    useEffect(()=>{
        showCompany(setShowCompanyList)
    }, [])

    useEffect(()=>{
        showDepartment(setShowDepartmentList);
    },[]);

    useEffect(()=>{
        if (selectedDepartmentId) showDesignation(setShowDeginationList, selectedDepartmentId);
    }, [selectedDepartmentId])

  return (
    <>
    <div className='p-2'>
        <div  className='py-1 rounded-md bgMainColor mt-4 shadow-xl'>
            <h1 className='text-center text-white font-bold text-xl'>Joining Details</h1>
        </div>
        <div >
            <form onSubmit={handleSubmit}>
                <div className='grid md:grid-cols-4 gap-4'>
                    {/* company name field  */}
                    <div className="flex flex-col">
                        <label>
                            <span>Company Name</span>
                            <span className='text-red-600'>*</span>
                        </label>
                        <select 
                        name="companyId"
                        value={formData.companyId || ""}
                        onChange={handleFormData}
                        className="border border-gray-500 rounded-md  py-2 px-4 "
                        >
                        <option>---Select Company Name--- </option>
                        {showCompanyList?.map(({name, _id})=>(
                            <option key={_id} value={_id}>{name}</option>
                        ))}
                        </select>
                    </div>

                     {/* joining hr name  */}
                     <div className="flex flex-col">
                        <label>Joining Hr Name <span className='text-red-600'>*</span></label>
                        <select 
                        name="joiningHR"
                        value={formData.joiningHR || ""}
                        onChange={handleFormData}
                        className="border border-gray-500 rounded-md  py-2 px-4 "
                        >
                        <option>---Select Joining Hr Name--- </option>
                        {joiningHrNameData?.map(({name, _id})=>(
                            <option key={_id} value={_id}>{name}</option>
                        ))}
                        </select>
                    </div>

                    <div className='flex flex-col'>
                        <label>Interview Date<span className='text-red-600'>*</span></label>
                        <input type='date' 
                            name='interviewDate'
                            value={formData.interviewDate}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>

                    <div className='flex flex-col'>
                        <label>Joining Date<span className='text-red-600'>*</span></label>
                        <input 
                            type='date' 
                            name='joiningDate'
                            value={formData.joiningDate}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>

                    <div className='flex flex-col'>
                        <label>Official Contact</label>
                        <input 
                            type='text' 
                            name='officialContact'
                            
                            value={formData.officialContact}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>
                    <div className='flex flex-col'>
                        <label>Official Email</label>
                        <input 
                            type='email' 
                            name='officialEmail' 
                            value={formData.officialEmail}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>

                    {/* department field    */}
                    <div className="flex flex-col">
                        <label>Department<span className='text-red-600'>*</span></label>
                        <select 
                        name="department"
                        onChange={(e) => {
                            handleFormData(e);
                            setSelectedDepartmentId(e.target.value);
                        }}
                         className='border border-gray-500 px-4 py-2 rounded-md'
                        >
                        <option value=''>--Select Department --</option>
                        {showDepartmentList?.map(({ empdept, id }) => (
                        <option key={id} value={id}>{empdept}</option>
                        ))}
                        </select>
                    </div>
                        
                    {/* designation field  */}
                    <div className="flex flex-col">
                        <label>Designation<span className='text-red-600'>*</span></label>
                        <select 
                        name="designation"
                        onChange={(event) => {
                            const { name, value} = event.target;
                            console.log("name", name, "value", value);
                            setFormData((prev) => ({ ...prev, [name] : value}))
                        }}
                        value={formData.designation}
                       
                        className='border border-gray-500 px-4 py-2 rounded-md'>
                        <option>---select Designation---</option>
                        {showDesignationList?.map(({designation, _id})=>(
                        <option key={_id} value={_id}>{designation}</option>
                        ))}
                        </select>
                    </div>
                    
                    {/* employee type  */}
                    <div className='flex flex-col'>
                        <label>Employee Type</label>
                        <input 
                            type='text' 
                            name='employeeType' 
                            value={formData.employeeType}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>

                    {/* Recruitment mode  */}
                    <div className='flex flex-col'>
                        <label>Recruitment Mode </label>
                        <input 
                            type='text' 
                            name='modeOfRecruitment' 
                            value={formData.modeOfRecruitment}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>

                    {/* reference ny input field  */}
                    <div className='flex flex-col'>
                        <label>Reference By</label>
                        <input 
                            type='text' 
                            name='reference' 
                            value={formData.reference}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div> 
                </div>
                
                <div className='py-1 rounded-md bgMainColor mt-4 shadow-xl'>
                   <h2 className='text-center  text-white text-xl font-bold'>Salary Break Down </h2>
                </div>

                <div className='grid md:grid-cols-4  gap-4'>
                    <div className='flex flex-col'>
                        <label>CTC<span className='text-red-600'>*</span> </label>
                        <input 
                            type='text' 
                            name='ctc' 
                            value={formData.ctc}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>
                    <div className='flex flex-col'>
                        <label>Inhand Salary<span className='text-red-600'>*</span></label>
                        <input 
                            type='text' 
                            name='inHand' 
                            value={formData.inHand}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>
                    <div className='flex flex-col'>
                        <label>Employee PF </label>
                        <input 
                            type='text' 
                            name='employeePF' 
                            value={formData.employeePF}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>
                    <div className='flex flex-col'>
                        <label>Employee ESI</label>
                        <input type='text'
                         name='employeeESI'
                         value={formData.employeeESI}
                         onChange={handleFormData}
                         className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>
                    <div className='flex flex-col'>
                        <label>Employer PF </label>
                        <input 
                           type='text' 
                           name='employerPF' 
                           value={formData.employerPF}
                           onChange={handleFormData}
                           className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>
                    <div className='flex flex-col'>
                        <label>Employer ESI</label>
                        <input 
                            type='text' 
                            name='employerESI' 
                            value={formData.employerESI}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>
                </div>

                <div className='mt-4'>
                    <button type='submit' className='py-2 px-4 bg-red-500 rounded-md text-white font-semibold'>Submit</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Index






