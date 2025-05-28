// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import './ProductListing.css';

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// export default function ProductListingPage() {
//   const query = useQuery().get('query') || '';
//   const [products, setProducts] = useState([]);
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [brandFilter, setBrandFilter] = useState('All');
//   const [loading, setLoading] = useState(true);

//   // Fetch products from backend
//   useEffect(() => {
//     setLoading(true);
//     // Add query param if searching
//     const url = query
//       ? `http://localhost:5000/api/products?query=${encodeURIComponent(query)}`
//       : `http://localhost:5000/api/products`;
//     fetch(url)
//       .then(res => res.json())
//       .then(data => {
//         setProducts(Array.isArray(data) ? data : data.products);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Fetch error:", err);
//         setLoading(false);
//       });
//   }, [query]);
//   // Get unique brands for filter dropdown
//   const brands = ['All', ...Array.from(new Set(products.map(p => p.brand).filter(Boolean)))];

//   // Update the filter logic
// // Update the filter logic
// // Update the filter logic
// let filteredProducts = products.filter(prod => {
//   // Skip invalid products
//   if (!prod?.name) return false;

//   const productName = prod.name.toLowerCase();
//   const searchQuery = query.toLowerCase().trim();
  
//   // Handle brand filter
//   const brandMatch = brandFilter === 'All' || prod.brand === brandFilter;
  
//   // If no search query, only apply brand filter
//   if (!searchQuery) {
//     return brandMatch;
//   }
  
//   // Check if product name contains the search query
//   const nameMatch = productName.includes(searchQuery);
  
//   // Add debug logs with more detail
//   console.log('Filtering:', {
//     product: productName,
//     query: searchQuery,
//     nameMatch,
//     brandMatch,
//     willShow: nameMatch && brandMatch
//   });
  
//   return nameMatch && brandMatch;
// });

// // Log filtered results
// console.log('Found products:', filteredProducts.length, 'matching:', query);
//   //  let filteredProducts = products.filter(prod => {
//   //   return brandFilter === 'All' || prod.brand === brandFilter;
//   // });


//   // Sort by Zepto price (handle missing prices)
//   filteredProducts = filteredProducts.sort((a, b) => {
//     const aPrice = a.prices?.zepto ?? 0;
//     const bPrice = b.prices?.zepto ?? 0;
//     return sortOrder === 'asc' ? aPrice - bPrice : bPrice - aPrice;
//   });

//   return (
//     <div className="product-listing-container">
//       <h2>Comparely</h2>
//       <div className="filters-bar">
//         <span>Filters</span>
//         <button
//           onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
//         >
//           Sort By: Price: {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
//         </button>
//         <select
//           value={brandFilter}
//           onChange={e => setBrandFilter(e.target.value)}
//           style={{ marginLeft: 8, marginRight: 8 }}
//         >
//           {brands.map(brand => (
//             <option key={brand} value={brand}>{brand}</option>
//           ))}
//         </select>
//       </div>
//       {loading ? (
//         <div style={{ textAlign: 'center', color: '#fff', fontSize: '1.2rem', margin: '2rem 0' }}>
//           Loading...
//         </div>
//       ) : filteredProducts.length === 0 ? (
//         <div style={{ textAlign: 'center', color: '#fff', fontSize: '1.2rem', margin: '2rem 0' }}>
//           No products found
//         </div>
//       ) : (
//         <table className="comparison-table">
//           <thead>
//             <tr>
//               <th></th>
//               <th>Name</th>
//               <th>Brand</th>
//               <th>Zepto</th>
//               <th>instamart</th>
//               <th>Blinkit</th>
//               <th>JioMart</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.map((prod, idx) => (
//               <tr key={prod._id || idx}>
//                 <td>
//                   <img src={prod.image} alt={prod.name || "Product"} width={40} />
//                 </td>
//                 <td>
//                   <strong>{prod.name || "N/A"}</strong>
//                   <div style={{ fontSize: 12 }}>{prod.description || ""}</div>
//                 </td>
//                 <td>{prod.brand || "N/A"}</td>
//                 <td>₹ {prod.prices?.zepto ?? "N/A"}</td>
//                 <td>₹ {prod.prices?.instamart ?? "N/A"}</td>
//                 <td>₹ {prod.prices?.blinkit ?? "N/A"}</td>
//                 <td>₹ {prod.prices?.jiomart ?? "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


//1


//2

// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import './ProductListing.css';

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// export default function ProductListingPage() {
//   const query = useQuery().get('query') || '';
//   const [products, setProducts] = useState([]);
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [brandFilter, setBrandFilter] = useState('All');
//   const [loading, setLoading] = useState(true);

