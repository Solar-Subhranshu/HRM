import React from 'react';
import { IoSearchOutline } from "react-icons/io5";

function ManualPunch() {
  return (
    <>
      <div className="h-screen w-screen p-4">
      <fieldset className='border-4  rounded-md mb-4 h-full' style={{ borderColor: '#740FD6'}}>
        <legend className='font-bold text-lg ml-8' style={{color : '#740FD6'}}>&nbsp;&nbsp; Manual Punch &nbsp;&nbsp;</legend>
        <div className="flex h-full">
          {/* First Column */}

          <div className="w-64 border-r border-black p-4">
            <h3 className="font-semibold text-lg">Selection By</h3>
            <div className="mt-4">

              <div className="flex items-center mb-2">
                <input type="radio" className="mr-2" />
                <label>All Employee</label>
              </div>

              <div className="flex items-center">
                <input type="radio"  className="mr-2" />
                <label >Few Employee</label>
              </div>

              <hr className="my-4" />
              
              {/* search bar  */}
              <div className="relative mt-4">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <IoSearchOutline />
                    </span>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded-md border-2 py-1 px-10 focus:outline-none focus:ring-2 focus:ring-black"
                    />
               </div>

            </div>
          </div>

          {/* Second Column */}
          <div className=" p-4 w-full">
            {/* Manual Punch Entry */}
            <form>
                <fieldset className='border-2  rounded-md mb-4' style={{ borderColor: '#740FD6'}}>
                   <legend className='font-semibold text-lg ml-8' style={{color : '#740FD6'}}>&nbsp;&nbsp; Manual Punch Entry &nbsp;&nbsp;</legend>
                    <div className='grid gap-6 m-6 md:grid-cols-3'>
                    {/* account number field  */}
                    <div>
                        <label>
                        <span>Date</span>
                        </label>
                        <input 
                            type='date' 
                            className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    
                    {/* confirm account number field  */}
                    <div>
                        <label>
                        <span>In Time</span>
                        </label>
                        <input 
                            type='time' 
                            className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    
                    {/* Out time field   */}
                    <div>
                        <label>
                        <span>Out Time</span>
                        </label>
                        <input 
                            type='time' 
                            className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
            
                    </div>
                    <div className='text-right mt-4 pr-4 pb-2'>
                        <button  type='submit' className="  px-4 py-2 text-white font-semibold rounded-md shadow-md bg-green-600 hover:bg-green-800 transition-all">
                        Insert Punch
                        </button>
                    </div>
                </fieldset>
            </form>
            

            {/* View Punch */}
            <fieldset className='border-2  rounded-md mb-4' style={{ borderColor: '#740FD6'}}>
              <legend className='font-semibold text-lg ml-8' style={{color : '#740FD6'}}>&nbsp;&nbsp; View Punch &nbsp;&nbsp;</legend>
              <div className="px-4 pb-2">
                <div className='grid gap-6 mb-6 md:grid-cols-3'>
                    {/* from data field  */}
                    <div>
                        <label>
                        <span>From Date</span>
                        </label>
                        <input 
                            type='date' 
                            className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    
                    {/* to date field    */}
                    <div>
                        <label>
                        <span>To Date</span>
                        </label>
                        <input 
                            type='date' 
                            className="w-full rounded-md border-2 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    
                    <div className="flex justify-end gap-4 mt-4">
                        <button 
                            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-800 transition-all"
                        >
                            View Punch
                        </button>
                        <button 
                            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-800 transition-all"
                        >
                            Delete
                        </button>
                    </div>
            
                </div>
                

                <table className="border-collapse border border-black text-center rounded w-full">
                  <thead>
                    <tr>
                      <th className="border border-black w-20">Select</th>
                      <th className="border border-black">Emp. Code</th>
                      <th className="border border-black">Department</th>
                      <th className="border border-black">Punch DateTime</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-black">
                        <input type="checkbox" />
                      </td>
                      <td className="border border-black">430</td>
                      <td className="border border-black">Infra Team</td>
                      <td className="border border-black">Jan 7 2025</td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </fieldset>
          </div>

        </div>
      </fieldset>
    </div>
    </>
  );
}

export default ManualPunch;

