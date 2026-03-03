import React, { useEffect, useRef, useState } from 'react';

export default function Services() {
  const carouselRef = useRef(null);
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1); // start after first clone
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const serviceImages = [
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80"
  ];

  // Clone first and last slide for seamless looping
  useEffect(() => {
    const cloned = [serviceImages[serviceImages.length - 1], ...serviceImages, serviceImages[0]];
    setSlides(cloned);
  }, []);

  // Auto-slide
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => handleNext(), 4000);
    return () => clearInterval(interval);
  }, [slides]);

  // Slide transition effect
  useEffect(() => {
    if (!carouselRef.current || slides.length === 0) return;

    carouselRef.current.style.transition = isTransitioning ? 'transform 0.8s ease-in-out' : 'none';
    carouselRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, [currentIndex, isTransitioning, slides]);

  // Handle the "infinite" jump after clones
  useEffect(() => {
    const handleTransitionEnd = () => {
      setIsTransitioning(false);
      if (currentIndex === slides.length - 1) setCurrentIndex(1);
      if (currentIndex === 0) setCurrentIndex(slides.length - 2);
    };
    const carousel = carouselRef.current;
    carousel?.addEventListener('transitionend', handleTransitionEnd);
    return () => carousel?.removeEventListener('transitionend', handleTransitionEnd);
  }, [currentIndex, slides]);

  // Navigation handlers
  const handlePrev = () => {
    if (slides.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (slides.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  // Swipe handlers
  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) diff > 0 ? handleNext() : handlePrev();
  };

  return (
    <section id="our services" className="bg-gray-50 py-24 relative">
      <h3 className="text-4xl md:text-5xl text-yellow-500 font-extrabold text-center mb-12">
        Our Services
      </h3>

      <div
        className="max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-lg relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Carousel */}
        {slides.length > 0 && (
          <div ref={carouselRef} className="flex">
            {slides.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Service ${idx}`}
                className="flex-none w-full min-w-full max-h-80 md:max-h-96 object-cover"
              />
            ))}
          </div>
        )}

        {/* Indicators */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3">
          {serviceImages.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentIndex - 1 === idx ? 'bg-yellow-500' : 'bg-gray-300'
              }`}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(idx + 1);
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          aria-label="Previous Slide"
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-lg"
          onClick={handlePrev}
        >
          &#10094;
        </button>
        <button
          aria-label="Next Slide"
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-lg"
          onClick={handleNext}
        >
          &#10095;
        </button>
      </div>
    </section>
  );
}
