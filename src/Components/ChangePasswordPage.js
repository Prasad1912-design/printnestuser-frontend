import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utility/axiosPathFiles/axios";

export default function ChangePasswordPage({logout}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");

  // 🔍 Validation
  const validate = () => {
    const tempErrors = {};

    if (!formData.currentPassword.trim())
      tempErrors.currentPassword = "Current Password is required";

    if (!formData.newPassword.trim())
      tempErrors.newPassword = "New Password is required";
    else if (formData.newPassword.length < 6)
      tempErrors.newPassword = "Password must be at least 6 characters";

    if (!formData.confirmPassword.trim())
      tempErrors.confirmPassword = "Confirm Password is required";
    else if (formData.confirmPassword !== formData.newPassword)
      tempErrors.confirmPassword = "Passwords do not match";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // 💾 Save handler
  const handleSave = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if(formData.currentPassword)
    {
      axios.post('/confirmPassword',{currentpass : formData.currentPassword, newPassword : formData.newPassword}).then((response)=>{

        if(response.status === 200 && response.data.success === true) // No Need to check beacuse response between 200 to 399 goes in then block and above in the catch block.
        {
          console.log(response.data);

          axios.post('/changePass',{newPassword : formData.newPassword}).then((res)=>{
            if(res.data.success === true)
            {
              console.log(res.data);
              setSuccessMessage(res.data.message);
              setTimeout(()=>{
                setSuccessMessage('');
                navigate('/home');
              },3000);
            }
            else
            {
              console.log(res.data);
              setFailMessage(res.data.message);
            }
          }).catch((error)=>{
            setFailMessage(error.response.data.message);
          })
       }
      }).catch((error)=>{
        if(error.response.status === 403) // user is not present / deleted or blocked in the db. just get logout.
        {
          setFailMessage("NO User Found, Please register First...");
          setTimeout(()=>{
            localStorage.removeItem('accessToken');
            logout();
          }, 3000);
        }
        else if (error.response.status === 401)
        {

          setFailMessage(error.response.data.message);
        }
      })
    }

    setFailMessage("");
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // 🧠 Enable button only when all fields filled
  const isFormIncomplete =
    !formData.currentPassword ||
    !formData.newPassword ||
    !formData.confirmPassword;

  // ✏️ Generic input handler
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const inputClass =
    "w-full p-3 rounded-lg border focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Change Password
        </h2>

        {successMessage && (
          <div className="bg-green-100 text-green-800 p-2 mb-4 text-center font-medium rounded">
            {successMessage}
          </div>
        )}

        {failMessage && (
          <div className="bg-red-100 text-red-800 p-2 mb-4 text-center font-medium rounded">
            {failMessage}
          </div>
        )}

        <form onSubmit={handleSave} className="grid gap-4">
          {/* Current Password */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={e =>
                handleChange("currentPassword", e.target.value)
              }
              className={`${inputClass} ${
                errors.currentPassword && "border-red-500"
              }`}
            />
            {errors.currentPassword && (
              <span className="text-red-500 text-sm">
                {errors.currentPassword}
              </span>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={e =>
                handleChange("newPassword", e.target.value)
              }
              className={`${inputClass} ${
                errors.newPassword && "border-red-500"
              }`}
            />
            {errors.newPassword && (
              <span className="text-red-500 text-sm">
                {errors.newPassword}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={e =>
                handleChange("confirmPassword", e.target.value)
              }
              className={`${inputClass} ${
                errors.confirmPassword && "border-red-500"
              }`}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={isFormIncomplete}
            className={`mt-4 w-full py-3 rounded-lg font-semibold transition
              ${
                isFormIncomplete
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-cyan-500 text-white hover:bg-cyan-600"
              }`}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
