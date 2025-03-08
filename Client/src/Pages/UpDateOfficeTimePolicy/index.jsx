import React from 'react';
import { useState,useEffect } from 'react';
import { FaListUl } from "react-icons/fa6";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateEmpPolicyDetailTable =()=> {
    const navigate=useNavigate();

    const [formData, setFormData] = useState({
        policyName: "",
        permittedLateArrival: "",
        pByTwo: "",
        absent: "",
        multiPunch: true,
        lateArrival1: null,
        lateArrival2: null,
        lateArrival3: null,
        lateArrival4: null,
        dayDeduct1: 0,
        dayDeduct2: 0,
        dayDeduct3: 0,
        dayDeduct4: 0,
        lateComingRule :true,
        deductFromAttendance: false,
        deductFromLeave: false,
        continuous: null,
        allowedLateDaysInMonth : "",
        salaryCutPercentage : " "
    
    });
    

    useEffect(() => {
        // Get the selected policy ID from cookies
        const selectedPolicyId = Cookies.get('selectedPolicyId');

        console.log('Selected Policy ID:', selectedPolicyId);
        
        if (selectedPolicyId) {
            // Make the GET request to fetch policy details using the selectedPolicyId
            axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/showToUpdate-officeTimepolicy?policyId=${selectedPolicyId}`)
                .then((response) => {

                    console.log('API request successful');

                    if (response?.data?.success) {
                        // Set the form data with the API response
                        console.log('Fetched policy  Data:', response?.data?.data); 
                        const data = response?.data?.data;
                        setFormData({
                            policyName: data?.policyName || "",
                            permittedLateArrival: data?.permittedLateArrival || "",
                            pByTwo: data?.pByTwo || "",
                            absent: data?.absent || "",
                            lateComingRule: data?.lateComingRule || false,
                            lateArrival1: data?.lateArrival1 || null,
                            lateArrival2: data?.lateArrival2 || null,
                            lateArrival3: data?.lateArrival3 || null,
                            lateArrival4: data?.lateArrival4 || null,
                            dayDeduct1: data?.dayDeduct1 || 0,
                            dayDeduct2: data?.dayDeduct2 || 0,
                            dayDeduct3: data?.dayDeduct3 || 0,
                            dayDeduct4: data?.dayDeduct4 || 0,
                            multiPunch: data?.multiPunch || false,
                            deductFromAttendance: data?.deductFromAttendance || false,
                            deductFromLeave: data?.deductFromLeave || false,
                            continuous: data?.continuous || false,
                            allowedLateDaysInMonth : data?.allowedLateDaysInMonth || 0,
                            salaryCutPercentage : data?.salaryCutPercentage || 0
                        });
                    } else {
                        alert('Failed to fetch policy data.');
                    }
                })
                .catch((error) => {
                    console.log('Error fetching policy:', error);
                    // console.log("error for fetch policy data", response);
                    // alert('Error fetching policy data.');
                });
        } else {
            alert('No policy selected!');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = { _id: Cookies.get('selectedPolicyId'), ...formData}

            console.log("Updated Data", dataToSend);

          const response = await axios.put(`${process.env.REACT_APP_SERVER_ADDRESS}/common/update-officeTimePolicy`,dataToSend,{
            headers: {
                "Content-Type": "application/json",
              },
            });
    
          if (response.status === 200) {
            alert("Policy Update successfully!");
          } else {
            alert("Failed to Update policy. Please try again.");
          }
        } catch (error) {
          console.error("Error occurred:", error);
          alert("An error occurred while Update the policy.");
        }
    };
    

    
    const [errors, setErrors] = useState({});
    const [disableLateFields, setDisableLateFields] = useState(true);
    
    
    // Update form data on change
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Check for "multiPunch" select option and set boolean accordingly
        if (name === "multiPunch") {
            value === "Single Punch"
            ? setFormData((prevData) => ({
                ...prevData,
                [name]: true, // true for Single Punch
                }))
            : setFormData((prevData) => ({
                ...prevData,
                [name]: false, // false for Multi Punch
                }));
        } else {
            // Update other form data normally
            setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            }));
        }
        
        // Check if lateArrival1 is empty or filled
        if (name === "lateComingRule" ) {
            setDisableLateFields(!value); // Disable fields if lateArrival1 is empty
        }
    };
    
    // Helper function to convert time string to minutes
    const timeToMinutes = (time) => {
        if (!time) return null;
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        // Validate mandatory fields
        if (!formData.policyName) {
            errors.policyName = "Policy Name is required";
            isValid = false;
        }

        if (!formData.permittedLateArrival) {
            errors.permittedLateArrival = "Permitted Late Arrival is required";
            isValid = false;
        }

        if (!formData.pByTwo) {
            errors.pByTwo = "Mark As Half Day is required";
            isValid = false;
        }

        if (!formData.absent) {
            errors.absent = "Mark As Absent is required";
            isValid = false;
        }

        if (formData.lateComingRule === false) {
            errors.lateComingRule = "Late Coming Rule must be enabled";
            isValid = false;
        }

        // Convert times to minutes for comparison
        const lateArrival1Min = timeToMinutes(formData.lateArrival1) ;
        const lateArrival2Min =  timeToMinutes(formData.lateArrival2);
        const lateArrival3Min =  timeToMinutes(formData.lateArrival3) ;
        const lateArrival4Min =  timeToMinutes(formData.lateArrival4) ;

        
        
        // Validate ranges
        if (lateArrival1Min !== null && (lateArrival1Min < 0 || lateArrival1Min >= 59)) {
            errors.lateArrival1 = "Late 1 must be between 1 and 58 minutes.";
            isValid = false;
        }

        if (lateArrival2Min !== null && (lateArrival2Min <= 15 || lateArrival2Min >= 120)) {
            errors.lateArrival2 = "Late 2 must be between 16 and 119 minutes.";
            isValid = false;
        }

        if (lateArrival3Min !== null && (lateArrival3Min <= 30 || lateArrival3Min >= 180)) {
            errors.lateArrival3 = "Late 3 must be between 31 and 179 minutes.";
            isValid = false;
        }

        if (lateArrival4Min !== null && (lateArrival4Min <= 60 || lateArrival4Min >= 240)) {
            errors.lateArrival4 = "Late 4 must be between 61 and 239 minutes.";
            isValid = false;
        }

        // Validate late arrival times
        if (lateArrival1Min && lateArrival2Min && lateArrival1Min >= lateArrival2Min) {
            errors.lateArrival2 = "Late 2 must be greater than Late 1";
            isValid = false;
        }

        if (lateArrival1Min && lateArrival3Min && (lateArrival1Min >= lateArrival3Min || lateArrival2Min >= lateArrival3Min)) {
            errors.lateArrival3 = "Late 3 must be greater than Late 1 and Late 2";
            isValid = false;
        }

        if (lateArrival1Min && lateArrival4Min && (lateArrival1Min >= lateArrival4Min || lateArrival2Min >= lateArrival4Min || lateArrival3Min >= lateArrival4Min)) {
            errors.lateArrival4 = "Late 4 must be greater than Late 1, Late 2, and Late 3";
            isValid = false;
        }

        // Deduct Day Validation (0 to 100 percentage)
        const deductFields = ['dayDeduct1', 'dayDeduct2', 'dayDeduct3', 'dayDeduct4' , 'salaryCutPercentage'];
    
        deductFields.forEach(field => {
            const value = formData[field];
            if (value !== '') {
            const percentage = Number(value);
            if (isNaN(percentage)) {
                errors[field] = "Please enter a valid number.";
                isValid = false;
            } else if (percentage < 0 || percentage > 100) {
                errors[field] = "Deduct percentage must be between 0 and 100.";
                isValid = false;
            }
            }
        });

        // Salary Cut Percentage Validation (0 to 100 percentage)
        const salaryCutPercentage = formData.salaryCutPercentage;
        if (salaryCutPercentage !== '') {
            const percentage = Number(salaryCutPercentage);
            if (isNaN(percentage)) {
            errors.salaryCutPercentage = "Please enter a valid number.";
            isValid = false;
            } else if (percentage < 0 || percentage > 100) {
            errors.salaryCutPercentage = "Salary cut percentage must be between 0 and 100.";
            isValid = false;
            }
        }
       return { isValid, errors };
    };
    
    //handle toggle from deduct from attendance and deduct from leave 
    const handleToggle = (field) => {
        setFormData((prevState) => ({
        ...prevState,
        deductFromAttendance: field === "deductFromAttendance" ? !prevState.deductFromAttendance : false,
        deductFromLeave: field === "deductFromLeave" ? !prevState.deductFromLeave : false,
        }));
    };
  
    //handle change for continue and discontinue 
    const handleContinueChange = (type) => {
        setFormData((prevState) => ({
        ...prevState,
        continuous:
            type === "continue"
            ? prevState.continuous === true
                ? null
                : true
            : type === "discontinue"
            ? prevState.continuous === false
                ? null
                : false
            : null
        }));
    };

    // Enable/Disable late arrival fields based on previous ones
    const isLateArrival2Disabled = !formData.lateArrival1;
    const isLateArrival3Disabled = !formData.lateArrival1 || !formData.lateArrival2;
    const isLateArrival4Disabled = !formData.lateArrival1 || !formData.lateArrival2 || !formData.lateArrival3;


    
    
    
  return (
    <div className='flex flex-col justify-between gap-8 mt-4 w-full'>
        
        {/* first section  */}
        <form onSubmit={handleSubmit}>
        <div className='ml-2 mr-2'>
            <div className='bgMainColor flex  py-3 pl-1 gap-3 justify-between'>
                <div className='flex flex-row pl-2 gap-4'>
                    {<FaListUl size={24} />}
                    <h4 className='text-white'>Employee Policy Update details</h4>
                </div>
            </div>
        
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4'>
                {/* policy name field  */}
                <div className='flex flex-col mt-6'>
                    <label className='pb-1'>
                        <span >Policy Name</span>
                        <span className='text-red-600'>*</span>
                    </label>
                    <input  
                        type='text' 
                        name="policyName" 
                        defaultValue={formData.policyName} 
                        onChange={handleChange} 
                        className=" rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black"
                    /> 
                    {errors.policyName && <p className="text-red-600">{errors.policyName}</p>}
                </div>
                
                {/* permitted Late Arrival field  */}
                <div className='flex flex-col mt-6'>
                    <label className='pb-1'>
                        <span>Permitted Late Arrival</span>
                        <span className='text-red-600'>*</span>
                    </label>
                    <input 
                        type='time' 
                        name="permittedLateArrival" 
                        defaultValue={formData.permittedLateArrival} 
                        onChange={handleChange} 
                        className=" rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                    {errors.permittedLateArrival && <p className="text-red-600">{errors.permittedLateArrival}</p>}
                </div>
                
                {/* Mark As Half Day If Working Hour Less Than field */}
                <div className='flex flex-col'>
                    <label className='pb-1'>
                        <span>Mark As Half Day <br/><span className='text-sm'>(if working hour less than)</span></span>
                    </label>
                    <input 
                        type='time' 
                        name="pByTwo" 
                        defaultValue={formData.pByTwo} 
                        onChange={handleChange} 
                        className=" rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                    {errors.pByTwo && <p className="text-red-600">{errors.pByTwo}</p>}
                </div>

                {/* Mark As Absent Day If Working Hour Less Than field  */}
                <div className='flex flex-col'>
                    <label className='pb-1'>
                        <span >Mark As Absent Day <br/><span className='text-sm'>(if working hour less than)</span></span>
                    </label>
                    <input 
                        type='time' 
                        name="absent" 
                        defaultValue={formData.absent}  
                        onChange={handleChange} 
                        className=" rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                    {errors.absent && <p className="text-red-600">{errors.absent}</p>}
                </div>

                {/* multi punch field  */}
                <div className='flex flex-col mt-6'>
                    <label className='pb-1'>
                        <span >Required Punch In Day<span></span></span>
                        <span className='text-red-600'>*</span>
                    </label>
                    <select  
                        name='multiPunch'  
                        defaultValue={formData.multiPunch ? "Single Punch" : "Multi Punch"} // Map boolean to dropdown options
                        onChange={handleChange} 
                        className=" rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black" 
                    >
                      <option>Single Punch</option>
                      <option>Multi Punch</option>
                    </select>
                </div>

            </div>
        </div>

        {/* second section  */}

            <div className='ml-2 mr-2 md:mt-6'>
            <div className='bgMainColor flex  py-3 pl-1 gap-3 justify-between'>
                <div className='flex flex-row pl-2 gap-4'>
                    {<FaListUl size={24} />}
                    <h4 className='text-white'>Late Coming Rule</h4>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4'>

                {/* late arrival 1 field  */}
                <div className='flex flex-col'>
                    <div className='flex flex-col'>
                        <span >Late 1 :</span>
                        <span className=' pb-1'>Late Arrival</span>
                    </div>
                    <input  
                        type='time'  
                        name="lateArrival1" 
                        defaultValue={formData.lateArrival1} 
                        onChange={handleChange}
                        disabled={formData.lateComingRule}
                        className=" rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                    {errors.lateArrival1 && <p className="text-red-600">{errors.lateArrival1}</p>}
                </div>
                
                {/* late arrival 2 field  */}
                <div className='flex flex-col'>
                    <div className='flex flex-col'>
                        <span >Late 2 :</span>
                        <span className=' pb-1'>Late Arrival</span>
                    </div>
                    <input 
                        type='time' 
                        name="lateArrival2" 
                        defaultValue={formData.lateArrival2}  
                        onChange={handleChange}  
                        disabled={isLateArrival2Disabled || formData.lateComingRule }
                        // disabled={formData.lateComingRule}
                        className=" rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                    {errors.lateArrival2 && <p className="text-red-600">{errors.lateArrival2}</p>}
                </div>
                 
                {/* late arrival 3 field  */} 
                <div className='flex flex-col'>
                    <div className='flex flex-col'>
                        <span >Late 3 :</span>
                        <span className=' pb-1'>Late Arrival</span>
                    </div>
                    <input 
                        type='time' 
                        name="lateArrival3" 
                        defaultValue={formData.lateArrival3}  
                        onChange={handleChange} 
                        disabled={isLateArrival3Disabled || formData.lateComingRule}
                        className="rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                    {errors.lateArrival3 && <p className="text-red-600">{errors.lateArrival3}</p>}
                </div>
                
                {/* late arrival 4 field  */}
                <div className='flex flex-col'>
                    <div className='flex flex-col '>
                        <span>Late 4 :</span>
                        <span className=' pb-1'>Late Arrival</span>
                    </div>
                    <input  
                        type='time' 
                        name="lateArrival4" 
                        defaultValue={formData.lateArrival4}  
                        onChange={handleChange} 
                        disabled={isLateArrival4Disabled || formData.lateComingRule}
                        className=" rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                    {errors.lateArrival4 && <p className="text-red-600">{errors.lateArrival4}</p>}
                </div>
                
                {/* deduct day 1 field */}
                <div className='flex flex-col'>
                    <span >Deduct Day(%)</span>
                    <input 
                        type='number' 
                        name="dayDeduct1" 
                        defaultValue={formData.dayDeduct1} 
                        onChange={handleChange}
                        disabled={formData.lateComingRule}
                        className='flex justify-between items-center rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black'
                    />
                    {errors.dayDeduct1 && <span className="text-red-600">{errors.dayDeduct1}</span>}
                </div>
                
                {/* deduct day 2 field  */}
                <div className='flex flex-col'>
                    <span>Deduct Day(%)</span>
                    <input 
                        type='number' 
                        name="dayDeduct2" 
                        defaultValue={formData.dayDeduct2} 
                        onChange={handleChange}
                        disabled={formData.lateComingRule}
                        className=' flex justify-between items-center rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black'
                    />
                    {errors.dayDeduct2 && <span className="text-red-600">{errors.dayDeduct2}</span>}
                </div>
                
                {/* deduct day 3 field   */}
                <div className='flex flex-col'>
                    <span>Deduct Day(%)</span>
                    <input 
                        type='number' 
                        name="dayDeduct3" 
                        defaultValue={formData.dayDeduct3} 
                        onChange={handleChange}
                        disabled={formData.lateComingRule}
                        className=' flex justify-between items-center rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black' 
                    />
                    {errors.dayDeduct3 && <span className="text-red-600">{errors.dayDeduct3}</span>}
                </div>
                
                {/* deduct day 4 field   */}
                <div className='flex flex-col'>
                    <span >Deduct Day(%)</span>
                    <input 
                        type='number' 
                        name="dayDeduct4" 
                        defaultValue={formData.dayDeduct4} 
                        onChange={handleChange}
                        disabled={formData.lateComingRule}
                        className='flex justify-between items-center rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black' 
                    />
                    {errors.dayDeduct4 && <span className="text-red-600">{errors.dayDeduct4}</span>}
                </div>
            </div>
        </div>
        
       

        {/* third section  */}
    
        <div className='ml-2 mr-2 mt-6'>

           <div className='bgMainColor flex  py-3 pl-1 gap-3 justify-between'>
               <div className='flex flex-row pl-2 gap-4'>
                   {<FaListUl size={24} />}
                   <div>
                   <div className='bgMainColor py-1  w-full flex'>
                       <label className="ml-3 inline-flex items-center cursor-pointer">
                           <input 
                               type="checkbox" 
                               name="lateComingRule" 
                               checked={formData.lateComingRule}
                               onChange={(e) => setFormData((prev) => ({ ...prev, lateComingRule: e.target.checked }))}

                               className="sr-only peer" 
                           />
                           <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                       </label>
                       <h5 className='ml-2 pr-1'>Enable Late Comming Setting</h5>
                   </div>
                   
                   
               </div>
                   {/* <h4 className='text-white'>Other Employee Policy details</h4> */}
               </div>
           </div>

        
            <div className='flex w-full justify-between pt-4'>
                
                {/* deduct section  */}
                <div>
                    <div>
                        <input 
                            type="checkbox" 
                            name="deductFromAttendance" 
                            checked={formData.deductFromAttendance} 
                            onChange={() => handleToggle("deductFromAttendance")}
                            disabled={!formData.lateComingRule}
                        />
                        <label>Deduct From Attendance</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            name="deductFromLeave"  
                            checked={formData.deductFromLeave}  
                            onChange={() => handleToggle("deductFromLeave")} 
                            disabled={!formData.lateComingRule}
                        />
                        <label>Deduct From Leave</label>
                    </div>
                </div>
                
                {/* late day allow in month  */}
                <div className='flex flex-col'>
                    <label className='pb-1'>
                        <span className='ml-8'>Late Days Allowed in Month</span>
                    </label>
                    <input  
                        type='number' 
                        name="allowedLateDaysInMonth" 
                        defaultValue={formData.allowedLateDaysInMonth}  
                        onChange={handleChange} 
                        disabled={!formData.lateComingRule}
                        className="ml-8 rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                {/* Cut Day selection */}
                <div className="flex md:flex-col">
                    <label className="pb-1">
                        <span >Salary Cut Percentage</span>
                    </label>
                    <input 
                        type='number' 
                        name="salaryCutPercentage" 
                        defaultValue={formData.salaryCutPercentage} 
                        onChange={handleChange}  
                        disabled={!formData.lateComingRule}
                        className="rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {errors.salaryCutPercentage && <span className="text-red-600">{errors.salaryCutPercentage}</span>}
                </div>
                    
                {/* continue and discontinue part  */}
                <div>
                    <div>
                        <input  
                            type="checkbox" 
                            name="continue" 
                            checked={formData.continuous === true} // Checked only if continuous is true
                            onChange={() => handleContinueChange("continue")}
                            disabled={!formData.lateComingRule}
                            className='gap-2'
                        />
                        <label>Continue</label>
                    </div>
                    <div>
                        <input  
                            type="checkbox"  
                            checked={formData.continuous === false} 
                            onChange={() => handleContinueChange("discontinue")} 
                            disabled={!formData.lateComingRule}
                        />
                        <label>Discontinue</label>
                    </div>
                </div>
            </div>
       </div>
    
        
       
       {/* button section  */}
        <div className='ml-2 mt-2 mb-4'>
            <button  type='submit' className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition-all">Register</button>
        </div>

        </form>

    </div>
  )
}

export default UpdateEmpPolicyDetailTable

