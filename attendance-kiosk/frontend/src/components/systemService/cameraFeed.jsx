import React, { useRef, useEffect } from "react";
import axios from "axios";

function CameraFeed() {
  const imgRef = useRef(null);

  useEffect(() => {
    let canceled = false;

    const fetchFrame = async () => {
      try {
        const res = await axios.get("http://localhost:8000/camera-feed", { responseType: "blob" });
        if (canceled) return;
        const imgUrl = URL.createObjectURL(res.data);
        if (imgRef.current) imgRef.current.src = imgUrl;
      } catch (err) {
        console.error("Camera feed error:", err);
      }
      // Immediately request next frame for max FPS
      if (!canceled) requestAnimationFrame(fetchFrame);
    };

    fetchFrame(); // start the loop
    return () => { canceled = true; };
  }, []);

  return (
    <div className="relative w-full h-full bg-black rounded overflow-hidden">
      <img ref={imgRef} className="w-full h-full object-cover" alt="Camera feed" />
    </div>
  );
}

export default CameraFeed;
