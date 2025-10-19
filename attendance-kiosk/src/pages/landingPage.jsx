import React from "react";
import { useNavigate } from "react-router-dom";
import loginIcon from "../assets/icons/login.png";
import { FaArrowLeft } from "react-icons/fa";
import classesIcon from "../assets/icons/class-history.png";

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-[650px] min-w-[1220px] text-white flex flex-col items-center justify-center px-4">

            <button
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 flex items-center space-x-2 text-white"
            >
                <FaArrowLeft className="text-2xl" />
                <span className="text-lg font-medium">Back</span>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-2xl">
                <div
                    className="flex flex-col items-center justify-center space-y-2 cursor-pointer hover:scale-105 transition-transform bg-gray-800 rounded-lg p-6"
                    onClick={() => alert("Login clicked")}
                >
                    <img src={loginIcon} alt="Login" className="w-20 h-20 object-contain" />
                    <span className="text-2xl font-bold">Login</span>
                </div>

                <div
                    className="flex flex-col items-center justify-center space-y-2 cursor-pointer hover:scale-105 transition-transform bg-gray-800 rounded-lg p-6"
                    onClick={() => alert("Classes clicked")}
                >
                    <img src={classesIcon} alt="Classes" className="w-20 h-20 object-contain" />
                    <span className="text-2xl font-bold">Previous Classes</span>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
