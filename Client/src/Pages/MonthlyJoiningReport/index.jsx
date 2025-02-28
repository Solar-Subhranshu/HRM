
import React, { useState } from "react";
import axios from "axios";

function MonthlyReport() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleDownload = async () => {
    if (!month || !year) {
      alert("Please select both month and year");
      return;
    }

    const formattedDate = `${year}-${month}-10`;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/report/monthly-joiningReport`,
        {},
        {
          params: { monthDate: formattedDate },
          responseType: "blob", // Ensure file download
        }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Monthly_Joining_Report_${year}_${month}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the report", error);
      alert("Failed to download report");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded shadow">
      <h2 className="text-lg font-bold mb-3">Download Monthly Joining Report</h2>
      <div className="mb-2">
        <label className="block mb-1">Select Month:</label>
        <select
          className="border p-2 rounded w-full"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">--Select Month--</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={String(i + 1).padStart(2, "0")}>
              {new Date(0, i).toLocaleString("en", { month: "long" })}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="block mb-1">Select Year:</label>
        <input
          type="number"
          className="border p-2 rounded w-full"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          min="2000"
          max={new Date().getFullYear()}
        />
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
        onClick={handleDownload}
      >
        Download Report
      </button>
    </div>
  );
}

export default MonthlyReport;
