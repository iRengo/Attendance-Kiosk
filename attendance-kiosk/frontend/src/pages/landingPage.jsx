import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import loginIcon from "../assets/icons/login.png";
import classesIcon from "../assets/icons/class-history.png";
import notifIcon from "../assets/icons/notification.png";
import settingsIcon from "../assets/icons/settings.png";
import NetworkStatus from "../components/networkStatus";
import TimeDateDisplay from "../components/landingPage/timedateDisplay";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[650px] min-w-[1220px] text-white flex flex-col items-center justify-center px-4">
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
        <NetworkStatus />
      </div>

      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center space-x-2 text-white opacity-80 hover:opacity-100 transition"
      >
        <FaArrowLeft className="text-2xl" />
        <span className="text-lg font-medium">Back</span>
      </button>

      <div className="absolute top-6 right-6">
        <TimeDateDisplay />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-3xl">
        <div
          className="flex flex-col items-center justify-center space-y-2 cursor-pointer hover:scale-105 transition-transform bg-gray-800 rounded-2xl p-8 shadow-lg"
          onClick={() => navigate("/systemService")}
        >
          <img src={loginIcon} alt="Login" className="w-24 h-24 object-contain" />
          <span className="text-2xl font-bold">Login</span>
        </div>

        <div
          className="flex flex-col items-center justify-center space-y-2 cursor-pointer hover:scale-105 transition-transform bg-gray-800 rounded-2xl p-8 shadow-lg"
          onClick={() => alert("Class history clicked")}
        >
          <img src={classesIcon} alt="Classes" className="w-24 h-24 object-contain" />
          <span className="text-2xl font-bold">Class History</span>
        </div>

        <div
          className="flex flex-col items-center justify-center space-y-2 cursor-pointer hover:scale-105 transition-transform bg-gray-800 rounded-2xl p-8 shadow-lg"
          onClick={() => alert("Notifications clicked")}
        >
          <img src={notifIcon} alt="Notifications" className="w-24 h-24 object-contain" />
          <span className="text-2xl font-bold">Notifications</span>
        </div>

        <div
          className="flex flex-col items-center justify-center space-y-2 cursor-pointer hover:scale-105 transition-transform bg-gray-800 rounded-2xl p-8 shadow-lg"
          onClick={() => navigate("/settings")}
        >
          <img src={settingsIcon} alt="Settings" className="w-24 h-24 object-contain" />
          <span className="text-2xl font-bold">Settings</span>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
