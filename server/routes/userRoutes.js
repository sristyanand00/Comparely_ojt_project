import express from 'express';
import { searchProduct, getProducts } from '../controllers/ProductController.js';

const router = express.Router();

router.get('/search', searchProduct);
router.get('/', getProducts);

export default router;
