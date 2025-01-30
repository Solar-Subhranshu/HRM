import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TableListofCompany2() {
  const [departmentNameData, setDepartmentName] = useState([]);
  const [designationNameData, setDesignationName] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);  // Start with null
  const [selectedDesignationId, setSelectedDesignationId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dept, setDept] = useState('');
  const [designation, setDesignation] = useState('');
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isDesignationModalOpen, setIsDesignationModalOpen] = useState(false);
  const [isDesignationUpdateMode, setIsDesignationUpdateMode] = useState(false);

  // Fetch department data
  const fetchDepartmentNameData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-department`);
      setDepartmentName(response.data.data);
    } catch (error) {
      alert('Error: Unable to fetch department data');
    }
  };

  // Fetch designation data for the selected department
  const fetchDesignationData = async (departmentId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-designation?departmentId=${departmentId}`);
      setDesignationName(response.data.data);
    } catch (error) {
      alert('Error: Unable to fetch designation data');
    }
  };

  useEffect(() => {
    fetchDepartmentNameData();
  }, []);

  useEffect(() => {
    if (selectedDepartmentId) {
      fetchDesignationData(selectedDepartmentId); // Fetch designations based on the selected department
      setSelectedDesignationId(null); // Reset selected designation when department changes
    } else {
      setDesignationName([]);  // Clear designations if no department is selected
      setSelectedDesignationId(null); // Reset selected designation when department is deselected
    }
  }, [selectedDepartmentId]);

  // const handleDepartmentSelect = (id) => {
  //   setSelectedDepartmentId(id); // Select or deselect the department
  // };

  // const handleDesignationSelect = (id) => {
  //   setSelectedDesignationId(id); // Select or deselect a specific designation
  // };

  const handleDepartmentSelect = (id) => {
    setSelectedDepartmentId((prev) => (prev === id ? null : id)); // Toggle department selection
  };
  
  const handleDesignationSelect = (id) => {
    setSelectedDesignationId((prev) => (prev === id ? null : id)); // Toggle designation selection
  };

  const handleAddDepartment = () => {
    setDept('');
    setIsUpdateMode(false);
    setIsModalOpen(true);
  };

  const handleUpdateDepartment = () => {
    if (!selectedDepartmentId) {
      alert('Please select a department to update.');
      return;
    }

    const selectedDept = departmentNameData.find((d) => d.id === selectedDepartmentId);
    if (selectedDept) {
      setDept(selectedDept.empdept);
      setIsUpdateMode(true);
      setIsModalOpen(true);
    }
  };

  const handleSaveDepartment = async () => {
    if (!dept.trim()) {
      alert('Please enter a valid department name.');
      return;
    }

    try {
      if (isUpdateMode) {
        const response = await axios.put(`${process.env.REACT_APP_SERVER_ADDRESS}/common/update-dept`, {
          deptId: selectedDepartmentId,
          deptName: dept,
        });

        if (response.data) {
          alert('Department updated successfully!');
          setDepartmentName(
            departmentNameData.map((d) =>
              d.id === selectedDepartmentId ? { ...d, empdept: dept } : d
            )
          );
        } else {
          alert('Error: Department not updated.');
        }
      } else {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/common/add-department`, { dept });
        if (response.data) {
          alert('Department added successfully!');
          setDepartmentName([
            ...departmentNameData,
            { empdept: dept, id: response.data.id },
          ]);
        } else {
          alert('Error: Department not added.');
        }
      }

      setIsModalOpen(false);
      setDept('');
    } catch (error) {
      alert('Error: Unable to save department.');
    }
  };

  const handleAddDesignation = () => {
    if (!selectedDepartmentId) {
      alert('Please select a department before adding a designation.');
      return;
    }

    setDesignation('');
    setIsDesignationUpdateMode(false);
    setIsDesignationModalOpen(true);
  };

  const handleUpdateDesignation = () => {
    if (!selectedDepartmentId || !selectedDesignationId) {
      alert('Please select both a department and a designation to update.');
      return;
    }

    const selectedDesig = designationNameData.find((d) => d._id === selectedDesignationId);
    if (selectedDesig) {
      setDesignation(selectedDesig.designation);
      setIsDesignationUpdateMode(true);
      setIsDesignationModalOpen(true);
    }
  };

  const handleSaveDesignation = async () => {
    if (!designation.trim()) {
      alert('Please enter a valid designation name.');
      return;
    }

    try {
      if (isDesignationUpdateMode) {
        const selectedDesig = designationNameData.find((d) => d._id === selectedDesignationId);
        const response = await axios.put(`${process.env.REACT_APP_SERVER_ADDRESS}/common/update-designation`, {
          department: selectedDepartmentId, // Send selected department ID
          designation: selectedDesig?.designation, // Send current designation
          newDesignation: designation, // Send new designation value
        });

        if (response.data) {
          alert('Designation updated successfully!');
          setDesignationName(
            designationNameData.map((d) =>
              d._id === selectedDesignationId ? { ...d, designation: designation } : d
            )
          );
        } else {
          alert('Error: Designation not updated.');
        }
      } else {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/common/add-designation`, {
          department: selectedDepartmentId,
          designation: designation,
        });

        if (response.data) {
          alert('Designation added successfully!');
          setDesignationName([
            ...designationNameData,
            { designation, id: response.data.id },
          ]);
        } else {
          alert('Error: Designation not added.');
        }
      }

      setIsDesignationModalOpen(false);
      setDesignation('');
    } catch (error) {
      alert('Error: Unable to save designation.');
    }
  };

  return (
    <div className="ml-2 mr-2 mt-4">
      <div className="bgMainColor flex py-4 pl-1 gap-3">
        <h4 className="text-white">List of Company</h4>
      </div>

      <div className="flex justify-center gap-20 pt-6">
        {/* Department Table */}
        <table className="table-auto h-fit w-2/5 border border-gray-300">
          <thead className="border border-gray-300">
            <tr>
              <th className="text-blue-600/100 border border-gray-300 w-20">Select</th>
              <th className="text-blue-600/100 border border-gray-300">Department</th>
            </tr>
          </thead>
          <tbody>
            {departmentNameData.map(({ empdept, id }) => (
              <tr key={id}>
                <td className="border-t border-gray-300 flex justify-center items-center align-middle h-8">
                  <input
                    type="checkbox"
                    checked={selectedDepartmentId === id}
                    onChange={() => handleDepartmentSelect(id)} // Select or deselect the department
                  />
                </td>
                <td className="border border-gray-300 text-center">{empdept}</td>
              </tr>
            ))}
          </tbody>        
        </table>
        
        

        {/* Designation Table */}
        <table className="table-auto h-fit w-2/5 border border-gray-300">
          <thead className="border border-gray-300">
            <tr>
              <th className="text-blue-600/100 border border-gray-300 w-20">Select</th>
              <th className="text-blue-600/100 border border-gray-300">Designation</th>
            </tr>
          </thead>
          <tbody>
            {selectedDepartmentId && designationNameData.length > 0 ? (
              designationNameData.map(({ designation, _id }) => (
                <tr key={_id}>
                  <td className="border-t border-gray-300 flex justify-center items-center align-middle">
                    <input
                      type="radio"
                      name="designation"
                      onChange={() => handleDesignationSelect(_id)} // Select or deselect a specific designation
                    />
                  </td>
                  <td className="border border-gray-300 text-center">{designation}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center text-gray-500">
                  No designations available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      {/* all action button  */}
      <div className="flex justify-between mb-4 mt-12">
        <div className="flex gap-4">
          <button
            onClick={handleAddDepartment}
            className=" ml-28 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all"
          >
            Add Department
          </button>
          <button
            onClick={handleUpdateDepartment}
            className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all"
          >
            Update Department
          </button>
        </div>

        {/* Designation Buttons (Right Aligned) */}
        <div className="flex gap-4 mr-28">
          <button
            onClick={handleAddDesignation}
            className=" px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Add Designation
          </button>
          <button
            onClick={handleUpdateDesignation}
            className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition-all"
          >
            Update Designation
          </button>
        </div>
      </div>


      {/* Modal for Add/Update Department */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">
              {isUpdateMode ? 'Update Department' : 'Add Department'}
            </h2>
            <input
              type="text"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              placeholder="Enter Department Name"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDepartment}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Add/Update Designation */}
      {isDesignationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">
              {isDesignationUpdateMode ? 'Update Designation' : 'Add Designation'}
            </h2>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="Enter Designation Name"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDesignationModalOpen(false)}
                className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDesignation}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TableListofCompany2;






