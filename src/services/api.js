import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchAllProducts = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/products`);
    return res.data;
  } catch (error) {
    console.error("Error fetching all products:", error.response || error.message);
    throw error;
  }
};

export const fetchProductsByCategory = async (categoryName) => {
  try {
    console.log(`Fetching products for category: ${categoryName}`);
    const res = await axios.get(`${API_BASE_URL}/products?category=${encodeURIComponent(categoryName)}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

export const searchProducts = async (query) => {
  const res = await axios.get(`${API_BASE_URL}/products/search`, {
    params: { query }
  });
  return res.data;
};
