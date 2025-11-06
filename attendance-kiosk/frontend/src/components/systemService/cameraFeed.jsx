import React, { useRef, useEffect } from "react";
import axios from "axios";

// Base URL for backend API. Allow override with Vite env var VITE_API_BASE
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

function CameraFeed() {
  const imgRef = useRef(null);
  const lastUrl = useRef(null);

  useEffect(() => {
    let canceled = false;

    const fetchFrame = async () => {
      try {
        const res = await axios.get(`${API_BASE}/camera-feed`, { responseType: "blob", timeout: 5000 });
        if (canceled) return;
        const blob = res.data;
        const imgUrl = URL.createObjectURL(blob);
        // revoke previous object URL to avoid memory leak
        if (lastUrl.current) URL.revokeObjectURL(lastUrl.current);
        lastUrl.current = imgUrl;
        if (imgRef.current) imgRef.current.src = imgUrl;
      } catch (err) {
        // show nothing; avoid spamming console in case of frequent errors
        console.debug("Camera feed error:", err && err.message ? err.message : err);
      }
      // schedule next frame (approx 15 FPS)
      if (!canceled) setTimeout(fetchFrame, 66);
    };

    fetchFrame(); // start the loop
    return () => {
      canceled = true;
      if (lastUrl.current) {
        try { URL.revokeObjectURL(lastUrl.current); } catch (e) {}
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-black rounded overflow-hidden">
      <img ref={imgRef} className="w-full h-full object-cover" alt="Camera feed" />
    </div>
  );
}

export default CameraFeed;
