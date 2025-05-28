// Import model
// Import model
import Product from '../models/Product.js';

// Fetch all products (no filter)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Fetch products by category (categoryName from params)
export const getProductsByCategory = async (req, res) => {
  const { categoryName } = req.params;

  try {
const products = await Product.find({
  category: { $regex: new RegExp(`^${categoryName}$`, 'i') }
});

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch products by category' });
  }
};

// Search products by name query parameter
export const searchProduct = async (req, res) => {
  const { query } = req.query;

  try {
    const results = await Product.find({ name: { $regex: query, $options: 'i' } });
    return res.json(results);
  } catch (err) {
    return res.status(500).json({ error: 'Search failed' });
  }
};
