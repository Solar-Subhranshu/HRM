import React from "react";



function Index() {

  return (
    <div className="pl-2 w-full pr-2 pt-4 ">
      {/* Header Section */}
      <div className="bgMainColor flex py-2 pl-1 pb-1 justify-between rounded-md">
        <div className="flex justify-start">

          <h4 className="text-white ml-2 mt-1">List of Qualification</h4>
        </div>
        <div className="flex justify-end">
        <button className="font-semibold mr-2 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  rounded-lg text-sm px-5 py-2 text-center me-2 mb-1">Add Qualification</button>
        <button  className="font-semibold mr-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800  rounded-lg text-sm px-5 py-2 text-center me-2 mb-1">Update Qualification</button>
        </div>
      </div>

      
      
    
      {/* Header Section */}
      <div className="bgMainColor flex py-2 pl-1 pb-1 justify-between mt-4 rounded-md">
        <div className="flex justify-start ">
          <h4 className="text-white ml-2 mt-1">List of Degree</h4>
        </div>
        <div className="flex justify-end">
          <button  className="font-semibold mr-2 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  rounded-lg text-sm px-5 py-2 text-center me-2 mb-1">Add Degree</button>
          <button  className="font-semibold mr-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800  rounded-lg text-sm px-5 py-2 text-center me-2 mb-1">Update Degree</button>
        </div>
      </div>
      
    
    </div>
  );
}

export default Index;