//   // Fetch products from backend
//   useEffect(() => {
//     setLoading(true);
//     const url = query
//       ? `http://localhost:5000/api/products?query=${encodeURIComponent(query)}`
//       : `http://localhost:5000/api/products`;
//     fetch(url)
//       .then(res => res.json())
//       .then(data => {
//         setProducts(Array.isArray(data) ? data : data.products);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Fetch error:", err);
//         setLoading(false);
//       });
//   }, [query]);

//   // Get unique brands for filter dropdown
//   const brands = ['All', ...Array.from(new Set(products.map(p => p.brand).filter(Boolean)))];

//   // Filter by brand only (name filtering is handled by backend)
//   let filteredProducts = products.filter(prod => {
//     return brandFilter === 'All' || prod.brand === brandFilter;
//   });

//   // Sort by Zepto price (handle missing prices)
//   filteredProducts = filteredProducts.sort((a, b) => {
//     const aPrice = a.prices?.zepto ?? 0;
//     const bPrice = b.prices?.zepto ?? 0;
//     return sortOrder === 'asc' ? aPrice - bPrice : bPrice - aPrice;
//   });

//   return (
//     <div className="product-listing-container">
//       <h2>Comparely</h2>
//       <div className="filters-bar">
//         <span>Filters</span>
//         <button
//           onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
//         >
//           Sort By: Price: {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
//         </button>
//         <select
//           value={brandFilter}
//           onChange={e => setBrandFilter(e.target.value)}
//           style={{ marginLeft: 8, marginRight: 8 }}
//         >
//           {brands.map(brand => (
//             <option key={brand} value={brand}>{brand}</option>
//           ))}
//         </select>
//       </div>
//       {loading ? (
//         <div style={{ textAlign: 'center', color: '#fff', fontSize: '1.2rem', margin: '2rem 0' }}>
//           Loading...
//         </div>
//       ) : filteredProducts.length === 0 ? (
//         <div style={{ textAlign: 'center', color: '#fff', fontSize: '1.2rem', margin: '2rem 0' }}>
//           No products found
//         </div>
//       ) : (
//         <table className="comparison-table">
//           <thead>
//             <tr>
//               <th></th>
//               <th>Name</th>
//               <th>Brand</th>
//               <th>Zepto</th>
//               <th>instamart</th>
//               <th>Blinkit</th>
//               <th>JioMart</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.map((prod, idx) => (
//               <tr key={prod._id || idx}>
//                 <td>
//                   <img src={prod.image} alt={prod.name || "Product"} width={40} />
//                 </td>
//                 <td>
//                   <strong>{prod.name || "N/A"}</strong>
//                   <div style={{ fontSize: 12 }}>{prod.description || ""}</div>
//                 </td>
//                 <td>{prod.brand || "N/A"}</td>
//                 <td>₹ {prod.prices?.zepto ?? "N/A"}</td>
//                 <td>₹ {prod.prices?.instamart ?? "N/A"}</td>
//                 <td>₹ {prod.prices?.blinkit ?? "N/A"}</td>
//                 <td>₹ {prod.prices?.jiomart ?? "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


//3
// import React, { useState, useEffect } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import { fetchProductsByCategory, fetchAllProducts } from "../../services/api";

// import './ProductListing.css';



// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// export default function ProductListingPage() {
//   const queryParams = useQuery();
//   const searchQuery = queryParams.get('query') || '';
  
//   const { categoryName } = useParams(); // ✅ NEW
//   const categoryQuery = categoryName || ''; // ✅ Fix here

//   const [products, setProducts] = useState([]);
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [brandFilter, setBrandFilter] = useState('All');
//   const [loading, setLoading] = useState(true);

//   // Fetch products from backend
//   useEffect(() => {
//   setLoading(true);

//   let url = 'http://localhost:5000/api/products';

//   if (categoryQuery) {
//     url = `http://localhost:5000/api/products/category/${encodeURIComponent(categoryQuery)}`;
//   } else if (searchQuery) {
//     url = `http://localhost:5000/api/products/search?query=${encodeURIComponent(searchQuery)}`;
//   }
//   fetch(url)
//     .then(res => res.json())
//     .then(data => {
//       setProducts(Array.isArray(data) ? data : data.products);
//       setLoading(false);
//     })
//     .catch(err => {
//       console.error("Fetch error:", err);
//       setLoading(false);
//     });
// }, [searchQuery, categoryQuery]); // 🔁 Re-run when either query or category changes
//  // re-run if searchQuery changes

//   // Get unique brands for filter dropdown
//   const brands = ['All', ...Array.from(new Set(products.map(p => p.brand).filter(Boolean)))];

//   // Filter logic including category filtering
//   let filteredProducts = products.filter(prod => {
//     if (!prod?.name) return false;
    
