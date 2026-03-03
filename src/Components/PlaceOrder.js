import React, { useEffect, useState } from "react";
import "../Components_Css/PlaceOrder.css";
import LoaderFunction from "../Loader/LoaderFunction";
import { useNavigate } from "react-router-dom";
import axios from "../utility/axiosPathFiles/axios";

export default function PlaceOrder({ logoutFunction }) {

  const navigate = useNavigate();

  // -------------------- STATE --------------------
  const [categoryDetails, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(null);

  // -------------------- FETCH CATEGORIES --------------------
  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    axios
      .get("/getCategory")
      .then((response) => {
        if (response.data.success && isMounted) {
          setCategory(response.data.details || []);
        }
      })
      .catch((error) => {
        console.error("Category fetch error:", error);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // -------------------- NAVIGATION WITH LOADER --------------------
  const loaderFunction = (path) => {
    if (!path) return;
    setLoader(path.startsWith("/") ? path : `/${path}`);
  };

  // -------------------- SLIDER CONTROLS (WITH CLEANUP) --------------------
  useEffect(() => {
    const slider = document.getElementById("productSlider");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    if (!slider || !nextBtn || !prevBtn) return;

    const next = () =>
      slider.scrollBy({ left: 300, behavior: "smooth" });
    const prev = () =>
      slider.scrollBy({ left: -300, behavior: "smooth" });

    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);

    return () => {
      nextBtn.removeEventListener("click", next);
      prevBtn.removeEventListener("click", prev);
    };
  }, []);

  // -------------------- IMAGES --------------------
  const Sliderimages = {
    WeddingCards: "/Images/PlaceOrder/SliderImages/WeddingCards.png",
    VisitingCards: "/Images/PlaceOrder/SliderImages/VisitingCards.png",
    DigitalPrints: "/Images/PlaceOrder/SliderImages/DigitalPrint.png",
    Brouchers: "/Images/PlaceOrder/SliderImages/Brouchers.png",
    Posters: "/Images/PlaceOrder/SliderImages/Posters.png",
    InvitationCards: "/Images/PlaceOrder/SliderImages/InvitationCards.png",
  };

  // -------------------- RENDER --------------------
  return (
    <div className="pt-24 relative">

      {/* Page Loader (during navigation) */}
      {loader && (
        <LoaderFunction
          onFinish={() => {
            navigate(loader);
            setLoader(null);
          }}
        />
      )}

      {/* Header */}
      <section className="py-12 text-center">
        <h1 className="text-5xl font-bold gradient-text tracking-wide">
          Place Order
        </h1>
        <p className="mt-4 text-gray-700 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Discover our premium printing services crafted with precision,
          creativity, and high-quality materials — built to impress.
        </p>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <p className="text-center text-gray-500 text-lg">
            Loading categories...
          </p>
        ) : categoryDetails.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No categories available
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {categoryDetails.map((product, index) => (
              <div
                key={index}
                className="product-card-Page overflow-hidden flex flex-col"
              >
                <img
                  src={product.CategoryImage}
                  alt={product.CategoryName || "Category"}
                  className="w-full h-72 object-cover"
                />
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold gradient-text mb-2 text-center">
                      {product.CategoryName}
                    </h3>
                    <p className="product-desc">
                      {product.CategoryDesc}
                    </p>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => loaderFunction(product.slug)}
                      className="order-btn"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Slider Section */}
      <section className="px-4 py-16 bg-gradient-to-b from-white via-gray-50 to-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-12 gradient-text">
          More Products
        </h2>

        <div className="relative max-w-6xl mx-auto">
          <div
            id="productSlider"
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory scroll-smooth px-3"
          >
            {categoryDetails.map((item, idx) => (
              <div key={idx} className="slider-card snap-start">
                <img src={item.OptionalImage} alt={item.CategoryName} />
                <button
                  onClick={() => loaderFunction(item.slug)}
                  className="slider-title"
                >
                  {item.CategoryName}
                </button>
              </div>
            ))}
          </div>

          <button
            id="prevBtn"
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow hover:bg-gray-100 transition"
          >
            &#8592;
          </button>
          <button
            id="nextBtn"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow hover:bg-gray-100 transition"
          >
            &#8594;
          </button>
        </div>
      </section>
    </div>
  );
}
