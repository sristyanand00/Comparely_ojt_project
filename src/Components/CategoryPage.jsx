import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ComparelyDashboard.css";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.error("Failed to load products:", err);
      });
  }, []);

  const filteredProducts = products.filter(
    p => p.category === categoryName
  );

  return (
    <div className="dashboard-root">
      <nav className="main-navbar">
        <div className="navbar-logo" style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>Comparely</div>
        <button style={{ marginLeft: 16 }} onClick={() => navigate(-1)}>&larr; Back</button>
      </nav>
      <section className="mock-section">
        <div className="section-title">{categoryName} Products</div>
        {loading ? (
          <div>Loading...</div>
        ) : filteredProducts.length === 0 ? (
          <div>No products found in this category.</div>
        ) : (
          <div className="mock-cards">
            {filteredProducts.map((prod, idx) => (
              <div className="mock-card" key={idx}>
                <img src={prod.image} alt={prod.name} />
                <div className="mock-card-title">{prod.name}</div>
                <div className="mock-card-price">₹{prod.prices ? Math.min(...Object.values(prod.prices)) : prod.price}</div>
                <button className="add-btn">Add</button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
} 