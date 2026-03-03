import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiUpload } from "react-icons/fi"; // Nice upload icon
import '../Components_Css/Registration.css';
import axios from '../utility/axiosPathFiles/axios';

export default function RegistrationForm({close, login}) {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    primaryOwner: "",
    contactNo: "",
    emailId: "",
    residentialAddress: "",
    residentialAddressOptional : "",
    state: "",
    city: "",
    landlineNo : "",
    password : "",
    pincode: "",
    file: null,
  });

  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState("Choose Visiting Card Photo");

  const states = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
    "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
    "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
    "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
    "Uttar Pradesh","Uttarakhand","West Bengal"
  ];

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "file") {
      setFormData({ ...formData, [id]: files[0] });
      setFileName(files[0] ? files[0].name : "Choose Visiting Card Photo");
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    let tempErrors = { ...errors };

    if (!value.trim()) {
      tempErrors[id] = id === "file" ? "File is required." : `${e.target.placeholder || id} is required.`;
    } else {
      delete tempErrors[id];
    }

    // Specific validations
    if (id === "contactNo" && value.trim() && value.length !== 10) {
      tempErrors.contactNo = "Contact Number must be 10 digits.";
    }
    if (id === "pincode" && value.trim() && value.length !== 6) {
      tempErrors.pincode = "Pincode must be 6 digits.";
    }
    if (id === "emailId" && value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      tempErrors.emailId = "Please enter valid email id.";
    }

    setErrors(tempErrors);
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.companyName.trim()) tempErrors.companyName = "Company Name is required.";
    if (!formData.companyAddress.trim()) tempErrors.companyAddress = "Company Address is required.";
    if (!formData.primaryOwner.trim()) tempErrors.primaryOwner = "Owner Name is required.";
    if (!formData.contactNo.trim()) tempErrors.contactNo = "Contact Number is required.";
    else if (formData.contactNo.length !== 10) tempErrors.contactNo = "Contact Number must be 10 digits.";
    if (!formData.emailId.trim()) tempErrors.emailId = "Email Id is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) tempErrors.emailId = "Please enter valid email id.";
    if (!formData.residentialAddress.trim()) tempErrors.residentialAddress = "Residential Address is required.";
    if (!formData.state.trim()) tempErrors.state = "State is required.";
    if (!formData.city.trim()) tempErrors.city = "City is required.";
    if (!formData.password.trim()) tempErrors.password = "City is required.";
    if (!formData.pincode.trim()) tempErrors.pincode = "Pincode is required.";
    else if (formData.pincode.length !== 6) tempErrors.pincode = "Pincode must be 6 digits.";
    if (!formData.file) tempErrors.file = "File is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (validate()) {
    try {
      const formPayload = new FormData();
      formPayload.append("companyName", formData.companyName);
      formPayload.append("companyAddress", formData.companyAddress);
      formPayload.append("primaryOwner", formData.primaryOwner);
      formPayload.append("contactNo", formData.contactNo);
      formPayload.append("emailId", formData.emailId);
      formPayload.append("residentialAddressOptional", formData.residentialAddressOptional);
      formPayload.append("landlineNo", formData.landlineNo);
      formPayload.append("password", formData.password);
      formPayload.append("residentialAddress", formData.residentialAddress);
      formPayload.append("state", formData.state);
      formPayload.append("city", formData.city);
      formPayload.append("pincode", formData.pincode);
      if (formData.file) formPayload.append("file", formData.file); // file upload

      const response = await axios.post('/registerUser', formPayload, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if(response.data.status)
      {
        localStorage.setItem('accessToken',response.data.accessToken)
        login();
        close();
      }
      else
      {
        alert(`message : ${response.data.message}\n`);
      }


    } catch (error) {
      console.log("Error : ", error.response?.data || error.message);
    }
  }
};


  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-2 px-4 md:px-0">
      {/* Logo */}
    <div className="logo-container flex justify-center mb-4">
        <div className="rounded-full border-4 bg-white border-[#2db0b9] p-4 flex items-center justify-center w-36 h-36">
          <img src="/Print Nest.jpg" alt="Logo" className="rounded-full w-32 h-32" />
        </div>
      </div>

      {/* Registration Form */}
      <section className="registration-container max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden w-full">
        <div className="registration-header bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-center py-8 px-6">
          <h2 className="text-3xl font-bold">Register Your Company</h2>
          <p className="mt-2 text-gray-100">Fill in the details to create your account</p>
        </div>

        <form className="registration-form p-8 grid gap-8" onSubmit={handleSubmit} encType="multipart/form-data">
          
          {/* Company Details */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
            <h3 className="text-gray-300 font-semibold mb-4 text-lg">Company Details</h3>
            <div className="grid gap-4">
              {/** Company Name */}
              <div>
                <label className="font-medium">Company Name <span className="text-red-600">*</span></label>
                <input
                  id="companyName"
                  type="text"
                  placeholder="Enter Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition ${errors.companyName ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.companyName && <span className="text-red-500 text-sm">{errors.companyName}</span>}
              </div>

              {/** Company Address */}
              <div>
                <label className="font-medium">Company Address <span className="text-red-600">*</span></label>
                <input
                  id="companyAddress"
                  type="text"
                  placeholder="Enter Address"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition ${errors.companyAddress ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.companyAddress && <span className="text-red-500 text-sm">{errors.companyAddress}</span>}
              </div>

              {/** Primary Owner */}
              <div>
                <label className="font-medium">Primary Owner <span className="text-red-600">*</span></label>
                <input
                  id="primaryOwner"
                  type="text"
                  placeholder="Owner Name"
                  value={formData.primaryOwner}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition ${errors.primaryOwner ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.primaryOwner && <span className="text-red-500 text-sm">{errors.primaryOwner}</span>}
              </div>

              {/** Contact */}
              <div>
                <label className="font-medium">Contact No. <span className="text-red-600">*</span></label>
                <input
                  id="contactNo"
                  type="number"
                  placeholder="Enter Contact No."
                  value={formData.contactNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition ${errors.contactNo ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.contactNo && <span className="text-red-500 text-sm">{errors.contactNo}</span>}
              </div>

              {/** Email */}
              <div>
                <label className="font-medium">Email ID <span className="text-red-600">*</span></label>
                <input
                  id="emailId"
                  type="email"
                  placeholder="Enter Email"
                  value={formData.emailId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition ${errors.emailId ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.emailId && <span className="text-red-500 text-sm">{errors.emailId}</span>}
              </div>

              {/** Landline optional */}
              <div>
                <label className="font-medium">Landline No. (Optional)</label>
                <input
                  id="landlineNo"
                  type="text"
                  placeholder="Enter Landline"
                  value={formData.landlineNo}
                  onChange={handleChange} 
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition"
                />

              </div>
            </div>
          </div>

          {/* GST Details */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
            <h3 className="text-gray-300 font-semibold mb-4 text-lg">Password</h3>
           <div>
                <label className="font-medium">Enter New Password<span className="text-red-600">*</span></label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create New Password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition ${errors.password ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
              </div>
          </div>

          {/* Personal Address */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
            <h3 className="text-gray-300 font-semibold mb-4 text-lg">Personal Address Details</h3>
            <div className="grid gap-4">
              <div>
                <label className="font-medium">Residential Address 1 <span className="text-red-600">*</span></label>
                <input
                  id="residentialAddress"
                  type="text"
                  placeholder="Address Line 1"
                  value={formData.residentialAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition ${errors.residentialAddress ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.residentialAddress && <span className="text-red-500 text-sm">{errors.residentialAddress}</span>}
              </div>

              <div>
                <label className="font-medium">Residential Address 2</label>
                <input
                  id="residentialAddressOptional"
                  type="text"
                  placeholder="Address Line 2"
                  value={formData.residentialAddressOptional}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition"
                />

              </div>

              <div>
                <label className="font-medium">State <span className="text-red-600">*</span></label>
                <select
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition ${errors.state ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                {errors.state && <span className="text-red-500 text-sm">{errors.state}</span>}
              </div>

              <div>
                <label className="font-medium">City <span className="text-red-600">*</span></label>
                <input
                  id="city"
                  type="text"
                  placeholder="Enter City"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition ${errors.city ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
              </div>

              <div>
                <label className="font-medium">Pincode <span className="text-red-600">*</span></label>
                <input
                  id="pincode"
                  type="number"
                  placeholder="Enter Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition ${errors.pincode ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.pincode && <span className="text-red-500 text-sm">{errors.pincode}</span>}
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-inner text-center">
            <label className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-cyan-500 p-4 rounded-lg cursor-pointer hover:bg-cyan-50 transition">
              <FiUpload size={20} />
              <span>{fileName} <span className="text-red-600">*</span></span>
              <input
                id="file"
                type="file"
                accept=".jpg,.png"
                onChange={handleChange}
                onBlur={handleBlur}
                className="hidden"
              />
            </label>
            {errors.file && <span className="text-red-500 text-sm">{errors.file}</span>}
            <p className="text-gray-500 mt-2 text-sm">* Only jpg, png, and pdf allowed</p>
            <Link to="/" className="block mt-4 text-cyan-600 font-medium underline hover:text-cyan-800">
              ← Back to Home
            </Link>
          </div>

          {/* Submit */}
          <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition shadow-md">
            Register
          </button>
        </form>
      </section>
      
    </div>
  );
}
