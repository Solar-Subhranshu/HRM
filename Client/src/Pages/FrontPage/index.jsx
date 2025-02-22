
// import React, { useState } from 'react'
// import logo from '../../Assets/u-man-logo.jpeg'
// import bgimg2 from '../../Assets/bgimage2.png';
// import bgimg1 from '../../Assets/bgimage1.png';
// import bgimg from '../../Assets/image.png';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { LuCircleUserRound } from "react-icons/lu";
// import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
// import { MdLockOpen } from "react-icons/md";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// axios.defaults.withCredentials = true;

// function FrontPage() {
//     const navigate = useNavigate();
//     const [inputData, setInputData] = useState({
//         employeeCode: '',
//         password: '',
//     });

//     const [errors, setErrors] = useState({
//         employeeCode: '',
//         password: '',
//     });
    
//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//     const handleFormdata = (e) => {
//         const { name, value } = e.target;
//         setInputData({
//             ...inputData,
//             [name]: value,
//         });
//     };

//     const validateForm = () => {
//         let formIsValid = true;
//         const newErrors = { employeeCode: '', password: '' };

//         // User Name validation
//         if (inputData.employeeCode.length < 6) {
//             newErrors.employeeCode = 'User Name must be at least 6 characters long.';
//             formIsValid = false;
//         }

//         // Password validation
//         if (inputData.password.length < 8) {
//             newErrors.password = 'Password is wrong';
//             formIsValid = false;
//         }

//         setErrors(newErrors);
//         return formIsValid;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) {
//             return;
//         }
//         try {
//             const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/login`, {
//                 employeeCode: inputData.employeeCode,
//                 password: inputData.password,
//             }
//         );

//             if (response.data.success) {
//                 // Show multiple success toasts
//                 toast.success("Login successfully!", {
//                     position: "top-right",
//                     autoClose: 2000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                 });             
                
//                toast.success("Login successfully!", { 
//                     position: "top-right", 
//                     autoClose: 3000 
//                 });
//                 toast.success("Login successfully!", { 
//                     position: "top-right", 
//                     autoClose: 4000 
//                 });
                
//                 navigate('/layout/dashboard');
//             } else {
//                 alert('Invalid username or password!');
//             }
//         } catch (error) {
//             console.log(error);
//             alert('Login failed. Please try again later.');
//         }
//     };
    
//     const togglePasswordVisibility = () => {
//         setIsPasswordVisible(!isPasswordVisible);
//     };

//     return (
//         <div className="h-screen static">
//             {/* Header part */}
//             <div className="bgMainColor opacity-90 h-20 ">
//                 <div className="w-4/5 flex justify-between m-auto items-center">
//                     <div className="flex flex-col items-center">
//                         <img className="mix-blend-screen scale-65" src={logo} alt="logo" />
//                     </div>
//                     <div className="flex flex-col items-center">
//                         <span className="text-3xl font-bold text-white irish-grover-regular">HRM's</span>
//                         <span className="text-white text-xl irish-grover-regular">System</span>
//                     </div>
//                 </div>
//             </div>

//             {/* Body part */}
//             <div className="flex bg-cover bg-center h-[calc(100%-8rem)] items-center w-screen" style={{ backgroundImage: `url(${bgimg})` }}>
//                 <div className="w-2/4">
//                     <div>
//                         <img src={bgimg1} className="scale-65" />
//                     </div>
//                 </div>

//                 <div className="flex flex-col items-center w-2/4 " style={{ marginTop: -120 }}>
//                     <div style={{ marginTop: -40 }}>
//                         <img src={bgimg2} className="scale-45 opacity-50 size-80" />
//                     </div>

//                     {/* Form part */}
//                     <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96" style={{ marginTop: -40 }}>
//                         <form method="post" onSubmit={handleSubmit}>
//                             <div className="flex flex-col mb-4">
//                                 <label className="text-gray-700 py-1 font-semibold">User Name</label>
//                                 <div className="relative flex items-center rounded-lg border-2 border-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-500">
//                                     {/* Icon */}
//                                     <LuCircleUserRound className="absolute left-3 text-gray-500 text-xl" />
//                                     <input
//                                         type="text"
//                                         name="employeeCode"
//                                         value={inputData.employeeCode}
//                                         onChange={handleFormdata}
//                                         placeholder="User Name"
//                                         className="flex-1 py-2 pl-10 pr-4 border-none focus:outline-none"
//                                     />
//                                 </div>
//                                 {errors.employeeCode && (
//                                     <span className="text-red-500 text-sm">{errors.employeeCode}</span>
//                                 )}
//                             </div>

                            

