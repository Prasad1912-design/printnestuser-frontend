import React, {useEffect, useState } from 'react';
import {Link, Router} from 'react-router-dom';
import LoaderFunction from '../Loader/LoaderFunction';
import LogoutLoader from '../Loader/LogoutLoader';
import { useNavigate } from 'react-router-dom';
import axios from '../utility/axiosPathFiles/axios';

import {useCount} from '../Context/CreateContext';

import { jwtDecode } from 'jwt-decode';

// Function to check the token is valid or not before the any API Call



export default function Header({logout}) {
  const [logo,setLogo] = useState('/Print Nest.jpg');
  const [provider, setProvider] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  let userInfo = "";

  // To confirm the user to handle the password change permission.
  useEffect(()=>{    
    axios.post('/confirmUserProvider')
    .then((response)=>{
      if(response.data.provider === 'Google')
      {
        setProvider(response.data.provider);
      }
      else if(response.data.provider === 'local')
      {
        setProvider(response.data.provider);
      }
    }).catch((error)=>{
      if(error.response.status == 403 || (error.response.status === 401 && error.response.data.success===false))
      {
        localStorage.removeItem('accessToken');
        logout();
      }
      else
      {
        console.log(error.response.data);
      }
    })
  },[])

  if(token)
  {
    userInfo = jwtDecode(token);
    console.log(userInfo);
  }
    
  //Context API Object.
const { cartCounts, fetchCartCount } = useCount();

// Fethc the cart count dynamically when we logged in initially.
  useEffect(()=>{
    fetchCartCount();
  },[])


  function toggleDropdown(id){
    const el = document.getElementById(id);
    el.classList.toggle('hidden');
  }

  let navigateFunction = (path) =>{
  navigate(path);
  }

  const [loading, setLoading] = useState(null); // for redirecting internal components.


    const handleLogin = (path) =>{

    const accessToken = localStorage.getItem('accessToken');

    axios.post('/verifyToken',  // there is 2 parameters 1st body no require to define and second is header
       { id : 101 }).then((res)=>{
      if(res.data.success)
      {
        console.log(res.data.message);
      }
    }).catch((err)=>{
      if(err.response.status === 403)
      {
        console.log("Logout Order History Page");
        console.log(err.response.status);
        localStorage.removeItem('accessToken');
        logout();
      }
    })

    
    setLoading(path)
  }


    // Handel Login For Order History
  
  const [logoutStatus, setLogoutStatus] = useState(false);

  let logoutPage = () =>{
    setLogoutStatus(true);

    setTimeout(()=>{
      setLogoutStatus(false);
      localStorage.removeItem('accessToken');
      logout();
    },2000);
  }

  return (
    <>
    {loading && <LoaderFunction onFinish={()=>{
            navigate(loading);
            setLoading(null);
          }} />}
    {logoutStatus && <LogoutLoader />}

<header className="w-full bg-white shadow-lg fixed top-0 left-0 z-50">

  <div className=" flex items-center justify-between">
    {/* <!-- Left: Logo --> */}
    <div className="flex items-center mx-4 space-x-2">
      <img src={logo} alt="Logo" className="w-14 h-14 md:w-16 md:h-16" />
      <span className="text-xl md:text-2xl font-bold text-gray-800">Print Nest</span>
    </div>

    {/* <!-- Mobile Hamburger --> */}
    <div className="md:hidden">
      <button id="mobileMenuBtn" onClick={()=>toggleDropdown('mobileNav')} className="focus:outline-none">
        <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    {/* <!-- Desktop Navigation --> */}
    <nav className="hidden md:flex flex-1 justify-center items-center space-x-6 text-gray-700 font-semibold">
      <button onClick={()=>{handleLogin('/home');}} className="hover:text-blue-600 transition relative group">Home
        <span className="absolute left-0 -bottom-1 w-0 h-1 bg-blue-600 group-hover:w-full transition-all"></span>
      </button>

      <button onClick={()=>{handleLogin('/placeOrder');}} className="hover:text-blue-600 transition relative group">Place Order
        <span className="absolute left-0 -bottom-1 w-0 h-1 bg-blue-600 group-hover:w-full transition-all"></span>
      </button>

      <Link to="/myProfile" onClick={()=>{handleLogin('/myProfile');}} className="hover:text-blue-600 transition relative group">My Profile
        <span className="absolute left-0 -bottom-1 w-0 h-1 bg-blue-600 group-hover:w-full transition-all"></span>
      </Link>

      <button onClick={()=>{handleLogin('/orderHistory');}} className="hover:text-blue-600 transition relative group">Order History
        <span className="absolute left-0 -bottom-1 w-0 h-1 bg-blue-600 group-hover:w-full transition-all"></span>
      </button>

      {/* <!-- Dropdowns --> */}
      <div className="relative group">
        <button className="flex items-center space-x-1 hover:text-blue-600 transition font-semibold">
          Gallery
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div className="absolute left-0 mt-1 w-44 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <button onClick={()=>handleLogin("/visiting-cards")} className="block px-4 py-2 hover:bg-gray-100">Business Cards</button>
          <button onClick={()=>handleLogin("/brouchers")} className="block px-4 py-2 hover:bg-gray-100">Flyers & Brochures</button>
          <button onClick={()=>handleLogin("/wedding-cards")} className="block px-4 py-2 hover:bg-gray-100">Wedding Cards</button>
          <button onClick={()=>handleLogin("/digital-printing")} className="block px-4 py-2 hover:bg-gray-100">Digital Printing</button>
          <button onClick={()=>handleLogin("/invitation-cards")} className="block px-4 py-2 hover:bg-gray-100">Invitation Cards</button>
        </div>
      </div>

      <div className="relative group">
        <button className="flex items-center space-x-1 hover:text-blue-600 transition font-semibold">
          Download Template
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div className="absolute left-0 mt-1 w-44 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <a href="/Visiting_Card.zip" download="Visiting_Card.zip" className="block px-4 py-2 hover:bg-gray-100">Visiting Card</a>
          <a href="/Wedding_Card_Templeate.zip" download="Wedding_Card_Templeate.zip" className="block px-4 py-2 hover:bg-gray-100">Wedding Card</a>
          <a href="/Design_Guidlines.zip" download="Design_Guidlines.zip" className="block px-4 py-2 hover:bg-gray-100">Design Guidlines</a>
          <a href="/Brouchers_Templeate.zip" download="Brouchers_Templeate.zip" className="block px-4 py-2 hover:bg-gray-100">Broucher</a>
        </div>
      </div>

      <div className="relative group">
        <button className="flex items-center space-x-1 hover:text-blue-600 transition font-semibold">
          Help
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div className="absolute left-0 mt-1 w-44 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <button onClick={()=>{handleLogin("/howToPlaceOrder");}} className="block px-4 py-2 hover:bg-gray-100">How to place order?</button>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">How to make payment?</a>
        </div>
      </div>

      <div className="relative group">
        <button className="flex items-center space-x-1 hover:text-blue-600 transition font-semibold">
          Account
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div className="absolute left-0 mt-1 w-44 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <Link to="/myProfile" className="block px-4 py-2 hover:bg-gray-100">Edit Profile</Link>
          {provider === 'local' &&(<Link to="/changePassword" className="block px-4 py-2 hover:bg-gray-100">Change Password</Link>)}
          <button onClick={logoutPage} className="block px-4 py-2 hover:bg-gray-100">Logout</button>
        </div>
      </div>

      <button onClick={logoutPage} className="hover:text-blue-600 transition relative group">Logout
        <span className="absolute left-0 -bottom-1 w-0 h-1 bg-blue-600 group-hover:w-full transition-all"></span>
      </button>
    </nav>

    {/* <!-- Right: Org & Wallet --> */}
        <div className="hidden md:flex flex-col items-end mx-4 space-y-1">
          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-md shadow-sm text-sm">

            {/* Incomplete Company Indicator */}
      <div className="relative group z-50">
{userInfo?.OrgName ? (
  /* Organization Name – Professional SaaS Style */
  <div
    className="flex items-center space-x-2
               px-3 py-1.5
               bg-gray-100/80
               border border-gray-200
               rounded-lg
               shadow-sm"
    title={userInfo.OrgName}
  >
    {/* Building Icon */}
    <svg
      className="w-4 h-4 text-gray-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"
      />
    </svg>

    {/* Org Name */}
    <span
      className="text-sm font-semibold text-gray-900
                 max-w-[180px] truncate tracking-tight"
    >
      {userInfo.OrgName}
    </span>

    {/* Verified Dot */}
    <span
      className="w-2 h-2 rounded-full bg-green-500"
      title="Organization verified"
    />
  </div>
) : (
  /* Incomplete Company Profile Button */
  <button
    onClick={() => navigate("/myProfile")}
    className="w-9 h-9 flex items-center justify-center
               rounded-full border border-amber-300
               bg-amber-50 text-amber-600
               hover:bg-amber-100 hover:text-amber-700
               transition-all duration-200"
    aria-label="Complete company profile"
  >
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4m0 4h.01"
      />
    </svg>
  </button>
)}


          {/* Tooltip BELOW */}
          <div
            className="absolute top-full left-1/2 mt-2 -translate-x-1/2
                      whitespace-nowrap
                      bg-gray-900 text-white text-xs font-medium
                      px-3 py-1.5 rounded-md shadow-lg
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-200 pointer-events-none"
          >
            Complete company profile
          </div>
        </div>

      

        <button id="walletbtn" className="bg-yellow-400 p-1 rounded-full hover:bg-yellow-500 transition" title="Wallet">
          <img src="/Images/wallet.png" alt="Wallet" />
        </button>

        {/* 🛒 Cart */}
        <div className="flex items-center md:space-x-2 space-x-4 mx-4">
          <button className="relative bg-blue-300 p-1 rounded-full hover:bg-blue-400 transition" title="Cart">
            <img onClick={()=>{
              navigateFunction('/cartViewPage');
            }} src="/Images/cart.png" alt="Cart" className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartCounts}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* <!-- Mobile Menu with Dropdowns --> */}
  <div id="mobileNav" className="hidden md:hidden bg-white w-full shadow-md">
    <Link to="/home" className="block px-6 py-2 border-b hover:bg-gray-100">Home</Link>
    <Link to="/placeOrder" className="block px-6 py-2 border-b hover:bg-gray-100">Place Order</Link>
    <Link to="/myProfile" className="block px-6 py-2 border-b hover:bg-gray-100">My Profile</Link>
    <Link to="/orderHistory" className="block px-6 py-2 border-b hover:bg-gray-100">Order History</Link>

    {/* <!-- Mobile Dropdowns --> */}
    <div className="border-t">
      <button className="w-full text-left px-6 py-2 hover:bg-gray-100 flex justify-between items-center" onClick={()=>toggleDropdown('mobileCatalog')}>Gallery <span>+</span></button>
      <div id="mobileCatalog" className="hidden bg-gray-50">
        <Link to='/visiting-cards' className="block px-8 py-2 hover:bg-gray-100">Business Cards</Link>
        <Link to='/brouchers' className="block px-8 py-2 hover:bg-gray-100">Flyers & Brochures</Link>
        <Link to='/wedding-cards' className="block px-8 py-2 hover:bg-gray-100">Wedding Cards</Link>
        <Link to='/digital-printing' className="block px-8 py-2 hover:bg-gray-100">Digital Printing</Link>
        <Link to='/invitation-cards' className="block px-8 py-2 hover:bg-gray-100">Custom Merchandise</Link>
      </div>

      <button className="w-full text-left px-6 py-2 hover:bg-gray-100 flex justify-between items-center" onClick={()=>toggleDropdown('mobileDownload')}>Download Template <span>+</span></button>
      <div id="mobileDownload" className="hidden bg-gray-50">
        <a href="/Visiting_Card.zip" download="Visiting_Card.zip" className="block px-8 py-2 hover:bg-gray-100">Visiting Cards</a>
        <a href="/Wedding_Card_Templeate.zip" download="Wedding_Card_Templeate.zip"  className="block px-8 py-2 hover:bg-gray-100">Wedding Card</a>
        <a href="/Design_Guidlines.zip" download="Design_Guidlines.zip"  className="block px-8 py-2 hover:bg-gray-100">Design Guidlines</a>
        <a href="/Brouchers_Templeate.zip" download="Brouchers_Templeate.zip"  className="block px-8 py-2 hover:bg-gray-100">Brouchers</a>
      </div>

      <button className="w-full text-left px-6 py-2 hover:bg-gray-100 flex justify-between items-center" onClick={()=>toggleDropdown('mobileHelp')}>Help <span>+</span></button>
      <div id="mobileHelp" className="hidden bg-gray-50">
        <button onClick={()=>{handleLogin("/howToPlaceOrder");}} className="block px-8 py-2 hover:bg-gray-100">How To Place Order?</button>
        <a href="#" className="block px-8 py-2 hover:bg-gray-100">How To Make Payment?</a>
      </div>

      <button className="w-full text-left px-6 py-2 hover:bg-gray-100 flex justify-between items-center" onClick={()=>toggleDropdown('mobileAccount')}>Account <span>+</span></button>
      <div id="mobileAccount" className="hidden bg-gray-50">
        <Link to="/myProfile" className="block px-8 py-2 hover:bg-gray-100">Edit Profile</Link>
        {provider === 'local' && (<Link to="/changePassword" className="block px-8 py-2 hover:bg-gray-100">Change Password</Link>)}
        <button onClick={logoutPage} className="block px-8 py-2 hover:bg-gray-100">Logout</button>
      </div>
    </div>

    {/* ✅ Wallet and Cart for Mobile */}
    <div className="flex justify-around items-center py-3 border-t">
      {/* Wallet */}
      <button
        className="flex items-center space-x-2 bg-yellow-400 px-4 py-2 rounded-full hover:bg-yellow-500 transition"
        title="Wallet"
      >
        <img src="/Images/wallet.png" alt="Wallet" className="w-5 h-5" />
        <span className="font-semibold text-gray-800">Wallet</span>
      </button>

      {/* Cart */}
      <button
        className="relative flex items-center space-x-2 bg-blue-400 px-4 py-2 rounded-full hover:bg-blue-500 transition"
        title="Cart"
      >
        <img src="/Images/cart.png" alt="Cart" className="w-5 h-5" />
        <span className="font-semibold text-white">Cart</span>
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {cartCounts}
        </span>
      </button>
    </div>
  </div>

  {/* <!-- Gradient Separator --> */}
  <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-400"></div>
</header>
</>
  );
}
