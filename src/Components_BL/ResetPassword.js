import React, { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "../utility/axiosPathFiles/axios";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function ResetPassword({close,login}) {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formData.newPassword || !formData.confirmPassword) {
      return setError("All fields are required");
    }

    if (formData.newPassword.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }


    try {
      setLoading(true);
      const response = await axios.post("/reset-password", {
        token, // Token which was created and sent by the backend. we will send back to the backend and will say that we are genune user request.
        password: formData.newPassword
      });
      localStorage.setItem('accessToken',response.data.accessToken);

      console.log(response.message);
      console.log(response.data);

      setSuccess(response.data.message || "Password updated successfully");

      setTimeout(() => login(), 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-center py-6">
          <img
            src="/Print Nest.jpg"
            alt="Print Nest"
            className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-white"
          />
          <h2 className="text-2xl font-bold">Reset Your Password</h2>
          <p className="text-sm opacity-90 mt-1">
            Secure your Print Nest account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* New Password */}
          <div>
            <label className="block font-medium mb-1">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Minimum 8 characters recommended
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-medium mb-1">Confirm Password</label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-sm">
              {success}
              <div className="text-xs mt-1">Redirecting to login…</div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition shadow-md ${
              loading && "opacity-70 cursor-not-allowed"
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

          {/* Footer */}
          <div className="text-center pt-2">
            <Link to="/" className="text-cyan-600 hover:underline text-sm">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
