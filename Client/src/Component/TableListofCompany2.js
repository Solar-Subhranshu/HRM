// import React, { useState , useEffect} from 'react';
// import { FaListUl } from "react-icons/fa";
// import { IoIosCheckboxOutline } from "react-icons/io";
// import axios from 'axios';


// function TableListofCompany2() {
//   const[data, setData]=useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/common/show-designation');
//       console.log(response.data);
//       setData(response.data.message);
//     } catch (error) {
//       alert('Error: Unable to fetch data');
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className='ml-2 mr-2'>
//         <div className='bgMainColor flex  py-4 pl-1 gap-3'>
//             {<FaListUl size={24} />}
//             <h4 className='text-white'>List of Company</h4>
//         </div>
//         <div className='flex justify-center gap-20 pt-6'>
//             <table className='table-auto w-2/5 border border-black '>
//                 <thead className='border border-black'>
//                     <th className='text-blue-600/100 border border-black w-20  '>select</th>
//                     <th className='text-blue-600/100 border border-black '>Department</th>
//                 </thead>
//                 <tbody >
//                     <tr>
//                         <td className='flex justify-center items-center align-middle h-8'>{<IoIosCheckboxOutline />}</td>
//                         <td className='border border-black'>Galo Solar</td>
//                     </tr>
//                 </tbody>
//             </table>
//             <table className='table-auto w-2/5 border border-black '>
//                 <thead className='border border-black'>
//                     <th className='text-blue-600/100 border border-black w-20  '>select</th>
//                     <th className='text-blue-600/100 border border-black '>Designation</th>
            
//                 </thead>
//                 <tbody >
//                     <tr >
//                         <td className='flex justify-center items-center align-middle h-8'>{<IoIosCheckboxOutline />}</td>
//                         {data.map(({ empDesignation, id }) => (
//                        <td key={id} className='text-blue-600/100 border border-black '>{empDesignation}</td>
//                 ))}
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
    
//         <div className='flex justify-center gap-12 mb-4 mt-12'>
//           <div>
//             <button className='px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all' >Add</button>
//           </div>
//           <div>
//             <button className='px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md  hover:bg-red-700 transition-all' >Updata</button>
//           </div>
//           <div>
//             <button className='px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md  hover:bg-red-700 transition-all' >Close</button>
//           </div>
//         </div>
//     </div>
//   )
// }

// export default TableListofCompany2


// import React, { useState, useEffect } from 'react';
// import { FaListUl } from "react-icons/fa";
// import { IoIosCheckboxOutline } from "react-icons/io";
// import axios from 'axios';

// function TableListofCompany2() {
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/common/show-designation');
//       console.log(response.data); // Log the data to check its structure
//       setData(response.data.message.designationNames); // Assuming message contains designationNames
//     } catch (error) {
//       alert('Error: Unable to fetch data');
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className='ml-2 mr-2'>
//       <div className='bgMainColor flex py-4 pl-1 gap-3'>
//         <FaListUl size={24} />
//         <h4 className='text-white'>List of Company</h4>
//       </div>
//       <div className='flex justify-center gap-20 pt-6'>
//         <table className='table-auto w-2/5 border border-black'>
//           <thead className='border border-black'>
//             <tr>
//               <th className='text-blue-600/100 border border-black w-20'>select</th>
//               <th className='text-blue-600/100 border border-black'>Department</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className='flex justify-center items-center align-middle h-8'>
//                 <IoIosCheckboxOutline />
//               </td>
//               <td className='border border-black'>Galo Solar</td>
//             </tr>
//           </tbody>
//         </table>

//         <table className='table-auto w-2/5 border border-black'>
//           <thead className='border border-black'>
//           <tr>
//               <th className='text-blue-600/100 border border-black w-20'>select</th>
//               <th className='text-blue-600/100 border border-black'>Department</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(data) && data.length > 0 ? (
//               data.map(({ empDesignation, id }) => (
//                 <tr key={id}>
//                   <td className='flex justify-center items-center align-middle h-8'>
//                     <IoIosCheckboxOutline />
//                   </td>
//                   <td className='border border-black'>{empDesignation}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td  className="text-center">No Data Available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className='flex justify-center gap-12 mb-4 mt-12'>
//         <button className='px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all'>Add</button>
//         <button className='px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all'>Update</button>
//         <button className='px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all'>Close</button>
//       </div>
//     </div>
//   );
// }

// export default TableListofCompany2;


import React, { useState, useEffect } from 'react';
import { FaListUl } from "react-icons/fa";
import { IoIosCheckboxOutline } from "react-icons/io";
import axios from 'axios';

function TableListofCompany2() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/common/show-designation');
      console.log(response.data); 
      setData(response.data.message.designationNames);
    } catch (error) {
      alert('Error: Unable to fetch data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='ml-2 mr-2'>
      <div className='bgMainColor flex py-4 pl-1 gap-3'>
        <FaListUl size={24} />
        <h4 className='text-white'>List of Company</h4>
      </div>
      <div className='flex justify-center gap-20 pt-6'>
        <table className='table-auto h-fit w-2/5 border border-black'>
          <thead className='border border-black'>
            <tr>
              <th className='text-blue-600/100 border border-black w-20'>select</th>
              <th className='text-blue-600/100 border border-black'>Department</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border-t border-gray-300 flex justify-center items-center align-middle h-8'>
                <input type='checkbox'/>
              </td>
              <td className='border border-black text-center'>Galo Solar</td>
            </tr>
          </tbody>
        </table>

        <table className='table-auto w-2/5 border-collapse border border-gray-300'>
          <thead className=''>
            <tr>
              <th className='border-t border-gray-300 text-blue-600/100 w-20'>select</th>
              <th className='border border-gray-300 text-blue-600/100'>Designation</th>
            </tr>
          </thead>
          <tbody>
           
            {data && data.map(({ empDesignation, id }) => (
              <tr key={id}>
                <td className='border-t border-gray-300 flex justify-center items-center align-middle h-8'>
                  {/* <IoIosCheckboxOutline /> */}
                  <input type='checkbox' value={empDesignation}  />
                </td>
                <td className='border border-gray-300 text-center'>{empDesignation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex justify-center gap-12 mb-4 mt-12'>
        <button className='px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all'>Add</button>
        <button className='px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all'>Update</button>
        <button className='px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all'>Close</button>
      </div>
    </div>
  );
}

export default TableListofCompany2;

