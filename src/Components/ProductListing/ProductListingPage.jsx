import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ProductListing.css';

const products = [
  {
    id: 1,
    name: "Amul Taaza",
    description: "Toned Milk 1L",
    image: "/images/amul-taaza.png",
    prices: { Zepto: 62, Instamart: 60, Blinkit: 61, JioMart: 59 }
  },
  {
    id: 2,
    name: "Mother Dairy",
    description: "Full Cream Milk 1L",
    image: "/images/mother-dairy.png",
    prices: { Zepto: 68, Instamart: 67, Blinkit: 69, JioMart: 66 }
  },
  {
    id: 3,
    name: "Nestle a+",
    description: "Toned Milk 1L",
    image: "/images/nestle-a-plus.png",
    prices: { Zepto: 70, Instamart: 69, Blinkit: 71, JioMart: 68 }
  },
  {
    id: 4,
    name: "Doodh Dairy",
    description: "Cow Milk 1L",
    image: "/images/doodh-dairy.png",
    prices: { Zepto: 58, Instamart: 57, Blinkit: 59, JioMart: 56 }
  },
  {
    id: 5,
    name: "Gowardhan",
    description: "Double Toned Milk 1L",
    image: "/images/gowardhan.png",
    prices: { Zepto: 65, Instamart: 64, Blinkit: 66, JioMart: 63 }
  },
  {
    id: 6,
    name: "Aavin",
    description: "Standardised Milk 1L",
    image: "/images/aavin.png",
    prices: { Zepto: 60, Instamart: 59, Blinkit: 61, JioMart: 58 }
  },
  {
    id: 7,
    name: "Nandini",
    description: "Goodlife Toned Milk 1L",
    image: "/images/nandini.png",
    prices: { Zepto: 63, Instamart: 62, Blinkit: 64, JioMart: 61 }
  },
  {
    id: 8,
    name: "Heritage",
    description: "Full Cream Milk 1L",
    image: "/images/heritage.png",
    prices: { Zepto: 69, Instamart: 68, Blinkit: 70, JioMart: 67 }
  },
  {
    id: 9,
    name: "Parag",
    description: "Milk Rich 1L",
    image: "/images/parag.png",
    prices: { Zepto: 66, Instamart: 65, Blinkit: 67, JioMart: 64 }
  },
  {
    id: 10,
    name: "Milky Mist",
    description: "Toned Milk 1L",
    image: "/images/milky-mist.png",
    prices: { Zepto: 64, Instamart: 63, Blinkit: 65, JioMart: 62 }
  }
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ProductListingPage() {
  const query = useQuery().get('query')?.toLowerCase() || '';
  const [sortOrder, setSortOrder] = useState('asc');
  const [brandFilter, setBrandFilter] = useState('All');

  // Get unique brands for filter dropdown
  const brands = ['All', ...Array.from(new Set(products.map(p => p.name)))];

  // Filter by search and brand
  let filteredProducts = products.filter(
    prod =>
      (prod.name.toLowerCase().includes(query) ||
        prod.description.toLowerCase().includes(query)) &&
      (brandFilter === 'All' || prod.name === brandFilter)
  );

  // Sort by Zepto price
  filteredProducts = filteredProducts.sort((a, b) =>
    sortOrder === 'asc'
      ? a.prices.Zepto - b.prices.Zepto
      : b.prices.Zepto - a.prices.Zepto
  );

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
        {/* You can add more filter controls here */}
      </div>
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#fff', fontSize: '1.2rem', margin: '2rem 0' }}>
          No products found
        </div>
      ) : (
        <table className="comparison-table">
          <thead>
            <tr>
              <th></th>
              <th>Brand</th>
              <th>Zepto</th>
              <th>Instamart</th>
              <th>Blinkit</th>
              <th>JioMart</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(prod => (
              <tr key={prod.id}>
                <td><img src={prod.image} alt={prod.name} width={40} /></td>
                <td>
                  <strong>{prod.name}</strong>
                  <div style={{ fontSize: 12 }}>{prod.description}</div>
                </td>
                <td>₹ {prod.prices.Zepto}</td>
                <td>₹ {prod.prices.Instamart}</td>
                <td>₹ {prod.prices.Blinkit}</td>
                <td>₹ {prod.prices.JioMart}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}