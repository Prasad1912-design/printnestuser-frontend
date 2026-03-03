import React, { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  // Smooth scroll with offset for fixed header
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Our Services", id: "our services" },
    { label: "Portfolio", id: "portfolio" },
    { label: "About Us", id: "about us" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer id = "contact" className="bg-gray-900 text-gray-300 relative pt-16">
      {/* Top Gradient Divider */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-300"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-3xl font-bold text-yellow-400">Print Nest</h3>
          <p className="text-gray-400 leading-relaxed">
            We deliver high-quality printing solutions for weddings, events, and businesses. From custom cards to personalized merchandise, every print is crafted with care and precision.
          </p>
          <div className="flex space-x-3">
            {["facebook-f", "instagram", "whatsapp", "linkedin-in"].map((icon) => (
              <a
                key={icon}
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300 p-3 bg-gray-800 rounded-full hover:bg-yellow-500"
              >
                <i className={`fab fa-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-white">Contact</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <span className="font-medium text-gray-200">Email:</span>{" "}
              <a href="mailto:info@printnest.com" className="hover:text-yellow-400 transition-colors">
                info@printnest.com
              </a>
            </li>
            <li>
              <span className="font-medium text-gray-200">Phone:</span>{" "}
              <a href="tel:+918793621912" className="hover:text-yellow-400 transition-colors">
                +91 8793621912
              </a>
            </li>
            <li>
              <span className="font-medium text-gray-200">Address:</span> Pune, India
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2">
            {navItems.map(({ label, id }) => (
              <li key={label}>
                <span
                  onClick={() => handleScroll(id)}
                  className="hover:text-yellow-400 cursor-pointer transition-colors duration-300"
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter / About Mini */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-white">Stay Updated</h3>
          <p className="text-gray-400">
            Subscribe to our newsletter for latest offers, tips, and promotions.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="p-3 rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex-1"
            />
            <button
              type="submit"
              className="p-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 rounded-md font-semibold transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t border-gray-700 mt-12 mb-6 w-11/12 mx-auto"></div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm pb-6">
        &copy; {year} <span className="text-yellow-400 font-medium">Print Nest</span>. All rights reserved.
      </div>
    </footer>
  );
}