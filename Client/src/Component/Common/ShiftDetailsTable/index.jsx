import React, { useEffect, useState } from 'react';
import { FaListUl } from "react-icons/fa6";
import axios from 'axios';

const ShiftDetailsTable = () => {
  const [weekDayName] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);

  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    endTime: '',
    markAsAbsent: '',
    isNightShift: false,
    weekOff: 'Monday',
    maxEarlyAllowed: '',
    maxLateAllowed: '',
  });

  const [duration, setDuration] = useState('');

  const calculateDuration = () => {
    const { startTime, endTime } = formData;

    if (startTime && endTime) {
      // Parse start and end times
      const start = new Date(`1970-01-01T${startTime}:00`);
      const end = new Date(`1970-01-01T${endTime}:00`);
      
      
      
      // Adjust for overnight shifts
      if (end < start) {
        end.setDate(end.getDate() + 1);
      }
      const diff = end - start;

      // Convert milliseconds to hours and minutes
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
      
      
      // Format the duration
      setDuration(`${hours} hours and ${minutes} minutes`);
    } else {
      setDuration('');
    }
  };
  
  useEffect(()=>{
    calculateDuration();
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(`Updated ${name}:`, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('form date ', formData);
    try {
      const response = await axios.post('http://localhost:8000/common/add-shift', formData);
      alert('Shift details registered successfully!');
      console.log('Response:', response.data);
    } catch (error) {
      alert('Failed to register shift details.');
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <div className='flex flex-col justify-between gap-8 mt-4'>
      <form onSubmit={handleSubmit}>
        {/* First Section */}
        <div className='ml-2 mr-2'>
          <div className='bgMainColor flex py-3 pl-1 gap-3 justify-between'>
            <div className='flex flex-row pl-2 gap-4'>
              <FaListUl size={24} />
              <h4 className='text-white'>Shift Details</h4>
            </div>
          </div>

          {/* shift name field  */}
          <div className='grid grid-cols-4 gap-4 mt-4 pb-6'>
            <div className='flex flex-col'>
              <label className='pb-2'>
                <span className='ml-8'>Shift Name</span>
                <span className='text-red-600'>*</span>
              </label>
              <input 
                type='text'
                className="ml-8 mr-20 rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black"
                name="name"
                value={formData.name}
                onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value}))}
              />
            </div>

            {/* shift start time field  */}
            <div className='flex flex-col'>
              <label className='pb-2'>
                <span className='ml-8'>Shift Start Time</span>
                <span className='text-red-600'>*</span>
              </label>
              <input 
                type='time'
                className="ml-8 mr-20 rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black"
                name="startTime"
                value={formData.startTime}
                onChange={(event) => setFormData((prev) => ({ ...prev, startTime: event.target.value}))}
              />
            </div>

            {/* shift end time field  */}
            <div className='flex flex-col'>
              <label className='pb-2'>
                <span className='ml-8'>Shift End Time</span>
                <span className='text-red-600'>*</span>
              </label>
              <input 
                type='time'
                className="ml-8 mr-20 rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black"
                name="endTime"
                value={formData.endTime}
                onChange={(event) => setFormData((prev) => ({ ...prev, endTime: event.target.value}))}
              />
            </div>
            

            {/* sfift duration  */}
            <div className='flex flex-col'>
              <label className='pb-2'>
                <span className='ml-8'>Shift Duration</span>
                <span className='text-red-600'>*</span>
              </label>
              
                <p className='ml-8 mr-20 rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black'>{duration}</p>
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className='ml-2 mr-2'>
          <div className='bgMainColor flex py-3 pl-1 gap-3 justify-between'>
            <div className='flex flex-row pl-2 gap-4'>
              <FaListUl size={24} />
              <h4 className='text-white'>Week Off Conditions</h4>
            </div>
          </div>
          <h2 className='ml-8 font-semibold text-xl pt-2'>Week-off :-</h2>
          <div className='grid grid-cols-4 gap-4 mt-4'>

            {/* week off field  */}
            <div className='flex flex-col'>
              <label className='pb-2'>
                <span className='ml-8'>Select Week-off</span>
              </label>
              <select
                className="ml-8 mr-20 rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black"
                name="weekOff"
                value={formData.weekOff}
                onChange={(event) => setFormData((prev) => ({ ...prev, weekOff: event.target.value}))}
              >
                {weekDayName.map((day, index) => (
                  <option key={index} value={day}>{day}</option>
                ))}
              </select>
            </div>

            {/* max Early allowed */}
            <div className='flex flex-col'>
              <label className='pb-2'>
                <span className='ml-8'>Max Early Allowed</span>
                <span className='text-red-600'>*</span>
              </label>
              <input 
                type='time'
                className="ml-8 mr-20 rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black"
                name="maxEarlyAllowed"
                value={formData.maxEarlyAllowed}
                onChange={(event) => setFormData((prev) => ({ ...prev, maxEarlyAllowed: event.target.value}))}
              />
            </div>

            {/* max late allowed field  */}
            <div className='flex flex-col'>
              <label className='pb-2'>
                <span className='ml-8'>Max Late Allowed</span>
                <span className='text-red-600'>*</span>
              </label>
              <input 
                type='time'
                className="ml-8 mr-20 rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black"
                name="maxLateAllowed"
                value={formData.maxLateAllowed}
                onChange={(event) => setFormData((prev) => ({ ...prev, maxLateAllowed: event.target.value}))}
              />
            </div>

            {/* night shift  */}
            <div className='bgMainColor w-full flex'>
              <label className="ml-3 inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isNightShift"
                  checked={formData.isNightShift}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600"></div>
              </label>
              <h5 className='ml-2 pt-4'>Night Shift</h5>
            </div>

            {/* mark as absent  */}
            <div>
                <label className='ml-6 pb-2'>
                  <span className=''>Mark As Absent</span>
                </label>
                <select 
                   name="markAsAbsent"
                   value={formData.markAsAbsent || ""}
                   onChange={(event) => setFormData((prev) => ({ ...prev, markAsAbsent: event.target.value}))}
                  className="w-full rounded-md border-2 py-2  ml-6 focus:outline-none focus:ring-2 focus:ring-black"
            
                >
                  <option >--Select Mark Absent--</option>
                  <option>AAA</option>
                  <option>L-WO-L</option>
                </select>
              </div>
          </div>
        </div>

        <div className='ml-7 mt-6'>
          <button type='submit' className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition-all">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShiftDetailsTable;




