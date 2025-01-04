import React, { useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { HiDesktopComputer } from "react-icons/hi";
import { FaFile } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";

function Navbars() {
  const [isDropdownOpen, setIsDropdownOpen] = useState([false, false, false, false, false ]);

  return (
    <div className="shadow-md shadow-gray-400">
      <nav className="bg-white py-2">
        <div className="flex justify-start gap-9 text-center">
          
          {/* Dashboard */}
          <div className="ml-5">
            <button className="text-red-600 text-2xl">
              <MdDashboard />
            </button>
            <div className="text-red-600 text-sm"><span>Dashboard</span></div>
          </div>
          
          {/* Device Setup */}
          <div className='relative cursor-pointer'
                onClick={() => setIsDropdownOpen((prev) => {
                  const tempData = [ ...prev ];
                  for(let index = 0; index < tempData.length; index++){
                    if(index === 0) continue;
                    tempData[index] = false;
                  }
                  tempData[0] = !tempData[0];
                  console.log("Clicked ",tempData);
                  return tempData; 
                })}
            >
            <button className="text-2xl text-red-600">
              <HiDesktopComputer />
            </button>
            <div className='text-red-600'><span>Device Setup</span></div>
            {isDropdownOpen[0] &&(
               <div className="absolute text-left left-0 bg-white text-black shadow-lg rounded-sm z-10 inline-block ">
               <ul className="">
                 <li className="hover:bg-gray-200 py-1 px-2 rounded border-b-2" >
                   <a href="#" className="whitespace-nowrap  ">Add Edit Machine</a>
                 </li>
                 <li className="hover:bg-gray-200 py-1 px-2 rounded">
                   <a href="#" className="whitespace-nowrap  " >Hardware Setup</a>
                 </li>
               </ul>
             </div>
            ) }
          </div>

          {/* File with Dropdown */}
          <div className="relative cursor-pointer" 
                  onClick={() => setIsDropdownOpen((prev) => {
                    const tempData = [ ...prev ];
                    for(let index = 0; index < tempData.length; index++){
                      if(index === 1) continue;
                      tempData[index] = false;
                    }
                    tempData[1] = !tempData[1];
                    return tempData; 
                  })}
          >
            <button className="text-red-600 text-2xl" >
              <FaFile />
            </button>
            <div className="text-red-600"><span>File</span></div>
            {isDropdownOpen[1] && (
              <div className="absolute text-left left-0 bg-white text-black shadow-lg rounded-sm z-10 inline-block ">
                <ul className="">
                  <li className="hover:bg-gray-200 py-1 px-2 rounded border-b-2" >
                    <a href="#">Company</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded">
                    <a href="#" >Branch</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded">
                    <a href="#">Department</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded ">
                    <a href="#"  className="whitespace-nowrap">Office Time Policy</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded">
                    <a href="#">Shift Details</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded">
                    <a href="#">Employee List</a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Report */}
          <div className='relative cursor-pointer' 
                onClick={() => setIsDropdownOpen((prev) => {
                  const tempData = [ ...prev ];
                  for(let index = 0; index < tempData.length; index++){
                    if(index === 2) continue;
                    tempData[index] = false;
                  }
                  tempData[2] = !tempData[2];
                  return tempData; 
                })}
          >
            <button className="text-red-600 text-2xl " >
              <LuCalendarDays />
            </button>
            <div className='text-red-600'><span>Report</span></div>
            {isDropdownOpen[2] && (
              <div className="absolute text-left left-0 bg-white text-black shadow-lg rounded-sm z-10 inline-block ">
                <ul className="">
                  <li className="hover:bg-gray-200 py-1 px-2 rounded border-b-2" >
                    <a href="#">Daily Update</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded">
                    <a href="#" >Daily Present</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded">
                    <a href="#">Monthly Report</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded ">
                    <a href="#"  className="whitespace-nowrap">Performence Report</a>
                  </li>
                  
                </ul>
              </div>
            )}
          </div>

          {/* Payroll */}
          <div className='relative cursor-pointer'
                onClick={() => setIsDropdownOpen((prev) => {
                  const tempData = [ ...prev ];
                  for(let index = 0; index < tempData.length; index++){
                    if(index === 3) continue;
                    tempData[index] = false;
                  }
                  tempData[3] = !tempData[3];
                  return tempData; 
                })} 
          >
            <button className="text-red-600 text-2xl">
              <FaRegMoneyBillAlt />
            </button>
            <div className="text-red-600"><span>PayRoll</span></div>
            {isDropdownOpen[3] &&(
               <div className="absolute text-left left-0 bg-white text-black shadow-lg rounded-sm z-10 inline-block ">
               <ul className="">
                 <li className="hover:bg-gray-200 py-1 px-2 rounded border-b-2" >
                   <a href="#" className="whitespace-nowrap">Pay Setup</a>
                 </li>
                 <li className="hover:bg-gray-200 py-1 px-2 rounded">
                   <a href="#" className="whitespace-nowrap">Monthly Pay Process</a>
                 </li>
                 <li className="hover:bg-gray-200 py-1 px-2 rounded">
                   <a href="#" className="whitespace-nowrap">Salary Report</a>
                 </li>
               </ul>
             </div>
            ) }
          </div>

          {/* Admin */}
          <div className='relative cursor-pointer' 
               onClick={() => setIsDropdownOpen((prev) => {
                const tempData = [ ...prev ];
                for(let index = 0; index < tempData.length; index++){
                  if(index === 4) continue;
                  tempData[index] = false;
                }
                tempData[4] = !tempData[4];
                return tempData; 
              })}
          >
            <button className="text-red-600 text-2xl">
              <RiAdminLine />
            </button>
            <div className="text-red-600 text-lg"><span>Admin</span></div>
            {isDropdownOpen[4] &&(
               <div className="absolute text-left left-0 bg-white text-black shadow-lg rounded-sm z-10 inline-block ">
               <ul className="">
                 <li className="hover:bg-gray-200 py-1 px-2 rounded border-b-2" >
                   <a href="#" className="whitespace-nowrap">User Manager</a>
                 </li>
                 <li className="hover:bg-gray-200 py-1 px-2 rounded">
                   <a href="#" className="whitespace-nowrap">Change Password</a>
                 </li>
               </ul>
             </div>
            ) }
          </div>

        </div>
      </nav>
    </div>
  );
}

export default Navbars;  




