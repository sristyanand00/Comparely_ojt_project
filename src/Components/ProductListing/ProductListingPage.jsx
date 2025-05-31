import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ProductListing.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export default function ProductListingPage() {
  const query = useQuery().get('query')?.toLowerCase() || '';
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [brandFilter, setBrandFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedMsg, setAddedMsg] = useState('');

  // Fetch products from static products.json
  useEffect(() => {
    setLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // Get unique brands for filter dropdown
  const brands = ['All', ...Array.from(new Set(products.map(p => p.brand).filter(Boolean)))];

  // Filter by search and brand
  let filteredProducts = products.filter(prod => {
    const nameMatch = prod.name?.toLowerCase().includes(query);
    const brandMatch = brandFilter === 'All' || prod.brand === brandFilter;
    return nameMatch && brandMatch;
  });

  // Sort by Zepto price (handle missing prices)
  filteredProducts = filteredProducts.sort((a, b) => {
    const aPrice = a.prices?.zepto ?? 0;
    const bPrice = b.prices?.zepto ?? 0;
    return sortOrder === 'asc' ? aPrice - bPrice : bPrice - aPrice;
  });

  // Add to cart handler
  const handleAddToCart = (product, platform) => {
    const cart = getCart();
    cart.push({ ...product, platform });
    setCart(cart);
    setAddedMsg(`Added to cart from ${platform}!`);
    setTimeout(() => setAddedMsg(''), 1500);
  };

  return (
    <div className="product-listing-container" style={{margin: '16px auto', maxWidth: 1200, width: '100%'}}>
      <h2>Comparely</h2>
      <div className="filters-bar">
        <span>Filters</span>
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          Sort By: Price: {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
        </button>
        <select
          value={brandFilter}
          onChange={e => setBrandFilter(e.target.value)}
          style={{ marginLeft: 8, marginRight: 8 }}
        >
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', color: '#fff', fontSize: '1.2rem', margin: '2rem 0' }}>
          Loading...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#fff', fontSize: '1.2rem', margin: '2rem 0' }}>
          No products found
        </div>
      ) : (
        <table className="comparison-table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Brand</th>
              <th>Zepto</th>
              <th>instamart</th>
              <th>Blinkit</th>
              <th>JioMart</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((prod, idx) => (
              <tr key={prod._id || idx} style={{ cursor: 'pointer' }} onClick={() => setSelectedProduct(prod)}>
                <td>
                  <img src={prod.image} alt={prod.name || "Product"} width={40} />
                </td>
                <td>
                  <strong>{prod.name || "N/A"}</strong>
                  <div style={{ fontSize: 12 }}>{prod.description || ""}</div>
                </td>
                <td>{prod.brand || "N/A"}</td>
                <td>₹ {prod.prices?.zepto ?? prod.price ?? "N/A"}</td>
                <td>₹ {prod.prices?.instamart ?? prod.price ?? "N/A"}</td>
                <td>₹ {prod.prices?.blinkit ?? prod.price ?? "N/A"}</td>
                <td>₹ {prod.prices?.jiomart ?? prod.price ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Product Comparison Modal/Card */}
      {selectedProduct && (
        <div className="product-modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,30,30,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="product-modal-card" style={{
            background: '#fff', borderRadius: 16, maxWidth: 420, width: '90vw', padding: 32, position: 'relative', boxShadow: '0 8px 32px rgba(0,0,0,0.18)'
          }}>
            <button onClick={() => setSelectedProduct(null)} style={{ position: 'absolute', top: 16, right: 16, background: '#eee', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 22, cursor: 'pointer', color: '#333' }}>×</button>
            <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: 120, height: 120, objectFit: 'contain', borderRadius: 12, background: '#f7fafd', display: 'block', margin: '0 auto 16px auto' }} />
            <h3 style={{ textAlign: 'center', margin: 0 }}>{selectedProduct.name}</h3>
            <div style={{ textAlign: 'center', color: '#555', fontSize: 14, marginBottom: 12 }}>{selectedProduct.description}</div>
            <div style={{ margin: '16px 0' }}>
              <b>Price Comparison:</b>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <li>
                  Zepto: ₹{selectedProduct.prices?.zepto ?? "N/A"}
                  <button style={{ marginLeft: 8 }} onClick={() => handleAddToCart(selectedProduct, 'Zepto')}>Add to Cart</button>
                </li>
                <li>
                  Instamart: ₹{selectedProduct.prices?.instamart ?? "N/A"}
                  <button style={{ marginLeft: 8 }} onClick={() => handleAddToCart(selectedProduct, 'Instamart')}>Add to Cart</button>
                </li>
                <li>
                  Blinkit: ₹{selectedProduct.prices?.blinkit ?? "N/A"}
                  <button style={{ marginLeft: 8 }} onClick={() => handleAddToCart(selectedProduct, 'Blinkit')}>Add to Cart</button>
                </li>
                <li>
                  JioMart: ₹{selectedProduct.prices?.jiomart ?? "N/A"}
                  <button style={{ marginLeft: 8 }} onClick={() => handleAddToCart(selectedProduct, 'JioMart')}>Add to Cart</button>
                </li>
              </ul>
            </div>
            {addedMsg && <div style={{ color: 'green', textAlign: 'center', marginTop: 12 }}>{addedMsg}</div>}
          </div>
        </div>
      )}
    </div>
  );
}