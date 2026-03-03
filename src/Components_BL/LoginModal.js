import React, { useEffect, useState } from "react";
import LoaderFunction from "../Loader/LoginLoader";
import axios from '../utility/axiosPathFiles/axios';
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function LoginModal({ close, login }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginPage, setLogin] = useState(false);

  const hadleForgotPassword = () =>{

    axios.post('/resetPasswordLink',{emailId : email})
    .then((result)=>{
      if(result.data.success)
      {
        setError("Password Reset Email is Sent to email " + email);
      }
      else
      {
        setError(result.data.message + "❌");
      }
    })
    .catch((err)=>{
      console.log("Error ", err);
    })

    // close(); // Close the Login modal.
    // navigate('/resetPassword'); // go to that url
  }


  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('/loginApi',{
        email_id : email,
        password_ : password
    }).then((res)=>{ 
      console.log(res.data);
      if(res.data.success)
      {
      console.log(res.data);
      setError("");

       localStorage.setItem("accessToken", res.data.accessToken);
        setLogin(true);

       setTimeout(()=>
      {
        setLogin(false);

        login();
        close();
      },2000)   
      }
      else
      {
        setError(res.data.message + "❌");
      }
    }).catch((err)=>{
      console.log(err);
    })
  }




  // const handleLogin = (e) => {
  //   e.preventDefault();


  //   axios.post('/loginApi',{
  //     email_id : email,
  //     pass : password
  //   }).then((res)=>{
  //     if(res.data.success)
  //     {
  //       localStorage.setItem("token", res.data.token);
  //       setLogin(true);

  //      setTimeout(()=>
  //     {
  //       setLogin(false);

  //       login();
  //       close();
  //     },2000)      
  //     }

  //     else
  //     {
  //     setError(res.data.message + "❌");
  //     }
  //   }).catch((err)=>{
  //     console.log(err);
  //   })
  // };


  const handleOAuthLogin = () =>{
    axios.post('/handleAuthLogin').then((result)=>{
      window.location.href = result.data.url;
    })
  }


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      {loginPage && <LoaderFunction />}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl grid md:grid-cols-2 overflow-hidden">
        
        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white mb-4 flex items-center justify-center">
            <img
              src="../Print Nest.jpg"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold mb-2">Print Nest</h2>
          <p className="text-center text-sm opacity-90">
            Bringing your creativity to life with premium printing solutions.
          </p>
        </div>

        {/* Right Section */}
        <div className="p-8 relative bg-white flex flex-col justify-center">
          <button
            onClick={close}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Login to continue to your account
          </p>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="relative">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <img
                  src="https://img.icons8.com/ios-glyphs/20/000000/new-post.png"
                  alt="email"
                />
              </span>
            </div>

            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <img
                  src="https://img.icons8.com/ios-glyphs/20/000000/lock--v1.png"
                  alt="password"
                />
              </span>
            </div>

            {/* 🔴 Error message */}
            {error && (
              <p className="text-red-500 text-sm text-center -mt-2">{error}</p>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-600">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Remember me</span>
              </label>
              <button type = "button" onClick={hadleForgotPassword} className="text-blue-600 hover:underline">
                Forgot password?
              </button> 
              {/* due to type = "button" it will now won't submit the page */}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-lg transition"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* 🔹 Social Login Buttons */}
          <div className="space-y-3">
            <button onClick={handleOAuthLogin} className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition">
              <img
                src="https://img.icons8.com/color/24/google-logo.png"
                alt="Google"
              />
              <span className="text-gray-700 font-medium">
                Sign in with Google
              </span>
            </button>
          </div>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <a
              href="PrintNest/RegisterationPage"
              className="text-blue-600 font-semibold hover:underline"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
