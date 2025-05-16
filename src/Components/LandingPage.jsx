import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  { title: "Snacks & Munchies", icon: "🍟" },
  { title: "Instant & Ready-to-Eat", icon: "🍜" },
  { title: "Stationery & Office", icon: "📎" },
  { title: "Home Furnishing", icon: "🛋️" },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLoginClick = () => {
    navigate("/auth");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (searchTerm.trim() !== "") {
        navigate("/products", { state: { query: searchTerm.trim() } });
      }
    }
  };

  return (
    <div className="landing-container">
      <div className="top-bar">
        <div className="logo">comparely</div>
        <div className="icons">
          <div className="icon" onClick={handleLoginClick}>👤</div>
          <div className="icon">🛒</div>
        </div>
      </div>

      <div className="heading">
        <h1>
          Compare Prices Across <span className="highlight">All Platforms</span>
        </h1>
        <p>
          Find the best deals on groceries and essentials from zepto, swiggy instamart,
          <br />
          blinkit, bigbasket, jiomart
        </p>
      </div>

    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for eggs, milk, bread..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
        autoFocus
      />

    </div>
      <div className="platforms">
        <span className="label">Compare for:</span>
        <button className="active">Swiggy instamart</button>
        <button className="active">Zepto</button>
        <button className="active">BigBasket</button>
        <button className="active">JioMart</button>
        <button className="active">Blinkit</button>
      </div>

      <div className="categories">
        {categories.map((cat, idx) => (
          <CategoryCard key={idx} title={cat.title} icon={cat.icon} />
        ))}
      </div>
    </div>
  );
}
