import React from 'react';
import Icon1 from '../../Assets/Images/Toilet Sign People-1.png';
import Icon2 from '../../Assets/Images/Toilet Sign People.png';
import Icon3 from '../../Assets/Images/User Single Neutral Male.png';
import Icon4 from '../../Assets/Images/People.png';
import AttendenceChart from '../../Component/Common/ListOfCompanyTable/index'
import MachineStatusTable from '../../Component/Common/AttendenceMachineStatusTable/index';
import RecentPuchShowTable from '../../Component/Common/RecentPuchShowTable/index';
import Card from '../../Component/Common/Card/index';

const index = () => {
    return(
        <div className='flex flex-col gap-4 mx-2 pt-3' style={{ height: '90vh', overflow: 'auto'}}>
            <div className='flex justify-between' style={{ height: '40vh'}} >
                <AttendenceChart />
                <div className='flex flex-col justify-between items-end' style={{ height: '40vh'}}>
                    <div className='flex'>
                        <Card
                            iconName={Icon4}
                            cardHeading='Total Employee'
                            count={100}
                        />
                        <Card 
                            iconName={Icon1}
                            cardHeading='Present Employee'
                            count={100}
                        />
                    </div>
                    <div className='flex'>
                        <Card
                            iconName={Icon2}
                            cardHeading='Absent Employee'
                            count={100}
                        />
                        <Card 
                            iconName={Icon3}
                            cardHeading='Late Employee'
                            count={100}
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

export default index;