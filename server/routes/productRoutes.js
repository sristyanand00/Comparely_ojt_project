import express from 'express';
import { searchProduct, getProducts, getProductsByCategory } from '../controllers/ProductController.js';

const router = express.Router();

router.get("/search", searchProduct);
router.get("/", getProducts);
router.get('/category/:categoryName', getProductsByCategory);

// Fallback route for undefined endpoints
router.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default router;
