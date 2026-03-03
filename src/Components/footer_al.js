import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from '../utility/axiosPathFiles/axios';

export default function Footer({logout}) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [provider, setProvider] = useState(null);

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
      }).catch((error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("accessToken"); // remove invalid token
          logout(); // call your logout function
        } else {
          console.log(error.response?.data);
        }
})
    },[])

  const quickLinks = ["Home", "Place Order", "Gallery", "Help Center", "Account", "Testimonials"];
  const services = [
    "Business Cards & Stationery",
    "Wedding & Event Cards",
    "T-Shirt & Merchandise Printing",
    "Custom Banners & Posters",
    "Corporate Branding Solutions"
  ];
  const socialIcons = [
    { src: "/Images/facebook.png", alt: "Facebook" },
    { src: "/Images/instagram.png", alt: "Instagram" },
    { src: "/Images/linkedin.png", alt: "LinkedIn" },
    { src: "/Images/twitter.png", alt: "Twitter" },
  ];

  return (
<footer className="bg-gray-900 text-gray-100 mt-20">
    <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-400"></div>
  {/* Main Footer */}
  <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-gray-200">
    {/* Company Info */}
    <div>
      <h3 className="text-2xl font-bold mb-4 text-yellow-400">Print Nest</h3>
      <p className="text-gray-300 text-sm mb-4">
        Premium printing services for businesses and individuals. Fast, reliable, and professional printing solutions.
      </p>
      <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">Trusted Since 2025</span>
    </div>

    {/* Quick Links */}
    <div>
      <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
      <ul className="space-y-2 text-gray-300 text-sm">
          <li>
            <Link to="/home" className="hover:text-blue-400 transition">Home</Link>
          </li>

           <li>
            <Link to="/placeOrder" className="hover:text-blue-400 transition">Place Order</Link>
          </li>

           <li>
            <Link to="/myProfile" className="hover:text-blue-400 transition">My Profile</Link>
          </li>

           <li>
            <Link to="/gallery" className="hover:text-blue-400 transition">Gallery</Link>
          </li>
           <li>
           {provider === "local" && (<Link to="/changePassword" className="hover:text-blue-400 transition">Change Password</Link>)}
          </li>

      </ul>
    </div>

    {/* Services */}
    <div>
      <h4 className="text-lg font-semibold mb-4 text-white">Our Services</h4>
      <ul className="space-y-2 text-gray-300 text-sm">
        {services.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>
      <div className="mt-4">
        <span className="text-gray-400 text-xs">⭐ 4.9/5 Customer Rating</span>
      </div>
    </div>

    {/* Contact & Newsletter */}
    <div>
      <h4 className="text-lg font-semibold mb-4 text-white">Contact & Updates</h4>
      <ul className="space-y-2 text-gray-300 text-sm mb-4">
        <li>Email: <a href="mailto:info@prasadmore.org" className="hover:text-blue-400 transition">info@prasadmore.org</a></li>
        <li>Phone: <a href="tel:+911234567890" className="hover:text-blue-400 transition">+91 123 456 7890</a></li>
        <li>WhatsApp: <a href="#" className="hover:text-blue-400 transition">Chat Now</a></li>
        <li>Address: 123 Printing Street, Pune, India</li>
      </ul>

      <form className="flex flex-col space-y-2">
        <label htmlFor="newsletter" className="text-gray-300 text-sm">Subscribe for Updates</label>
        <input
          type="email"
          id="newsletter"
          placeholder="Enter your email"
          className="px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Subscribe
        </button>
      </form>

      <div className="flex space-x-4 mt-4">
        {socialIcons.map((icon) => (
          <a key={icon.alt} href="#" className="hover:text-blue-400 transition">
            <img src={icon.src} alt={icon.alt} />
          </a>
        ))}
      </div>
    </div>
  </div>
</footer>

  );
}
