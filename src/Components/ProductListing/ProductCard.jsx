// src/components/ProductListing/ProductCard.jsx

// import React from 'react';
// import { Link } from 'react-router-dom';
// import './ProductCard.css';

// const ProductCard = ({ product }) => {
//   return (
//     <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="product-card-link">
//       <div className="product-card" style={{ cursor: 'pointer' }}>
//         <img src={product.image} alt={product.name} />
//         <h3>{product.name}</h3>
//         <p>Brand: {product.brand}</p>
//         <p>Price: ₹{product.prices?.zepto ?? "N/A"}</p>
//         <p>Platform: Zepto</p>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;


import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(product.category || 'Unknown')}`}
      className="product-card-link"
    >
      <div className="product-card" style={{ cursor: 'pointer' }}>
        <img
          src={product.image || 'https://via.placeholder.com/150'}
          alt={product.name || 'Product Image'}
        />
        <h3>{product.name || 'Unnamed Product'}</h3>
        <p>Brand: {product.brand || 'Unknown Brand'}</p>
        <p>Price: ₹{product.prices?.zepto ?? 'N/A'}</p>
        <p>Platform: Zepto</p>
      </div>
    </Link>
  );
};

export default ProductCard;