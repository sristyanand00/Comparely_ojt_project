import React, { useEffect, useState } from "react";
import "./ComparelyDashboard.css";
import { useNavigate } from "react-router-dom";

import DairyBreadsEggs from '../assets/dairy,eggs,milk.jpeg';
import ColdDrinksJuices from '../assets/Cold Drinks & Juices.jpg';
import SnacksMunchies from '../assets/Snacks & Munchies.jpg';
import BreakfastInstantFood from '../assets/Breakfast & Instant Food.jpg';
import SweetTooth from '../assets/Sweet Tooth.jpg';
import BakeryBiscuits from '../assets/Bakery & Biscuits.jpg';
import TeaCoffeeHealthDrink from '../assets/Tea, Coffee & Health Drink.jpg';
import AttaRiceDal from '../assets/Atta, Rice & Dal.jpg';
import FruitsVegetables from '../assets/Fruits & Vegetables.jpg';
import FrozenFoods from '../assets/Frozen Foods.jpg';
// import FruitsVegetables from '../assets/fruits&vegetables.jpeg';

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
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetch("/data/products.json")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to load products:", err));
  }, []);

  const bestDeals = products.slice(0, 20);

  // --- Autocomplete logic ---
  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }
    const searchLower = search.toLowerCase();
    // Product name suggestions
    const productNames = products
      .map(p => p.name)
      .filter(Boolean)
      .filter((name, idx, arr) => arr.indexOf(name) === idx) // unique
      .filter(name => name.toLowerCase().includes(searchLower));
    // Category suggestions
    const categoryNames = [
      ...navCategories.map(c => c.name),
      ...bigCategories.map(c => c.name)
    ].filter((name, idx, arr) => arr.indexOf(name) === idx)
     .filter(name => name.toLowerCase().includes(searchLower));
    // Combine and limit
    const combined = [...productNames, ...categoryNames].slice(0, 8);
    setSuggestions(combined);
  }, [search, products]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?query=${encodeURIComponent(search.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    navigate(`/products?query=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
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
        <form className="navbar-search" onSubmit={handleSearch} autoComplete="off" style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search for products, brands, categories..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
            style={{ position: 'relative', zIndex: 11 }}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="autocomplete-dropdown" style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: '#fff',
              border: '1px solid #ddd',
              borderTop: 'none',
              zIndex: 12,
              listStyle: 'none',
              margin: 0,
              padding: 0,
              maxHeight: 220,
              overflowY: 'auto',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
            }}>
              {suggestions.map((s, idx) => (
                <li
                  key={s + idx}
                  onMouseDown={() => handleSuggestionClick(s)}
                  style={{
                    padding: '10px 16px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f0f0f0',
                    color: '#222',
                    background: '#fff',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = '#f5f5f5'}
                  onMouseOut={e => e.currentTarget.style.background = '#fff'}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
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
      <footer className="dashboard-footer" style={{background:'#f7fafd', color:'#222', padding:'2.2rem 1rem 1.2rem 1rem', marginTop:'2rem', borderTop:'1px solid #e0e0e0'}}>
        <div className="footer-links" style={{justifyContent: 'center', gap: '2.5rem', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <div style={{textAlign:'center'}}>
            <b style={{fontSize:'1.25rem', color:'#7b2ff2', letterSpacing:'-1px'}}>Comparely</b>
            <div style={{marginTop:'0.7rem', color:'#444', fontSize:'1.01rem', maxWidth: 420, marginLeft:'auto', marginRight:'auto'}}>
              Comparely helps you instantly compare grocery and essentials prices across top platforms like Zepto, Swiggy Instamart, Blinkit, BigBasket, and JioMart. Find the best deals, save money, and shop smarter—all in one place.
            </div>
            <ul style={{listStyle:'none', padding:0, margin:'1rem 0 0 0', display:'flex', gap:'2.2rem', justifyContent:'center'}}>
              <li><a href="/about" style={{color:'#222', textDecoration:'none', fontWeight:500, fontSize:'1.07rem'}}>About</a></li>
              <li><a href="mailto:support@comparely.com" style={{color:'#222', textDecoration:'none', fontWeight:500, fontSize:'1.07rem'}}>Contact</a></li>
              <li><a href="/privacy" style={{color:'#222', textDecoration:'none', fontWeight:500, fontSize:'1.07rem'}}>Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom" style={{textAlign:'center', color:'#939393', fontSize:'0.97rem', marginTop:'1.3rem'}}>
          © 2024 Comparely. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
