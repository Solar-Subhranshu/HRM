import React, { useState, useEffect, useRef } from 'react';
import Dash from '../../Assets/Images/dash.png';
import Setting from '../../Assets/Images/setting.png';
import File from '../../Assets/Images/file.png';
import Report from '../../Assets/Images/report.png';
import Payroll from '../../Assets/Images/payroll.png';
import Admin from '../../Assets/Images/admin.png';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

function Navbars() {

  const navigate = useNavigate();
 
  const [isDropdownOpen, setIsDropdownOpen] = useState([false, false, false, false, false ]);
  const dropdownRef = useRef(null);
  const handleDropdownToggle = (index) => {
    setIsDropdownOpen((prev) => {
      const newDropdownState = prev.map((state, i) => (i === index ? !state : false));
      return newDropdownState;
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen([false, false, false, false, false]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
 
  // logout part 
  const handleLogout = async () => {
    console.log("Logging out...");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/auth/logout`,
        {}, // No request body required unless specified by your API
        {
          withCredentials: true, // Ensures cookies are sent if needed
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Axios automatically parses JSON, so no need for .json()
      if (response.data.success) {
        console.log(response.data.message); // "User Logged Out"

        // Show red toast notification
        toast.error("Logout Successful!", {
          position: "top-right",
          autoClose: 2000,
          progressStyle: { backgroundColor: "red" },  // Custom red styling
        });

        // Remove token if using token-based authentication
        localStorage.removeItem("token");

        // Redirect to login page
        // navigate("/");

        setTimeout(() => navigate("/"), 2000);
      } else {
        console.error("Logout failed:", response.data.message);
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Error during logout");
    }
  };
  

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
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

  const handleApproveFormClick = ()=>{
    navigate('/layout/showJoiningData')
  }

  const handleManthlyJoiningClick = ()=>{
    navigate('/layout/monthlyJoiningReport')
  }

  const handleManthlyResignationClick = ()=>{
    navigate('/layout/monthlyResignationReport')
  }

  const handleJoiningPdfClick = ()=>{
    navigate('/layout/JoiningPdf')
  }

  const handleDegreeClick = ()=>{
    navigate('/layout/degree')
  }
  
  
  return (
    <div className="shadow-md shadow-gray-400" ref={dropdownRef}>
      <nav className="bg-white py-2 bgMainColor">
        <div className="ml-5 flex justify-start gap-9 text-center">
          
          {/* Dashboard */}
          <div className="flex flex-col justify-center items-center gap-1  " >
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
            <div className='flex flex-col justify-center items-center gap-1' >
                <button className="text-red-600">
                    <img src={Setting} alt='setting' width='32rem' />
                </button>
                <div className='text-sm text-white'>
                    <span>Device Setup</span>
                </div>
            </div>

            {isDropdownOpen[0] &&(
               <div className="absolute text-left left-0 bg-white text-black shadow-lg rounded-sm z-10 inline-block"  >
                <ul className="">
                    <li className="hover:bg-gray-200 py-1 px-2 rounded border-b-2" >
                    <a href="#" className="whitespace-nowrap text-sm ">Add Edit Machine</a>
                    </li>
                    <li className="hover:bg-gray-200 py-1 px-2 rounded">
                    <a href="#"  className="whitespace-nowrap  text-sm" >Hardware Setup</a>
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
                  <li className="hover:bg-gray-200 py-1 px-2 rounded border-b-2  text-sm " >
                    <a href="#" onClick={handleCompanybranchClick}  >Company</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded  text-sm ">
                    <a href="#" onClick={handleDegreeClick} >Degree</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded  text-sm ">
                    <a href="#" onClick={handleDepartmentClick}>Department</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded  text-sm ">
                    <a href="#" onClick={handleOfficeTimePolicyClick}  className="whitespace-nowrap">Office Time Policy</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded  text-sm ">
                    <a href="#"  onClick={handleShiftDetailsClick} >Shift Details</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded  text-sm ">
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
                  <li className="hover:bg-gray-200 py-1 px-2 rounded border-b-2  text-sm " >
                    <a href="" onClick={handleDailyUpdateClick}>Daily Update</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded  text-sm ">
                    <a href="#" onClick={handleManthlyJoiningClick} >Monthly Joining Report</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded  text-sm whitespace-nowrap">
                    <a href="#" onClick={handleManthlyResignationClick} >Monthly Resignation Report</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded  text-sm ">
                    <a href="#">Monthly Report</a>
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 rounded  text-sm ">
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
                 <li className="hover:bg-gray-200 py-1 px-2 rounded border-b-2  text-sm " >
                   <a href="#" className="whitespace-nowrap">Pay Setup</a>
                 </li>
                 <li className="hover:bg-gray-200 py-1 px-2 rounded  text-sm ">
                   <a href="#" className="whitespace-nowrap">Monthly Pay Process</a>
                 </li>
                 <li className="hover:bg-gray-200 py-1 px-2 rounded  text-sm ">
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
                 <li  className="hover:bg-gray-200 py-1 px-2 rounded border-b-2  text-sm " >
                   <a onClick={handleManualPunchClick} href="" className="whitespace-nowrap">User Manager</a>
                 </li>
                 <li className="hover:bg-gray-200 py-1 px-2 rounded  text-sm ">
                   <a href="#" onClick={handleTest} className="whitespace-nowrap">Change Password</a>
                 </li>
                 <li className="hover:bg-gray-200 py-1 px-2 rounded  text-sm ">
                   <a href="#" onClick={handleApproveFormClick} className="whitespace-nowrap">Approve Form</a>
                 </li>
                 <li className="hover:bg-gray-200 py-1 px-2 rounded  text-sm ">
                   <a href="#" onClick={handleJoiningPdfClick} className="whitespace-nowrap">Joining Pdf</a>
                 </li>
               </ul>
             </div>
            ) }
          </div>

          {/* employee Register */}
          <div className="flex flex-col justify-center items-center gap-1  " onClick={handleEmployeeRegister} >
            <button >         
              {<FaUserGraduate size={28} />}
            </button>
            <div className="text-white text-sm"><span>Employee Register</span></div>
          </div>
          
          {/* logout section  */}
          <div className='ml-auto mt-3 mr-4 text-white' onClick={handleLogout}>
            {<RiLogoutCircleRLine size={28}/>}
          </div>
          
          
        </div>
      </nav>
         
    </div>
  );
}

export default Navbars;


// import React, { useState, useEffect, useRef } from 'react';
// import Dash from '../../Assets/Images/dash.png';
// import Setting from '../../Assets/Images/setting.png';
// import File from '../../Assets/Images/file.png';
// import Report from '../../Assets/Images/report.png';
// import Payroll from '../../Assets/Images/payroll.png';
// import Admin from '../../Assets/Images/admin.png';
// import { useNavigate } from 'react-router-dom';
// import { FaUserGraduate } from "react-icons/fa";
// import { RiLogoutCircleRLine } from "react-icons/ri";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from 'axios';

// function Navbars() {
//   const navigate = useNavigate();
//   const [isDropdownOpen, setIsDropdownOpen] = useState([false, false, false, false, false]);
//   const dropdownRef = useRef(null);

//   const handleDropdownToggle = (index) => {
//     setIsDropdownOpen((prev) => {
//       const newDropdownState = prev.map((state, i) => (i === index ? !state : false));
//       return newDropdownState;
//     });
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen([false, false, false, false, false]);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_SERVER_ADDRESS}/auth/logout`,
//         {},
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.success) {
//         toast.error("Logout Successful!", {
//           position: "top-right",
//           autoClose: 2000,
//           progressStyle: { backgroundColor: "red" },
//         });

//         localStorage.removeItem("token");
//         setTimeout(() => navigate("/"), 2000);
//       } else {
//         alert("Logout failed");
//       }
//     } catch (error) {
//       alert("Error during logout");
//     }
//   };

//   return (
//     <div className="shadow-md shadow-gray-400" ref={dropdownRef}>
//       <nav className="bg-white py-2 bgMainColor">
//         <div className="ml-5 flex justify-start gap-9 text-center lg:gap-6 xl:gap-10 2xl:gap-14">
          
//           {/* Dashboard */}
//           <div className="flex flex-col justify-center items-center gap-1">
//             <button onClick={() => navigate('/layout/dashboard')}>
//               <img src={Dash} alt='dash' className="w-[32px] xl:w-[36px] 2xl:w-[40px]" />
//             </button>
//             <div className="text-white text-sm">Dashboard</div>
//           </div>

//           {/* Device Setup */}
//           <div className="relative cursor-pointer" onClick={() => handleDropdownToggle(0)}>
//             <div className="flex flex-col justify-center items-center gap-1">
//               <button>
//                 <img src={Setting} alt="setting" className="w-[32px] xl:w-[36px] 2xl:w-[40px]" />
//               </button>
//               <div className="text-sm text-white">Device Setup</div>
//             </div>
//             {isDropdownOpen[0] && (
//               <div className="absolute left-0 bg-white text-black shadow-lg rounded-sm z-10 w-36">
//                 <ul>
//                   <li className="hover:bg-gray-200 py-1 px-2">Add Edit Machine</li>
//                   <li className="hover:bg-gray-200 py-1 px-2">Hardware Setup</li>
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* File Dropdown */}
//           <div className="relative cursor-pointer" onClick={() => handleDropdownToggle(1)}>
//             <div className="flex flex-col justify-center items-center gap-1">
//               <button>
//                 <img src={File} alt="file" className="w-[32px] xl:w-[36px] 2xl:w-[40px]" />
//               </button>
//               <div className="text-sm text-white">File</div>
//             </div>
//             {isDropdownOpen[1] && (
//               <div className="absolute left-0 bg-white text-black shadow-lg rounded-sm z-10 w-36">
//                 <ul>
//                   <li className="hover:bg-gray-200 py-1 px-2">Company</li>
//                   <li className="hover:bg-gray-200 py-1 px-2">Branch</li>
//                   <li className="hover:bg-gray-200 py-1 px-2">Department</li>
//                   <li className="hover:bg-gray-200 py-1 px-2">Office Time Policy</li>
//                   <li className="hover:bg-gray-200 py-1 px-2">Shift Details</li>
//                   <li className="hover:bg-gray-200 py-1 px-2">Employee List</li>
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Report Dropdown */}
//           <div className="relative cursor-pointer" onClick={() => handleDropdownToggle(2)}>
//             <div className="flex flex-col justify-center items-center gap-1">
//               <button>
//                 <img src={Report} alt="report" className="w-[32px] xl:w-[36px] 2xl:w-[40px]" />
//               </button>
//               <div className="text-sm text-white">Report</div>
//             </div>
//           </div>

//           {/* Payroll Dropdown */}
//           <div className="relative cursor-pointer" onClick={() => handleDropdownToggle(3)}>
//             <div className="flex flex-col justify-center items-center gap-1">
//               <button>
//                 <img src={Payroll} alt="payroll" className="w-[32px] xl:w-[36px] 2xl:w-[40px]" />
//               </button>
//               <div className="text-sm text-white">Payroll</div>
//             </div>
//           </div>

//           {/* Admin Dropdown */}
//           <div className="relative cursor-pointer" onClick={() => handleDropdownToggle(4)}>
//             <div className="flex flex-col justify-center items-center gap-1">
//               <button>
//                 <img src={Admin} alt="admin" className="w-[32px] xl:w-[36px] 2xl:w-[40px]" />
//               </button>
//               <div className="text-sm text-white">Admin</div>
//             </div>
//           </div>

//           {/* Employee Register */}
//           <div className="flex flex-col justify-center items-center gap-1" onClick={() => navigate('/layout/Registrationform')}>
//             <button><FaUserGraduate size={28} /></button>
//             <div className="text-white text-sm">Employee Register</div>
//           </div>

//           {/* Logout */}
//           <div className="ml-auto mt-3 mr-4 text-white cursor-pointer" onClick={handleLogout}>
//             <RiLogoutCircleRLine size={28} />
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default Navbars;
