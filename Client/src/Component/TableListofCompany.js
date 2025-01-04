import React, { useState } from 'react';
import { RiEqualFill } from "react-icons/ri";
import { FaListUl } from "react-icons/fa";

function TableListofCompany() {
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');

  const handlePincodeChange = (e) => {
    const value = e.target.value;

    // Check if the value is numeric or empty
    if (/^\d*$/.test(value)) {
        setPincode(value);  
        setError('');
    } else {
        setError('Pincode must be a numeric value.');
    }
};

// this is additional if validation 
// const validatedPincode=()=>{
//     if(pincode.trim()===' '){
//       setError('pin code are required ');
//       return  false;
//     }else if(pincode.length !==6){
//       setError('pin code must six digit');
//       return false;
//     }
//     setError('');
//     return true;
// }

// const handleSaveData =()=>{
//   if(validatedPincode()){
//     alert('pin code is valid');
//   }
// }

  return (
    <div className='ml-2 mr-2'>
        <div className='bgMainColor flex  py-4 pl-1 gap-3'>
            {<FaListUl size={24} />}
            <h4 className='text-white'>List of Company</h4>
        </div>
        
        <div className='flex flex-col items-center w-full justify-center p-5'>
            <div className='flex items-center gap-4 mt-8'>
                <h4 className=' bgMainColor pl-5 pr-5 text-white font-semibold'>Company Name</h4>
                {<RiEqualFill className='' />}
                <input type='text'
                       className="border border-gray-300 rounded-md px-4 py-1 w-96"
                />
            </div>
            <div className='flex items-center gap-4 mt-5'>
                <h4 className='bgMainColor pl-7 pr-7 text-white font-semibold'>Branch Name</h4>
                {<RiEqualFill className='' />}
                <input type='text'
                       className="border border-gray-300 rounded-md px-4 py-1 w-96"
                />
            </div>
            <div className='flex items-center gap-4 mt-5'>
                <h4 className='bgMainColor pl-12 pr-12 text-white font-semibold'>Address</h4>
                {<RiEqualFill className='' />}
                <input type='text'
                       className="border border-gray-300 rounded-md  px-4 py-1 w-96"
                />
            </div>
            <div className='flex items-center gap-4 mt-5'>
                <h4 className='bgMainColor pl-12 pr-12 text-white'>Pin-Code</h4>
                {<RiEqualFill className='' />}
                <input type='text'
                  value={pincode}
                  onChange={handlePincodeChange}
                  className="border border-gray-300 rounded-md px-4 py-1 w-96"
                />
            </div>
            {error && <span className="text-red-500 text-sm mt-2">{error}</span>}
        </div>
        
        <div className='flex justify-center gap-12 mb-4 mt-4'>
          <div>
            <button className='px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all' >Save</button>
          </div>
          <div>
            <button className='px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md  hover:bg-red-700 transition-all' >Cancel</button>
          </div>
        </div>
    </div>
  )
}

export default TableListofCompany