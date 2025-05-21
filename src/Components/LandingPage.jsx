import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import CategoryCard from "./CategoryCard";
import "./LandingPage.css";

const categories = [
  { title: "Fruits & Vegetables", icon: "🍎" },
  { title: "Bakery & Dairy", icon: "🥐" },
  { title: "Personal Care", icon: "🧴" },
  { title: "Cleaning & Household", icon: "🧹" },
  { title: "Snacks & Munchies", icon: "🍪" },
  { title: "Stationery & Office", icon: "✏️" },
  { title: "Groceries", icon: "🛒" },
  { title: "Organic & Health Foods", icon: "🌿" },
  { title: "Instant & Ready-to-Eat", icon: "🍜" },
  { title: "Home Furnishing", icon: "🛋️" },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const auth = getAuth();

  // This will trigger on any click on the page
  const handleAnyClick = (e) => {
    if (!auth.currentUser) {
      navigate("/auth?mode=signin");
    }
  };

  // Prevent propagation for input and buttons so user can type/search
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className="landing-container" onClick={handleAnyClick}>
      {/* Top Navbar */}
      <div className="top-bar" onClick={stopPropagation}>
        <div className="logo">comparely</div>
        <div className="icons">
          <div className="icon" onClick={() => navigate("/auth?mode=signin")}>👤</div>
          <div className="icon" onClick={() => navigate("/auth?mode=signin")}>🛒</div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="heading" onClick={stopPropagation}>
        <h1>
          Compare Prices Across <span className="highlight">All Platforms</span>
        </h1>
        <p>
          Find the best deals on groceries and essentials from Zepto, Swiggy Instamart,
          <br />
          Blinkit, BigBasket, JioMart
        </p>
      </div>

      {/* Search Bar */}
      <div className="search-bar" onClick={stopPropagation}>
        <input
          type="text"
          placeholder="Search for eggs, milk, bread..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
        <button onClick={() => navigate("/auth?mode=signin")}>🔍</button>
      </div>

      {/* Platform Buttons */}
      <div className="platforms" onClick={stopPropagation}>
        <span className="label">Compare for:</span>
        {["Swiggy Instamart", "Zepto", "BigBasket", "JioMart", "Blinkit"].map((platform, idx) => (
          <button
            key={idx}
            className="active"
            onClick={() => navigate("/auth?mode=signin")}
          >
            {platform}
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="categories" onClick={stopPropagation}>
        {categories.map((cat, idx) => (
          <div key={idx} onClick={() => navigate("/auth?mode=signin")}>
            <CategoryCard title={cat.title} icon={cat.icon} />
          </div>
        ))}
      </div>
    </div>
  );
}