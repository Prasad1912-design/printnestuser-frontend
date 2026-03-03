import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Layers, CreditCard, Truck } from "lucide-react";
import { Link } from "react-router-dom";

export default function HowToPlaceOrders() {
  const steps = [
    {
      id: "01",
      title: "Choose Category",
      desc: "Start by selecting your product category.",
      icon: <Layers size={46} className="text-blue-600" />,
    },
    {
      id: "02",
      title: "Select Product",
      desc: "Explore designs and choose your quantity.",
      icon: <ShoppingCart size={46} className="text-green-600" />,
    },
    {
      id: "03",
      title: "Secure Payment",
      desc: "Complete your order with safe online payments.",
      icon: <CreditCard size={46} className="text-purple-600" />,
    },
    {
      id: "04",
      title: "Fast Delivery",
      desc: "Get your product delivered to your doorstep.",
      icon: <Truck size={46} className="text-red-600" />,
    },
  ];

  return (
    <div className="relative pt-24 pb-20 px-5 bg-white overflow-hidden">

      {/* SOFT BACKGROUND BLUR EFFECTS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 blur-[90px] opacity-30 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 blur-[90px] opacity-30 rounded-full"></div>

      <div className="relative max-w-6xl mx-auto text-center">

        {/* HERO IMAGE */}
        <motion.img
          src="/Images/HowToPlaceOrder.png.jpg"
          alt="How To Place Order"
          className="w-full rounded-3xl shadow-lg border"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        />

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-gray-900 mt-10 tracking-tight">
          Simple & Smooth Ordering Experience
        </h1>

        <p className="text-gray-600 text-lg mt-3 max-w-2xl mx-auto">
          Follow our easy 4-step process to place your printing order quickly and securely.
        </p>

        {/* ANIMATED CONNECTOR LINE */}
        <motion.div
          className="hidden md:block w-full h-1 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-full mt-16"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </div>

      {/* STEPS GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">

        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-xl transition"
          >
            {/* Step Number */}
            <div className="absolute top-4 left-4 text-gray-300 text-sm font-bold tracking-wider">
              STEP {step.id}
            </div>

            {/* Floating Icon */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex justify-center mb-6"
            >
              {step.icon}
            </motion.div>

            {/* Step Title */}
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              {step.title}
            </h3>

            <p className="text-sm text-gray-600 text-center mt-3 leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA BUTTON */}
      <div className="text-center mt-16">
        <Link to="/placeOrder">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-10 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-lg hover:bg-blue-700 transition"
        >
          Start Your Order
        </motion.button>
        </Link>
      </div>
    </div>
  );
}
