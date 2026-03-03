import React, { useState, useEffect } from "react";

export default function Portfolio_BL() {
  const portfolioData = [
    { name: "Wedding Card", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&w=600&q=80" },
    { name: "Visiting Card", img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&w=600&q=80" },
    { name: "T-Shirt Print", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&w=600&q=80" },
    { name: "Banner Print", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&w=600&q=80" },
    { name: "Flyer Design", img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&w=600&q=80" },
    { name: "Poster Design", img: "https://images.unsplash.com/photo-1506790409786-287062b21cfe?auto=format&w=600&q=80" },
    { name: "Invitation Card", img: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&w=600&q=80" },
    { name: "Sticker Print", img: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?auto=format&w=600&q=80" },
    { name: "Menu Card", img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&w=600&q=80" },
    { name: "Gift Card", img: "https://images.unsplash.com/photo-1607082349566-187342175e2b?auto=format&w=600&q=80" },
    { name: "Book Cover", img: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&w=600&q=80" },
    { name: "Magazine Print", img: "https://images.unsplash.com/photo-1603791452906-bc3ba1c0c4b1?auto=format&w=600&q=80" },
  ];

  const [visibleItems, setVisibleItems] = useState([]);
  const [modalData, setModalData] = useState(null);

  // Smooth fade-in effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisibleItems(portfolioData.map((_, i) => i));
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="text-center mb-12">
        <h3 className="text-4xl md:text-5xl text-yellow-500 font-extrabold text-center mb-8">
        Our Portfolio
      </h3>
        <p className="text-gray-600 mt-4 text-lg">Explore our recent print and design works</p>
      </div>

      {/* Portfolio Grid */}
      <div className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-7xl">
        {portfolioData.map((item, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-xl bg-white shadow-md border border-gray-200 transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${
              visibleItems.includes(i)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110 cursor-pointer"
              onClick={() => setModalData(item)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-2 text-sm font-medium opacity-0 hover:opacity-100 transition-opacity duration-300">
              {item.name}
            </div>
          </div>
        ))}
      </div>

      {/* Modal View */}
      {modalData && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
          onClick={() => setModalData(null)}
        >
          <div
            className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-xl w-[90%] transform transition-all duration-300 scale-105"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-gray-600 text-3xl font-bold hover:text-gray-900 transition"
              onClick={() => setModalData(null)}
            >
              ×
            </button>
            <img
              src={modalData.img}
              alt={modalData.name}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-0 w-full text-center bg-white/80 py-3 font-semibold text-gray-800 text-lg shadow-inner">
              {modalData.name}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
