import React from "react";
import { FaChevronUp } from "react-icons/fa";

function SwipeHint({ text = "Swipe up to login" }) {
  return (
    <div className="flex items-center space-x-2 text-gray-300 animate-pulse">
      <span className="text-lg sm:text-xl md:text-2xl">{text}</span>
      <FaChevronUp className="text-xl ml-4 sm:text-2xl md:text-3xl" />
      
    </div>
  );
}

export default SwipeHint;
