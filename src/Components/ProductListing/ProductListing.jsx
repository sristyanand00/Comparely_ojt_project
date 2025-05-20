// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import "./ProductListing.css";
// import ProductCard from "./ProductCard";
// import { dummyProducts } from "../../data/dummyProducts";

// const ProductListing = () => {
//   const location = useLocation();
//   const query = location.state?.query || "";  // Search term from LandingPage

//   const [filteredProducts, setFilteredProducts] = useState([]);

//   useEffect(() => {
//     if (query.trim() === "") {
//       setFilteredProducts([]);
//       return;
//     }
//     // Filter products where product name includes the search query (case-insensitive)
//     const filtered = dummyProducts.filter((product) =>
//       product.name.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   }, [query]);

//   return (
//     <div className="product-listing-container">
//       <h2>Search Results for "{query}"</h2>
//       <div className="product-grid">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         ) : (
//           <p>No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductListing;


// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import "./ProductListing.css";
// import ProductCard from "./ProductCard";
// import { searchProducts } from "../../services/productService"; // ✅ Backend search function

// const ProductListing = () => {
//   const location = useLocation();
//   const query = location.state?.query || ""; // Search term from LandingPage

//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchFilteredProducts = async () => {
//       if (query.trim() === "") {
//         setFilteredProducts([]);
//         return;
//       }

//       setLoading(true);
//       setError("");

