import React, { useEffect, useState } from "react";
import { FiUpload, FiEdit2 } from "react-icons/fi";
import "../Components_Css/Registration.css";
import axios from "../utility/axiosPathFiles/axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


export default function ProfilePage() {

  const navigate = useNavigate();


  useEffect(()=>{fetchProfileInformation();},[])

  const states = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
    "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
    "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
    "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
    "Uttar Pradesh","Uttarakhand","West Bengal"
  ];

  // ✅ EMPTY STATE (NO DUMMY DATA)
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    primaryOwner: "",
    contactNo: "",
    emailId: "",
    residentialAddress: "",
    state: "",
    city: "",
    pincode: "",
    fileName: ""
  });

    const fetchProfileInformation = async () =>{
      const token = localStorage.getItem('accessToken');
      const userDetail = jwtDecode(token);
      const userId = userDetail.id;

      const userDetails = await axios.post('/fetchProfile', { userId });

      const data = userDetails.data.data;
      if(data)
      {      
      setFormData({
        companyName : userDetails.data.data.companyName || '',
        companyAddress : userDetails.data.data.companyAddress || '',
        primaryOwner : userDetails.data.data.primaryOwner || '',
        contactNo : userDetails.data.data.contactNo || '',
        emailId : userDetails.data.data.emailId || '',
        residentialAddress : userDetails.data.data.residentialAddress || '',
        state : userDetails.data.data.state || '',
        city : userDetails.data.data.city || '',
        pincode : userDetails.data.data.pincode || ''
      })
     
      
      if(userDetails.data.data.fileUrl)
      {
        setProfileImage(userDetails.data.data.fileUrl);
      }
       }
  }

  const [profileImage, setProfileImage] = useState(null);
  const [profileFile, setProfileFile] = useState(null);   // actual file
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ VALIDATION (UNCHANGED)
  useEffect(() => {
    const tempErrors = {};

    if (!formData.companyName.trim()) tempErrors.companyName = "Company Name is required";
    if (!formData.companyAddress.trim()) tempErrors.companyAddress = "Company Address is required";
    if (!formData.primaryOwner.trim()) tempErrors.primaryOwner = "Owner Name is required";
    if (!formData.contactNo.trim()) tempErrors.contactNo = "Contact Number is required";
    else if (formData.contactNo.length !== 10) tempErrors.contactNo = "Contact Number must be 10 digits";
    if (!formData.emailId.trim()) tempErrors.emailId = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId))
      tempErrors.emailId = "Email is not valid";
    if (!formData.residentialAddress.trim())
      tempErrors.residentialAddress = "Residential Address is required";
    if (!formData.state.trim()) tempErrors.state = "State is required";
    if (!formData.city.trim()) tempErrors.city = "City is required";
    if (!formData.pincode.trim()) tempErrors.pincode = "Pincode is required";
    else if (formData.pincode.length !== 6)
      tempErrors.pincode = "Pincode must be 6 digits";

    setErrors(tempErrors);
  }, [formData]);

  // ❌ localStorage REMOVED
  const handleSave = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) return;

    try {
      const form = new FormData();
      const token = localStorage.getItem("accessToken");
      const userId = jwtDecode(token).id;

      form.append("id", userId);

      // Append all text fields
      for (let key in formData) form.append(key, formData[key]);

      // Append file if selected
      if (profileFile) form.append("profileImage", profileFile);

      const response = await axios.post("/updateProfile", form);

      if (response.data.status) {
        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 2000);

        // Navigate to home ("/") after 2 seconds
        setTimeout(() => navigate("/"), 2000);
        if(response.data.accessToken)
        {
          localStorage.setItem('accessToken', response.data.accessToken);
        }

        // Update image preview if new fileUrl returned
        if (response.data.fileUrl) setProfileImage(response.data.fileUrl);

        // Update JWT in localStorage
        localStorage.setItem("accessToken", response.data.accessToken);
      } else {
        setSuccessMessage("Profile update failed!");
        setTimeout(() => setSuccessMessage(""), 5000);
      }
    } catch (err) {
      console.error(err);
      setSuccessMessage("Something went wrong!");
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfileFile(file); // actual file for upload
      setProfileImage(URL.createObjectURL(file)); // live preview
    }
  };

  const inputClass =
    "w-full p-3 rounded-lg border focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500";

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-6 px-4 md:px-0">
      {/* Logo */}
      <div className="logo-container flex justify-center mb-6">
        <div className="rounded-full border-4 bg-white border-[#2db0b9] p-4 flex items-center justify-center w-36 h-36">
          <img src="/Print Nest.jpg" alt="Logo" className="rounded-full w-32 h-32" />
        </div>
      </div>

      <section className="profile-container max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden w-full">
        <div className="profile-header bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-center py-6 px-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold">My Profile</h2>
          <button
            onClick={handleSave}
            disabled={Object.keys(errors).length > 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition
              ${
                Object.keys(errors).length > 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-cyan-500 hover:bg-gray-100"
              }`}
          >
            Save Changes
          </button>
        </div>

        {/* ✅ PROFILE IMAGE WITH EDIT BUTTON */}
        <div className="flex justify-center mt-6">
          <div className="relative">
            <img
              src={profileImage || "https://via.placeholder.com/120"}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-cyan-500 object-cover"
            />
            <label
              htmlFor="profileImage"
              className="absolute bottom-1 right-1 bg-cyan-500 text-white p-2 rounded-full cursor-pointer hover:bg-cyan-600"
            >
              <FiEdit2 size={14} />
            </label>
            <input
              type="file"
              id="profileImage"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {successMessage && (
          <div className="bg-green-100 text-green-800 p-2 text-center font-medium">
            {successMessage}
          </div>
        )}

        <form className="profile-form p-8 grid gap-8">
          {/* Company Details */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
            <h3 className="text-gray-400 font-semibold mb-4 text-lg">Company Details</h3>
            <div className="grid gap-4">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                  className={`${inputClass} ${errors.companyName && "border-red-500"}`}
                />
                {errors.companyName && <span className="text-red-500 text-sm">{errors.companyName}</span>}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Company Address</label>
                <input
                  type="text"
                  value={formData.companyAddress}
                  onChange={e => setFormData({ ...formData, companyAddress: e.target.value })}
                  className={`${inputClass} ${errors.companyAddress && "border-red-500"}`}
                />
                {errors.companyAddress && <span className="text-red-500 text-sm">{errors.companyAddress}</span>}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Primary Owner</label>
                <input
                  type="text"
                  value={formData.primaryOwner}
                  onChange={e => setFormData({ ...formData, primaryOwner: e.target.value })}
                  className={`${inputClass} ${errors.primaryOwner && "border-red-500"}`}
                />
                {errors.primaryOwner && <span className="text-red-500 text-sm">{errors.primaryOwner}</span>}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Contact No.</label>
                <input
                  type="number"
                  value={formData.contactNo}
                  onChange={e => setFormData({ ...formData, contactNo: e.target.value })}
                  className={`${inputClass} ${errors.contactNo && "border-red-500"}`}
                />
                {errors.contactNo && <span className="text-red-500 text-sm">{errors.contactNo}</span>}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Email ID</label>
                <input
                  type="email"
                  value={formData.emailId}
                  onChange={e => setFormData({ ...formData, emailId: e.target.value })}
                  className={`${inputClass} ${errors.emailId && "border-red-500"}`}
                />
                {errors.emailId && <span className="text-red-500 text-sm">{errors.emailId}</span>}
              </div>
            </div>
          </div>

          {/* Personal Address */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
            <h3 className="text-gray-400 font-semibold mb-4 text-lg">Personal Address</h3>
            <div className="grid gap-4">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Residential Address</label>
                <input
                  type="text"
                  value={formData.residentialAddress}
                  onChange={e => setFormData({ ...formData, residentialAddress: e.target.value })}
                  className={`${inputClass} ${errors.residentialAddress && "border-red-500"}`}
                />
                {errors.residentialAddress && <span className="text-red-500 text-sm">{errors.residentialAddress}</span>}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">State</label>
                <select
                  value={formData.state}
                  onChange={e => setFormData({ ...formData, state: e.target.value })}
                  className={`${inputClass} ${errors.state && "border-red-500"}`}
                >
                  <option value="">Select State</option>
                  {states.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.state && <span className="text-red-500 text-sm">{errors.state}</span>}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className={`${inputClass} ${errors.city && "border-red-500"}`}
                />
                {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Pincode</label>
                <input
                  type="number"
                  value={formData.pincode}
                  onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                  className={`${inputClass} ${errors.pincode && "border-red-500"}`}
                />
                {errors.pincode && <span className="text-red-500 text-sm">{errors.pincode}</span>}
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
