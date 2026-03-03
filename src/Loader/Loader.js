// Loader.jsx
import React from "react";
import logo from "../Print Nest.jpg"; // update path if needed
import "../Components_Css/Loader.css";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-xl z-[9999]">
      <div className="flex flex-col items-center gap-5">
        
        {/* Elegant glowing logo */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-2xl bg-blue-500/20 animate-pulse"></div>
          <img
            src={logo}
            alt="Print Nest Logo"
            className="relative w-20 h-20 rounded-full object-cover shadow-xl animate-logo-float"
          />
        </div>

        {/* Minimal progress bar */}
        <div className="w-40 h-[3px] bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 animate-progress-bar"></div>
        </div>

        {/* Subtle brand text */}
        <p className="text-gray-800 text-sm tracking-widest font-medium animate-fade-in">
          PRINT NEST
        </p>
      </div>
    </div>
  );
}
