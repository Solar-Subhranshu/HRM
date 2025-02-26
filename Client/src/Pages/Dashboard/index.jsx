import React, { useEffect, useState } from 'react';
import Icon1 from '../../Assets/Images/Toilet Sign People-1.png';
import Icon2 from '../../Assets/Images/Toilet Sign People.png';
import Icon3 from '../../Assets/Images/User Single Neutral Male.png';
import Icon4 from '../../Assets/Images/People.png';
import AttendenceChart from '../../Component/Common/ListOfCompanyTable/index'
import MachineStatusTable from '../../Component/Common/AttendenceMachineStatusTable/index';
import RecentPuchShowTable from '../../Component/Common/RecentPuchShowTable/index';
import Card from '../../Component/Common/Card/index';
import axios from 'axios';

const Index = () => {
    
    const [data, setData] = useState(null);

    let response ;
    useEffect(() => {
        const fetchShowCountOfPALEmployee = async () => {
            try {
                response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/attendance/dashboard-data`);
                
                // Ensure data is present before accessing it
                if (response?.data?.success && response?.data?.data) {
                    const presentCount = Array.isArray(response.data.data.presentData) ? response.data?.data?.presentData?.length : 0;
                    const absentCount = Array.isArray(response?.data?.data?.absentData) ? response?.data?.data?.absentData?.length : 0;
                    const lateCount = Array.isArray(response.data.data.lateData) ? response.data.data.lateData.length : 0;
                    const totalCount = presentCount + absentCount + lateCount;
                    
                    console.log("absent employee data", absentCount);
                    setData({
                        "presentEmployees": Array.isArray(response.data.data.presentData) ? response.data?.data?.presentData?.length : 0,
                        "absentEmployees": Array.isArray(response?.data?.data?.absentData) ? response?.data?.data?.absentData?.length : 0,
                        "lateEmployees": Array.isArray(response.data.data.lateData) ? response.data.data.lateData.length : 0,
                        "totalEmployees": presentCount + absentCount + lateCount,
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchShowCountOfPALEmployee();
    }, [response]);
    

    return(
        <div className='flex flex-col gap-4 mx-2 pt-3' style={{ height: '90vh', overflow: 'auto'}}>
            <div className='flex justify-between' style={{ height: '40vh'}} >
                <AttendenceChart />
                <div className='flex flex-col justify-between items-end' style={{ height: '40vh'}}>
                    <div className='md:flex'>
                        <Card
                            iconName={Icon4}
                            cardHeading='Total Employee'
                            count={data?.totalEmployees || '0'}
                        />
                        <Card 
                            iconName={Icon1}
                            cardHeading='Present Employee'
                            count={data?.presentEmployees || '0'}
                        />
                    </div>
                    <div className='md:flex'>
                        <Card
                            iconName={Icon2}
                            cardHeading='Absent Employee'

                            count={data?.absentEmployees || '0'}
                        />
                       

                        <Card 
                            iconName={Icon3}
                            cardHeading='Late Employee'
                            count={data?.lateEmployees || '0'} 
                        />
                    </div>
                </div>
            </div>
            <div className='flex justify-between'>
                <MachineStatusTable />
                <RecentPuchShowTable />
            </div>
        </div>
    )
}

export default Index;