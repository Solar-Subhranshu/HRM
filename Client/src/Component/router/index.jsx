import React from 'react';
import Layout from '../Layout/index';
import LoginPage from '../../Pages/FrontPage/index'
import Dashboard from '../../Pages/Dashboard/index'
import DepartmentTable from '../../Pages/ListOfDepartment/index'
import ListofAllEmployee from '../../Pages/ShowListOfAllEmployee/index'
import OfficeTimePolicy from '../../Pages/OfficeTimePolicy/index'
import ListOfPolicyTable from '../../Component/Common/ListOfPolicyTable/index'
import ShiftDetails from '../../Pages/ShiftDetails/index'
import ShiftDetailsTable from '../../Component/Common/ShiftDetailsTable/index'
import EmployeeRegister from '../../Pages/EmployeeRegisterForm/index'
import EmployeeUpDateForm from '../../Pages/UpDateEmployeeDetails/index'
import EmployeeDetailsPage from '../../Component/ShowParticularEmployeeDetails/index'
import UpdateShiftDetails from '../../Pages/UpDateShiftDetails';
import UpdateOfficeTimePolicy from '../../Pages/UpDateOfficeTimePolicy/index'
import CompanyBranchTable from '../../Pages/CompanyBranchtable/index'
import ManualPunch from '../../Pages/ManualPunch/index'
import DailyReportPage from '../../Pages/DailyReport/index'

import DuplicateAndInvalidempData from '../../Pages/DuplicateAndInvalidEmployee/index'
import { Routes, Route } from 'react-router-dom';

const Router = () => {
    return(
        <Routes>
           <Route path="/" element={<LoginPage />} />

          {/* Protected Layout */}
          <Route path="/layout" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="departmenttable" element={<DepartmentTable/>} />
            <Route path='listofallemployee' element={<ListofAllEmployee/>} />
            <Route path='officetimepolicytable' element={<OfficeTimePolicy/>} />
            <Route path='listofpolicytable' element={<ListOfPolicyTable/>} />
            <Route path='shiftdetails' element={<ShiftDetails/>} />
            <Route path='shiftdetailstable' element={<ShiftDetailsTable/>} />
            <Route path='Registrationform' element={<EmployeeRegister/>} />
            <Route path='employeeupdateform' element={<EmployeeUpDateForm/>} />
            <Route path='employeeDetails' element={<EmployeeDetailsPage />} />
            <Route path='updateshiftdetails' element={<UpdateShiftDetails/>} />
            <Route path='updateofficytimepolicy' element={<UpdateOfficeTimePolicy/>} />
            <Route path='companybranchtable' element={<CompanyBranchTable/>} />
            <Route path='invalid-duplicate-data' element={<DuplicateAndInvalidempData/>} />
            <Route path='manualpunch' element={<ManualPunch />} />
            <Route path='dailyreportcomponent' element={<DailyReportPage/>} />
            
          </Route>
        </Routes>
    )
}

export default Router;


