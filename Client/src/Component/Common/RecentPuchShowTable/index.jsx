import React from 'react'

const TableComponent2 = () => {
  return (
    <div className="w-[calc(100%-65%)] overflow-x-auto pl-3">
        <table className="table-auto w-full border-collapse border border-gray-400">
            <thead className="bgMainColor">
                    <th className="text-left text-white md:px-4 md:py-2 ">Recent Punch</th>
                    <th className="text-right text-white md:px-4 md:py-2">View All</th>
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

export default TableComponent2;