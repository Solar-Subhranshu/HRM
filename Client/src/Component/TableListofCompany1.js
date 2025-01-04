import React from 'react';
import { RiEqualFill } from "react-icons/ri";
import { FaListUl } from "react-icons/fa";

function TableListofCompany1() {
  return (
    <div className='ml-2 mr-2'>
        <div className='bgMainColor flex  py-4 pl-1 gap-3'>
            {<FaListUl size={24} />}
            <h4 className='text-white'>List of Company</h4>
        </div>
        
        <div className='flex flex-col items-center w-full justify-center p-5'>
            <div className='flex items-center gap-4 mt-8'>
                <h4 className=' bgMainColor pl-5 pr-5 text-white font-semibold'>Department Name</h4>
                {<RiEqualFill className='' />}
                <input type='text'
                       className="border border-gray-300 rounded-md px-4 py-1 w-96"
                />
            </div>
            <div className='flex items-center gap-4 mt-20'>
                <h4 className='bgMainColor pl-11 pr-11 text-white font-semibold'>Designation</h4>
                {<RiEqualFill className='' />}
                <input type='text'
                       className="border border-gray-300 rounded-md px-4 py-1 w-96"
                />
            </div>
        </div>
        
        <div className='flex justify-center gap-12 mb-4 mt-6'>
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

export default TableListofCompany1