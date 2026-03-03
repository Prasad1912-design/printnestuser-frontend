// ProfessionalCategoryPage.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Search } from "lucide-react";
// import {Images} from "../../public/Images/wallet.png";

const categories = [
  { name: "wedding-cards", title: "Wedding Cards", subtitle: "Luxury & traditional wedding invitations", count: "25+", image:"/images/wallet.png" },
  { name: "digital-printing", title: "Digital Printing", subtitle: "Large format and digital prints", count: "48+", image: "/images/wallet.png" },
  { name: "visiting-cards", title: "Visiting Cards", subtitle: "Corporate & premium business cards", count: "60+", image: "/images/wallet.png" },
  { name: "brouchers", title: "Brochures", subtitle: "Tri-fold, bi-fold & catalog designs", count: "33+", image: "/images/wallet.png" },
  { name: "posters", title: "Posters", subtitle: "Event and promotional posters", count: "88+", image: "/images/wallet.png" },
  { name: "invitation-cards", title: "Invitation Cards", subtitle: "Birthdays, anniversaries & events", count: "38+", image: "/images/wallet.png" },
];


function CategoryCard({ category }) {
  return (
    <Link
      to={`/${category.name}`}
      className="group block bg-white rounded-xl shadow hover:shadow-lg border border-gray-100 transition p-6"
    >
      <div className="flex items-center gap-5">
        {/* Category Image */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
          <p className="text-sm text-gray-500 mt-1 truncate">{category.subtitle}</p>
          <span className="inline-block mt-3 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
            {category.count} designs
          </span>
        </div>

        {/* Arrow Icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className="text-gray-400 group-hover:text-indigo-600 transition"
        >
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  );
}


export default function ProfessionalCategoryPage({ user = {} }) {
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { email = "user@example.com", phone = "000-000-0000" } = user;

  const filtered = useMemo(() =>
    categories.filter((c) => c.title.toLowerCase().includes(search.toLowerCase())), [search]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    console.log({ email, phone, message }); // Replace with real API
    setSubmitted(true); // Indicates that the form is Submmited.
    setSuccessMessage("✅ Your query has been sent successfully!"); // Success Message
    setMessage(""); // The text box resets empty on submit.
  };

  if(submitted) // On submitted Remove the Success Message After 3 Secs.
  {
  setTimeout(()=>{
    setSubmitted(false);
  },3000);
  }

  return (
    <main className="pt-28 max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Explore Design Categories</h1>
        <p className="mt-2 text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Discover our professional printing designs and past works. Click a category to explore more.
        </p>
      </header>

      {/* Search */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search categories..."
          className="w-full md:w-[500px] border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
        />
      </div>

      {/* Categories Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
        {filtered.map((c) => <CategoryCard key={c.id} category={c} />)}
{filtered.length === 0 && (
  <div className="col-span-full flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-gray-200">
    <div className="mb-4">
      <Search className="w-12 h-12 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      No categories found
    </h3>
    <p className="text-gray-500 mb-4 text-center max-w-xs">
      Sorry, we couldn't find any categories matching your search. Try a different keyword or clear your filters.
    </p>
    <button
      onClick={() => setSearch("")}
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
    >
      Clear Search
    </button>
  </div>
)}
      </section>

      {/* Inline Contact / Expert Query Form */}
      <section className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Have a Question?</h2>
        <p className="text-gray-600 mb-6">
          If you are unsure about which category fits your needs, send us your query. Our team will respond promptly.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-gray-50 p-6 rounded-xl flex flex-col justify-center gap-3">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-600" /> <span className="text-gray-700 font-medium">{email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-600" /> <span className="text-gray-700 font-medium">{phone}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
            {submitted && (
              <p className="text-green-600 font-medium">{successMessage}</p>
            )}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none resize-none h-32"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-lg px-4 py-3 shadow hover:bg-indigo-700 transition"
            >
              Send Query
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
