
import React from 'react'

function TableComponent() {
  return (
    <div className="overflow-x-auto ml-2 pt-1">
        <table className="table-auto w-4/5 border-collapse border border-black">
            <thead className="bgMainColor">
                <tr>
                    <th colSpan={2} className="text-left text-white px-4 py-2 ">Attendance Chart</th>
                    <th className="text-right text-white px-4 py-2  border-black">Department Wise Report</th>
                </tr>
            </thead>
            <tbody className="overflow-y-auto" style={{ height: '30vh' }}>
                <tr className="border-b border-black">
            
                </tr>
                {/* Add more rows as needed */}
            </tbody>
        </table>
    </div>
  )
}

export default TableComponent
