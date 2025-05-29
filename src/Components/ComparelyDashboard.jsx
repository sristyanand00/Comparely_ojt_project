import React, { useEffect, useState } from "react";
import "./ComparelyDashboard.css";
import { useNavigate } from "react-router-dom";
//import FrozenFoodImg from '../assets/frozenfood.jpeg';
import DairyBreadsEggs from '../assets/dairy,eggs,milk.jpeg';
// import FruitsVegetables from '../assets/fruits&vegetables.jpeg';

const bigCategories = [
 // { name: "Frozen Foods", image: FrozenFoodImg },
  { name: "Dairy, Bread & Eggs", image: DairyBreadsEggs },
  // { name: "Fruits & Vegetables", image: FruitsVegetables },
  { name: "Cold Drinks & Juices", image: "https://cdn.zeptonow.com/production///tr:w-300,ar-200-200,pr-true,f-webp,q-80/inventory/banner/4b2e2e1c-2e2e-4e2e-8e2e-4b2e2e1c2e2e.png" },
  { name: "Snacks & Munchies", image: "https://cdn.zeptonow.com/production///tr:w-300,ar-200-200,pr-true,f-webp,q-80/inventory/banner/5b2e2e1c-2e2e-4e2e-8e2e-5b2e2e1c2e2e.png" },
  { name: "Breakfast & Instant Food", image: "https://cdn.zeptonow.com/production///tr:w-300,ar-200-200,pr-true,f-webp,q-80/inventory/banner/6b2e2e1c-2e2e-4e2e-8e2e-6b2e2e1c2e2e.png" },
  { name: "Sweet Tooth", image: "https://cdn.zeptonow.com/production///tr:w-300,ar-200-200,pr-true,f-webp,q-80/inventory/banner/7b2e2e1c-2e2e-4e2e-8e2e-7b2e2e1c2e2e.png" },
  { name: "Bakery & Biscuits", image: "https://cdn.zeptonow.com/production///tr:w-300,ar-200-200,pr-true,f-webp,q-80/inventory/banner/8b2e2e1c-2e2e-4e2e-8e2e-8b2e2e1c2e2e.png" },
  { name: "Tea, Coffee & Health Drink", image: "https://cdn.zeptonow.com/production///tr:w-300,ar-200-200,pr-true,f-webp,q-80/inventory/banner/9b2e2e1c-2e2e-4e2e-8e2e-9b2e2e1c2e2e.png" },
  { name: "Atta, Rice & Dal", image: "https://cdn.zeptonow.com/production///tr:w-300,ar-200-200,pr-true,f-webp,q-80/inventory/banner/10b2e2e1c-2e2e-4e2e-8e2e-10b2e2e1c2e2e.png" },
  { name: "Fruits & Vegetables", image: "https://cdn.zeptonow.com/production///tr:w-300,ar-200-200,pr-true,f-webp,q-80/inventory/banner/11b2e2e1c-2e2e-4e2e-8e2e-11b2e2e1c2e2e.png" },
  { name: "Frozen Foods", image: "https://cdn.zeptonow.com/production///tr:w-300,ar-200-200,pr-true,f-webp,q-80/inventory/banner/12b2e2e1c-2e2e-4e2e-8e2e-12b2e2e1c2e2e.png" },
];

const navCategories = [
  { name: "Grocery", icon: "🥦" },
  { name: "Electronics", icon: "🖥️" },
  { name: "Fashion", icon: "👗" },
  { name: "Home", icon: "🏠" },
  { name: "Mobiles", icon: "📱" },
  { name: "Beauty", icon: "💄" },
  { name: "Toys", icon: "🧸" },
  { name: "Books", icon: "📚" },
  { name: "Fitness", icon: "🏋️" },
  { name: "Pharmacy", icon: "💊" },
  { name: "Appliances", icon: "🧊" },
  { name: "Footwear", icon: "👟" },
  { name: "Sports", icon: "🏏" },
  { name: "Stationery", icon: "🖊️" },
  { name: "Pets", icon: "🐶" }
];

const allCategories = navCategories;

const popularSearches = Array.from({ length: 15 }, (_, i) => ({
  name: `Popular ${i + 1}`,
  image: `https://picsum.photos/seed/popular${i}/100/100`
}));

// Generate mock products for each category
const overlayProducts = {};
bigCategories.forEach(cat => {
  overlayProducts[cat.name] = Array.from({ length: 18 }, (_, i) => ({
    name: `${cat.name} Product ${i + 1}`,
    price: (Math.random() * 1000 + 50).toFixed(0),
    image: `https://picsum.photos/seed/${encodeURIComponent(cat.name)}${i}/160/160`
  }));
});

export default function ComparelyDashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [overlayCategory, setOverlayCategory] = useState(null);

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

  // Smooth scroll to section by id
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            <div
              className="category-bar-item"
              key={idx}
              title={cat.name}
              style={{ cursor: "pointer" }}
              onClick={() => scrollToSection(cat.name)}
            >
              <span className="category-bar-icon">{cat.icon}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BIG CATEGORY SECTION */}
      <section className="big-category-section">
        <div className="big-category-grid">
          {bigCategories.map((cat, idx) => (
            <div
              className="big-category-card"
              key={idx}
              style={{ cursor: "pointer" }}
              onClick={() => setOverlayCategory(cat.name)}
            >
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
      {allCategories.map((cat, i) => {
        const filtered = products.filter(p => p.category === cat.name);
        return (
          <section
            className="mock-section"
            key={i}
            id={cat.name}
          >
            <div className="section-title">{cat.name}</div>
            <div className="mock-cards">
              {filtered.length === 0 ? (
                <div style={{ color: '#888', fontSize: 18, padding: 24 }}>
                  No products found in this category.
                </div>
              ) : (
                filtered.slice(0, 10).map((prod, idx) => (
                  <div className="mock-card" key={idx}>
                    <img src={prod.image} alt={prod.name} />
                    <div className="mock-card-title">{prod.name}</div>
                    <div className="mock-card-price">₹{prod.prices ? Math.min(...Object.values(prod.prices)) : prod.price}</div>
                    <button className="add-btn">Add</button>
                  </div>
                ))
              )}
            </div>
          </section>
        );
      })}

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

      {/* CATEGORY OVERLAY MODAL */}
      {overlayCategory && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(30, 30, 30, 0.85)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 16,
            maxWidth: 1100,
            width: '90vw',
            maxHeight: '90vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            padding: 32,
            position: 'relative',
          }}>
            <button
              onClick={() => setOverlayCategory(null)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: '#eee',
                border: 'none',
                borderRadius: '50%',
                width: 36,
                height: 36,
                fontSize: 22,
                cursor: 'pointer',
                color: '#333',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
              aria-label="Close"
            >
              ×
            </button>
            <div className="section-title" style={{marginBottom: 24}}>{overlayCategory} Products</div>
            <div className="mock-cards" style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
              {overlayProducts[overlayCategory].map((prod, idx) => (
                <div className="mock-card" key={idx}>
                  <img src={prod.image} alt={prod.name} />
                  <div className="mock-card-title">{prod.name}</div>
                  <div className="mock-card-price">₹{prod.price}</div>
                  <button className="add-btn">Add</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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