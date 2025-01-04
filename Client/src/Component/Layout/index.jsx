import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavBar from '../TopNavBar/index';

const Index = () => {
    return(
        <div>
            <header className='bg-red-500'>
                <TopNavBar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>

            </footer>
        </div>
    )
}

export default Index;