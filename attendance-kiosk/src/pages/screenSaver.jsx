import { useState, useEffect } from "react";
import logo from "../assets/images/aics_logo.png";
import RoomInfo from "../components/roomInfo";
import TimeDisplay from "../components/timeDisplay";
import SwipeHint from "../components/swipeHint";
import { useSwipeUp } from "../components/useSwipeup";
import { useNavigate } from "react-router-dom";

function ScreenSaver() {
  const [time, setTime] = useState(new Date());
  const [swipeUp, setSwipeUp] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useSwipeUp(() => setSwipeUp(true));

  useEffect(() => {
    if (swipeUp) {
      const timer = setTimeout(() => navigate("/landing"), 500); 
      return () => clearTimeout(timer);
    }
  }, [swipeUp, navigate]);

  return (
    <div
      className={`relative text-white min-h-[650px] min-w-[1220px] cursor-pointer transition-transform duration-500 ${
        swipeUp ? "-translate-y-full" : "translate-y-0"
      }`}
      onClick={() => setSwipeUp(true)}
    >
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <img src={logo} alt="Logo" className="w-16 sm:w-24 h-auto opacity-90" />
      </div>

      <div className="absolute top-1/2 left-4 sm:left-6 transform -translate-y-1/2">
        <RoomInfo />
      </div>

      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
        <TimeDisplay time={time} />
      </div>

      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
        <SwipeHint />
      </div>
    </div>
  );
}

export default ScreenSaver;