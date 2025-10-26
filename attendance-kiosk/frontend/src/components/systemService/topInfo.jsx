import React from "react";

function TopInfo({ teacherName = "Professor X", title = "Teacher", classNameText = "DCIT - 50" }) {
  return (
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-gray-400 text-sm">ICON</span>
        </div>
        <div>
          <p className="font-bold text-xl">{teacherName}</p>
          <p className="text-left text-gray-400">{title}</p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-bold text-xl">{classNameText}</p>
      </div>
    </div>
  );
}

export default TopInfo;
