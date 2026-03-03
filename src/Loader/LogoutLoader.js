import React from "react";

export default function LogoutLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-800 z-50 overflow-hidden">
      {/* Background Fade Circle */}
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-br from-purple-200 via-blue-200 to-transparent rounded-full blur-3xl opacity-40 animate-logoutGlow"></div>

      {/* Logo Fade Out Animation */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-lg bg-blue-300 opacity-40 animate-pulseGlow"></div>
          <img
            src="../Print Nest.jpg"
            alt="Print Nest Logo"
            className="w-24 h-24 object-cover rounded-full border border-gray-200 shadow-md relative z-10 animate-logoExit"
          />
        </div>

        {/* Text Message */}
        <h1 className="mt-6 text-xl font-semibold tracking-wide text-gray-700 animate-fadeIn">
          Logging out...
        </h1>
        <p className="mt-2 text-sm text-gray-500 tracking-wide animate-pulse">
          We’ll see you again soon 👋
        </p>

        {/* Smooth Exit Line */}
        <div className="mt-6 w-40 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full animate-lineShrink"></div>
      </div>

      {/* Keyframes */}
      <style>
        {`
          @keyframes logoutGlow {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.1); opacity: 0.6; }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes logoExit {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.85) translateY(20px); }
          }

          @keyframes lineShrink {
            0% { width: 40%; opacity: 1; }
            100% { width: 5%; opacity: 0.3; }
          }

          .animate-logoutGlow {
            animation: logoutGlow 4s ease-in-out infinite;
          }
          .animate-pulseGlow {
            animation: logoutGlow 3s ease-in-out infinite;
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out forwards;
          }
          .animate-logoExit {
            animation: logoExit 2.5s ease-in-out infinite alternate;
          }
          .animate-lineShrink {
            animation: lineShrink 2.8s ease-in-out infinite alternate;
          }
        `}
      </style>
    </div>
  );
}
