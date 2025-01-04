import React from 'react'

function TableComponent1() {
  return (
    <div className='w-[calc(100%-30%)]'>
        <div className='bgMainColor py-5 w-full'>
        <h6 className='text-white pl-2'>Machine Connected Status</h6>
        </div>
        <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-black">
        <thead>
          <tr>
            <th className='border border-black'>S No.</th>
            <th className='border border-black'>Machine no.</th>
            <th className='border border-black'>Location</th>
            <th className='border border-black'>Total logs</th>
            <th className='border border-black'>Connected Status</th>
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