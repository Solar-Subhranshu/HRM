import axios from "axios";
axios.defaults.withCredentials = true;
export const showQulification = async(setQulificationData)=>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-qualification`);
        setQulificationData(response.data.data);
    } catch (error) {
        console.log("Enable to fetch Qulification Data", error);
    }
}