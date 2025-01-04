

import React, { useState } from "react";
import { IoPlaySkipForward } from "react-icons/io5";

function Card({ iconName, cardHeading, count }) {
  const [currentCount, setCount] = useState(count);

  return (
    <div className=" w-56 p-4">
      <fieldset className="border-2 border-gray-400">
        <legend>
          <img src={iconName} className="h-6 pl-1" alt={cardHeading} />
        </legend>
        <div className="pl-4 items-center">
          <div className="flex flex-col items-end pr-2">
            <h6 className="text-gray-700">{cardHeading}</h6>
            <p>{currentCount}</p>
          </div>
          <hr className="h-px bg-gray-400 border-0 dark:bg-gray-400" />
          <div className="flex items-center gap-1">
            <p className="text-gray-700">view detail</p>
            <IoPlaySkipForward size={12} color="rgb(100, 100, 100)" />
          </div>
        </div>
      </fieldset>
    </div>
  );
}

export default Card;
