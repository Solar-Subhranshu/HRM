import React, { useState } from 'react';

const TimeSelector = ( { hour, setHour, minute, setMinute, ampm, setAmpm}) => {
  // Function to toggle AM/PM
  const toggleAmpm = () => {
    setAmpm((prevAmpm) => (prevAmpm === 'AM' ? 'PM' : 'AM'));
  };

  // Handle keydown event for AM/PM toggle
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      toggleAmpm();
    }
  };

  return (
    <div className="flex gap-2">
      {/* Hour Input */}
      <input
        type="number"
        value={hour}
        min="1"
        max="12"
        onChange={(e) => setHour(Math.max(1, Math.min(12, e.target.value)))}
        className="w-15 h-8 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <span className="text-xl">:</span>
      {/* Minute Input */}
      <input
        type="number"
        value={minute}
        min="0"
        max="59"
        onChange={(e) => setMinute(Math.max(0, Math.min(59, e.target.value)))}
        className="w-15 h-8 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* AM/PM Toggle */}
      <div
        className="flex items-center space-x-2"
        tabIndex="0"
        onKeyDown={handleKeyDown}
        onClick={toggleAmpm}
      >
        <span
          className="bg-gray-200 text-sm text-gray-700 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {ampm}
        </span>
      </div>
    </div>
  );
};

export default TimeSelector;
