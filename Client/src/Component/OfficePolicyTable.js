import React from 'react'
import { FaListUl } from "react-icons/fa6";
import { IoIosCheckboxOutline } from "react-icons/io";

function OfficePolicyTable() {
  return (
    <div className='ml-2 mr-2'>
        <div className='bgMainColor flex  py-4 pl-1 gap-3 justify-between'>
            <div className='flex flex-row pl-2 gap-4'>
                {<FaListUl size={24} />}
                <h4 className='text-white'>List of Office Policies</h4>
            </div>
        </div>

        <div className='p-4'>
            <table className='table-auto w-full border border-black '>
              <thead className='border border-black'>
                <th className='text-blue-600/100 border border-black w-20  '>Select</th>
                <th className='text-blue-600/100 border border-black '>Policy Name</th>
                <th className='text-blue-600/100 border border-black '>Late Allow</th>
                <th className='text-blue-600/100 border border-black'>P hrs</th>
              </thead>
              <tbody >
                <tr>
                    <td className='border-t border-gray-300 flex justify-center items-center align-middle h-8'><input type='checkbox'/></td>
                    <td className='border border-black'>Galo Solar</td>
                    <td className='border border-black'>Phase 1</td>
                    <td className='border border-black'>9 hrs </td>
                </tr>
              </tbody>
            </table>
        </div>

        <div className='flex justify-center gap-6 mb-4 mt-4'>
          <div>
            <button className='px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all' >Add</button>
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