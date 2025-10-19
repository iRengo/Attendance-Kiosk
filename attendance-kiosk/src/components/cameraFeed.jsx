import React, { useRef, useEffect, useState } from "react";

function CameraFeed({ deviceId = null, statusText = "Service Started", statusColor = "green-500" }) {
  const videoRef = useRef(null);
  const [streamError, setStreamError] = useState(false);

  useEffect(() => {
    let stream;

    async function startCamera() {
      try {
        if (deviceId) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: deviceId } },
            audio: false,
          });
        } else {
          stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        }

        if (videoRef.current) videoRef.current.srcObject = stream;
        setStreamError(false);
      } catch (err) {
        console.error("Camera access failed:", err);

        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          if (videoRef.current) videoRef.current.srcObject = fallbackStream;
          setStreamError(false);
        } catch (fallbackErr) {
          console.error("Fallback camera failed:", fallbackErr);
          setStreamError(true);
        }
      }
    }

    startCamera();

    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, [deviceId]);

  return (
    <div className="relative flex flex-col items-center justify-center border-2 border-gray-700 rounded-lg bg-black mb-4"
         style={{ width: "1170px", height: "360px" }} 
    >
      {streamError && (
        <p className="text-red-500 text-center absolute top-1/2 transform -translate-y-1/2">
          Camera not accessible. Check permissions.
        </p>
      )}

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={`w-full h-full object-cover rounded-lg ${streamError ? "opacity-50" : ""}`}
      />

      <div className="absolute bottom-4 bg-gray-800 px-4 py-2 rounded-full flex items-center space-x-2">
        <div className={`w-4 h-4 rounded-full bg-${statusColor} animate-pulse`}></div>
        <span className="font-medium text-green-500">{statusText}</span>
      </div>
    </div>
  );
}

export default CameraFeed;
