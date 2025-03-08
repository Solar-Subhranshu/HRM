import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Index() {
    
    const [status, setStatus] = useState('Approved');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [isDownloading, setIsDownloading] = useState(false); // State for button loader

    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/show-allJoiningForms?status=${status}`, {
                withCredentials: true
            });
            setData(response?.data?.data);
            setFilteredData(response?.data?.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to fetch data. Please try again.');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [status]);

    // useEffect(() => {
    //     if (!month || !year) {
    //         setFilteredData(data);
    //         return;
    //     }

    //     const filtered = data.filter((emp) => {
    //         const empDate = new Date(emp.joiningDate);
    //         return (
    //             empDate.getMonth() + 1 === parseInt(month, 10) &&
    //             empDate.getFullYear() === parseInt(year, 10)
    //         );
    //     });

    //     setFilteredData(filtered);
    // }, [month, year, data]);

    useEffect(() => {
        if (!month || !year) {
            setFilteredData(data);
            setSelectedIds([]); // Clear selection if no month/year is chosen
            return;
        }
    
        const filtered = data.filter((emp) => {
            const empDate = new Date(emp.joiningDate);
            return (
                empDate.getMonth() + 1 === parseInt(month, 10) &&
                empDate.getFullYear() === parseInt(year, 10)
            );
        });
    
        setFilteredData(filtered);
    
        // Automatically select all matching records
        const allIds = filtered.map((emp) => emp._id);
        setSelectedIds(allIds);
    }, [month, year, data]);
    
    const handleCheckboxChange = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleDownload = async () => {
        if (selectedIds.length === 0) {
            alert("Please select at least one record to download.");
            return;
        }
        
        setIsDownloading(true); // Start loading
        console.log("my selected id is ", selectedIds);

        for (let id of selectedIds) {
            try {

               const employee = filteredData.find(emp => emp._id === id); // Find employee by ID
               const employeeName = employee?.name ? employee.name.replace(/\s+/g, '_') : `Employee_${id}`; // Format name for file

               console.log(`Downloading PDF for: ${employeeName}`);
                console.log("my download pdf api are call ")
                const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/download-JoiningPdf?formId=${id}`, {
                    responseType: 'blob', // Get file as blob
                    withCredentials: true
                });

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `JoiningForm_${employeeName}.pdf`); // Set file name
                document.body.appendChild(link);
                link.click();
                link.remove();
            } catch (error) {
                console.error('Error downloading PDF:', error);
            }
        }
        setIsDownloading(false); // Stop loading
    };

    return (
        <div>
            <div className='py-2 bgMainColor mt-4 shadow-xl flex justify-between'>
                <h1 className='text-white font-bold text-lg ml-2'>Here Download The Pdf</h1>
                <div className='flex gap-2 mr-2'>
                    <button onClick={() => setStatus('Approved')} className={`px-4 py-2 rounded-md text-white ${status === 'Approved' ? 'bg-green-500' : 'bg-red-500'}`}>Approved</button>
                </div>
            </div>

            <div className="flex gap-4 p-4">
                {/* Month Selection */}
                <div className="flex flex-col ">
                    <label htmlFor="month" className="text-sm font-semibold">Select Month : </label>
                    <select id="month" className="p-2 border border-gray-500 rounded outline-none" value={month} onChange={(e) => setMonth(e.target.value)}>
                        <option value="">Select Month  </option>
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('en', { month: 'long' })}</option>
                        ))}
                    </select>
                </div>

                {/* Year Selection */}
                <div className="flex flex-col">
                    <label htmlFor="year" className="text-sm font-semibold">Select Year : </label>
                    <select id="year" className="p-2 border border-gray-500 rounded outline-none" value={year} onChange={(e) => setYear(e.target.value)}>
                        <option value="">Select Year  </option>
                        {Array.from({ length: 10 }, (_, i) => (
                            <option key={i} value={2020 + i}>{2020 + i}</option>
                        ))}
                    </select>
                </div>

                {/* Download Button */}
                <button
                    className={`px-4 h-10 mt-5 rounded-md flex items-center justify-center 
                                ${isDownloading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-400'}`}
                    onClick={handleDownload}
                    disabled={isDownloading} // Disable button when downloading
                >
                    {isDownloading ? (
                        <div className="flex items-center">
                            <svg
                                className="animate-spin h-5 w-5 mr-2 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                            Downloading...
                        </div>
                    ) : (
                        'Download'
                    )}
                </button>
            </div>

            <div className='overflow-auto h-[calc(100vh-16rem)]'>
            <div className="relative">
                <table className=" " style={{ position: 'relative'}}>
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
                        <th className="px-6 py-3 text-center font-semibold text-nowrap">joiningDate</th>
                    </tr>
                    
                    </thead>
                    <tbody>
             
             
                    {loading ? (
                        // Show loader when data is being fetched
                        <tr>
                            <td colSpan="15" className="text-center py-4">
                                <div className="flex justify-center items-center">
                                    <svg
                                        className="animate-spin h-8 w-8 text-blue-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        ></path>
                                    </svg>
                                    <span className="ml-2 text-gray-600">Loading...</span>
                                </div>
                            </td>
                        </tr>
                            ): filteredData.length > 0 ? (
                            filteredData.map((emp, index) => (
                                <tr key={index} 
                                    className="border-b cursor-pointer hover:bg-gray-200">
                                    <td className="px-4 py-3 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(emp._id)}
                                            onChange={() => handleCheckboxChange(emp._id)}
                                        />
                                    </td>
                                    <td className="px-4 py-2 text-center">{emp?.companyId?.name || 'N/A'}  </td>
                                    <td className="px-4 py-2 text-center">{emp?.name}</td>
                                    <td className="px-4 py-2 text-center">{emp?.father_husbandName}</td>
                                    <td>{new Date(emp?.dateOfBirth).toLocaleDateString('en-GB')}</td>
                                    <td className="px-4 py-2 text-center">{emp?.gender}</td>
                                    <td className="px-4 py-2 text-center">{emp?.maritalStatus}</td>
                                    <td className="px-4 py-2 text-center">{emp?.bloodGroup}</td>
                                    <td className="px-4 py-2 text-center">{emp?.personalPhoneNum}</td>
                                    <td>{new Date(emp?.joiningDate).toLocaleDateString('en-GB')}</td>
                                    
                                    

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
    );
}

export default Index;








