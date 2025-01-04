import React from "react";
import { Route, Routes } from "react-router-dom";
// import NavigationBar from './Navbars';
// import EmpPolicyDetailTable from './EmpPolicyDetailTable';
import FrontPage from "./FrontPage";
import AddNewCompany from "./AddNewCompany";

const RouterComponent = () => {
    return(
        <Routes>
            {/* <Route path="nav" element={<NavigationBar />} />
            <Route path="/emp-policy-details" element={<EmpPolicyDetailTable />} /> */}
             <Route path="/" element={<FrontPage />} />
             <Route path="/add-new-company" element={<AddNewCompany />} />
        </Routes>
    )
}

export default RouterComponent;