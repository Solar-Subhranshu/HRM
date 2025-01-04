import React from 'react'
import { FaListUl } from "react-icons/fa6";
import { IoIosCheckboxOutline } from "react-icons/io";

function TableListCompany() {
  return (
    <div className='ml-2 mr-2'>
        <div className='bgMainColor flex  py-4 pl-1 gap-3'>
            {<FaListUl size={24} />}
            <h4 className='text-white'>List of Company</h4>
        </div>
        <div className=''>
            <table className='table-auto w-full border border-black '>
              <thead className='border border-black'>
                <th className='text-blue-600/100 border border-black w-20  '>select</th>
                <th className='text-blue-600/100 border border-black '>Company</th>
                <th className='text-blue-600/100 border border-black'>Branch</th>
                <th className='text-blue-600/100 border border-black'>Address</th>
              </thead>
              <tbody >
                <tr>
                    <td className='border border-black'>{<IoIosCheckboxOutline />}</td>
                    <td className='border border-black'>Galo Solar</td>
                    <td className='border border-black'>Phase 1</td>
                    <td className='border border-black'>Govindpuri Okhla Phase I </td>
                </tr>
              </tbody>
            </table>
        </div>
        <div className='flex justify-center gap-6 mb-4 mt-4'>
          <div>
            <button className='px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all' >Add</button>
          </div>
          <div>
            <button className='px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md  hover:bg-red-700 transition-all' >Updata</button>
          </div>
          <div>
             <button className='px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md  hover:bg-red-700 transition-all'>Clear</button>
          </div>
        </div>
    </div>
  )
}

export default TableListCompany