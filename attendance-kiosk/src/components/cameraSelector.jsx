import React from "react";
import { useCameraDevices } from "./useMedia";

function CameraSelector({ selectedId, onChange }) {
  const { devices, error } = useCameraDevices();

  if (error) return <p className="text-red-500">Cannot access camera devices.</p>;

  return (
    <div className="flex space-x-2 mb-4">
      <label className="text-gray-300">Select Camera:</label>
      <select
        value={selectedId || ""}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-800 text-white px-2 py-1 rounded"
      >
        {devices.map(device => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${device.deviceId}`}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CameraSelector;
