import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProductListing.css";
import ProductCard from "./ProductCard";
import { dummyProducts } from "../../data/dummyProducts";

const ProductListing = () => {
  const location = useLocation();
  const query = location.state?.query || "";  // Search term from LandingPage

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredProducts([]);
      return;
    }
    // Filter products where product name includes the search query (case-insensitive)
    const filtered = dummyProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [query]);

  return (
    <div className="product-listing-container">
      <h2>Search Results for "{query}"</h2>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
