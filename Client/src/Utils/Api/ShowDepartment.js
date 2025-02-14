import axios from "axios";
axios.defaults.withCredentials = true;
export const showDepartment = async( setShowDepartment) =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-department`);
        console.log("department",response?.data?.data)
        setShowDepartment(response?.data?.data);
    } catch (error) {
        console.log("fetch the department name", error);
    }
}