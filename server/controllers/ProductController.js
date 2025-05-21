// Import model
import Product from '../models/Product.js';

// Example getProducts controller function
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Example searchProduct controller function
export const searchProduct = async (req, res) => {
  const { query } = req.query;
  try {
    const results = await Product.find({ name: { $regex: query, $options: 'i' } });
    return res.json(results);
  } catch (err) {
    return res.status(500).json({ error: 'Search failed' });
  }
};
