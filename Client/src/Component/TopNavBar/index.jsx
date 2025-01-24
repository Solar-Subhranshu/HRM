import React, { useState } from 'react';
import Dash from '../../Assets/Images/dash.png';
import Setting from '../../Assets/Images/setting.png';
import File from '../../Assets/Images/file.png';
import Report from '../../Assets/Images/report.png';
import Payroll from '../../Assets/Images/payroll.png';
import Admin from '../../Assets/Images/admin.png';
import { useNavigate } from 'react-router-dom';



function Navbars() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState([false, false, false, false, false ]);
  
  const handleDepartmentClick = () => {
    navigate('/layout/departmenttable');
  };

  const handleCompanybranchClick = ()=>{
    navigate('/layout/companybranchtable');
  }

  const handleEmployeeListClick= ()=>{
    navigate('/layout/listofallemployee');
  }

  const handleTest = ()=>{
    navigate('/layout/testpage')
  }

  
  const handleOfficeTimePolicyClick= ()=>{
    navigate('/layout/officetimepolicytable')
  }
  
  const handleShiftDetailsClick = ()=>{
    navigate('/layout/shiftdetails')
  }

  const handleShowDashboardClick = ()=>{
    navigate('/layout/dashboard')
  }

  const handleEmployeeRegister = ()=>{
    navigate('/layout/Registrationform')
  }

  const handleManualPunchClick = ()=>{
    navigate('/layout/manualpunch')
  }
  
  const handleDailyUpdateClick = ()=>{
    navigate('/layout/dailyreportcomponent')
  }

  
  
  return (
    <div className="shadow-md shadow-gray-400">
      <nav className="bg-white py-2 bgMainColor">
        <div className="ml-5 flex justify-start gap-9 text-center">
          
          {/* Dashboard */}
          <div className="flex flex-col justify-center items-center gap-1">
            <button onClick={handleShowDashboardClick}>
              <img src={Dash} alt='dash' width='31.5rem' />
            </button>
            <div className="text-white text-sm"><span>Dashboard</span></div>
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
                <div className='flex flex-col justify-center items-center gap-1'>
                    <button className="text-red-600">
                        <img src={Setting} alt='setting' width='32rem' />
                    </button>
                    <div className='text-sm text-white'>
                        <span>Device Setup</span>
                    </div>
                </div>

            {isDropdownOpen[0] &&(
               <div className="absolute text-left left-0 bg-white text-black shadow-lg rounded-sm z-10 inline-block">
                <ul className="">
                    <li className="hover:bg-gray-200 py-1 px-2 rounded border-b-2" >
                    <a href="#" className="whitespace-nowrap  ">Add Edit Machine</a>
                    </li>
                    <li className="hover:bg-gray-200 py-1 px-2 rounded">
                    <a href="#"  className="whitespace-nowrap  " >Hardware Setup</a>
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
            <div className='flex flex-col justify-center items-center gap-1'>
                <button>
                    <img src={File} alt='file' width='31.8rem' />
                </button>
                <div className="text-sm text-white"><span>File</span></div>
            </div>
            {isDropdownOpen[1] && (
              <div className="absolute text-left left-0 bg-white text-black shadow-lg rounded-sm z-10 inline-block ">
                <ul className="">
                  <li className="hover:bg-gray-200 py-1 px-2 rounded border-b-2" >
                    <a href="#" onClick={handleCompanybranchClick}>Company</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded">
                    <a href="#" >Branch</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded">
                    <a href="#" onClick={handleDepartmentClick}>Department</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded ">
                    <a href="#" onClick={handleOfficeTimePolicyClick}  className="whitespace-nowrap">Office Time Policy</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded">
                    <a href="#"  onClick={handleShiftDetailsClick}>Shift Details</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded">
                    <a href="#" onClick={handleEmployeeListClick}>Employee List</a>
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
            <div className='flex flex-col justify-center items-center gap-1'>    
                <button>
                    <img src={Report} alt='setting' width='33rem' />
                </button>
                <div className='text-sm text-white'>
                    <span>Report</span>
                </div>
            </div>
            {isDropdownOpen[2] && (
              <div className="absolute text-left left-0 bg-white text-black shadow-lg rounded-sm z-10 inline-block ">
                <ul className="">
                  <li className="hover:bg-gray-200 py-1 px-2 rounded border-b-2" >
                    <a href="" onClick={handleDailyUpdateClick}>Daily Update</a>
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
            <div className='flex flex-col justify-center items-center gap-1'>    
                <button>
                    <img src={Payroll} alt='payroll' width='43.25rem' />
                </button>
                <div className="text-sm text-white"><span>PayRoll</span></div>
            </div>
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
            <div className='flex flex-col justify-center items-center gap-1'>
                <button>
                    <img src={Admin} alt='setting' width='30.5rem' />
                </button>
                <div className="text-sm text-white">
                    <span>Admin</span>
                </div>
            </div>
            {isDropdownOpen[4] &&(
               <div className="absolute text-left left-0 bg-white text-black shadow-lg rounded-sm z-10 inline-block ">
               <ul className="">
                 <li  className="hover:bg-gray-200 py-1 px-2 rounded border-b-2" >
                   <a onClick={handleManualPunchClick} href="" className="whitespace-nowrap">User Manager</a>
                 </li>
                 <li className="hover:bg-gray-200 py-1 px-2 rounded">
                   <a href="#" onClick={handleTest} className="whitespace-nowrap">Change Password</a>
                 </li>
               </ul>
             </div>
            ) }
          </div>
          
          <div className='ml-auto'>
            <button onClick={handleEmployeeRegister} className='py-2 px-4 mt-1 mr-2 bg-red-500 text-white rounded-lg hover:bg-red-700'>
              Employee Register
            </button>
          </div>

        </div>
      </nav>
        
        
    </div>
  );
}

export default Navbars;