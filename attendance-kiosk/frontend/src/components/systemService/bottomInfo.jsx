import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import leaveIcon from "../../assets/icons/leave.png";
import axios from "axios";

function BottomInfo({ studentCount = 60 }) {
  const [studentName, setStudentName] = useState("No face detected");
  const [studentStatus, setStudentStatus] = useState("Waiting...");
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get("http://localhost:8000/recognize-camera");
        if (res.data.status === "success") {
          setStudentName(res.data.name);
          setStudentStatus("Present");
        } else {
          setStudentName("No face detected");
          setStudentStatus("Waiting...");
        }
      } catch (err) {
        console.error(err);
      }
    }, 100); // 10 FPS recognition polling

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-gray-400 text-xs">ICON</span>
        </div>
        <div>
          <p className="font-bold text-left">{studentName}</p>
          <p className="text-left text-gray-400">{studentStatus}</p>
        </div>
      </div>
      <div className="flex justify-center ml-25">
        <button onClick={() => navigate("/landing")} className="focus:outline-none">
          <img src={leaveIcon} alt="Return" className="w-12 h-12 object-contain hover:opacity-80 transition-opacity" />
        </button>
      </div>
      <div className="text-right">
        <p className="font-bold">Student Present: {studentCount}</p>
        <p className="text-gray-400">
          {time.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" })}{" "}
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </p>
      </div>
    </div>
  );
}

export default BottomInfo;
