import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Index() {
    const navigate = useNavigate();

    const [status, setStatus] = useState('Approved'); // Default status
    const [data, setData] = useState([]); // Holds fetched data
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Function to fetch data based on status
    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:8000/auth/show-allJoiningForms?status=${status}`, {
                withCredentials: true
            });
            setData(response?.data?.data); // Set data from API response
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to fetch data. Please try again.');
        }
        setLoading(false);
    };

    // Fetch data when status changes
    useEffect(() => {
        fetchData();
    }, [status])

    // Function to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'; // Handle empty dates
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // Formats as DD/MM/YYYY
    };

    const handleRowClick = (emp) => {
        navigate('/layout/showsinglejoiningData', { state: { employee: emp } });
    };

  return (
    <>
       <div>
           <div className='py-2 bgMainColor mt-4 shadow-xl flex justify-between'>
                <div>
                    <h1 className=' text-white font-bold text-xl'>data</h1>
                </div>
                <div className='flex gap-2'>
                        {['Approved', 'Pending'].map((item) => (
                            <button
                                key={item}
                                onClick={() => setStatus(item)}
                                className={`px-4 py-2 rounded-md text-white ${status === item ? 'bg-blue-600' : 'bg-red-500'}`}
                            >
                                {item}
                            </button>
                        ))}
                </div>
           </div>

           <div className='overflow-auto h-[calc(100vh-14rem)]'>
            <div className="relative">
                <table className=" text-gray-500 dark:text-gray-400" style={{ position: 'relative'}}>
                    <thead className="text-xs border border-gray-150 bg-gray-800 text-gray-100 uppercase dark:bg-gray-800 dark:text-gray-400 ">
                    <tr>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">Select</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">Company Name</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">Employee Name</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">father_husbandName</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">dateOfBirth</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">gender</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">maritalStatus</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">bloodGroup</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">personalPhoneNum</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">personalEmail</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">currentAddress</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">currentState</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">currentCity</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">currentPinCode</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">permanentAddress</th>

                        <th className="px-6 py-3 text-center font-semibold text-nowrap">permanentState</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">permanentCity</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">permanentPinCode</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">bankName</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">branchName</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">bankAccount</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">bankIFSC</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">bankAccountHolderName</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">bankAddress</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">panCard</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">aadharCard</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">uanNumber</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">department</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">designation</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">employeeType</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">interviewDate</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">joiningDate</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">modeOfRecruitment</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">reference</th>
                        {/* <th className="px-6 py-3 text-center font-semibold text-nowrap"></th> */}


                        <th className="px-6 py-3 text-center font-semibold text-nowrap">CTC</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">Inhand</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">employeeESI</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">employeePF</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">employerESI</th>
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">employerPF</th>
                    </tr>

                    </thead>
                    <tbody>
                       {data.length > 0 ? (
                            data.map((emp, index) => (
                                <tr key={index} 
                                    className="border-b cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleRowClick(emp)}
                                   >
                                    <td className="px-4 py-3 text-center"><input type="checkbox" /></td>
                                    <td className="px-4 py-2 text-center">{emp?.companyId?.name}</td>
                                    <td className="px-4 py-2 text-center">{emp?.name}</td>
                                    <td className="px-4 py-2 text-center">{emp?.father_husbandName}</td>
                                    <td className="px-4 py-2 text-center">{formatDate(emp?.dateOfBirth)}</td>
                                    <td className="px-4 py-2 text-center">{emp?.gender}</td>
                                    <td className="px-4 py-2 text-center">{emp?.maritalStatus}</td>
                                    <td className="px-4 py-2 text-center">{emp?.bloodGroup}</td>
                                    <td className="px-4 py-2 text-center">{emp?.personalPhoneNum}</td>
                                    <td className="px-4 py-2 text-center">{emp?.personalEmail}</td>
                                    <td className="px-4 py-2 text-center">{emp?.currentAddress}</td>
                                    <td className="px-4 py-2 text-center">{emp?.currentState}</td>
                                    <td className="px-4 py-2 text-center">{emp?.currentCity}</td>
                                    <td className="px-4 py-2 text-center">{emp?.currentPinCode}</td>
                                    <td className="px-4 py-2 text-center">{emp?.permanentAddress}</td>
                                    <td className="px-4 py-2 text-center">{emp?.permanentState}</td>
                                    <td className="px-4 py-2 text-center">{emp?.permanentCity}</td>
                                    <td className="px-4 py-2 text-center">{emp?.permanentPinCode}</td>
                                    <td className="px-4 py-2 text-center">{emp?.bankName}</td>
                                    <td className="px-4 py-2 text-center">{emp?.branchName}</td>
                                    <td className="px-4 py-2 text-center">{emp?.bankAccount}</td>
                                    <td className="px-4 py-2 text-center">{emp?.bankIFSC}</td>
                                    <td className="px-4 py-2 text-center">{emp?.bankAccountHolderName}</td>
                                    <td className="px-4 py-2 text-center">{emp?.bankAddress}</td>
                                    <td className="px-4 py-2 text-center">{emp?.panCard}</td>
                                    <td className="px-4 py-2 text-center">{emp?.aadharCard}</td>
                                    <td className="px-4 py-2 text-center">{emp?.uanNumber}</td>
                                    <td className="px-4 py-2 text-center">{emp?.department?.department}</td>
                                    <td className="px-4 py-2 text-center">{emp?.designation?.designation}</td>
                                    <td className="px-4 py-2 text-center">{emp?.employeeType}</td>
                                    <td className="px-4 py-2 text-center">{formatDate(emp?.interviewDate)}</td>
                                    <td className="px-4 py-2 text-center">{formatDate(emp?.joiningDate)}</td>
                                    <td className="px-4 py-2 text-center">{emp?.modeOfRecruitment}</td>
                                    <td className="px-4 py-2 text-center">{emp?.reference}</td>
                                    <td className="px-4 py-2 text-center">{emp?.salary?.ctc}</td>
                                    <td className="px-4 py-2 text-center">{emp?.salary?.inHand}</td>
                                    <td className="px-4 py-2 text-center">{emp?.salary?.employeeESI}</td>
                                    <td className="px-4 py-2 text-center">{emp?.salary?.employeePF}</td>
                                    <td className="px-4 py-2 text-center">{emp?.salary?.employerESI}</td>
                                    <td className="px-4 py-2 text-center">{emp?.salary?.employerPF}</td>

                                </tr>
                            ))
                            ) : (
                            <tr>
                                <td colSpan="15" className="text-center py-4">
                                    No data found.
                                </td>
                            </tr>
                        )}
                    
                    </tbody>
                    
                </table>
            </div>
        </div>
           
       </div>
    </>
  )
}

export default Index