//                             <div className="flex flex-col mb-6">
//                                 <label className="text-gray-700 py-1 font-semibold">Password</label>
//                                 <div className="relative flex items-center rounded-lg border-2 border-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-500">
//                                     {/* Lock Icon */}
//                                     <MdLockOpen className="absolute left-3 text-gray-500 text-xl" />
//                                     <input
//                                         type={isPasswordVisible ? "text" : "password"}
//                                         name="password"
//                                         value={inputData.password}
//                                         onChange={handleFormdata}
//                                         placeholder="Password"
//                                         className="flex-1 py-2 pl-10 pr-4 border-none focus:outline-none"
//                                     />
//                                     {/* Eye Slash Icon */}
//                                     <div 
//                                         onClick={togglePasswordVisibility} 
//                                         className="absolute right-3 text-gray-500 text-xl cursor-pointer"
//                                     >
//                                         {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
//                                     </div>
//                                 </div>
//                                 {errors.password && (
//                                     <span className="text-red-500 text-sm">{errors.password}</span>
//                                 )}
//                             </div>

//                             <div className="w-full">
//                                 <button
//                                     type="submit"
//                                     className="w-full bgMainColor hover:bg-[rgba(116,15,214,0.8)] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
//                                 >
//                                     Login
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>

//             {/* Footer part */}
//             <div className="bgMainColor absolute bottom-0 left-0 w-screen h-12 text-center ">
//                <p className='mt-3 text-white'>@Uda Mandi All copy rights reserved</p>
//             </div>
//         </div>
//     );
// }

// export default FrontPage;



// import React, { useState } from 'react'
// import logo from '../../Assets/u-man-logo.jpeg'
// import bgimg2 from '../../Assets/bgimage2.png';
// import bgimg1 from '../../Assets/bgimage1.png';
// import bgimg from '../../Assets/image.png';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { LuCircleUserRound } from "react-icons/lu";
// import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
// import { MdLockOpen } from "react-icons/md";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// axios.defaults.withCredentials = true;

// function FrontPage() {
//     const navigate = useNavigate();
//     const [inputData, setInputData] = useState({
//         employeeCode: '',
//         password: '',
//     });

//     const [errors, setErrors] = useState({
//         employeeCode: '',
//         password: '',
//     });
    
//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//     const handleFormdata = (e) => {
//         const { name, value } = e.target;
//         setInputData({
//             ...inputData,
//             [name]: value,
//         });
//     };

//     const validateForm = () => {
//         let formIsValid = true;
//         const newErrors = { employeeCode: '', password: '' };

//         // User Name validation
//         if (inputData.employeeCode.length < 6) {
//             newErrors.employeeCode = 'User Name must be at least 6 characters long.';
//             formIsValid = false;
//         }

//         // Password validation
//         if (inputData.password.length < 8) {
//             newErrors.password = 'Password is wrong';
//             formIsValid = false;
//         }

//         setErrors(newErrors);
//         return formIsValid;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) {
//             return;
//         }
//         try {
//             const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/login`, {
//                 employeeCode: inputData.employeeCode,
//                 password: inputData.password,
//             }
//         );

//             if (response.data.success) {
//                 // Show multiple success toasts
//                 toast.success("Login successfully!", {
//                     position: "top-right",
//                     autoClose: 2000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                 });             
                
//                toast.success("Login successfully!", { 
//                     position: "top-right", 
//                     autoClose: 3000 
//                 });
//                 toast.success("Login successfully!", { 
//                     position: "top-right", 
//                     autoClose: 4000 
//                 });
                
//                 navigate('/layout/dashboard');
//             } else {
//                 alert('Invalid username or password!');
//             }
//         } catch (error) {
//             console.log(error);
//             alert('Login failed. Please try again later.');
//         }
//     };
    
//     const togglePasswordVisibility = () => {
//         setIsPasswordVisible(!isPasswordVisible);
//     };

//     return (
//         <div className="h-screen  w-screen">
//             {/* Header part */}
//             <div className="bgMainColor opacity-90 h-20 relative">
//                 <div className="flex justify-between  items-center">
//                     <div className="flex flex-col items-center">
//                         <img className="mix-blend-screen scale-65" src={logo} alt="logo" />
//                     </div>
//                     <div className="flex flex-col items-center pr-6">
//                         <span className="text-3xl font-bold text-white irish-grover-regular">HRM's</span>
//                         <span className="text-white text-xl irish-grover-regular">System</span>
//                     </div>
//                 </div>
//             </div>
              
//             <div className='flex  w-full  h-[calc(100%-8rem)]'>
//                <div className='w-1/2'>
//                   <img src={bgimg1} className="scale-65" />
//                </div>

//                <div className='w-1/2 flex flex-col  h-full items-center justify-center '>
//                  <img src={bgimg2} className=" opacity-50 size-40" />
//                  <form method="post" onSubmit={handleSubmit} className=''>
//                     <div className="flex flex-col ">
//                         <label className="text-gray-700 font-semibold">User Name</label>
//                         <div className="relative flex items-center rounded-lg border-2 border-gray-300 bg-white ">
//                             {/* Icon */}
//                             <LuCircleUserRound className="absolute left-3 text-gray-500 text-xl" />
//                             <input
//                                 type="text"
//                                 name="employeeCode"
//                                 value={inputData.employeeCode}
//                                 onChange={handleFormdata}
//                                 placeholder="User Name"
//                                 className="flex-1 py-2 pl-10 pr-4 px-8 border-none focus:outline-none"
//                             />
//                         </div>
//                         {errors.employeeCode && (
//                             <span className="text-red-500 text-sm">{errors.employeeCode}</span>
//                         )}
//                     </div>

                    

