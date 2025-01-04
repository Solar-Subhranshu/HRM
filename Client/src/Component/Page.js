import React from 'react'
import Registration from './Registration'
import AddEditEmployeeTable from './AddEditEmployeeTable'
import Navbars from './Navbars'
import { useNavigate } from 'react-router-dom';

function Page() {
  return (
    <div className=''>
        <Navbars/>
        <div className='pt-2'>
        <Registration/>
        <AddEditEmployeeTable/>
        </div>
        
    </div>
  )
}

export default Page