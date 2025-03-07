import axios from "axios";
axios.defaults.withCredentials = true;
export const showCompany = async(setCompanyName)=>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-company`);
        setCompanyName(response.data.data);
    } catch (error) {
        console.log("Enable to fetch company name", error);
    }
}