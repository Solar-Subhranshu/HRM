import axios from "axios";
axios.defaults.withCredentials = true;
export const showWorkType = async( setWorkTypeData) =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-workType`);
        setWorkTypeData(response?.data?.data);
    } catch (error) {
        console.log("fetch the department name", error);
    }
}