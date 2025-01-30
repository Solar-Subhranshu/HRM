import React from 'react';
import { useState,useEffect } from 'react';
import { FaListUl } from "react-icons/fa6";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const UpdateEmpPolicyDetailTable =()=> {
    const navigate=useNavigate();

    const [ deductDayValues, setDeductDayValues ] = useState(["0%",  "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"]);
    const [ lateMonth, setLateMonth]=useState([0,1,2,3,4,5,6,7,8,9,10,11]);
    const [ cutDay, setCutDay]=useState(["0%", "25%", "50%", "75%", "100%"])
    
    const [formData, setFormData] = useState({
        policyName: "",
        permittedLateArrival: "",
        pByTwo: "",
        absent: "",
        lateComingRule: false,
        lateArrival1: "",
        lateArrival2: "",
        lateArrival3: "",
        lateArrival4: "",
        dayDeduct1: 0,
        dayDeduct2: 0,
        dayDeduct3: 0,
        dayDeduct4: 0,
        multiPunch: false,
        deductFromAttendance: false,
        deductFromLeave: false,
        continuous: false,
        disContinuous: false,
        salaryDeductRule : [{
            salaryCutPercentage : " ",
            noOfLateInMonth:" "
        }]
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

                    if (response.data.success) {
                        // Set the form data with the API response
                        console.log('Fetched Data:', response.data.data); 
                        const data = response.data.data;
                        const percen = (data.salaryDeduct[0].salaryCutPercentage).toString();
                        setFormData({
                            policyName: data.policyName || "",
                            permittedLateArrival: data.permittedLateArrival || "",
                            pByTwo: data.pByTwo || "",
                            absent: data.absent || "",
                            lateComingRule: data.lateComingRule || false,
                            lateArrival1: data.lateArrival1 || "",
                            lateArrival2: data.lateArrival2 || "",
                            lateArrival3: data.lateArrival3 || "",
                            lateArrival4: data.lateArrival4 || "",
                            dayDeduct1: data.dayDeduct1 || 0,
                            dayDeduct2: data.dayDeduct2 || 0,
                            dayDeduct3: data.dayDeduct3 || 0,
                            dayDeduct4: data.dayDeduct4 || 0,
                            multiPunch: data.multiPunch || false,
                            deductFromAttendance: data.deductFromAttendance || false,
                            deductFromLeave: data.deductFromLeave || false,
                            continuous: data.continuous || false,
                            disContinuous: data.disContinuous || false,
                            salaryDeductRule: [
                                {
                                    salaryCutPercentage: percen || "",
                                    noOfLateInMonth: data.salaryDeduct[0].noOfLateInMonth || ""
                                }
                            ]
                        });
                    } else {
                        alert('Failed to fetch policy data.');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching policy:', error);
                    alert('Error fetching policy data.');
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
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Handle mutually exclusive options for "Deduct From Leave" and "Deduct From Attendance"
         if (name === "deductFromAttendance" || name === "deductFromLeave") {
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
                ...(name === "deductFromAttendance" && { deductFromLeave: false }),
                ...(name === "deductFromLeave" && { deductFromAttendance: false }),
            }));
    
            // Update cutDay options based on the selection of "Deduct From Leave" or "Deduct From Attendance"
            if (name === "deductFromLeave" && checked) {
                setCutDay(["Full Day"]);
            } else if (name === "deductFromAttendance" && checked) {
                setCutDay(["0%", "25%", "50%", "75%" , "100%"]);
            }
        } 
        // Handle mutually exclusive options for "Continue" and "Discontinue"
        else if (name === "continuous" || name === "disContinuous") {
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
                ...(name === "continuous" && { disContinuous: false }),
                ...(name === "disContinuous" && { continuous: false }),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };
    

    const handleSalaryDeductRuleChange = (index, field, value) => {
        let numericValue;
    
        // If the value is "Full Day", convert it to 100
        if (value === "Full Day") {
            numericValue = 100;  // Full Day is mapped to 100
        } else if (value.includes('%')) {
            numericValue = parseInt(value.replace('%', ''), 10);  // Remove '%' and convert to number
        } else if (field === 'noOfLateInMonth') {
            // Ensure noOfLateInMonth is always a number
            numericValue = Number(value);  // Convert value to a number
        } else {
            numericValue = isNaN(value) ? value : Number(value);  // Ensure it's treated as a number
        }
       
        setFormData(prev => {
            const updatedSalaryDeductRule = [...prev.salaryDeductRule];
            updatedSalaryDeductRule[index] = {
                ...updatedSalaryDeductRule[index],
                [field]: numericValue
            };
            return {
                ...prev,
                salaryDeductRule: updatedSalaryDeductRule
            };
        });
    };
    

  return (
    <div className='flex flex-col justify-between gap-8 mt-4'>
        
        {/* first section  */}
        <form onSubmit={handleSubmit}>
        <div className='ml-2 mr-2'>
            <div className='bgMainColor flex  py-3 pl-1 gap-3 justify-between'>
                <div className='flex flex-row pl-2 gap-4'>
                    {<FaListUl size={24} />}
                    <h4 className='text-white'>Update Employee Policy details</h4>
                </div>
            </div>
        
            <div className='grid grid-cols-4 gap-4 mt-4'>
                {/* policy name field  */}
                <div className='flex flex-col'>
                    <label className='pb-2'>
                        <span className='ml-8'>Policy Name</span>
                        <span className='text-red-600'>*</span>
                    </label>
                    <input  
                        type='text'
                        name="policyName"
                        value={formData.policyName}
                        onChange={(event) => setFormData((prev) => ({ ...prev, policyName: event.target.value}))}
                        className="ml-8 mr-20 rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
                
                {/* permitted Late Arrival field  */}
                <div className='flex flex-col'>
                    <label className='pb-2'>
                        <span className='pl-8'>Permitted Late Arrival</span>
                        <span className='text-red-600'>*</span>
                    </label>
                    <input 
                        type='time'
                        name="permittedLateArrival"
                        value={formData.permittedLateArrival}
                        onChange={(event) => setFormData((prev) => ({ ...prev, permittedLateArrival: event.target.value}))}
                        className="ml-8 mr-20 rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                </div>
                
                {/* Mark As Half Day If Working Hour Less Than field */}
                <div className='flex flex-col'>
                    <label className='pb-2'>
                        <span className='pl-8'>Mark As Half Day If Working Hour Less Than</span>
                    </label>
                    <input 
                        type='time'
                        name="pByTwo"
                        value={formData.pByTwo}
                        onChange={(event) => setFormData((prev) => ({ ...prev, pByTwo : event.target.value}))}
                        className="ml-8 mr-20 rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                </div>

                {/* Mark As Absent Day If Working Hour Less Than field  */}
                <div className='flex flex-col'>
                    <label className='pb-2'>
                        <span className='pl-8'>Mark As Absent Day If Working Hour Less Than</span>
                    </label>
                    <input 
                        type='time'
                        name="absent"
                        value={formData.absent}
                        onChange={(event) => setFormData((prev) => ({ ...prev, absent : event.target.value}))}
                        className="ml-8 mr-20 rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                </div>
            </div>
        </div>

        {/* second section  */}
        <div className='ml-2 mr-2 mt-6'>

            <div className='bgMainColor flex  py-3 pl-1 gap-3 justify-between'>
                <div className='flex flex-row pl-2 gap-4'>
                    {<FaListUl size={24} />}
                    <h4 className='text-white'>Late Coming Rule</h4>
                </div>
            </div>

            <div className='grid grid-cols-4 gap-4 mt-4'>

                {/* late arrival 1 field  */}
                <div className='flex flex-col'>
                    <div className='flex flex-col'>
                        <span className='ml-8'>Late 1 :</span>
                        <span className='ml-8 pb-2'>Late Arrival</span>
                    </div>
                    <input 
                        type='time'
                        name="lateArrival1"
                        value={formData.lateArrival1}
                        onChange={(event) => setFormData((prev) => ({ ...prev, lateArrival1 : event.target.value}))}
                        className="ml-8 mr-20 rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                </div>
                
                {/* late arrival 2 field  */}
                <div className='flex flex-col'>
                    <div className='flex flex-col'>
                        <span className='ml-8'>Late 2 :</span>
                        <span className='ml-8 pb-2'>Late Arrival</span>
                    </div>
                    <input 
                        type='time'
                        name="lateArrival2"
                        value={formData.lateArrival2}
                        onChange={(event) => setFormData((prev) => ({ ...prev, lateArrival2 : event.target.value}))}
                        className="ml-8 mr-20 rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                </div>
                 
                {/* late arrival 3 field  */} 
                <div className='flex flex-col'>
                    <div className='flex flex-col'>
                        <span className='ml-8'>Late 3 :</span>
                        <span className='ml-8 pb-2'>Late Arrival</span>
                    </div>
                    <input 
                        type='time'
                        name="lateArrival3"
                        value={formData.lateArrival3}
                        onChange={(event) => setFormData((prev) => ({ ...prev, lateArrival3 : event.target.value}))}
                        className="ml-8 mr-20 rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                </div>
                
                {/* late arrival 4 field  */}
                <div className='flex flex-col'>
                    <div className='flex flex-col '>
                        <span className='ml-8'>Late 4 :</span>
                        <span className='ml-8 pb-2'>Late Arrival</span>
                    </div>
                    <input 
                        type='time'
                        name="lateArrival4"
                        value={formData.lateArrival4}
                        onChange={(event) => setFormData((prev) => ({ ...prev, lateArrival4 : event.target.value}))}
                        className="ml-8 mr-20 rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                </div>
                
                {/* deduct day 1 field */}
                <div className='flex flex-col'>
                    <div className=''>
                        <span className='ml-8'>Deduct Day(%)</span>
                    </div> 
                    <select 
                         name="dayDeduct1"
                         //value={formData.dayDeduct1}
                        onChange={(event) => {
                            // Remove '%' and convert to integer
                            const numericValue = parseInt(event.target.value.replace('%', ''), 10);
                            setFormData((prev) => ({ ...prev, dayDeduct1: numericValue }));
                        }}
                        className='ml-8  mr-20 flex justify-between items-center rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black'>
                        {deductDayValues.map((per, index) => (
                            <option key={index}>{per}</option>
                        ))}
                    </select>
                </div>
                
                {/* deduct day 2 field  */}
                <div className='flex flex-col'>
                    <div className=''>
                        <span className='ml-8'>Deduct Day(%)</span>
                    </div> 
                    <select 
                        name="dayDeduct2"
                        //value={formData.dayDeduct2}
                        onChange={(event) => {
                            // Remove '%' and convert to integer
                            const numericValue = parseInt(event.target.value.replace('%', ''), 10);
                            setFormData((prev) => ({ ...prev, dayDeduct2: numericValue }));
                        }}
                        className='ml-8  mr-20 flex justify-between items-center rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black'>
                        {deductDayValues.map((per, index) => (
                            <option key={index}>{per}</option>
                        ))}
                    </select>
                </div>
                
                {/* deduct day 3 field   */}
                <div className='flex flex-col'>
                    <div className=''>
                        <span className='ml-8'>Deduct Day(%)</span>
                    </div> 
                    <select 
                        name="dayDeduct3"
                        //value={formData.dayDeduct3}
                        onChange={(event) => {
                            // Remove '%' and convert to integer
                            const numericValue = parseInt(event.target.value.replace('%', ''), 10);
                            setFormData((prev) => ({ ...prev, dayDeduct3: numericValue }));
                        }}
                        className='ml-8  mr-20 flex justify-between items-center rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black'>
                        {deductDayValues.map((per, index) => (
                            <option key={index}>{per}</option>
                        ))}
                    </select>
                </div>
                
                {/* deduct day 4 field   */}
                <div className='flex flex-col'>
                    <div className=''>
                        <span className='ml-8'>Deduct Day(%)</span>
                    </div> 
                    <select 
                        name="dayDeduct4"
                        //value={formData.dayDeduct4}
                        onChange={(event) => {
                            const numericValue = parseInt(event.target.value.replace('%', ''), 10);
                            setFormData((prev) => ({ ...prev, dayDeduct4: numericValue }));
                        }}
                        className='ml-8  mr-20 flex justify-between items-center rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black'>
                        {deductDayValues.map((per, index) => (
                            <option key={index}>{per}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>

        {/* third section  */}
        <div className='ml-2 mr-2 mt-6'>

            <div className='bgMainColor flex  py-3 pl-1 gap-3 justify-between'>
                <div className='flex flex-row pl-2 gap-4'>
                    {<FaListUl size={24} />}
                    <h4 className='text-white'>Other Employee Policy details</h4>
                </div>
            </div>

            <div className='flex w-full justify-between pt-4'>
                <div>
                    <div className='bgMainColor py-2  w-full flex'>
                        <label className="ml-3 inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox"
                                name="multiPunch"
                                checked={formData.multiPunch}
                                onChange={handleChange}
                                className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                        <h5 className='ml-2 pr-1'>Multiple Punch</h5>
                    </div>
                </div>
           
                <div>
                    <div className='bgMainColor py-2  w-full flex'>
                        <label className="ml-3 inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox"
                                name="lateComingRule"
                                checked={formData.lateComingRule}
                                onChange={handleChange}
                                className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                        <h5 className='ml-2 pr-1'>Enable Late Comming Setting</h5>
                    </div>
        
                        {formData.lateComingRule && (
                            <div>
                                <div>
                                    <input
                                        type="checkbox"
                                        name="deductFromAttendance"
                                        checked={formData.deductFromAttendance}
                                        onChange={handleChange}
                                    />
                                    <label>Deduct From Attendance</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        name="deductFromLeave"
                                        checked={formData.deductFromLeave}
                                        onChange={handleChange}
                                    />
                                    <label>Deduct From Leave</label>
                                </div>
                            </div>
                        )}
                </div>

                    <div className='flex flex-col'>
                        <label className='pb-2'>
                            <span className='ml-8'>No. Of Late In A Month</span>
                            <span className='text-red-600'>*</span>
                        </label>
                        <select 
                            name="noOfLateInMonth"
                            value={formData.salaryDeductRule[0].noOfLateInMonth}
                            onChange={(e) => handleSalaryDeductRuleChange(0, 'noOfLateInMonth', e.target.value)}
                            className="ml-8 rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black">
                            <option>--select Late In Month--</option>
                            {lateMonth.map((index, month)=>(
                                <option key={index} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>


                   {/* Cut Day selection */}
                   {formData.deductFromAttendance || formData.deductFromLeave ? (
                        <div className="flex flex-col">
                            <label className="pb-2">
                                <span className="ml-8">Cut Day</span>
                                <span className="text-red-600">*</span>
                            </label>
                            <select
                                name="salaryCutPercentage"
                                defaultValue={formData.salaryDeductRule[0].salaryCutPercentage}
                                onChange={(e) => handleSalaryDeductRuleChange(0, 'salaryCutPercentage', e.target.value)}
                                className="rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                <option>--select Cut Day--</option>
                                {cutDay.map((percent, index) => (
                                    <option key={index} value={percent}>
                                        {percent}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : null}
                    
                    {/* continue and discontinue part  */}
                    <div>
                        <div>
                            <input 
                            type="checkbox"
                            name="continuous"
                            checked={formData.continuous}
                            onChange={handleChange}
                            />
                            <label>Continue</label>
                        </div>
                        <div>
                            <input 
                            type="checkbox"
                            name="disContinuous"
                            checked={formData.disContinuous}
                            onChange={handleChange}
                            />
                            <label>Discontinue</label>
                        </div>
                    </div>
            </div>
        </div>
       
       {/* button section  */}
        <div className='ml-7 mt-2'>
            <button  
              type='submit' 
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition-all"
            >
              Register
            </button>
        </div>

        </form>

    </div>
  )
}

export default UpdateEmpPolicyDetailTable



