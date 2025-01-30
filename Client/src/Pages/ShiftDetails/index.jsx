import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaListUl } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function OfficePolicyTable() {
    const navigate = useNavigate();
    const [shiftDetails, setShiftDetails]=useState([]);
    const[selectedShiftId, setSelectedShiftId]=useState(null);

    const handleShiftDetailsClick = ()=>{
      navigate('/layout/shiftdetailstable')
    }
    
    const handleUpdateClick = ()=>{
      if(!selectedShiftId){
        alert("Please select an shift to update.");
        return;
      }
      const selectedShift = shiftDetails.find(shift => shift._id === selectedShiftId);

      Cookies.set('selectedShift', JSON.stringify(selectedShift));

      navigate('/layout/updateshiftdetails')
    }
    
    const handleCheckboxChange = (shiftId) => {
      setSelectedShiftId(shiftId);
    };

    const fetchShowShiftDetail = async()=>{
      try {

        const response=await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-shift`);
        setShiftDetails(response.data.data);
        console.log(shiftDetails);

      } catch (error) {
        alert('Unable to fetch data', error);
      }
    }

    useEffect(()=>{
      fetchShowShiftDetail();
    }, [])

  return (
    <div className='ml-2 mr-2 mt-4'>
        <div className='bgMainColor flex  py-4 pl-1 gap-3 justify-between'>
            <div className='flex flex-row pl-2 gap-4'>
                {<FaListUl size={24} />}
                <h4 className='text-white'>List of Shift</h4>
            </div>
        </div>

        <div className='p-4'>
            <table className='table-auto w-full border border-black '>
              <thead className='border border-black'>
                <th className='text-blue-600/100 border border-black w-20  '>Select</th>
                <th className='text-blue-600/100 border border-black '>Shift Name</th>
                <th className='text-blue-600/100 border border-black '>Start Time </th>
                <th className='text-blue-600/100 border border-black'>End Time</th>
                <th className='text-blue-600/100 border border-black'>Shift Hours</th>
                <th className='text-blue-600/100 border border-black '>Mark As Absent</th>
                <th className='text-blue-600/100 border border-black '>Night Shift</th>
                <th className='text-blue-600/100 border border-black'>Weakoff</th>
                <th className='text-blue-600/100 border border-black'>Max Early Allowed</th>
                <th className='text-blue-600/100 border border-black'>Max Late Allowed</th>
              </thead>
              <tbody>
                {shiftDetails?.map(({ _id, name, startTime, endTime, duration,markAsAbsent,isNightShift,weekOff,maxEarlyAllowed,maxLateAllowed }) => (
                  <tr key={_id}>
                    <td className='border-t border-gray-300 flex justify-center items-center align-middle h-8'>
                      <input 
                        type='checkbox' 
                        onChange={() => handleCheckboxChange(_id)} 
                      />
                    </td>
                    <td className='border border-black text-center'>{name}</td>
                    <td className='border border-black'>
                      {new Date(startTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </td>
                    <td className='border border-black'>
                      {new Date(endTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </td>
                    <td className='border border-black'>{duration}</td>
                    <td className='border border-black'>{markAsAbsent}</td>
                    <td className='border border-black'>{isNightShift ? 'True' : 'False'}</td>
                    <td className='border border-black'>{weekOff}</td>
                    <td className='border border-black'>
                      {new Date(maxEarlyAllowed).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </td>
                    <td className='border border-black'>
                      {new Date(maxLateAllowed).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </td>
                    </tr>
                ))}
              </tbody>
            </table>
        </div>

        <div className='flex justify-center gap-6 mb-4 mt-4'>
          <div>
            <button onClick={handleShiftDetailsClick } className='px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all' >Add</button>
          </div>
          <div>
            <button onClick={handleUpdateClick} className='px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all' >Up Date</button>
          </div>
          <div>
            <button className='px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md  hover:bg-red-700 transition-all' >Delete</button>
          </div>
          <div>
             <button className='px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md  hover:bg-red-700 transition-all'>Close</button>
          </div>
        </div>
    </div>
  )
}

export default OfficePolicyTable                        



