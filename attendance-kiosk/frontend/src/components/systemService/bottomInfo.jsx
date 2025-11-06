import React, { useState, useEffect } from "react";
import axios from "axios";

// Base URL for backend API. Allow overriding with Vite env var VITE_API_BASE
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

function BottomInfo({ studentCount = 60 }) {
  const [studentName, setStudentName] = useState("Not Available");
  const [studentStatus, setStudentStatus] = useState("Service inactive");
  const [sessionInfo, setSessionInfo] = useState(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Poll only when a session is active (sessionInfo.class_id present). Otherwise show Not Available.
    let mounted = true;
    const poll = async () => {
      if (!mounted) return;
      if (!(sessionInfo && sessionInfo.class_id)) {
        // no active session: show Not Available
        setStudentName("Not Available");
        setStudentStatus("Service inactive");
        return;
      }

      try {
        const res = await axios.get(`${API_BASE}/recognize-camera`);
        const data = res.data || {};
        switch (data.status) {
          case "success":
            setStudentName(data.name || "Unknown");
            if (data.registered === false) {
              setStudentStatus("Denied - Not registered");
            } else {
              setStudentStatus("Present");
            }
            break;
          case "no_face":
            setStudentName("No face detected");
            setStudentStatus("Waiting...");
            break;
          case "denied":
            if (data.reason === "not_registered") {
              setStudentName(data.name || "Unknown");
              setStudentStatus("Denied - Not registered");
            } else {
              setStudentName(data.name || "Denied");
              setStudentStatus("Denied");
            }
            break;
          case "unknown":
          default:
            setStudentName("Unknown");
            setStudentStatus("Unknown");
            break;
        }
      } catch (err) {
        console.error(err);
      }
    };

    // use a repeating interval while mounted; interval function checks session state each tick
    const id = setInterval(poll, 100); // ~10 FPS when active
    // run immediately once
    poll();

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [sessionInfo]);

  // Poll for recognized teacher (low rate)
  // Note: start/stop flow moved into CameraFeed overlay. BottomInfo no longer polls for teacher detection.

  // Poll current session (to reflect started state)
  useEffect(() => {
    let mounted = true;
    const fetchSession = async () => {
      try {
        const res = await axios.get(`${API_BASE}/session`);
        if (!mounted) return;
        setSessionInfo(res.data && res.data.session ? res.data.session : null);
      } catch (e) {
        // ignore
      }
    };
    fetchSession();
    const id = setInterval(fetchSession, 3000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  return (
    <div className="relative flex justify-between items-center w-full">
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
        {/* Start/Stop controls moved to camera overlay. */}
      </div>

      {/* Start/stop modal and controls moved into CameraFeed overlay; removed from BottomInfo */}
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
