import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginModal({ onClose, loginSuccessfully }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    let tempErrors = {};
    if (!email.trim()) tempErrors.email = "Email is required";
    if (!password.trim()) tempErrors.password = "Password is required";

    setErrors(tempErrors);
    setInvalidCredentials(false); // Reset invalid credentials message

    // If there are errors, stop here
    if (Object.keys(tempErrors).length > 0) return;

    // Show loading spinner
    setLoading(true);

    // Simulate API/login delay
    setTimeout(() => {
      if (email === "moreprasad1912@gmail.com" && password === "Prasad@123") {
        loginSuccessfully(); // Call parent function
        onClose(); // Close modal
      } else {
        setInvalidCredentials(true); // Show invalid credentials message
      }
      setLoading(false); // Hide loading spinner
    }, 1500); // 1.5s delay for effect
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl grid md:grid-cols-2 overflow-hidden relative">

        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
          <div className="w-40 h-40 flex items-center justify-center rounded-full bg-white shadow-lg mb-6">
            <img src="Print Nest.jpg" alt="Print Nest Logo" className="w-28 h-28 object-contain rounded-full" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Print Nest</h2>
          <p className="text-center text-sm opacity-90">
            Bringing your creativity to life with premium printing solutions.
          </p>
        </div>

        {/* Right Section */}
        <div className="p-8 flex flex-col justify-center relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back 👋</h2>
          <p className="text-gray-500 text-sm mb-6">Login to continue to your account</p>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 ${
                  errors.email ? "focus:ring-red-400" : "focus:ring-blue-400"
                } focus:border-blue-500`}
              />
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <img src="https://img.icons8.com/ios-glyphs/20/000000/new-post.png" />
              </span>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 ${
                  errors.password ? "focus:ring-red-400" : "focus:ring-blue-400"
                } focus:border-blue-500`}
              />
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <img src="https://img.icons8.com/ios-glyphs/20/000000/lock--v1.png" />
              </span>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {invalidCredentials && (
              <p className="text-red-500 text-sm -mt-2 mb-2">Invalid email or password</p>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span>Remember me</span>
              </label>
              <Link to="/forgotPassword" className="text-blue-600 hover:underline" onClick={onClose}>Forgot password?</Link>
            </div>

            <button
              type="submit"
              className={`w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition flex justify-center items-center ${
                loading ? "cursor-not-allowed opacity-70" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              ) : null}
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/RegisterationPage" className="text-blue-600 font-semibold hover:underline" onClick={onClose}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
