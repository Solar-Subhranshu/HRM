import axios from "axios";
axios.defaults.withCredentials = true;
export const showReportingManager = async( setReportingManagers) =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/show-reportingManager`);
        setReportingManagers(response?.data?.data);
    } catch (error) {
        console.log("fetch the department name", error);
    }
}