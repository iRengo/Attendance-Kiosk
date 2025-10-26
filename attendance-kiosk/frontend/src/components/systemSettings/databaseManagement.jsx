import React from "react";
import { FaSyncAlt, FaDatabase, FaTrash, FaWifi } from "react-icons/fa";

function DatabaseManagementTab() {
  return (
    <div className="animate-fadeIn mt-8 text-white">
      <h2 className="text-3xl font-bold mb-6 text-left">Database Management</h2>

      <div className="grid grid-cols-2 gap-8 bg-gray-800 rounded-2xl p-8 shadow-lg h-[420px]">
        <div className="flex flex-col justify-start text-left space-y-6">
          <h3 className="text-md font-semibold mb-6 flex items-center gap-2">
            <FaDatabase /> Database Actions
          </h3>

          <div className="space-y-3">
            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition flex items-center gap-2 w-fit">
              <FaSyncAlt className="text-lg" />
              <span>Sync Now</span>
            </button>

            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition flex items-center gap-2 w-fit">
              <FaTrash className="text-lg" />
              <span>Clear Cache</span>
            </button>

            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition flex items-center gap-2 w-fit">
              <FaWifi className="text-lg" />
              <span>Test Connection</span>
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 flex flex-col border border-gray-700">
          <h3 className="text-2xl font-semibold mb-4 text-left">Database Status</h3>
          <div className="space-y-3 text-gray-300 text-left">
            <p>
              <strong>Last Sync:</strong>{" "}
              <span className="text-white">2025-10-20 13:45</span>
            </p>
            <p>
              <strong>Connection:</strong>{" "}
              <span className="text-green-400">Online</span>
            </p>
            <p>
              <strong>Local Records Pending Sync:</strong>{" "}
              <span className="text-yellow-400">12</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatabaseManagementTab;
