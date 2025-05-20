


const API_URL = "http://localhost:5000/api/products";

// export const fetchProducts = async () => {
//   const res = await fetch(API_URL);
//   if (!res.ok) {
//     throw new Error("Failed to fetch products");
//   }
//   return res.json();
// };
// export const searchProducts = async (query) => {
//   const res = await fetch(`http://localhost:5000/api/products/search?query=${query}`);
//   if (!res.ok) throw new Error("Error searching products");
//   return res.json(); // { success, count, products }
// };

//const API_URL = "http://localhost:5000/api/products";

// Fetch all products (for general listing)
export const fetchProducts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json(); // returns full product list
};

// Search products based on query
export const searchProducts = async (query) => {
  const res = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error("Error searching products");
  }
  return res.json(); // returns { success, count, products }
};


