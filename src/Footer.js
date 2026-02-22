import React, { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <footer id="contact" className="bg-gray-900 text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Print Nest</h3>
          <p className="text-gray-400 leading-relaxed">
            Your one-stop destination for high-quality printing services. We specialize in wedding
            cards, visiting cards, T-shirt prints, banners, and more.
          </p>
        </div>
        
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Contact Us</h3>
          <ul className="space-y-2">
            <li>
              <span className="font-semibold">Email:</span>{" "}
              <a href="mailto:info@printnest.com" className="hover:text-yellow-400">
                info@printnest.com
              </a>
            </li>
            <li>
              <span className="font-semibold">Phone:</span>{" "}
              <a href="tel:+918793621912" className="hover:text-yellow-400">
                +91 8793621912
              </a>
            </li>
            <li>
              <span className="font-semibold">Address:</span> Shree Samarth Nivas, Pune, India
            </li>
          </ul>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-yellow-400">Home</a></li>
            <li><a href="#services" className="hover:text-yellow-400">Our Services</a></li>
            <li><a href="#portfolio" className="hover:text-yellow-400">Portfolio</a></li>
            <li><a href="#about" className="hover:text-yellow-400">About Us</a></li>
            <li><a href="#contact" className="hover:text-yellow-400">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
        &copy; {year} Print Nest. All rights reserved.
      </div>
    </footer>
  );
}
