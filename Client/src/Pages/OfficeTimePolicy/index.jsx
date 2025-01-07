import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaListUl } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function OfficePolicyTable() {
    const navigate = useNavigate();
    const [officePolicy, setOfficePolicy] = useState([]);
    const [selectedPolicy, setSelectedPolicy] = useState(null);

    const fetchOfficePolicyDetail = async () => {
        try {
            const response = await axios.get('http://localhost:8000/common/show-officeTimePolicy');
            setOfficePolicy(response.data.data);
        } catch (error) {
            alert('Unable to fetch data', error);
        }
    };

    useEffect(() => {
        fetchOfficePolicyDetail();
    }, []);

    const handleUpdatePolicy = () => {
        if (selectedPolicy) {
            // Set the selected policy ID in cookies
            Cookies.set('selectedPolicyId', selectedPolicy);
            navigate('/layout/updateofficytimepolicy');
        } else {
            alert('Please select a policy to update.');
        }
    };

    const handleListOfPolicy = () => {
        navigate('/layout/listofpolicytable');
    };

    const handleRowSelect = (policyId) => {
        // Set the selected policy ID, toggle selection if the same row is clicked again
        setSelectedPolicy(policyId === selectedPolicy ? null : policyId);
    };

    return (
        <div className='ml-2 mr-2 mt-4'>
            <div className='bgMainColor flex py-4 pl-1 gap-3 justify-between'>
                <div className='flex flex-row pl-2 gap-4'>
                    {<FaListUl size={24} />}
                    <h4 className='text-white'>List of Office Policies</h4>
                </div>
            </div>

            <div className='p-4'>
                <table className='table-auto w-full border border-black'>
                    <thead className='border border-black'>
                        <tr>
                            <th className='text-blue-600/100 border border-black w-20'>Select</th>
                            <th className='text-blue-600/100 border border-black'>Policy Name</th>
                            <th className='text-blue-600/100 border border-black'>Late Allow</th>
                            <th className='text-blue-600/100 border border-black'>P hrs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {officePolicy?.map(({ _id, policyName, permittedLateArrival, absent }) => (
                            <tr key={_id} className={`${selectedPolicy === _id ? 'bg-gray-200' : ''}`}>
                                <td className='border border-gray-400 flex justify-center items-center align-middle h-8'>
                                    <input
                                        type='radio'
                                        checked={selectedPolicy === _id}
                                        onChange={() => handleRowSelect(_id)}
                                    />
                                </td>
                                <td className='border border-black text-center'>{policyName}</td>
                                <td className='border border-black text-center'>{permittedLateArrival}</td>
                                <td className='border border-black text-center'>{absent !== undefined && absent !== null ? absent : "null"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='flex justify-center gap-6 mb-4 mt-4'>
                <div>
                    <button
                        onClick={handleUpdatePolicy}
                        className='px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all'
                    >
                        Update
                    </button>
                </div>
                <div>
                    <button
                        onClick={handleListOfPolicy}
                        className='px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all'
                    >
                        Add
                    </button>
                </div>
                <div>
                    <button className='px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all'>
                        Delete
                    </button>
                </div>
                <div>
                    <button className='px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all'>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OfficePolicyTable;

