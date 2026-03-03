  import React, { useEffect, useState } from "react";
  import { Link, useParams } from "react-router-dom";
  import "../../Components_Css/ProductDetail.css";
  import { useCount } from '../../Context/CreateContext';
  import axios from "../../utility/axiosPathFiles/axios";

  export default function ProductDetailPage() {
    const { IncreaseCount } = useCount();
    const { ids, pName } = useParams();

    const [detailPage, setDetailPage] = useState(null);
    const [alsoConsider, setAlsoConsider] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [selectedThumb, setSelectedThumb] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");

    // Fetch product detail dynamically
      useEffect(() => {
        axios.get(`/getProduct/${ids}/${pName}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
        })
        .then(res => {
          if (res.data.success) {
            setDetailPage(res.data.data);
            setAlsoConsider(res.data.alsoConsider);
            console.log(res.data.data);
            console.log(res.data.alsoConsider);

            // Set initial main image & selected thumbnail
            if (res.data.data.images && res.data.data.images.length > 0) {
              setMainImage(res.data.data.images[0].url);
              setSelectedThumb(0);
            }

            const minQty = res.data.data.minQty || 100;
            setQuantity(minQty);
            setTotalPrice(minQty * res.data.data.basePrice);
          }
        })
        .catch(err => {
          setSuccessMessage(err.response?.data?.message || "Something went wrong");
        });
    }, [ids, pName]);

    if (!detailPage) return <h1 className="pt-20">Loading...</h1>;

    // Quantity handlers
          const handleQuantityChange = (e) => {
            const value = e.target.value;

            // allow empty input while typing
            if (value === "") {
              setQuantity("");
              return;
            }

            // only allow numbers
            if (!/^\d+$/.test(value)) return;

            setQuantity(Number(value));
          };

          const handleQuantityBlur = () => {
          let finalQty = Number(quantity) || detailPage.minQty;

          if (finalQty < detailPage.minQty) {
          finalQty = detailPage.minQty;
          }

          setQuantity(finalQty);
          setTotalPrice(finalQty * detailPage.basePrice);
          };



    const incrementQty = () => {
      setQuantity(prev => {
        const newQty = prev + 1;
        setTotalPrice(newQty * detailPage.basePrice);
        return newQty;
      });
    };

    const decrementQty = () => {
      setQuantity(prev => {
        const newQty = prev - 1 < detailPage.minQty ? detailPage.minQty : prev - 1;
        setTotalPrice(newQty * detailPage.basePrice);
        return newQty;
      });
    };

    // Render stars dynamically
  const renderStars = (rating) => {
    // rating can be float, e.g., 4.6
    return (
      <div className="star-rating">
        {[0, 1, 2, 3, 4].map((i) => {
          const fillPercent = Math.min(Math.max(rating - i, 0), 1) * 100;
          return (
            <span key={i} className="star">
              <span
                className="star-fill"
                style={{ width: `${fillPercent}%` }}
              >
                ★
              </span>
              <span className="star-empty">★</span>
            </span>
          );
        })}
      </div>
    );
  };


    return (
      <div className="product-detail-container pt-20">

        {/* -------- Product Detail -------- */}
        <div className="product-detail-wrapper">

          {/* Left Images */}
          <div className="image-section">
            <div className="main-image-container">
              <img
                src={mainImage}
                alt="product"
                className="main-product-image"
                onClick={() => setShowModal(true)}
              />
            </div>
            <div className="thumbnail-container">
              {detailPage.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt="thumb"
                  className={`thumb-image ${selectedThumb === idx ? 'selected-thumb' : ''}`}
                  onClick={() => { setMainImage(img.url); setSelectedThumb(idx); }}
                />
              ))}
            </div>
          </div>

          {/* Right Info */}
          <div className="product-info-section">
            <h2 className="product-title">{detailPage.productName}</h2>
            <div className="rating">{renderStars(detailPage.Ratingstar)} <span>({detailPage.Ratingstar} Stars)</span></div>

            <div className="price-qty-row">
              <div className="qty-field">
                <label>Quantity:</label>
                <div className="qty-input-wrapper">
                  <button onClick={decrementQty}>-</button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      onBlur={handleQuantityBlur}
                      min={detailPage.minQty}
                    />
                  <button onClick={incrementQty}>+</button>
                </div>
              </div>
              <div className="product-price">₹{detailPage.basePrice} / piece</div>
            </div>

            <p className="min-note">* Minimum order quantity is {detailPage.minQty}</p>
            <div className="total-price"><b>Total Price: ₹{totalPrice.toLocaleString()}</b></div>

            <p className="product-desc">{detailPage.longDesc}</p>

            <ul className="feature-list">
              {detailPage.points?.map((point, i) => (
                <li key={i}>✔ {point.text}</li>
              ))}
            </ul>

            <div className="extra-info">
              <p>🚚 <b>Estimated Delivery:</b> {detailPage.estimatedDelivery} Days</p>
              <p>♻️ <b>Eco-friendly & Recyclable Materials</b></p>
              <p>✅ <b>100% Quality Printing Guarantee</b></p>
              {detailPage.isShippablle && <p>📦 <b>Free Shipping Available</b></p>}
            </div>

            <div className="action-buttons">
              {/* <button className="btn-buy"></button> */}
              <button className="btn-primary">Buy Now</button>
              <button onClick={()=>IncreaseCount(ids, quantity)} className="btn-secondary">Add to Cart</button>
            </div>
          </div>
        </div>

        {/* -------- Fullscreen Modal -------- */}
            {showModal && (
              <div className="image-modal">
                <div
                  className="modal-overlay"
                  onClick={() => setShowModal(false)}
                ></div>

                <div className="modal-content">
                  <button
                    className="modal-close"
                    onClick={() => setShowModal(false)}
                  >
                    ✖
                  </button>

                  <img
                    src={mainImage}
                    alt="fullscreen"
                    className="fullscreen-image"
                  />
                </div>
              </div>
            )}
        {/* -------- Also Consider (Static) -------- */}
        <div className="also-consider-section">
          <h2>You May Also Like</h2>
          <div className="also-grid">
    {alsoConsider.length > 0 &&
    alsoConsider.map((item) => (
        <Link to={`/${item.productSlug}/${item._id}`} key={item._id} className="also-card">
          <img src={item.images[0].url} alt={item.productName} />
          <h3>{item.productName}</h3>
          <p>₹{item.basePrice}</p>
        </Link>
      ))}
  </div>
        </div>
      </div>
    );
  }
