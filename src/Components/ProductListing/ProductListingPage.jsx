import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ProductListing.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ProductListingPage() {
  const query = useQuery().get('query')?.toLowerCase() || '';
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [brandFilter, setBrandFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/products`)
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

  return (
    <div className="product-listing-container">
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
              <tr key={prod._id || idx}>
                <td>
                  <img src={prod.image} alt={prod.name || "Product"} width={40} />
                </td>
                <td>
                  <strong>{prod.name || "N/A"}</strong>
                  <div style={{ fontSize: 12 }}>{prod.description || ""}</div>
                </td>
                <td>{prod.brand || "N/A"}</td>
                <td>₹ {prod.prices?.zepto ?? "N/A"}</td>
                <td>₹ {prod.prices?.instamart ?? "N/A"}</td>
                <td>₹ {prod.prices?.blinkit ?? "N/A"}</td>
                <td>₹ {prod.prices?.jiomart ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}