//       try {
//         const data = await searchProducts(query); // 🔍 backend call
//         setFilteredProducts(data.products);       // .products from API response
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setError("Failed to fetch search results.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFilteredProducts();
//   }, [query]);

//   return (
//     <div className="product-listing-container">
//       <h2>Search Results for "{query}"</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="error">{error}</p>
//       ) : (
//         <div className="product-grid">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))
//           ) : (
//             <p>No products found.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductListing;


// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import "./ProductListing.css";
// // import ProductCard from "./ProductCard"; // No longer used for search results
// import { searchProducts } from "../../services/productService"; // ✅ Backend search function

// const ProductListing = () => {
//   const location = useLocation();
//   const query = location.state?.query || ""; // Search term from LandingPage

//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Define the platforms to show prices for (you can modify if platforms change)
//   const platforms = ["zepto", "blinkit", "swiggyinstamart", "jiomart", "bigbasket"];

//   useEffect(() => {
//     const fetchFilteredProducts = async () => {
//       if (query.trim() === "") {
//         setFilteredProducts([]);
//         return;
//       }

//       setLoading(true);
//       setError("");

//       try {
//         const data = await searchProducts(query); // 🔍 backend call
//         setFilteredProducts(data.products);       // .products from API response
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setError("Failed to fetch search results.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFilteredProducts();
//   }, [query]);

//   return (
//     <div className="product-listing-container">
//   <h2 className="heading">Search Results for "{query}"</h2>
//    {/* Cart Icon (top right corner) */}
//     <div className="cart-icon">🛒</div>    {/* Optional filters (visible row below heading) */}
//     <div className="filters-bar">
//       <button>Sort By: Price: Low to High</button>
//       <button>Brand: All</button>
//       <button>Price Range</button>
//     </div>


//   {loading ? (
//     <p className="status">Loading...</p>
//   ) : error ? (
//     <p className="error">{error}</p>
//   ) : filteredProducts.length > 0 ? (
//     <div className="comparison-table">
      

//       {filteredProducts.map((product) => (
//         <div className="table-row" key={product._id || product.name}>
//           <div className="product-column">
//             <img src={product.image} alt={product.name} className="product-img" />
//             <div className="product-text">
//               <div className="product-name">{product.name}</div>
//               <div className="product-brand">{product.brand}</div>
//             </div>
//           </div>
//           {platforms.map((platform) => (
//             <div key={platform} className="platform-column">
//               {product.prices && product.prices[platform] !== undefined
//                 ? `₹${product.prices[platform]}`
//                 : "-"}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   ) : (
//     <p className="status">No products found.</p>
//   )}
// </div>
//   );
// };


// export default ProductListing;

// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import "./ProductListing.css";
// // import ProductCard from "./ProductCard"; // No longer used for search results
// import { searchProducts } from "../../services/productService"; // ✅ Backend search function

// const ProductListing = () => {
//   const location = useLocation();
//   const query = location.state?.query || ""; // Search term from LandingPage

//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Define the platforms to show prices for (you can modify if platforms change)
//   const platforms = ["zepto", "blinkit", "swiggyinstamart", "jiomart", "bigbasket"];

//   useEffect(() => {
//     const fetchFilteredProducts = async () => {
//       if (query.trim() === "") {
//         setFilteredProducts([]);
//         return;
//       }

//       setLoading(true);
//       setError("");

//       try {
//         const data = await searchProducts(query); // 🔍 backend call
//         setFilteredProducts(data.products);       // .products from API response
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setError("Failed to fetch search results.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFilteredProducts();
//   }, [query]);

//   return (
//     <div className="product-listing-container">
//       <h2 className="heading">Search Results for "{query}"</h2>

//       {/* Cart Icon (top right corner) */}
//       <div className="cart-icon">🛒</div>

//       {/* Optional filters (visible row below heading) */}
//       <div className="filters-bar">
//         <button>Sort By: Price: Low to High</button>
//         <button>Brand: All</button>
//         <button>Price Range</button>
//       </div>

//       {loading ? (
//         <p className="status">Loading...</p>
//       ) : error ? (
//         <p className="error">{error}</p>
//       ) : filteredProducts.length > 0 ? (
//         <div className="comparison-table">
//           {filteredProducts.map((product) => (
//             <div className="table-row" key={product._id || product.name}>
//               <div className="product-column">
//                 <img src={product.image} alt={product.name} className="product-img" />
//                 <div className="product-text">
//                   <div className="product-name">{product.name}</div>
//                   <div className="product-brand">{product.brand}</div>
//                 </div>
//               </div>
//               {platforms.map((platform) => (
//                 <div key={platform} className="platform-column">
//                   {product.prices && product.prices[platform] !== undefined
//                     ? `₹${product.prices[platform]}`
//                     : "-"}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="status">No products found.</p>
//       )}
//     </div>
//   );
// };

// export default ProductListing;



import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProductListing.css";
import { searchProducts } from "../../services/productService";

const ProductListing = () => {
  const location = useLocation();
  const query = location.state?.query || ""; // Search term from LandingPage

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Define the platforms to show prices for
  const platforms = ["zepto", "blinkit", "swiggyinstamart", "jiomart", "bigbasket"];

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (query.trim() === "") {
        setFilteredProducts([]);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const data = await searchProducts(query); // 🔍 backend call
        setFilteredProducts(data.products);       // .products from API response
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [query]);

  return (
    <div className="product-listing-container">
      <h2 className="heading">Search Results for "{query}"</h2>

      {/* Cart Icon (top right corner) */}
      <div className="cart-icon">🛒</div>

      {/* Optional filters (visible row below heading) */}
      <div className="filters-bar">
        <button>Sort By: Price: Low to High</button>
        <button>Brand: All</button>
        <button>Price Range</button>
      </div>

      {loading ? (
        <p className="status">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : filteredProducts.length > 0 ? (
        <div className="comparison-table">

          {/* Header Row */}
          <div className="table-header">
            <div className="product-column header-cell">Product</div>
            {platforms.map((platform) => (
              <div key={platform} className="platform-column header-cell">
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </div>
            ))}
          </div>

          {/* Product Rows */}
          {filteredProducts.map((product) => (
            <div className="table-row" key={product._id || product.name}>
              <div className="product-column">
                <img src={product.image} alt={product.name} className="product-img" />
                <div className="product-text">
                  <div className="product-name">{product.name}</div>
                  <div className="product-brand">{product.brand}</div>
                </div>
              </div>
              {platforms.map((platform) => (
                <div key={platform} className="platform-column">
                  {product.prices && product.prices[platform] !== undefined
                    ? `₹${product.prices[platform]}`
                    : "-"}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="status">No products found.</p>
      )}
    </div>
  );
};

export default ProductListing;
