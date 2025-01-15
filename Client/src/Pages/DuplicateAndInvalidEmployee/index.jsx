import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Helper function to format the key
const formatKey = (key) => {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // Convert camelCase to hyphenated
    .replace(/_/g, '-')  // Convert underscores to hyphens
    .replace(/-/g, ' ')  // Replace hyphens with spaces temporarily
    .toLowerCase() // Convert to lowercase
    .replace(/(^|\s)\S/g, (match) => match.toUpperCase()) // Capitalize the first letter of each word
    .replace(/ /g, '-'); // Convert spaces back to hyphens
};

function InvalidDuplicateData() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { duplicateData, invalidData } = location.state || { duplicateData: [], invalidData: [] };

  return (
    <div className="p-4">
      <div className="bgMainColor flex py-2 pl-1 gap-3 justify-between">
        <h4 className="text-lg font-medium text-white ml-2">Data Import Issues</h4>
        <h6 className="text-lg font-medium text-white mr-2">Invalid Entry</h6>
      </div>

      {/* Invalid Data Section */}
      {invalidData.length > 0 && (
        <div className="mb-6">
          <div className="overflow-hidden" style={{ maxHeight: "250px", display: "flex", flexDirection: "column" }}>
            <table className="table-auto w-full border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-1">Employee Code</th>
                  <th className="border px-4 py-1">Employee Name</th>
                  <th className="border px-4 py-1">Other Fields</th>
                </tr>
              </thead>
            </table>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border">
                <tbody>
                  {invalidData.map((item, index) => {
                    // Find keys with "NA" values
                    const keysWithNA = Object.keys(item).filter((key) => item[key] === "NA");
                    return (
                      <tr key={index}>
                        <td className="border px-4 py-2">{item.employeeCode || "N/A"}</td>
                        <td className="border px-4 py-2">{item.name || "N/A"}</td>
                        <td className="border px-4 py-2">
                          {keysWithNA.length > 0
                            ? keysWithNA
                                .map((key, i) => formatKey(key))  // Format each key
                                .join(", ")  // Join with commas
                            : "No 'NA' fields"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Duplicate Data Section */}
      {duplicateData.length > 0 && (
        <div>
          <div className="bgMainColor flex py-2 pl-1 gap-3 justify-between">
          <h4 className="text-lg font-medium text-white ml-2">Data Import Issues</h4>
            <h4 className="text-lg font-medium text-white ml-2">Duplicate Entry</h4>
          </div>
          <div className="overflow-hidden" style={{ maxHeight: "250px", display: "flex", flexDirection: "column" }}>
            <table className="table-auto w-full border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-1">Employee Code</th>
                  <th className="border px-4 py-1">Employee Name</th>
                </tr>
              </thead>
            </table>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border">
                <tbody>
                  {duplicateData.map((item, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{item.employeeCode}</td>
                      <td className="border px-4 py-2">{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-4">
        <button
          onClick={() => navigate('/layout/dashboard')}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default InvalidDuplicateData;
