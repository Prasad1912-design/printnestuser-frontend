import React, { useEffect } from "react";
import "../../Components_Css/Broucher.css";

const products = [
  { id: "Vis101", name: "Royal Elegance", price: "₹25/card", desc: "Classic and elegant design with gold embossing", img: "https://www.vivahcards.com/wp-content/uploads/2024/07/Indian-Wedding-Card-20261-Super-Gloss-Premium-Invitation-Cards.jpg", rating: 5 },
  { id: "Vis102", name: "Floral Charm", price: "₹30/card", desc: "Soft floral patterns perfect for traditional weddings", img: "https://i.pinimg.com/736x/4f/cd/4e/4fcd4e9dc4a7320f6cb3a29dcf4cf6ac.jpg", rating: 4 },
  { id: "Vis103", name: "Golden Heritage", price: "₹35/card", desc: "Intricate gold foil detailing for luxury weddings", img: "https://i.pinimg.com/736x/02/6c/9c/026c9cf80c7b1f3f8e6d61c79a0d3812.jpg", rating: 5 },
  { id: "Vis104", name: "Pastel Bliss", price: "₹50/card", desc: "Soft pastel shades with delicate prints", img: "https://i.pinimg.com/736x/11/f1/8d/11f18d0b6c95d31f86cc9c8aa4592dc6.jpg", rating: 5 },
  { id: "Vis105", name: "Royal Red", price: "₹55/card", desc: "Bright red traditional wedding cards with gold accents", img: "https://i.pinimg.com/736x/44/28/f7/4428f7eacbaef3af43db11bbcd8a10c0.jpg", rating: 5 },
  { id: "Vis106", name: "Lavender Charm", price: "₹42/card", desc: "Soft lavender with subtle patterns", img: "https://i.pinimg.com/736x/ab/47/15/ab4715f68c4e52e42f26f77a21670736.jpg", rating: 5 },
  { id: "Vis107", name: "Golden Lotus", price: "₹60/card", desc: "Lotus embossed foil design symbolizing purity", img: "https://i.pinimg.com/736x/03/62/59/03625954cb87925db54e568dc34e885a.jpg", rating: 5 },
  { id: "Vis108", name: "Royal Peacock", price: "₹58/card", desc: "Vibrant peacock artwork with metallic accents", img: "https://i.pinimg.com/736x/47/70/3a/47703a4ee27a45dbe7b24b9d241f4c62.jpg", rating: 5 },
  { id: "Vis109", name: "Velvet Touch", price: "₹65/card", desc: "Luxurious velvet finish with embossed patterns", img: "https://i.pinimg.com/736x/d8/51/61/d85161b00e8b72c24b9483b7ddf0f1f2.jpg", rating: 4 },
  { id: "Vis110", name: "Pearl White", price: "₹45/card", desc: "Elegant white texture with silver lining", img: "https://i.pinimg.com/736x/d7/a4/8a/d7a48a84de83022629f8c7db36a93702.jpg", rating: 5 },
  { id: "Vis111", name: "Modern Minimal", price: "₹40/card", desc: "Simple yet classy minimalistic invitation", img: "https://i.pinimg.com/736x/12/4c/d7/124cd70b1dcb6d544b15cb3e8328b1e2.jpg", rating: 4 },
  { id: "Vis112", name: "Emerald Bliss", price: "₹52/card", desc: "Green and gold combination with elegant fonts", img: "https://i.pinimg.com/736x/1b/38/21/1b382112f2da71e6e617b157406f61f1.jpg", rating: 5 },
  { id: "Vis113", name: "Classic Scroll", price: "₹70/card", desc: "Royal scroll invitation with silk ribbon", img: "https://i.pinimg.com/736x/8c/0b/1d/8c0b1d32d1a06e38e9ac5b5ef9b3f447.jpg", rating: 5 },
  { id: "Vis114", name: "Royal Mandala", price: "₹48/card", desc: "Traditional mandala print with gold ink", img: "https://i.pinimg.com/736x/4b/0c/73/4b0c73974b4de292f25f27f403a03bb9.jpg", rating: 4 },
  { id: "Vis115", name: "Elegant Frame", price: "₹32/card", desc: "Stylish frame layout with foil border", img: "https://i.pinimg.com/736x/39/10/d1/3910d1e8d27c4edfe2ab1d7d82568a67.jpg", rating: 5 },
  { id: "Vis116", name: "Ivory Bliss", price: "₹55/card", desc: "Ivory tone invitation with embossed motifs", img: "https://i.pinimg.com/736x/7d/09/43/7d09434a7d6d410a6b12af4c0db91c94.jpg", rating: 5 },
  { id: "Vis117", name: "Regal Frame", price: "₹68/card", desc: "Classic royal design with elegant frame", img: "https://i.pinimg.com/736x/bd/7a/93/bd7a93a321f39b3da33ff64ee3c1f01b.jpg", rating: 5 },
  { id: "Vis118", name: "Marble Touch", price: "₹36/card", desc: "Marble effect texture with gold typography", img: "https://i.pinimg.com/736x/59/3e/a8/593ea8b4c42562e1397d5bb9d978132a.jpg", rating: 4 },
  { id: "Vis119", name: "Sapphire Dream", price: "₹62/card", desc: "Blue sapphire tone with embossed silver", img: "https://i.pinimg.com/736x/f2/34/5a/f2345a869b33e3b602b2dd257b0a87ac.jpg", rating: 5 },
  { id: "Vis120", name: "Blush Harmony", price: "₹38/card", desc: "Soft blush tone with minimalist elegance", img: "https://i.pinimg.com/736x/fc/32/32/fc3232ff91e30487026d42a67bfbef59.jpg", rating: 4 },
  { id: "Vis121", name: "Blush Harmony", price: "₹38/card", desc: "Soft blush tone with minimalist elegance", img: "https://i.pinimg.com/736x/fc/32/32/fc3232ff91e30487026d42a67bfbef59.jpg", rating: 4 }

];

const BrouchersCatlog = () => {
  const renderStars = (rating) => (
    <span className="rating-broucher text-yellow-400">
      {"★".repeat(rating) + "☆".repeat(5 - rating)}
    </span>
  );

  const handleAdd = (name) => alert(`${name} added to cart!`);

  // 👇 Fade-in animation on scroll
  useEffect(() => {
    const cards = document.querySelectorAll(".product-card");
    const reveal = () => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          card.classList.add("visible");
        }
      });
    };
    window.addEventListener("scroll", reveal);
    reveal();
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  return (
    <div className="wedding-bg min-h-screen pt-24 pb-16">
      <section className="max-w-7xl mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold gradient-text mb-2">
          Brouchers Collection
        </h1>
        <div className="divider mx-auto mb-6"></div>
        <p className="text-gray-700 text-lg mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          Discover our curated collection of designer wedding invitations — blending tradition, art, and luxury.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((p) => (
            <div key={p.id} className="product-card shadow-xl">
              <div className="product-id-broucher">#{p.id}</div>
              <img src={p.img} alt={p.name} className="product-image" />
              <div className="product-content-broucher">
                <h3 className="product-title-broucher">{p.name}</h3>
                <p className="product-desc-broucher">{p.desc}</p>
                <p className="product-price-broucher">{p.price}</p>
                <div className="product-rating-broucher">{renderStars(p.rating)}</div>
                <button onClick={() => handleAdd(p.name)} className="add-btn">
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BrouchersCatlog;


// direct export or first declare and at last export
