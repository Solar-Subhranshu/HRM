
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

function ManualPunch() {

  const [showAllEmployee, setShowAllEmployee]=useState([]);
  const [showShiftName, setShiftName]=useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedShift, setSelectedShift] = useState("");
  const [mode, setMode] = useState("all"); // "all" or "single"
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const fetchShiftNameData = async ()=>{
    try {
      const response=await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-shift`);
      setShiftName(response?.data?.data);
    } catch (error) {
      console.log('Unable to Fetch Shift Name', error);
    }
  }

  const fetchAllEmployeeNameWithId = async ()=>{
    try {
      const response=await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/showAllEmployee`);
      setShowAllEmployee(response?.data?.data);
    } catch (error) {
      console.log('Enable to fetch Employee Name With Id', error);
    }
  }
  

  useEffect(()=>{
    fetchAllEmployeeNameWithId();
    fetchShiftNameData();
  }, [])

 
  const handleSearch = (query) => {
    const filtered = showAllEmployee.filter(
      (emp) =>
        emp?.name?.toLowerCase().includes(query.toLowerCase()) ||
        emp?.employeeCode?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const handleShiftChange = (shiftId) => {
    setSelectedShift(shiftId);
  
    if (mode === "all") {
      const filtered = showAllEmployee?.filter(
        (emp) => emp.shift?._id === shiftId
      );
      setFilteredEmployees(filtered);
      setSelectedEmployees(filtered?.map((emp) => emp._id)); // Automatically select all filtered employees
    }
  };

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  
    if (selectedMode === "all" && selectedShift) {
      // Filter employees by shift
      const filtered = showAllEmployee?.filter((emp) => emp.shift === selectedShift);
      setFilteredEmployees(filtered);
      setSelectedEmployees(filtered?.map((emp) => emp._id));
    } else if (selectedMode === "all") {
      // Select all employees
      setFilteredEmployees(showAllEmployee);
      setSelectedEmployees(showAllEmployee?.map((emp) => emp._id));
    } else if (selectedMode === "single") {
      // Show all employees without pre-selection
      setFilteredEmployees(showAllEmployee);
      setSelectedEmployees([]);
    }
  };
  

  const handleEmployeeSelection = (id) => {
    // In single mode, only allow one employee to be selected
   if (mode === "single") {
    setSelectedEmployees((prev) =>
      prev.includes(id) ? [] : [id] // Deselect if selected, otherwise select
    );
   }else {
    setSelectedEmployees((prev) =>
      prev?.includes(id)
        ? prev?.filter((empId) => empId !== id)
        : [...prev, id]
    );
  }
  };

  return (
    <>
      <div className="h-screen px-8 pt-4 bg-gray-100">
        <fieldset className="border-4 rounded-md mb-4" style={{ borderColor: "#740FD6" }}>
          <legend className="font-bold text-lg ml-8" style={{ color: "#740FD6" }} > &nbsp;&nbsp; Manual Punch &nbsp;&nbsp; </legend>
          <div className="flex flex-col md:flex-row">

            {/* First Column */}
            <div className="w-full md:w-80 border-r border-gray-500 p-4">
              <h3 className="font-semibold text-lg">Selection By</h3>
              <div className="mt-2 md:mt-4">
                <div className="flex items-center gap mb-2">
                  <input 
                    type="radio" 
                    className="mr-2"  
                    checked={mode === "all"}
                    onChange={() => handleModeChange("all")}
                  />
                  <label>All Employee</label>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Select Shift</label>
                    <select 
                      className="mt-2 block w-full rounded-md border-2 border-gray-500 p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      onChange={(e) => handleShiftChange(e.target.value)}
                      value={selectedShift}
                      disabled={mode !== "all"}
                    >
                      <option >--Select Shift--</option>
                      {showShiftName.map(({name, _id})=>(
                        <option key={_id} value={_id}>{name}</option>
                      ))}
                    </select>
                  </div>

                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    className="mr-2" 
                    checked={mode === "single"}
                    onChange={() => handleModeChange("single")}
                  />
                  <label>Single Employee</label>
                </div>
                <hr className="my-4" />

                {/* search bar section  */}
                <div className="relative mt-4">
                  <span className="absolute mt-3 left-3 flex items-center text-gray-500">
                    <IoSearchOutline size={20}/>
                  </span>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full rounded-md border border-gray-500 py-2 px-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                
                 {/* employee table  */}
                  <div className=" border border-gray-500">
                    <table className="table-auto w-full border-collapse border border-gray-500">
                      <thead className="border border-gray-500 sticky top-0 bg-white z-2">
                        <tr>
                          <th className="text-blue-600/100 border border-gray-500 w-10">Select</th>
                          <th className="text-blue-600/100 border border-gray-500">Employee</th>
                        </tr>
                      </thead>
                    </table>
          
                    <div className="max-h-[350px] overflow-y-auto">
                      <table className="table-auto w-full border-collapse border border-gray-500">
                        <tbody>
                          {filteredEmployees.map(({ _id, name,employeeCode, shift }) => (
                            <tr key={_id}>
                              <td className=" border border-gray-500  w-10 text-center items-center align-middle h-8" style={{width : 'max-width'}}>
                                <input
                                  type="checkbox"
                                  checked={selectedEmployees.includes(_id)}
                                  onChange={() => handleEmployeeSelection(_id)}
                                />
                              </td>
                              <td className="border border-gray-500 pl-2">{name}({employeeCode})</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Second Column */}
            <div className="flex-1 p-4">
              {/* Manual Punch Entry */}
              <form>
                <fieldset className="border-2 rounded-md mb-4" style={{ borderColor: "#740FD6" }}>
                  <legend className="font-semibold text-lg ml-8" style={{ color: "#740FD6" }}> &nbsp;&nbsp; Manual Punch Entry &nbsp;&nbsp; </legend>
                  <div className="grid gap-2 md:gap-6 m-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                    {/* Date Field */}
                    <div>
                      <label className="block mb-1 font-medium">Date</label>
                      <input
                        type="date"
                        className="w-full rounded-md border border-gray-500 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    {/* In Time Field */}
                    <div>
                      <label className="block mb-1 font-medium">In Time</label>
                      <input
                        type="time"
                        className="w-full rounded-md border border-gray-500 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    {/* Out Time Field */}
                    <div>
                      <label className="block mb-1 font-medium">Out Time</label>
                      <input
                        type="time"
                        className="w-full rounded-md border border-gray-500 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div className="text-right mt-4 pr-4 pb-2">
                    <button
                      type="submit"
                      className="px-4 py-2 text-white font-semibold rounded-md shadow-md bg-green-600 hover:bg-green-800 transition-all"
                    >
                      Insert Punch
                    </button>
                  </div>
                </fieldset>
              </form>

              {/* View Punch */}
              <fieldset className="border-2 rounded-md mb-4" style={{ borderColor: "#740FD6" }}>
                <legend className="font-semibold text-lg ml-8" style={{ color: "#740FD6" }} > &nbsp;&nbsp; View Punch &nbsp;&nbsp; </legend>
                <div className="px-4 pb-2">
                  <div className="grid gap-6 mb-6 md:grid-cols-3">
                    {/* From Date Field */}
                    <div>
                      <label className="block mb-1 font-medium">From Date</label>
                      <input
                        type="date"
                        className="w-full rounded-md border border-gray-500 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    {/* To Date Field */}
                    <div>
                      <label className="block mb-1 font-medium">To Date</label>
                      <input
                        type="date"
                        className="w-full rounded-md border border-gray-500 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex  justify-end gap-4">
         
                      <div>
                        <div>  &nbsp; </div>
                      <button className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-800 transition-all">
                        View Punch
                      </button>
                      </div>
                      <div>
                        <div>
                          &nbsp;
                        </div>
                      <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-800 transition-all">
                        Delete
                      </button>
                      </div>

                    </div>

                  </div>   
                  

                  {/* Punch Table */}
                  <table className="w-full border-collapse border border-gray-300 text-sm text-center">
                    <thead>
                      <tr className="bg-gray-300">
                        <th className="border border-gray-500 px-2 py-1">Select</th>
                        <th className="border border-gray-500 px-2 py-1"> Emp. Code</th>
                        <th className="border border-gray-500 px-2 py-1">Department</th>
                        <th className="border border-gray-500 px-2 py-1">Punch DateTime</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-500 px-2 py-1">
                          <input type="checkbox" />
                        </td>
                        <td className="border border-gray-500 px-2 py-1">430</td>
                        <td className="border border-gray-500 px-2 py-1">Infra Team</td>
                        <td className="border border-gray-500 px-2 py-1">Jan 7 2025</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </fieldset>
            </div>
          </div>
        </fieldset>
      </div>
    </>
  );
}

export default ManualPunch;



