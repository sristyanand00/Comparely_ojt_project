// src/components/ProductListing/ProductCard.jsx

import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Brand: {product.brand}</p>
      <p>Price: ₹{product.price}</p>
      <p>Platform: {product.platform}</p>
    </div>
  );
};

export default ProductCard;
