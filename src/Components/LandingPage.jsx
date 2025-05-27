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

// Mock data for Best Deals
const bestDeals = Array.from({ length: 10 }, (_, i) => ({
  name: `Deal Product ${i + 1}`,
  price: (Math.random() * 1000 + 50).toFixed(0),
  image: `https://picsum.photos/seed/bestdeal${i}/120/120`
}));

// Mock data for Category Sections
const navCategories = [
  "Grocery", "Electronics", "Fashion", "Home", "Mobiles", "Beauty"
];
const categoryProducts = navCategories.map((cat, idx) => ({
  category: cat,
  products: Array.from({ length: 6 }, (_, i) => ({
    name: `${cat} Product ${i + 1}`,
    price: (Math.random() * 1000 + 50).toFixed(0),
    image: `https://picsum.photos/seed/${cat}${i}/120/120`
  }))
}));

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
<form
  className="search-bar"
  onSubmit={e => {
    e.preventDefault();
    navigate("/auth?mode=signin");
  }}
  onClick={stopPropagation}
>
  <input
    type="text"
    placeholder="Search for eggs, milk, bread..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    autoFocus
  />
  <button type="submit">🔍</button>
</form>
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

      {/* Best Deals Section */}
      <div className="best-deals-section" onClick={stopPropagation}>
        <h2>🔥 Best Deals</h2>
        <div className="best-deals-row">
          {bestDeals.map((deal, idx) => (
            <div
              className="deal-card"
              key={idx}
              onClick={() => navigate("/auth?mode=signin")}
              style={{ cursor: "pointer" }}
            >
              <img src={deal.image} alt={deal.name} />
              <div>{deal.name}</div>
              <div>₹{deal.price}</div>
              <button>View</button>
            </div>
          ))}
        </div>
      </div>

      {/* Category Sections */}
      {categoryProducts.map((cat, i) => (
        <div className="category-section" key={i} onClick={stopPropagation}>
          <h2>{cat.category}</h2>
          <div className="category-products-row">
            {cat.products.map((prod, idx) => (
              <div
                className="deal-card"
                key={idx}
                onClick={() => navigate("/auth?mode=signin")}
                style={{ cursor: "pointer" }}
              >
                <img src={prod.image} alt={prod.name} />
                <div>{prod.name}</div>
                <div>₹{prod.price}</div>
                <button>View</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}