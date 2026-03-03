import React, { useEffect, useState } from "react";
import { useCount } from "../Context/CreateContext";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  ArrowLeft,
  Tag,
  MapPin,
  Edit3,
  Lock,
  Truck,
  Gift,
  Package,
  Map,
} from "lucide-react";
import LoaderFunction from "../Loader/LoaderFunction";
import axios from "../utility/axiosPathFiles/axios";
import { FaRupeeSign } from "react-icons/fa";

export default function CartView({logout}) {
  const navigate = useNavigate();
  const [routePath, setRoutePath] = useState(null);

  const { cartCounts,fetchCartCount} = useCount();
  const setPath = (path) => setRoutePath(path);

  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [distance, setDistance] = useState(0);
  const [newAddress, setNewAddress] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");


  // Fetch cart
  useEffect(() => {
    axios
      .get("/getCartDetails")
      .then((res) =>
        setCartItems(Array.isArray(res.data.data) ? res.data.data : [])
      )
      .catch((err) => console.error(err));
  }, []);

  // Fetch shipping
  useEffect(() => {
    axios
      .get("/getShippingAddress")
      .then((res) => {
        if (res.data.shippingAddress) {
          setShippingAddress(res.data.shippingAddress);
          setDistance(res.data.distance || 0);
          setNewAddress(res.data.shippingAddress);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Qty functions
  const increaseQty = (id) => {
    axios
      .post("/increaseCartQty", { id })
      .then((res) => {
        const updatedQty = res.data.qty;
        setCartItems((prev) =>
          prev
            .map((item) =>
              item._id === id ? { ...item, qty: updatedQty } : item
            )
            .filter((item) => item.qty > 0)
        );
      })
      .catch((err) => console.error(err));
  };

  const createOrder = async () =>{
    try
    {

      const response = await axios.post('/create-order');
          
      const razorpayOrderId = response.data.razorPayOrder.id;

      const options = {
      key: "rzp_test_SImBWGHK5E7tDF",  // from Razorpay dashboard
      amount: response.data.razorPayOrder.amount,    // amount in paisa
      currency: "INR",
      name: "Print Nest",
      description: "Order Payment",
      order_id: razorpayOrderId,

      handler : async function(PaymentResponse) {
        try
        {
        // After Successful Payment send data to the Backend.
        const payment_data = {razorpay_order_id : PaymentResponse.razorpay_order_id,
                              razorpay_payment_id : PaymentResponse.razorpay_payment_id,
                              razorpay_signature : PaymentResponse.razorpay_signature};

        const payment_response = await axios.post('/verify_payment',{payment_data});
        
         if(payment_response.data.success)
         {
          navigate('/');
         }
        }
        catch(error)
        {
          alert("Payment Failed " + error.message);
        }
      },

      prefill: {
        name: "Customer Name",
        email: "customer@email.com",
        contact: "9999999999",
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    }
    catch(error)
    {
      if(error.response?.status===401)   // error {message,response{status}} -> Structure and ?. if response present then go for status
      {
        logout();
      }

    }
  }

  const decreaseQty = (id) => {
    axios
      .post("/decreaseCartQty", { id })
      .then((res) => {
        const updatedQty = res.data.qty;
        setCartItems((prev) =>
          prev
            .map((item) =>
              item._id === id ? { ...item, qty: updatedQty } : item
            )
            .filter((item) => item.qty > 0)
        );
      })
      .catch((err) => console.error(err));
  };

  const deleteItem = (id) => {
    axios
      .post("/deleteCartItem", { id })
      .then((res) => {
        if (res.data.success) {
          setCartItems((prev) => prev.filter((item) => item._id !== id));
          fetchCartCount();
        }
      })
      .catch((err) => console.error(err));
  };

  const subtotal = cartItems.reduce(
    (s, i) => s + i.qty * i.productId.basePrice,
    0
  );
  const totalQty = cartItems.reduce((s, i) => s + i.qty, 0);
  const shippingCharges = distance ? distance * 7.5 : 0;
  const total = Math.max(subtotal + shippingCharges, 0);

  const saveAddress = () => {
    if (!newAddress.trim()) return;
    axios
      .post("/changeShippingAddress", { newAddress: newAddress.trim() })
      .then((res) => {
        if (res.data.success) {
          setShippingAddress(res.data.shippingAddress);
          setSuccessMessage(res.data.message);
          setIsEditingAddress(false);
        }
      })
      .catch((err) => {
        setSuccessMessage(err.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-24 pb-20">
      {routePath && (
        <LoaderFunction
          onFinish={() => {
            navigate(routePath);
            setRoutePath(null);
          }}
        />
      )}

      {/* Header */}
      <div className="bg-white border-b py-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
          <div className="flex items-center gap-3">
            <img
              src="/Print Nest.jpg"
              alt="PrintNest"
              className="w-12 h-12 rounded-full border border-gray-200 shadow-sm object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
                PrintNest
              </h1>
              <p className="text-sm text-gray-500">
                Where every print tells your story ✨
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
            <ShoppingCart size={20} className="text-blue-600" />
            <span className="font-semibold text-gray-700">{cartCounts} items</span>
          </div>
        </div>
      </div>

      {/* Cart */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <ShoppingCart size={40} className="text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Your cart is empty 😔
          </h2>
          <p className="text-gray-500 mb-4">
            Looks like you haven’t added any print orders yet.
          </p>
          <button
            onClick={() => setPath("/placeOrder")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg"
          >
            Continue to Place Order
          </button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto mt-10 bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 flex flex-col lg:flex-row gap-10 border border-gray-100">
          {/* Left: Cart Items */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
              <ShoppingCart className="text-blue-600" size={22} /> Cart Items
            </h2>

            <ul className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <img
                      src={item.productId.images[0]?.url}
                      alt={item.productId.images[0]?.alt || item.productId.productName}
                      className="w-24 h-24 rounded-xl object-cover border border-gray-200 shadow-sm"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.productId.productName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ₹{item.productId.basePrice} per item
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-100 rounded-full px-2">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        disabled={item.qty <= item.productId.minQty}
                        className="text-gray-600 hover:text-gray-800 w-8 h-8 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold w-6 text-center">{item.qty}</span>
                      <button
                        onClick={() => increaseQty(item._id)}
                        className="text-blue-600 hover:text-blue-800 w-8 h-8 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-semibold text-gray-800 min-w-[70px] text-right flex items-center gap-1">
                      <FaRupeeSign size={14} /> {item.qty * item.productId.basePrice}
                    </span>

                    <button
                      onClick={() => deleteItem(item._id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Summary */}
          <div className="w-full lg:w-1/3 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-md p-6 flex flex-col justify-between border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Package size={18} /> Order Summary
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>SubTotal ({totalQty} items)</span>
                <span className="font-medium text-gray-800 flex items-center gap-1">
                  <FaRupeeSign size={14} /> {subtotal.toFixed(2)}
                </span>
              </div>

              {distance > 0 && (
                <>
                  <div className="flex justify-between text-gray-700">
                    <span>Total Distance</span>
                    <span className="text-red-600 font-medium flex items-center gap-1">
                      <MapPin size={16} /> {distance} km
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping Charges</span>
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <FaRupeeSign size={14} /> {shippingCharges.toFixed(2)}
                    </span>
                  </div>
                </>
              )}


              <hr className="my-2" />

              <div className="flex justify-between text-lg font-semibold text-blue-600">
                <span>Grand Total</span>
                <span className="flex items-center gap-1">
                  <FaRupeeSign /> {total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Promo & Address */}
            <div className="mt-4 space-y-4">
              {/* Shipping Address */}
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <MapPin size={16} /> Shipping Address
                  </h4>
                  {!isEditingAddress && (
                    <button
                      onClick={() => setIsEditingAddress(true)}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                    >
                      <Edit3 size={14} /> Edit
                    </button>
                  )}
                </div>

                {isEditingAddress ? (
                  <div>
                    <textarea
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      rows={2}
                      className="w-full border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <div className="flex justify-end mt-2 gap-2">
                      <button onClick={() => setIsEditingAddress(false)} className="text-gray-500 text-sm">
                        Cancel
                      </button>
                      <button onClick={saveAddress} className="text-blue-600 text-sm font-medium">
                        Save
                      </button>
                    </div>
                    {successMessage && (
                      <div className="bg-green-50 border border-green-400 text-green-700 px-3 py-2 rounded-md text-sm mt-2">
                        {successMessage}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {shippingAddress || "No address available."}
                  </p>
                )}
              </div>
            </div>

            {/* Checkout Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <button
              onClick={createOrder}
                disabled={!shippingAddress}
                className={`py-3 rounded-full flex items-center justify-center gap-2 font-semibold transition-all duration-300 shadow-md ₹{
                  shippingAddress
                    ? "bg-blue-600 hover:bg-blue-100 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Lock size={18} /> Proceed to Checkout
              </button>

              {!shippingAddress && (
                <div className="text-center mt-2">
                  <p className="text-sm text-red-500">
                    Please complete your profile to proceed with checkout.
                  </p>
                  <Link to="/myProfile" className="text-blue-600 hover:underline font-medium">
                    Go to Profile
                  </Link>
                </div>
              )}

              <button
                onClick={() => setPath("/placeOrder")}
                className="border border-gray-400 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-100 font-medium transition-all duration-300"
              >
                <ArrowLeft size={18} /> Continue to Place Order
              </button>
            </div>

            <div className="flex items-center justify-center mt-4 text-sm text-gray-500 gap-2">
              <Truck size={16} />
              <span>Free & Fast Delivery across India</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
