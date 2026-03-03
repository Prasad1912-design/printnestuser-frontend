import React from "react";

export default function LoginLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white text-gray-800 z-50">
      {/* Logo */}
      <img
        src="../Print Nest.jpg"
        alt="Print Nest Logo"
        className="w-28 h-28 object-cover rounded-full shadow-lg animate-logoPulse"
      />

      {/* Loading Text */}
      <p className="mt-6 text-sm text-gray-500 tracking-wide animate-pulse">
        Welcome back 👋 Logging you in...
      </p>

      {/* Subtle Loading Bar */}
      <div className="mt-6 w-40 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-loadingBar"></div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes logoPulse {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(59,130,246,0.3)); }
            50% { transform: scale(1.05); filter: drop-shadow(0 0 15px rgba(147,51,234,0.5)); }
          }

          @keyframes loadingBar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          .animate-logoPulse {
            animation: logoPulse 3s ease-in-out infinite;
          }

          .animate-loadingBar {
            animation: loadingBar 1.8s linear infinite;
          }
        `}
      </style>
    </div>
  );
}
