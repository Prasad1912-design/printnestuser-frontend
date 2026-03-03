import React, { useEffect, useRef, useState } from "react";
import axios from "../../utility/axiosPathFiles/axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Callback({ login, close }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [userData, setUserData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) {
      setErrorMsg("Authorization code missing.");
      setStatus("error");
      setTimeout(close, 2000);
      return;
    }

    axios
      .post("/googleAuth", { code })
      .then((res) => {
        console.log("Backend Response:", res.data);
        if (res.data.status) {
          localStorage.setItem("accessToken", res.data.accessToken);
          setUserData(res.data.data);
          setStatus("success");

          setTimeout(() => {
            login();
            navigate("/");
          }, 2000);
        } else {
          setErrorMsg(res.data.message || "Google Auth Failed");
          setStatus("error");
          setTimeout(() => navigate("/"), 3000);
        }
      })
      .catch((err) => {
        console.error(
          "Frontend Google Auth Error:",
          err.response?.data || err.message
        );
        setErrorMsg("Something went wrong during authentication.");
        setStatus("error");
        setTimeout(close, 3000);
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-teal-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center border-t-4 border-teal-500 overflow-hidden"
      >
        {/* Animated background circles for Silicon Valley style */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-gradient-to-r from-yellow-200 to-orange-300 rounded-full opacity-30 animate-pulse"></div>

        {/* Profile Picture */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-28 h-28 mb-6 rounded-full overflow-hidden shadow-xl border-4 border-gray-200"
        >
          <img
            src={userData?.fileUrl || "/Print Nest.jpg"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Status & User Info */}
        {status === "loading" && (
          <>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold text-gray-800 mb-2"
            >
              Signing you in...
            </motion.h2>
            <p className="text-gray-500 text-center mb-6">
              Connecting to your Google account securely.
            </p>
            <div className="flex justify-center items-center space-x-2">
              <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce delay-200"></div>
              <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce delay-300"></div>
            </div>
          </>
        )}

        {status === "success" && userData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">
              Welcome, {userData?.primaryOwner || userData?.name || "User"}!
            </h2>
            <p className="text-gray-600 mb-4">{userData?.emailId}</p>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-green-100 text-green-800 px-5 py-2 rounded-full mb-4 shadow-md"
            >
              Successfully connected
            </motion.div>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Authentication Failed
            </h2>
            <p className="text-gray-600 text-center mb-4">{errorMsg}</p>
            <button
              onClick={() => navigate("/")}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition shadow-md"
            >
              Go Back
            </button>
          </motion.div>
        )}

        {/* Footer */}
        <div className="mt-6 text-gray-400 text-sm text-center">
          © {new Date().getFullYear()} Print Nest. All rights reserved.
          <br />
          Secure login powered by Google OAuth.
        </div>
      </motion.div>
    </div>
  );
}
