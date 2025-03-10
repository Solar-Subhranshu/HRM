import axios from "axios";
axios.defaults.withCredentials = true;
export const showBranch = async (setBranchNameData ,selectedCompanyNameId)=>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/common/show-branch?companyID=${selectedCompanyNameId}`);
        setBranchNameData(response.data.data);
    } catch (error) {
        console.log("Enable to fetch designation data", error)
    }

}