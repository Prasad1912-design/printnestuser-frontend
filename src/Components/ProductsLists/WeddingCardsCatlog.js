import React, { useEffect, useState } from "react";
import "../../Components_Css/WeddingOrder.css";
import { Link, useParams } from "react-router-dom";
import { useCount } from "../../Context/CreateContext";
import axios from "../../utility/axiosPathFiles/axios";
import '../../Components_Css/ProductsList.css';

const categoryContent = {
  "wedding-card": {
    title: "Wedding Cards Collection",
    desc: " Discover our curated collection of designer wedding invitations — blending tradition, art, and luxury for your big day."
  },
  "visiting-card": {
    title: "Professional Business Cards",
    desc: "Premium visiting cards to build your brand identity."
  },
  "digital-print": {
    title: "Custom T-Shirt Printing",
    desc: "High quality custom printed t-shirts."
  },
  "poster": {
    title: "Poster/Flyer Printing",
    desc: "Eye-catching flyers for marketing and promotions."
  },
  "broucher": {
    title: "Brochure Printing",
    desc: "Professional brochures for your business needs."
  },
  "invitation-card": {
    title: "Invitation Cards Collection",
    desc: "Beautifully designed invitation cards for weddings, parties, and special occasions."
  }
};

const WeddingCardsCatalog = () => {
  const { slug } = useParams();
  const { IncreaseCount } = useCount();

  const [productDetails, setProductsDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/getProducts", {
        params: { slug },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      .then((response) => {
        setProductsDetails(response.data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [slug]);

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
  }, [productDetails]);

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const empty = 5 - full;
    return "★".repeat(full) + "☆".repeat(empty);
  };

  const detail = categoryContent[slug];

  return (
    <div className="wedding-bg min-h-screen pt-24 pb-16">
      <section className="max-w-7xl mx-auto p-6 text-center">

        {detail && (
          <>
            <h1 className="text-5xl font-bold gradient-text mb-2 tracking-wide">
              {detail.title}
            </h1>
            <div className="divider mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              {detail.desc}
            </p>
          </>
        )}

        {/* ✅ LOADING */}
      {loading && <h3>(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="placeholder-card"></div>
          ))}
          <div className="loader"></div>
          <p className="text-center text-gray-500 mt-4 text-lg font-medium">Loading products...</p>
        </div>
      )</h3>}

        {/* ✅ NO DATA */}
      {!loading && productDetails.length === 0 && (
        <div className="no-products">
          <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="No products" />
          <h2>Currently No Active {slug} Found Sorry...</h2>
          <p>We couldn’t find any products in this category right now. Please check back later or explore other categories.</p>
          <button onClick={() => window.location.href = '/PrintNest/placeOrder'}>Try Another Category</button>
        </div>
      )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {!loading &&
            productDetails.map((p) => (
              <div key={p._id} className="product-card">
                <div className="image-container">
                  <img
                    src={p.images?.[0]?.url}
                    alt={p.images?.[0]?.alt || p.productName}
                  />
                  <div className="card-overlay"></div>
                </div>

                <div className="card-content">
                  <p className="product-id">#{p._id}</p>
                  <h3>{p.productName}</h3>
                  <p className="desc">{p.shortDescription}</p>
                  
                  <div className="card-footer">
                    <span className="price">₹{p.basePrice}/card</span>
                    <span className="stars">
                      {renderStars(p.Ratingstar)}
                    </span>
                  </div>

                  <div className="actions">
                    <Link
                      to={`/${p.productSlug}/${p._id}`}
                      className="btn-primary"
                    >
                      Buy Now
                    </Link>
                    <button
                      onClick={()=>IncreaseCount(p._id,p.minQty)}
                      className="btn-secondary"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default WeddingCardsCatalog;
