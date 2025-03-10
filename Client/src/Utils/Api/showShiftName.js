import axios from "axios";
axios.defaults.withCredentials = true;
export const showShiftName = async( setShiftName) =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-shift`);
        setShiftName(response?.data?.data);
    } catch (error) {
        console.log("fetch the department name", error);
    }
}