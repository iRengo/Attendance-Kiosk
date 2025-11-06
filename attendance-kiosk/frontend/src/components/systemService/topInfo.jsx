import React, { useState, useEffect } from "react";

// Base URL for backend API. Allow overriding with Vite env var VITE_API_BASE
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

function TopInfo({ teacherName: propTeacherName = "Professor X", title = "Teacher", classNameText: propClassName = "Service not started" }) {
  const [recognizedTeacher, setRecognizedTeacher] = useState(null);

  // Poll /recognize-teacher to show a detected teacher when available
  useEffect(() => {
    let mounted = true;
    let id = null;
    const fetchRecognized = async () => {
      try {
        const res = await fetch(`${API_BASE}/recognize-teacher`);
        if (!res.ok) return;
        const json = await res.json();
        if (!mounted) return;
        setRecognizedTeacher(json);
      } catch (e) {
        // ignore network errors
      }
    };

    fetchRecognized();
    id = setInterval(fetchRecognized, 1500);

    return () => {
      mounted = false;
      if (id) clearInterval(id);
    };
  }, []);

  const teacherName = (recognizedTeacher && recognizedTeacher.status === "success")
    ? (recognizedTeacher.name || propTeacherName)
    : propTeacherName;
  const classNameText = (recognizedTeacher && Array.isArray(recognizedTeacher.classes) && recognizedTeacher.classes.length > 0)
    ? (recognizedTeacher.classes[0].name || propClassName)
    : propClassName;
  const titleText = (recognizedTeacher && recognizedTeacher.status === "success") ? "Teacher detected" : "Service inactive";

  return (
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-gray-400 text-sm">ICON</span>
        </div>
        <div>
          <p className="font-bold text-xl">{teacherName}</p>
          <p className="text-left text-gray-400">{titleText}</p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-bold text-xl">{classNameText}</p>
      </div>
    </div>
  );
}

export default TopInfo;
