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

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/auth/login`,
        { employeeCode: inputData.employeeCode, password: inputData.password }
      );

      console.log("my login response is ", response);


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
    <div className="min-h-screen h-screen w-screen flex flex-col">
      {/* Header */}
      <div className="bgMainColor opacity-90 h-20 flex items-center justify-between px-6 md:px-12">
        <img className="mix-blend-screen h-16" src={logo} alt="logo" />
        <div className="text-white text-center">
          <h1 className="text-2xl md:text-3xl font-bold irish-grover-regular">HRM's</h1>
          <p className="text-lg md:text-xl irish-grover-regular">System</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 h-full">
        {/* Left Side Image */}
        <div className="md:w-1/2 flex justify-center items-center p-4 h-full">
          <img src={bgimg1} className="w-full h-auto  max-w-md md:max-w-lg object-contain" alt="Background" />
        </div>

        {/* Login Form */}
        <div className="md:w-1/2 flex flex-col items-center justify-center px-6 py-8 h-full">
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
      <footer className="bgMainColor w-full h-10 md:h-12 flex items-center justify-center text-white text-center">
        <p>@Uda Mandi All rights reserved</p>
      </footer>
    </div>
  );
}

export default FrontPage;
