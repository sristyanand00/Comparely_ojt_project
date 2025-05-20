import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export const searchProducts = async (searchQuery) => {
  try {
    const response = await axios.get(`${API_URL}/compare`, {
      params: { productName: searchQuery }
    });
    return response.data;
  } catch (error) {
    console.error('Search error:', error.response?.data || error.message);
    throw error;
  }
};

export const updateProductPrice = async (productId, platform, price) => {
  try {
    const response = await axios.post(`${API_URL}/update-price`, {
      productId,
      platform,
      price
    });
    return response.data;
  } catch (error) {
    console.error('Update error:', error.response?.data || error.message);
    throw error;
  }
};