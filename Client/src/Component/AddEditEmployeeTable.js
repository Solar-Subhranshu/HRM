// import React from 'react';
// import { MdOutlineAddToPhotos } from "react-icons/md";

// function AddEditEmployeeTable() {

//   return (
//     <div className='ml-2 mr-2'>
//         <div className='bgMainColor flex  py-4 pl-1 gap-3'>
//             {<MdOutlineAddToPhotos size={24}  color='white'/>}
//             <h4 className='text-white'>Add/Edit Employee Details</h4>
//         </div>

//         <div className='flex gap-3 pt-4'>
//             <div className='border-2 border-gray-400 w-1/3 pb-8'>
//                <h3 className='font-semibold text-xl text-gray-400 ml-2 pt-4'>Company Details</h3>
//                <hr className='border-t-2 border-gray-300 ml-2 mr-2 mt-1'/>
//                <div>
//                    <div className='flex flex-col pt-4'>
//                         <label className='pb-2'>
//                             <span className='ml-6'>Company Name</span>
//                             <span className="text-red-600">*</span>
//                         </label>
//                         <select className=" ml-6 mr-28 rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black">
//                             <option>hr</option>
//                         </select>
//                    </div>
//                    <div className='flex flex-col pt-4'>
//                     <label className='pb-2'>
//                         <span className='ml-6'>Branch Name</span>
//                         <span className='text-red-600'>*</span>
//                     </label>
//                     <select className="ml-6 mr-28  rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black">
//                         <option>delhi</option>
//                     </select>
//                    </div>
//                </div>
//             </div>

//             <div className='border-2 border-gray-400  w-[calc(100%-33.33%)] '>
//                 <h3 className='font-semibold text-xl text-gray-400 ml-6 pt-4'>Employee Details</h3>
//                 <hr className='border-t-2 border-gray-300 ml-6 mr-2 mt-1'/>
//                 <div className='grid grid-cols-3 gap-4 mt-4'>
//                     <div className='flex flex-col'>
//                         <label className='pb-2'>
//                             <span className='ml-6'>Dept Name</span>
//                             <span className='text-red-600'>*</span>
//                         </label>
//                         <select className=" ml-6 mr-16 rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black">
//                             <option>hr</option>
//                         </select>
//                     </div>

//                     <div className='flex flex-col'>
//                         <label className='pb-2'>
//                             <span className='ml-6'>Date of Joining</span>
//                             <span className='text-red-600'>*</span>
//                         </label>
//                         <input type='date'
//                                className=" ml-6 mr-16 rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black"
//                         />
//                     </div>

//                     <div className='flex flex-col'>
//                         <label className='pb-2'>
//                             <span className='ml-6'>Resignation Date</span>
//                             <span className='text-red-600'>*</span>
//                         </label>
//                         <input type='date'
//                                className=" ml-6 mr-16 rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black"
//                         />
//                     </div>

//                     <div className='flex flex-col'>
//                         <label className=' pb-2'>
//                             <span className='ml-6'>Designation Name</span>
//                             <span className='text-red-600'>*</span>
//                         </label>
//                         <select className=" ml-6 mr-16 rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black">
//                             <option>JE</option>
//                         </select>
//                     </div>

//                     <div className='flex flex-col'>
//                         <label className='pb-2'>
//                             <span className='ml-6'>Office Time Policy</span>
//                             <span className='text-red-600'>*</span>
//                         </label>
//                         <select className=" ml-6 mr-16 rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black">
//                             <option>10pm</option>
//                         </select>
//                     </div>
        
//                     <div className='flex flex-col'>
//                         <label className='pb-2'>
//                             <span className='ml-6'>Shift Name</span>
//                             <span className='text-red-600'>*</span>
//                         </label>
//                         <select className=" ml-6 mr-16 rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black">
//                             <option>Shift-1</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         {/* Register Button */}
//         <div className='text-center mt-4'>
//             <button  type='submit' className=" text-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-800 transition-all">
//               Register
//             </button>
//           </div>
//     </div>
//   )
// }

// export default  AddEditEmployeeTable  




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdOutlineAddToPhotos } from "react-icons/md";

