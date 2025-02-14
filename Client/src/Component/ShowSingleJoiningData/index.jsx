import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EmployeeDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const { employee } = location.state || {};

    if (!employee) {
        return <div className="text-center text-red-500">No Employee Data Found</div>;
    }

    const handleApproveClicked = ()=>{
        navigate('/layout/approveForm', { state: { formId : employee?._id } })
    }

    return (
        <div className="p-4">
            <h2 className="text-center text-[#8B5DFF] text-xl font-semibold mb-2">Employee Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 border rounded-md shadow-lg p-2 gap-1 w-full">
                <div><strong>Company Name:</strong> {employee?.companyId?.name}</div>
                <div><strong>Employee Name:</strong> {employee?.name}</div>
                <div><strong>Father Name:</strong> {employee?.name}</div>
                <div><strong>Date of Birth:</strong> {new Date(employee?.dateOfBirth).toLocaleDateString('en-GB')}</div>
                <div><strong>Gender:</strong> {employee?.gender}</div>
                <div><strong>Marital Status:</strong> {employee?.maritalStatus}</div>
                <div><strong>Blood Group:</strong> {employee?.bloodGroup}</div>
                <div><strong>Personal Phone Number:</strong> {employee?.personalPhoneNum}</div>
                <div><strong>Personal Email:</strong> {employee?.personalEmail}</div>
                <div><strong>currentAddress:</strong> {employee?.currentAddress}</div>
                <div><strong>Current State:</strong> {employee?.currentState}</div>
                <div><strong>Current City:</strong> {employee?.currentCity}</div>
                <div><strong>Current PinCode:</strong> {employee?.currentPinCode}</div>
                <div><strong>Permanent Address:</strong> {employee?.permanentAddress}</div>
                <div><strong>Permanent State:</strong> {employee?.permanentState}</div>
                <div><strong>Permanent City:</strong> {employee?.permanentCity}</div>
                <div><strong>Permanent PinCode:</strong> {employee?.permanentPinCode}</div>
                <div><strong>Bank Name:</strong> {employee?.bankName}</div>
                <div><strong>Branch Name:</strong> {employee?.branchName}</div>
                <div><strong>Bank Account:</strong> {employee?.bankAccount}</div>
                <div><strong>Bank IFSC:</strong> {employee?.bankIFSC}</div>
                <div><strong>Bank Account Holder Name:</strong> {employee?.bankAccountHolderName}</div>
                <div><strong>Bank Address:</strong> {employee?.bankAddress}</div>
                <div><strong>PanCard:</strong> {employee?.panCard}</div>
                <div><strong>AadharCard:</strong> {employee?.aadharCard}</div>
                <div><strong>UanNumber:</strong> {employee?.uanNumber}</div>
                <div><strong>Department:</strong> {employee?.department?.department}</div>
                <div><strong>Designation:</strong> {employee?.designationdesignation}</div>
                <div><strong>Employee Type:</strong> {employee.employeeType}</div>
                <div><strong>Interview Date:</strong>{new Date(employee?.interviewDate).toLocaleDateString('en-GB')}</div>
                <div><strong>Joining Date:</strong>  {new Date(employee?.joiningDate).toLocaleDateString('en-GB')}</div>
                <div><strong>Mode Of Recruitment:</strong> {employee?.modeOfRecruitment}</div>
                <div><strong>Reference:</strong> {employee?.reference}</div>
                <div><strong>CTC:</strong> {employee?.salary?.ctc}</div>
                <div><strong>Employee ESI:</strong> {employee?.salary?.employeeESI}</div>
                <div><strong>Employee PF:</strong> {employee?.salary?.employeePF}</div>
                <div><strong>Employer ESI:</strong> {employee?.salary?.employerESI}</div>
                <div><strong>Employer PF:</strong> {employee?.salary?.employerPF}</div>
                <div><strong>Email:</strong> {employee?.personalEmail}</div>
            </div>

            <div className='mt-4 flex gap-2 pb-4'>
                {employee?.status=='Pending' && (
                    <>
                        <button onClick={handleApproveClicked} className='px-4 py-2 rounded-md bg-green-500 text-white font-semibold' >Approve</button>
                        <button className='px-4 py-2 rounded-md bg-red-500 text-white font-semibold'>Rejected</button>
                    </>
                )}
                
            </div>
            
                
            <button className="mt-4  bg-red-500 text-white p-2 rounded-md" onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
}

export default EmployeeDetails;
