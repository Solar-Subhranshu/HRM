import React from 'react'

function TableComponent2() {
  return (
    <div className="overflow-x-auto pl-1">
        <table className="table-auto w-2/5 border-collapse border border-black">
            <thead className="bgMainColor">
                    <th className="text-left text-white px-4 py-2 ">Recent Punch</th>
                    <th className="text-right text-white px-4 py-2">View All</th>
            </thead>
            <tbody>
                 {/* data are come from dynamically here */}
                <tr>
                    <td>hello</td>
                    <td>welcome</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default TableComponent2