//                     <div className="flex flex-col ">
//                         <label className="text-gray-700 py-1 font-semibold">Password</label>
//                         <div className="relative flex items-center rounded-lg border-2 border-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-500">
//                             {/* Lock Icon */}
//                             <MdLockOpen className="absolute left-3 text-gray-500 text-xl" />
//                             <input
//                                 type={isPasswordVisible ? "text" : "password"}
//                                 name="password"
//                                 value={inputData.password}
//                                 onChange={handleFormdata}
//                                 placeholder="Password"
//                                 className="flex-1 py-2 pl-10 pr-4 border-none focus:outline-none"
//                             />
//                             {/* Eye Slash Icon */}
//                             <div 
//                                 onClick={togglePasswordVisibility} 
//                                 className="absolute right-3 text-gray-500 text-xl cursor-pointer"
//                             >
//                                 {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
//                             </div>
//                         </div>
//                         {errors.password && (
//                             <span className="text-red-500 text-sm">{errors.password}</span>
//                         )}
//                     </div>

//                     <div className="w-full">
//                         <button
//                             type="submit"
//                             className="w-full bgMainColor hover:bg-[rgba(116,15,214,0.8)] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
//                         >
//                             Login
//                         </button>
//                     </div>
//                 </form>
//                </div>
//             </div>

//             {/* Footer part */}
//             <div className="bgMainColor absolute w-full h-12 pt-3 text-center ">
//                <p className=' text-white'>@Uda Mandi All copy rights reserved</p>
//             </div>
//         </div>
//     );
// }

// export default FrontPage;


import React, { useState } from "react";
import logo from "../../Assets/u-man-logo.jpeg";
import bgimg2 from "../../Assets/bgimage2.png";
import bgimg1 from "../../Assets/bgimage1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LuCircleUserRound } from "react-icons/lu";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { MdLockOpen } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;

function FrontPage() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({ employeeCode: "", password: "" });
  const [errors, setErrors] = useState({ employeeCode: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFormdata = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { employeeCode: "", password: "" };

    if (inputData.employeeCode.length < 6) {
      newErrors.employeeCode = "User Name must be at least 6 characters long.";
      formIsValid = false;
    }
    if (inputData.password.length < 8) {
      newErrors.password = "Password is wrong";
      formIsValid = false;
    }
    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/auth/login`,
        { employeeCode: inputData.employeeCode, password: inputData.password }
      );

      if (response.data.success) {
        toast.success("Login successfully!", { position: "top-right", autoClose: 2000 });
        navigate("/layout/dashboard");
      } else {
        alert("Invalid username or password!");
      }
    } catch (error) {
      console.log(error);
      alert("Login failed. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col">
      {/* Header */}
      <div className="bgMainColor opacity-90 h-20 flex items-center justify-between px-6 md:px-12">
        <img className="mix-blend-screen h-16" src={logo} alt="logo" />
        <div className="text-white text-center">
          <h1 className="text-2xl md:text-3xl font-bold irish-grover-regular">HRM's</h1>
          <p className="text-lg md:text-xl irish-grover-regular">System</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Left Side Image */}
        <div className="md:w-1/2 flex justify-center items-center p-4">
          <img src={bgimg1} className="w-full max-w-md md:max-w-lg object-contain" alt="Background" />
        </div>

        {/* Login Form */}
        <div className="md:w-1/2 flex flex-col items-center justify-center px-6 py-8">
          <img src={bgimg2} className="opacity-50 w-24 md:w-40 mb-4" alt="Decorative" />

          <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg">
            <div className="mb-4">
              <label className="text-gray-700 font-semibold">User Name</label>
              <div className="relative flex items-center rounded-lg border-2 border-gray-300 bg-white">
                <LuCircleUserRound className="absolute left-3 text-gray-500 text-xl" />
                <input
                  type="text"
                  name="employeeCode"
                  value={inputData.employeeCode}
                  onChange={handleFormdata}
                  placeholder="User Name"
                  className="w-full py-2 pl-10 pr-4 border-none focus:outline-none"
                />
              </div>
              {errors.employeeCode && <span className="text-red-500 text-sm">{errors.employeeCode}</span>}
            </div>

            <div className="mb-4">
              <label className="text-gray-700 font-semibold">Password</label>
              <div className="relative flex items-center rounded-lg border-2 border-gray-300 bg-white">
                <MdLockOpen className="absolute left-3 text-gray-500 text-xl" />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  value={inputData.password}
                  onChange={handleFormdata}
                  placeholder="Password"
                  className="w-full py-2 pl-10 pr-4 border-none focus:outline-none"
                />
                <div onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute right-3 text-gray-500 text-xl cursor-pointer">
                  {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>

            <button
              type="submit"
              className="w-full bgMainColor hover:bg-[rgba(116,15,214,0.8)] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bgMainColor w-full h-12 flex items-center justify-center text-white text-center">
        <p>@Uda Mandi All rights reserved</p>
      </footer>
    </div>
  );
}

export default FrontPage;