function AddEditEmployeeTable() {
    
    const [companyData, setDataCompany] = useState([]);
    const [DesginationData, setDeginationData]=useState([]);
    const [departmentName, setDepartmentName]=useState([]);

    const fetchCompanyNameData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/company/show-company');
          console.log(response.data);
          setDataCompany(response.data.data);
          console.log(companyData);
        } catch (error) {
          alert('Error: Unable to fetch data');
        }
      };
    
    useEffect(() => {
        fetchCompanyNameData();
    }, []);

    const fetchDeginationData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/common/show-designation');
          console.log(response.data);
          setDeginationData(response.data.data.designationNames);
          console.log(DesginationData)
        } catch (error) {
          alert('Error: Unable to fetch data');
        }
      };
    
      useEffect(() => {
        fetchDeginationData();
      }, []);


      const fetchDepartmentName = async () => {
        try {
          const response = await axios.get('http://localhost:8000/auth/show-department');
          console.log(response.data);
          setDepartmentName(response.data.data);
          console.log(departmentName)
        } catch (error) {
          alert('Error: Unable to fetch data');
        }
      };
    
      useEffect(() => {
        fetchDepartmentName();
      }, []);

  return (
    <div className='ml-2 mr-2'>
        <div className='bgMainColor flex py-4 pl-1 gap-3'>
            <MdOutlineAddToPhotos size={24} color='white'/>
            <h4 className='text-white'>Add/Edit Employee Details</h4>
        </div>

        <div className='flex flex-col sm:flex-row gap-3 pt-4'>
            <div className='border-2 border-gray-400 sm:w-1/3 w-full pb-8'>
               <h3 className='font-semibold text-xl text-gray-400 ml-2 pt-4'>Company Details</h3>
               <hr className='border-t-2 border-gray-300 ml-2 mr-2 mt-1'/>
               <div>
                   <div className='flex flex-col pt-4'>
                        <label className='pb-2'>
                            <span className='ml-6'>Company Name</span>
                            <span className="text-red-600">*</span>
                        </label>
                        <select className="ml-6 mr-28 rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black">
                            {companyData?.map(({name, _id }) => (
                                <option key={_id} value={name}>{name}</option>
                            ))}
                        </select>
                   </div>
                   <div className='flex flex-col pt-4'>
                    <label className='pb-2'>
                        <span className='ml-6'>Branch Name</span>
                        <span className='text-red-600'>*</span>
                    </label>
                    <select className="ml-6 mr-28 rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black">
                        {companyData?.map(({branch, _id }) => (
                            <option key={_id} value={branch}>{branch}</option>
                        ))}
                    </select>
                   </div>
               </div>
            </div>

            <div className='border-2 border-gray-400 sm:w-[calc(100%-33.33%)] w-full'>
                <h3 className='font-semibold text-xl text-gray-400 ml-6 pt-4'>Employee Details</h3>
                <hr className='border-t-2 border-gray-300 ml-6 mr-2 mt-1'/>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4'>
                    <div className='flex flex-col'>
                        <label className='pb-2'>
                            <span className='ml-6'>Dept Name</span>
                            <span className='text-red-600'>*</span>
                        </label>
                        <select className="ml-6 mr-16 rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black">
                            {departmentName ?.map(({ empdept, _id }) => (
                                <option key={_id} value={empdept}>{empdept}</option>
                            ))}
                        </select>
                    </div>

                    <div className='flex flex-col'>
                        <label className='pb-2'>
                            <span className='ml-6'>Date of Joining</span>
                            <span className='text-red-600'>*</span>
                        </label>
                        <input type='date'
                               className="ml-6 mr-16 rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label className='pb-2'>
                            <span className='ml-6'>Resignation Date</span>
                            <span className='text-red-600'>*</span>
                        </label>
                        <input type='date'
                               className="ml-6 mr-16 rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label className='pb-2'>
                            <span className='ml-6'>Designation Name</span>
                            <span className='text-red-600'>*</span>
                        </label>
                        <select className="ml-6 mr-16 rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black">
                            {DesginationData.map(({designation, id})=>(
                               <option key={id} value={designation}>{designation}</option>
                            ))}
                        </select>
                    </div>

                    <div className='flex flex-col'>
                        <label className='pb-2'>
                            <span className='ml-6'>Office Time Policy</span>
                            <span className='text-red-600'>*</span>
                        </label>
                        <select className="ml-6 mr-16 rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black">
                            <option>10pm</option>
                        </select>
                    </div>
        
                    <div className='flex flex-col'>
                        <label className='pb-2'>
                            <span className='ml-6'>Shift Name</span>
                            <span className='text-red-600'>*</span>
                        </label>
                        <select className="ml-6 mr-16 rounded-md border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black">
                            <option>Shift-1</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Register Button
        <div className='text-center mt-4 pb-4'>
            <button  type='submit' className=" text-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-800 transition-all">
              Register
            </button>
        </div> */}
    </div>
  )
}

export default AddEditEmployeeTable;
