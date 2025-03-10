import axios from "axios";
axios.defaults.withCredentials = true;
export const showDegree = async(selectedQualificationId, setDegreeData)=>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-degree?qualificationId=${selectedQualificationId}`);
        setDegreeData(response.data.data);
    } catch (error) {
        console.log("Enable to fetch Qulification Data", error);
    }
}