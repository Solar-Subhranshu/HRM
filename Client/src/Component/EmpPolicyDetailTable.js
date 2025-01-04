import React from 'react';
import { useState } from 'react';
import { FaListUl } from "react-icons/fa6";
import { IoIosCheckboxOutline } from "react-icons/io";
import TimeSelector from './TimeSelector';
import { IoIosTimer } from "react-icons/io";

const EmpPolicyDetailTable =()=> {
    const [ deductDayValues, setDeductDayValues ] = useState([0,10,20,30,40,50,60,70,80,90,100]);
  return (
    <div className='flex flex-col justify-between gap-8'>
        
        {/* first section  */}
        <div className='ml-2 mr-2'>
        <div className='bgMainColor flex  py-3 pl-1 gap-3 justify-between'>
            <div className='flex flex-row pl-2 gap-4'>
                {<FaListUl size={24} />}
                <h4 className='text-white'>Employee Policy details</h4>
            </div>
        </div>

        <div className='grid grid-cols-3 gap-4 mt-4'>
            <div className='flex flex-col'>
                <label className='pb-2'>
                    <span className='ml-8'>Policy Name</span>
                    <span className='text-red-600'>*</span>
                </label>
                <select className="ml-8 mr-20 rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black">
                    <option>Policy-1</option>
                </select>
            </div>

            <div className='flex flex-col'>

                <label className='pb-2'>
                    <span className='pl-8'>Permitted Late Arrival</span>
                    <span className='text-red-600'>*</span>
                </label>
                
                <div className='ml-8  mr-20 flex justify-between items-center rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black'>
                   {<TimeSelector/>}
                   {<IoIosTimer size={24} />}
                </div>
            </div>

            <div className='flex flex-col'>
                <label className='pb-2'>
                    <span className='pl-8'>Mark As Half Day If Working Hour Less Than</span>
                </label>
                <div className='ml-8  mr-20 flex justify-between items-center rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black'>
                   {<TimeSelector/>}
                   {<IoIosTimer size={24} />}
                </div>
            </div>
        </div>

        </div>
         
         {/* second section  */}
        <div className='ml-2 mr-2'>
            <div className='bgMainColor flex  py-3 pl-1 gap-3 justify-between'>
            <div className='flex flex-row pl-2 gap-4'>
                {<FaListUl size={24} />}
                <h4 className='text-white'>Late Coming Rule</h4>
            </div>
            </div>

            <div className='grid grid-cols-4 gap-4 mt-4'>
            <div className='flex flex-col'>
                <div className='flex flex-col'>
                    <span className='ml-8'>Late 1 :</span>
                    <span className='ml-8 pb-2'>Late Arrival</span>
                </div>
                <div className='ml-8  mr-20 flex justify-between items-center rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black'>
                   {<TimeSelector/>}
                   {<IoIosTimer size={24} />}
                </div>
            </div>

            <div className='flex flex-col'>

                <div className='flex flex-col'>
                    <span className='ml-8'>Late 2 :</span>
                    <span className='ml-8 pb-2'>Late Arrival</span>
                </div>
                <div className='ml-8  mr-20 flex justify-between items-center rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black'>
                   {<TimeSelector/>}
                   {<IoIosTimer size={24} />}
                </div>
            </div>

            <div className='flex flex-col'>
                <div className='flex flex-col'>
                    <span className='ml-8'>Late 3 :</span>
                    <span className='ml-8 pb-2'>Late Arrival</span>
                </div>
                <div className='ml-8  mr-20 flex justify-between items-center rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black'>
                   {<TimeSelector/>}
                   {<IoIosTimer size={24} />}
                </div>
            </div>

            <div className='flex flex-col'>
                <div className='flex flex-col '>
                    <span className='ml-8'>Late 4 :</span>
                    <span className='ml-8 pb-2'>Late Arrival</span>
                </div>
                <div className='ml-8  mr-20 flex justify-between items-center rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black'>
                   {<TimeSelector/>}
                   {<IoIosTimer size={24} />}
                </div>
            </div>
            
            <div className='flex flex-col'>
                <div className=''>
                    <span className='ml-8'>Deduct Day(%)</span>
                </div> 
                <select className='ml-8  mr-20 flex justify-between items-center rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black'>
                    {deductDayValues.map((per, index) => (
                        <option key={index}>{per}</option>
                    ))}
                </select>
            </div>

            <div className='flex flex-col'>
                <div className=''>
                    <span className='ml-8'>Deduct Day(%)</span>
                </div> 
                <select className='ml-8  mr-20 flex justify-between items-center rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black'>
                    {deductDayValues.map((per, index) => (
                        <option key={index}>{per}</option>
                    ))}
                </select>
            </div>

            <div className='flex flex-col'>
                <div className=''>
                    <span className='ml-8'>Deduct Day(%)</span>
                </div> 
                <select className='ml-8  mr-20 flex justify-between items-center rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black'>
                    {deductDayValues.map((per, index) => (
                        <option key={index}>{per}</option>
                    ))}
                </select>
            </div>

            <div className='flex flex-col'>
                <div className=''>
                    <span className='ml-8'>Deduct Day(%)</span>
                </div> 
                <select className='ml-8  mr-20 flex justify-between items-center rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black'>
                    {deductDayValues.map((per, index) => (
                        <option key={index}>{per}</option>
                    ))}
                </select>
            </div>
            
            </div>

        </div>

        {/* third section  */}
        <div className='ml-2 mr-2'>
            <div className='bgMainColor flex  py-3 pl-1 gap-3 justify-between'>
                <div className='flex flex-row pl-2 gap-4'>
                    {<FaListUl size={24} />}
                    <h4 className='text-white'>Other Employee Policy details</h4>
                </div>
            </div>
            <div className='flex w-full justify-between pt-4'>
                <div className=''>
                    <div className='flex flex-col'>
                        <label className='pb-2'>
                            <span className='ml-8'>Required Punches In Day</span>
                            <span className='text-red-600'>*</span>
                        </label>
                        <select className="ml-8 rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black">
                            <option>Policy-1</option>
                       </select>
                    </div>
                </div>
           
            <div>
                <div className='bgMainColor py-2  w-full flex'>
                    <label className="ml-3 inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer"/>
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                    <h5 className='ml-2 pr-1'>Enable Late Comming Setting</h5>
                </div>

                <div>
                    <div>
                       <input type="radio"/>
                       <label>Deduct From Attendance</label>
                    </div>
                    <div>
                        <input type="radio"/>
                        <label>Deduct From Attendance</label>
                    </div>
                </div>
            </div>

                <div className='flex flex-col'>
                    <label className='pb-2'>
                        <span className='ml-8'>No. Of Late In A Month</span>
                        <span className='text-red-600'>*</span>
                    </label>
                    <select className="ml-8 rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black">
                        <option>Policy-1</option>
                    </select>
                </div>
            
                <div className='flex flex-col'>
                    <label className='pb-2'>
                        <span className=''>Cut Day</span>
                        <span className='text-red-600'>*</span>
                    </label>
                    <select className="rounded-md border-2 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black">
                        <option>Policy-1</option>
                    </select>
               </div>
             
                <div>
                    <div>
                        <input type="radio"/>
                        <label>Continue</label>
                    </div>
                    <div>
                        <input type="radio"/>
                        <label>Discontinue</label>
                    </div>
                </div>
            </div>

        </div>

        <div className='ml-7 mt-6'>
            <button  type='submit' className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition-all">
              Register
            </button>
        </div>

    </div>
  )
}

export default EmpPolicyDetailTable