import React from 'react'

function TableComponent1() {
  return (
    <div className='w-[calc(100%-30%)]'>
        <div className='bgMainColor py-5 w-full rounded-md'>
          <h6 className='text-white pl-2'>Machine Connected Status</h6>
        </div>
        
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-600 rounded-md">
            <thead>
              <tr>
                <th className='border border-gray-500'>S No.</th>
                <th className='border border-gray-500'>Machine no.</th>
                <th className='border border-gray-500'>Location</th>
                <th className='border border-gray-500'>Total logs</th>
                <th className='border border-gray-500'>Connected Status</th>
              </tr>
            </thead>
            <tbody>
              {/* data will be inserted in dynamically  */}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default TableComponent1