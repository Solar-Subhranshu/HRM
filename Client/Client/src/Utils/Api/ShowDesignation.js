import axios from "axios";
axios.defaults.withCredentials = true;
export const showDesignation = async (setDeginationData ,_id)=>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-designation?departmentId=${_id}`);
        setDeginationData(response.data.data);
    } catch (error) {
        console.log("Enable to fetch designation data", error)
    }

}