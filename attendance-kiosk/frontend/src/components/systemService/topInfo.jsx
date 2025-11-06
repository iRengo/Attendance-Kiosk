import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Base URL for backend API. Allow overriding with Vite env var VITE_API_BASE
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

function TopInfo({ teacherName: propTeacherName = "", title = "Teacher", classNameText: propClassName = "" }) {
  const [sessionInfo, setSessionInfo] = useState(null);

  // Poll current session to display active class when started
  useEffect(() => {
    let mounted = true;
    const fetchSession = async () => {
      try {
        const res = await fetch(`${API_BASE}/session`);
        if (!res.ok) return;
        const json = await res.json();
        if (!mounted) return;
        setSessionInfo(json.session || null);
      } catch (e) {
        // ignore
      }
    };
    fetchSession();
    const id = setInterval(fetchSession, 3000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  // Only show teacher name and subject when a session is active and class is chosen
  const isActive = sessionInfo && sessionInfo.class_id;
  const teacherName = isActive ? (sessionInfo.teacher_name || propTeacherName) : "";
  const classNameText = isActive ? (sessionInfo.class_name || propClassName) : "";
  const titleText = isActive ? "Active" : "Service inactive";

  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-gray-400 text-sm">ICON</span>
        </div>
        <div>
          <p className="font-bold text-xl">{isActive ? teacherName : ""}</p>
          <p className={`mt-1 text-left ${isActive ? 'text-green-300' : 'text-gray-400'}`}>{titleText}</p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-bold text-xl">{isActive ? classNameText : ""}</p>
        <p className="text-sm text-gray-300 mt-1 cursor-pointer hover:text-gray-100" onClick={() => navigate('/landing')}>Return</p>
      </div>
    </div>
  );
}

export default TopInfo;
