import React, { useState } from "react";
import axios from "axios";

function Index() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Generate year options from 2000 to the current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1999 }, (_, i) => 2000 + i);

  const handleDownload = async () => {
    if (!month || !year) {
      alert("Please select both month and year");
      return;
    }

    const formattedDate = `${year}-${month}-10`;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/report/monthly-resignationReport`,
        {},
        {
          params: { monthDate: formattedDate },
          responseType: "blob", // Ensure proper file download
        }
      );

      // Convert Blob to JSON to check if `data` field is missing
      const text = await response.data.text();
      try {
        const jsonData = JSON.parse(text);

        // If `data` is undefined or empty, stop the download
        if (!jsonData.data || jsonData.data.length === 0) {
          alert("No data available for the selected month and year.");
          return;
        }
      } catch (e) {
        // If parsing fails, it means the response is a valid Excel buffer
      }

      // Proceed with Excel file download
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Monthly_Joining_Report_${year}_${month}.xlsx`);
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
      <h2 className="text-lg font-bold mb-3">Download Monthly Resignation Report</h2>
      
      {/* Month Selection */}
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

      {/* Year Selection */}
      <div className="mb-2">
        <label className="block mb-1">Select Year:</label>
        <select
          className="border p-2 rounded w-full"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">--Select Year--</option>
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>

      {/* Download Button */}
      <button
        className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
        onClick={handleDownload}
      >
        Download Report
      </button>
    </div>
  );
}

export default Index;
