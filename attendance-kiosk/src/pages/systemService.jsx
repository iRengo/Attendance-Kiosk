import React, { useState } from "react";
import TopInfo from "../components/topInfo";
import CameraFeed from "../components/cameraFeed";
import BottomInfo from "../components/bottomInfo";
import CameraSelector from "../components/cameraSelector";

function SystemService() {
  const [deviceId, setDeviceId] = useState(null);

  return (
    <div className="relative min-h-[650px] min-w-[1220px] text-white bg-gray-900 p-6 flex flex-col">
      
      <TopInfo />

      <hr className="border-gray-700 mb-4" />

      <CameraSelector selectedId={deviceId} onChange={setDeviceId} />

      <CameraFeed statusText="Service Started" statusColor="green-500" deviceId={deviceId} />

      <BottomInfo />
    </div>
  );
}

export default SystemService;
