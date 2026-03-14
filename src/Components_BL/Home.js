import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Components_Css/home_bl.css";

export default function Home() {

  const images = [
    "/Images/ratecard.png",
    "/Images/ratesDown.png",
    "/Images/samedaydelivery.png",
    "/Images/bothsideFoiling.png",
    "/Images/bookOrder.png"
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">

      {/* Background Slider */}
      <div className="hero-slider">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="PrintNest banner"
            className={`hero-slide ${index === current ? "active" : ""}`}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="hero-content">
        <h1>
          Welcome to <span>PrintNest</span>
        </h1>

        <p>
          Premium printing services for businesses and events.
          Fast delivery, best quality and affordable pricing.
        </p>

        <Link to="/RegisterationPage" className="hero-btn">
          Register Now
        </Link>
      </div>

    </section>
  );
}