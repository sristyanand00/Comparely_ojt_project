import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import CategoryCard from "./CategoryCard";
import "./LandingPage.css";
import FruitsVegetablesImg from '../assets/Fruits & Vegetables.jpg';
import BakeryBiscuitsImg from '../assets/Bakery & Biscuits.jpg';
import SweetTooth from '../assets/Sweet Tooth.jpg';
import  FrozenFoods from '../assets/Frozen Foods.jpg';
import SnacksMunchiesImg from '../assets/Snacks & Munchies.jpg';
import TeaCoffeeImg from '../assets/Tea, Coffee & Health Drink.jpg';
import DairyEggsMilkImg from '../assets/dairy,eggs,milk.jpeg';
import AttaRiceDalImg from '../assets/Atta, Rice & Dal.jpg';
import InstantReadyImg from '../assets/Breakfast & Instant Food.jpg';
import ColdDrinksJuicesImg from '../assets/Cold Drinks & Juices.jpg';

const categories = [
  { title: "Fruits & Vegetables", image: FruitsVegetablesImg },
  { title: "Bakery & Biscuits", image: BakeryBiscuitsImg },
  { title: "Sweet Tooth", image: SweetTooth },
  { title: "Frozen Foods", image: FrozenFoods },
  { title: "Snacks & Munchies", image: SnacksMunchiesImg },
  { title: "Tea, Coffee & Health Drink", image: TeaCoffeeImg },
  { title: "Dairy, Eggs & Milk", image: DairyEggsMilkImg },
  { title: "Atta, Rice & Dal", image: AttaRiceDalImg },
  { title: "Breakfast & Instant Food", image: InstantReadyImg },
  { title: "Cold Drinks & Juices", image: ColdDrinksJuicesImg },
];

const navCategories = [
  "Grocery", "Electronics", "Fashion", "Home", "Mobiles", "Beauty"
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to load products:", err));
  }, []);

  const bestDeals = products.slice(0, 10);
  const categoryProducts = navCategories.map(cat => ({
    category: cat,
    products: products.filter(p => p.category === cat).slice(0, 6)
  }));

  const handleAnyClick = (e) => {
    if (!auth.currentUser) {
      navigate("/auth?mode=signin");
    }
  };

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className="landing-container" onClick={handleAnyClick}>
      <div className="top-bar" onClick={stopPropagation}>
        <div className="logo">comparely</div>
        <div className="icons">
          <div className="icon" onClick={() => navigate("/auth?mode=signin")}>👤</div>
          <div className="icon" onClick={() => navigate("/auth?mode=signin")}>🛒</div>
        </div>
      </div>

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

      <form
        className="search-bar"
        onSubmit={e => {
          e.preventDefault();
          navigate("/auth?mode=signin");
        }}
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

      <div className="categories" onClick={stopPropagation}>
        {categories.map((cat, idx) => (
          <div key={idx} onClick={() => navigate("/auth?mode=signin")}>
            <CategoryCard title={cat.title} image={cat.image} />
          </div>
        ))}
      </div>

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
      {/* Footer Section */}
      <footer className="landing-footer" style={{background:'#f7fafd', color:'#222', padding:'2.2rem 1rem 1.2rem 1rem', marginTop:'2rem', borderTop:'1px solid #e0e0e0'}}>
        <div className="footer-links" style={{justifyContent: 'center', gap: '2.5rem', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <div style={{textAlign:'center'}}>
            <b style={{fontSize:'1.25rem', color:'#4CAF50', letterSpacing:'-1px'}}>Comparely</b>
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