//     // If a category parameter is provided – match it (case-insensitive).
//     const categoryMatch =
//       !categoryQuery ||
//       (prod.category && prod.category.toLowerCase() === categoryQuery.toLowerCase());
    
//     // Check search term against the product name
//     const nameMatch =
//       !searchQuery ||
//       prod.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
    
//     // Handle brand filter as before
//     const brandMatch = brandFilter === 'All' || prod.brand === brandFilter;

    
    
//     // Return product only if all filters match
//     return categoryMatch && nameMatch && brandMatch;
//   });

//   // Sort by Zepto price (handle missing prices)
//   filteredProducts = filteredProducts.sort((a, b) => {
//     const aPrice = a.prices?.zepto ?? 0;
//     const bPrice = b.prices?.zepto ?? 0;
//     return sortOrder === 'asc' ? aPrice - bPrice : bPrice - aPrice;
//   });

//   console.log('Found products:', filteredProducts.length, 'category:', categoryQuery);

//   return (
//     <div className="product-listing-container">
//       {/* <h2>Comparely</h2> */}
//      <h2>
//   {categoryQuery
//     ? `Category: ${categoryQuery.charAt(0).toUpperCase() + categoryQuery.slice(1)}`
//     : 'All Products'}
// </h2>
 
//       <div className="filters-bar">
//         <span>Filters</span>
//         <button
//           onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
//         >
//           Sort By: Price: {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
//         </button>
//         <select
//           value={brandFilter}
//           onChange={e => setBrandFilter(e.target.value)}
//           style={{ marginLeft: 8, marginRight: 8 }}
//         >
//           {brands.map(brand => (
//             <option key={brand} value={brand}>{brand}</option>
//           ))}
//         </select>
//       </div>
//       {loading ? (
//         <div style={{ textAlign: 'center', color: '#fff', fontSize: '1.2rem', margin: '2rem 0' }}>
//           Loading...
//         </div>
//       ) : filteredProducts.length === 0 ? (
//         <div style={{ textAlign: 'center', color: '#fff', fontSize: '1.2rem', margin: '2rem 0' }}>
//           No products found
//         </div>
//       ) : (
//         <table className="comparison-table">
//           <thead>
//             <tr>
//               <th></th>
//               <th>Name</th>
//               <th>Brand</th>
//               <th>Zepto</th>
//               <th>Instamart</th>
//               <th>Blinkit</th>
//               <th>JioMart</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.map((prod, idx) => (
//               <tr key={prod._id || idx}>
//                 <td>
//                   <img src={prod.image} alt={prod.name || "Product"} width={40} />
//                 </td>
//                 <td>
//                   <strong>{prod.name || "N/A"}</strong>
//                   <div style={{ fontSize: 12 }}>{prod.description || ""}</div>
//                 </td>
//                 <td>{prod.brand || "N/A"}</td>
//                 <td>₹ {prod.prices?.zepto ?? "N/A"}</td>
//                 <td>₹ {prod.prices?.instamart ?? "N/A"}</td>
//                 <td>₹ {prod.prices?.blinkit ?? "N/A"}</td>
//                 <td>₹ {prod.prices?.jiomart ?? "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


//4


// import React, { useState, useEffect } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import { fetchProductsByCategory, fetchAllProducts } from "../../services/api";

// import './ProductListing.css';

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// export default function ProductListingPage() {
//   const queryParams = useQuery();
//   const searchQuery = queryParams.get('query') || '';
  
//   const { categoryName } = useParams();
//   const categoryQuery = categoryName || '';

//   const [products, setProducts] = useState([]);
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [brandFilter, setBrandFilter] = useState('All');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);

//     let url = 'http://localhost:5000/api/products';

//     if (categoryQuery) {
//       url = `http://localhost:5000/api/products/category/${encodeURIComponent(categoryQuery)}`;
//     } else if (searchQuery) {
//       url = `http://localhost:5000/api/products/search?query=${encodeURIComponent(searchQuery)}`;
//     }

//     fetch(url)
//       .then(res => res.json())
//       .then(data => {
//         setProducts(Array.isArray(data) ? data : data.products);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Fetch error:", err);
//         setLoading(false);
//       });
//   }, [searchQuery, categoryQuery]);

//   const brands = ['All', ...Array.from(new Set(products.map(p => p.brand).filter(Boolean)))];

//   let filteredProducts = products.filter(prod => {
//     if (!prod?.name) return false;

//     const categoryMatch =
//       !categoryQuery ||
//       (prod.category && prod.category.toLowerCase() === categoryQuery.toLowerCase());

//     const nameMatch =
//       !searchQuery ||
//       prod.name.toLowerCase().includes(searchQuery.toLowerCase().trim());

//     const brandMatch = brandFilter === 'All' || prod.brand === brandFilter;

