import React, { useEffect, useState } from "react";
import printNestLogo from '../Print Nest.jpg';

export default function About() {
  const [about, setAbout] = useState(
    `Print Nest is dedicated to providing high-quality printing services including wedding cards, visiting cards, and custom designs. We combine creativity with precision to deliver premium prints that leave lasting impressions. Our team ensures every project meets professional standards while catering to client needs.`
  );

  return (
    <section
      id="about us"
      className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side — Image */}
        <div className="flex justify-center">
          <img
            src={printNestLogo}
            alt="About Print Nest"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Right Side — Text */}
        <div className="text-center md:text-left">
   <h3 className="text-4xl md:text-5xl text-yellow-500 font-extrabold text-center mb-8">About Us</h3>
                  <p className="text-lg leading-relaxed text-gray-700">{about}</p>

          <button className="mt-6 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-md shadow-md transition-all duration-300 hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
