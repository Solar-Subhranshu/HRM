import React from 'react'
import {useNavigate} from 'react-router'
import BackgroundImage from '../../Assets/bg4.jpg'


function Index() {
    const navigates = useNavigate();

    const handleClicked = ()=>{
        navigates('/')
    }

  return (
    <div>
        <section className="bg-white">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
                    <p className="mb-4 text-lg font-medium">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                    <button onClick={handleClicked} className="inline-flex  bgMainColor text-white text-lg  focus:ring-2 focus:outline-none focus:ring-primary-500 font-medium rounded-md  px-5 py-3 text-center dark:focus:ring-gray-600 my-4">Back to Homepage</button>
                </div>   
            </div>
        </section>
    </div>
  )
}

export default Index