//     return categoryMatch && nameMatch && brandMatch;
//   });

//   filteredProducts = filteredProducts.sort((a, b) => {
//     const aPrice = a.prices?.zepto ?? 0;
//     const bPrice = b.prices?.zepto ?? 0;
//     return sortOrder === 'asc' ? aPrice - bPrice : bPrice - aPrice;
//   });

//   console.log('Found products:', filteredProducts.length, 'category:', categoryQuery);

//   return (
//     <div className="product-listing-container">
//       <h2>
//         {categoryQuery
//           ? `Category: ${categoryQuery.charAt(0).toUpperCase() + categoryQuery.slice(1)}`
//           : 'All Products'}
//       </h2>

//       <div className="filters-bar">
//         <span>Filters</span>
//         <button
//           onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
//         >
//           Sort By: Price {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
//         </button>
//         <select
//           value={brandFilter}
//           onChange={e => setBrandFilter(e.target.value)}
//           style={{ marginLeft: 8, marginRight: 8 }}
//         >
//           {brands.map(brand => (
//             <option key={brand} value={brand}>{brand}</option>
//           ))}
//         </select>
//       </div>

//       {loading ? (
//         <div style={{ textAlign: 'center', color: '#fff', fontSize: '1.2rem', margin: '2rem 0' }}>
//           Loading...
//         </div>
//       ) : filteredProducts.length === 0 ? (
//         <div style={{ textAlign: 'center', color: '#fff', fontSize: '1.2rem', margin: '2rem 0' }}>
//           No products found
//         </div>
//       ) : (
//         <table className="comparison-table">
//           <thead>
//             <tr>
//               <th></th>
//               <th>Name</th>
//               <th>Brand</th>
//               <th>Zepto</th>
//               <th>Instamart</th>
//               <th>Blinkit</th>
//               <th>JioMart</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.map((prod, idx) => (
//               <tr key={prod._id || idx}>
//                 <td>
//                   <img src={prod.image} alt={prod.name || "Product"} width={40} />
//                 </td>
//                 <td>
//                   <strong>{prod.name || "N/A"}</strong>
//                   <div style={{ fontSize: 12 }}>{prod.description || ""}</div>
//                 </td>
//                 <td>{prod.brand || "N/A"}</td>
//                 <td>₹ {prod.prices?.zepto ?? "N/A"}</td>
//                 <td>₹ {prod.prices?.instamart ?? "N/A"}</td>
//                 <td>₹ {prod.prices?.blinkit ?? "N/A"}</td>
//                 <td>₹ {prod.prices?.jiomart ?? "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


//5






//final 1

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchAllProducts, fetchProductsByCategory, searchProducts } from "../../services/api";

import './ProductListing.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ProductListingPage() {
  const queryParams = useQuery();
  const categoryQuery = queryParams.get('category') || '';
  const searchQuery = queryParams.get('query') || '';

  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [brandFilter, setBrandFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (categoryQuery) {
          data = await fetchProductsByCategory(categoryQuery);
        } else if (searchQuery) {
          data = await searchProducts(searchQuery);
        } else {
          data = await fetchAllProducts();
        }
        setProducts(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryQuery, searchQuery]);

  const brands = ['All', ...Array.from(new Set(products.map(p => p.brand).filter(Boolean)))];

  let filteredProducts = products.filter(prod => {
    if (!prod?.name) return false;

    const categoryMatch =
      !categoryQuery || 
      (prod.category && prod.category.toLowerCase() === categoryQuery.toLowerCase());
 console.log('Filtering:', {
    product: prod.name,
    category: prod.category,
    categoryQuery,
    categoryMatch,
    willShow: categoryMatch
  });
    const nameMatch =
      !searchQuery || 
      prod.name.toLowerCase().includes(searchQuery.toLowerCase().trim());

    const brandMatch = brandFilter === 'All' || prod.brand === brandFilter;

    return categoryMatch && nameMatch && brandMatch;
  });

  filteredProducts = filteredProducts.sort((a, b) => {
    const aPrice = a.prices?.zepto ?? 0;
    const bPrice = b.prices?.zepto ?? 0;
    return sortOrder === 'asc' ? aPrice - bPrice : bPrice - aPrice;
  });

  return (
    <div className="product-listing-container">
      <h2>
        {categoryQuery
          ? `Category: ${categoryQuery.charAt(0).toUpperCase() + categoryQuery.slice(1)}`
          : 'All Products'}
      </h2>

      <div className="filters-bar">
        <span>Filters</span>
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          Sort By: Price {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
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
      ) : error ? (
        <div style={{ textAlign: 'center', color: 'red', fontSize: '1.2rem', margin: '2rem 0' }}>
          {error}
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
              <th>Instamart</th>
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


