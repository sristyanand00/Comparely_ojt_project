import React, { useEffect, useState } from "react";
import "./ComparelyDashboard.css";
import { useNavigate } from "react-router-dom";
import FrozenFoodImg from '../assets/FrozenFood.jpeg';
import DairyBreadsEggs from '../assets/dairy,eggs,milk.jpeg';
// import FruitsVegetables from '../assets/fruits&vegetables.jpeg';

const bigCategories = [
  { name: "Frozen Foods", image: FrozenFoodImg },
  { name: "Dairy, Bread & Eggs", image: DairyBreadsEggs },
  // { name: "Fruits & Vegetables", image: FruitsVegetables },
  { name: "Cold Drinks & Juices", image: "https://cdn.zeptonow.com/production///tr:w-300,ar-200-200,pr-true,f-webp,q-80/inventory/banner/4b2e2e1c-2e2e-4e2e-8e2e-4b2e2e1c2e2e.png" },
  { name: "Snacks & Munchies", image: "https://cdn.zeptonow.com/production///tr:w-300,ar-200-200,pr-true,f-webp,q-80/inventory/banner/5b2e2e1c-2e2e-4e2e-8e2e-5b2e2e1c2e2e.png" },
  { name: "Breakfast & Instant Food", image: "https://cdn.zeptonow.com/production///tr:w-300,ar-200-200,pr-true,f-webp,q-80/inventory/banner/6b2e2e1c-2e2e-4e2e-8e2e-6b2e2e1c2e2e.png" },
  { name: "Sweet Tooth", image: "https://cdn.zeptonow.com/production///tr:w-300,ar-200-200,pr-true,f-webp,q-80/inventory/banner/7b2e2e1c-2e2e-4e2e-8e2e-7b2e2e1c2e2e.png" },
  { name: "Bakery & Biscuits", image: "https://cdn.zeptonow.com/production///tr:w-300,ar-200-200,pr-true,f-webp,q-80/inventory/banner/8b2e2e1c-2e2e-4e2e-8e2e-8b2e2e1c2e2e.png" },
  { name: "Tea, Coffee & Health Drink", image: "https://cdn.zeptonow.com/production///tr:w-300,ar-200-200,pr-true,f-webp,q-80/inventory/banner/9b2e2e1c-2e2e-4e2e-8e2e-9b2e2e1c2e2e.png" },
  { name: "Atta, Rice & Dal", image: "https://cdn.zeptonow.com/production///tr:w-300,ar-200-200,pr-true,f-webp,q-80/inventory/banner/10b2e2e1c-2e2e-4e2e-8e2e-10b2e2e1c2e2e.png" }
];

const navCategories = [
  { name: "Grocery", icon: "🛒" },
  { name: "Electronics", icon: "💻" },
  { name: "Fashion", icon: "👗" },
  { name: "Home", icon: "🏠" },
  { name: "Mobiles", icon: "📱" },
  { name: "Beauty", icon: "💄" },
  { name: "Toys", icon: "🧸" },
  { name: "Books", icon: "📚" },
  { name: "Fitness", icon: "🏋️" },
  { name: "Pharmacy", icon: "💊" },
  { name: "Appliances", icon: "🍳" },
  { name: "Footwear", icon: "👟" },
  { name: "Sports", icon: "🏏" },
  { name: "Stationery", icon: "✏️" },
  { name: "Pets", icon: "🐶" }
];

const allCategories = [
  ...navCategories.slice(0, 6),
  ...navCategories.slice(6, 12)
];

const categoryProducts = allCategories.map((cat, idx) => ({
  category: cat.name,
  products: Array.from({ length: 10 }, (_, i) => ({
    name: `${cat.name} Product ${i + 1}`,
    price: (Math.random() * 1000 + 50).toFixed(0),
    image: `https://picsum.photos/seed/${cat.name}${i}/120/120`
  }))
}));

const popularSearches = Array.from({ length: 15 }, (_, i) => ({
  name: `Popular ${i + 1}`,
  image: `https://picsum.photos/seed/popular${i}/100/100`
}));

export default function ComparelyDashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to load products:", err));
  }, []);

  const bestDeals = products.slice(0, 20);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?query=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="dashboard-root">
      {/* NAV BAR */}
      <nav className="main-navbar">
        <div className="navbar-logo">Comparely</div>
        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for products, brands, categories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>
        <div className="navbar-actions">
          <span
            className="navbar-profile"
            title="Profile"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/profile")}
          >
            👤
          </span>
          <span className="navbar-cart" title="Cart">🛒</span>
        </div>
      </nav>

      {/* TRANSPARENT CATEGORY BAR */}
      <div className="category-bar">
        <div className="category-bar-scroll">
          {navCategories.map((cat, idx) => (
            <div className="category-bar-item" key={idx} title={cat.name}>
              <span className="category-bar-icon">{cat.icon}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BIG CATEGORY SECTION */}
      <section className="big-category-section">
        <div className="big-category-grid">
          {bigCategories.map((cat, idx) => (
            <div className="big-category-card" key={idx}>
              <div className="big-category-img-wrap">
                <img src={cat.image} alt={cat.name} />
              </div>
              <div className="big-category-name">{cat.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BEST DEALS SECTION */}
      <section className="mock-section">
        <div className="section-title">🔥 Best Deals</div>
        <div className="best-deals-row">
          {bestDeals.map((deal, idx) => (
            <div className="mock-card best-deal-card" key={deal.id || idx}>
              <img src={deal.image} alt={deal.name} />
              <div className="mock-card-title">{deal.name}</div>
              <div className="mock-card-price">₹{deal.price}</div>
              <button className="add-btn">Add</button>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORY SECTIONS */}
      {categoryProducts.map((cat, i) => (
        <section className="mock-section" key={i}>
          <div className="section-title">{cat.category}</div>
          <div className="mock-cards">
            {cat.products.map((prod, idx) => (
              <div className="mock-card" key={idx}>
                <img src={prod.image} alt={prod.name} />
                <div className="mock-card-title">{prod.name}</div>
                <div className="mock-card-price">₹{prod.price}</div>
                <button className="add-btn">Add</button>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* POPULAR SEARCHES */}
      <section className="mock-section">
        <div className="section-title">Popular Searches</div>
        <div className="popular-searches">
          {popularSearches.map((item, idx) => (
            <div className="search-chip" key={idx}>
              <img src={item.image} alt={item.name} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="dashboard-footer">
        <div className="footer-links">
          <div>
            <b>Links</b>
            <ul>
              <li>About</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>
          <div>
            <b>Support</b>
            <ul>
              <li>Help Center</li>
              <li>Terms</li>
              <li>Privacy</li>
            </ul>
          </div>
          <div>
            <b>Download App</b>
            <div className="app-buttons">
              <button>Google Play</button>
              <button>App Store</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © 2024 Comparely. All rights reserved.
        </div>
      </footer>
    </div>
  );
}