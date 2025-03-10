import axios from "axios";
axios.defaults.withCredentials = true;
export const showOfficyTimePolicy = async( setOfficeTimePolicy) =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-officeTimePolicy`);
        setOfficeTimePolicy(response?.data?.data);
    } catch (error) {
        console.log("fetch the department name", error);
    }
}