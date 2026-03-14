import React, { useState } from 'react'
import '../Components_Css/Landing_al.css';
import CountUp from 'react-countup';

import { useNavigate } from 'react-router-dom';


// Loading Animation Call LoaderFunction -> It will call Loader.
// Common Function for adding Loading.
import LoaderFunction from '../Loader/LoaderFunction';


export default function Landing_al() {

  const [loading, setLoading] = useState(null);
  let navigate = useNavigate(); // We Cannot use useNavigate inside the setTimeout Directly.

 let handleLoading = (path) =>{
  setLoading(path);
 }


  return (
  <>
  {/* Call the handleLoading Function It will set the loading with the path if the loading is not empty then the Loader Function will be displayed */}
  {loading && <LoaderFunction onFinish={()=>{
    navigate(loading);
    setLoading(null);
  }} />}
 
  {/* <!-- Hero Section --> */}
  <section className="relative w-full overflow-hidden pt-16" >
    <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>

    {/* <!-- Sliding Images Container --> */}
    <div className="sliding-carousel relative z-0">
      <img src="/Images/printnestuihomepage.jpg" className="h-96 object-cover rounded-lg shadow-lg" alt="Business Cards" />
      <img src="/Images/printnestuihome2.jpg" className="h-96 object-cover rounded-lg shadow-lg" alt="Flyers" />
      <img src="/Images/printnestuihome3.jpg" className="h-96 object-cover rounded-lg shadow-lg" alt="Brochures" />
      <img src="https://img.freepik.com/free-vector/banner-mockup_23-2148890060.jpg" className="h-96 object-cover rounded-lg shadow-lg" alt="Banners" />
      <img src="https://img.freepik.com/free-vector/stationery-mockup_23-2148890029.jpg" className="h-96 object-cover rounded-lg shadow-lg" alt="Stationery" />
      {/* <!-- Duplicate images for smooth loop --> */}
      <img src="https://img.freepik.com/free-vector/business-card-mockup_53876-104740.jpg" className="h-96 object-cover rounded-lg shadow-lg" alt="Business Cards" />
      <img src="https://img.freepik.com/free-vector/flyer-mockup-template_23-2148890041.jpg" className="h-96 object-cover rounded-lg shadow-lg" alt="Flyers" />
      <img src="https://img.freepik.com/free-vector/brochure-mockup_23-2148890055.jpg" className="h-96 object-cover rounded-lg shadow-lg" alt="Brochures" />
      <img src="https://img.freepik.com/free-vector/banner-mockup_23-2148890060.jpg" className="h-96 object-cover rounded-lg shadow-lg" alt="Banners" />
      <img src="https://img.freepik.com/free-vector/stationery-mockup_23-2148890029.jpg" className="h-96 object-cover rounded-lg shadow-lg" alt="Stationery" />
    </div>

    {/* <!-- Overlay Content --> */}
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
        Premium Printing Services
      </h1>
      <p className="text-gray-200 text-lg md:text-xl mb-6 drop-shadow-md">
        Fast, reliable, and professional printing solutions for businesses and events
      </p>
      <div className="flex space-x-4">
        <button onClick={()=>handleLoading('/placeOrder')}  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
          Place Order
        </button>
        <button onClick={()=>handleLoading('/gallery')} className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-2 rounded-lg font-semibold transition">
          View Gallery
        </button>
      </div>
    </div>
  </section>

{/* //   <!-- Business Stats Section --> */}
  <section className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    {/* <!-- Total Orders --> */}
    <div className="animate-fadeUp text-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 transform hover:scale-105 transition relative overflow-hidden">
        <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
          <img src="/Images/cart.png" alt="Total Orders" className="w-10 h-10" />
        </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Total Orders</h2>
          <CountUp end={1245} duration={5} className="text-blue-600 text-4xl font-bold"></CountUp>
          <p className="text-gray-500 mt-2">Orders Completed Successfully</p>
     </div>

    </div>

    {/* <!-- Orders in Process --> */}
    <div className="animate-fadeUp text-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 transform hover:scale-105 transition relative overflow-hidden">
         <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
          <img src="/Images/process.png" alt="Orders in Process" className="w-10 h-10" />
         </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Orders in Process</h2>
      <CountUp  end={87} duration={5} className="text-yellow-500 text-4xl font-bold" />
      <p className="text-gray-500 mt-2">Currently Being Printed</p>
      </div>
    </div>

    {/* <!-- Orders Dispatched Today --> */}
    <div className="animate-fadeUp text-center">
    <div className="bg-white shadow-2xl rounded-2xl p-8 transform hover:scale-105 transition relative overflow-hidden">
      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
        <img src="/Images/delivery.png" alt="Dispatched Today" className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Dispatched Today</h2>
      <CountUp end={32} duration={5} className="text-green-500 text-4xl font-bold" />
      <p className="text-gray-500 mt-2">Orders Delivered Today</p>
    </div>
    </div>
  </section>
  </>
  )
}
