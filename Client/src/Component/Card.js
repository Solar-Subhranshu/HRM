import React, { useState } from "react";
import icons1 from "../Assets/iconeimg.png";
import { IoPlaySkipForward } from "react-icons/io5";

function Card() {
  const [count, setCount] = useState(0);
  return (
    <div className="h-20 w-56 p-4">
        <fieldset className="border-2 border-gray-400">
            <legend>
                <img src={icons1} className="h-6 pl-1" />
            </legend>
            <div className=" pl-4 items-center">
                <div className="flex flex-col items-end pr-2">
                <h6 className="text-gray-700">Total Employee</h6>
                <p>{count}</p>
                </div>
                <hr className="h-px bg-gray-400 border-0 dark:bg-gray-400"/>
                <div className="flex items-center gap-1">
                   <p className="text-gray-700">view detail</p>
                    {<IoPlaySkipForward size={12} color="rgb(100, 100, 100)"/>}
                </div>
            </div>
        </fieldset>
    </div>
  );
}

export default Card;
