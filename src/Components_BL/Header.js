import React, { useState } from "react";
import printNestLogo from '../Print Nest.jpg';

export default function Header({ open }) {
  const [hoverLogin, setHoverLogin] = useState(false);

  // Map each nav item to its actual section ID
  const navItems = [
    { label: "Home", id: "home" },
    { label: "Our Services", id: "our services" }, // matches Services.js
    { label: "Portfolio", id: "portfolio" },
    { label: "About Us", id: "about us" },         // matches About.js
    { label: "Contact", id: "contact" }           // matches Footer.js
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-md bg-blue-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-lg overflow-hidden shadow-lg border-2 border-yellow-400 flex items-center justify-center">
            <img
              src={printNestLogo}
              alt="Print Nest Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Print Nest</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 font-medium text-gray-700">
          {navItems.map((item) => (
            <a
              key={item.label}
              onClick={() => {
                const section = document.getElementById(item.id);
                if (!section) {
                  console.warn(`Section with ID "${item.id}" not found`);
                  return; // prevent error
                }

                const headerOffset = 80; // adjust for your fixed header height
                const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
              }}
              className="relative group cursor-pointer px-2 py-1 hover:text-yellow-500 transition-colors"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-yellow-400 group-hover:w-full transition-all"></span>
            </a>
          ))}
        </nav>

        {/* Login Button */}
        <button
          className={`px-5 py-2 rounded-md font-semibold transition-colors duration-300 ${
            hoverLogin ? "bg-yellow-500" : "bg-yellow-400"
          } text-gray-900 shadow hover:shadow-lg`}
          onClick={open}
        >
          Login
        </button>
      </div>

      {/* Subtle Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-yellow-300 to-yellow-200"></div>
    </header>
  );
}