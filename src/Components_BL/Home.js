import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

export default function Home() {
  const images = [
    "/Images/designing-and-printing.jpg",
    "/Images/designing-and-printing.jpg",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1500&q=80"
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const styleHome = {
    position: 'relative',
    height: '100vh',
    textAlign: 'center',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  };

  const styleSlideshow = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    zIndex: -1
  };

  const styleSlideImg = (index) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 1s ease-in-out',
    opacity: index === current ? 1 : 0
  });

  return (
    <section id="home" style={styleHome}>
      <div className="slideshow" style={styleSlideshow}>
        {images.map((src, index) => (
          <img key={index} src={src} alt="" style={styleSlideImg(index)} />
        ))}
      </div>

      <div className="relative z-10 px-6">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Welcome to <span className="text-yellow-300">Print Nest</span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8">
          Your one-stop destination for high-quality printing services.
        </p>
        <Link to="/RegisterationPage" className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold shadow-lg hover:bg-yellow-300 transition">
          Register Now   </Link>
      </div>
    </section>
  );
}
