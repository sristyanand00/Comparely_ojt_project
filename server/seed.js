import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comparely1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB for seeding');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Define Product schema (adjust fields as per your Product model)
const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  category: String,
  description: String,
  image: String,
  prices: Object, // Prices object (e.g., { zepto: 100, instamart: 105 })
});

const Product = mongoose.model('Product', productSchema);

// Read products.json file
const productsFilePath = path.join(__dirname, 'data', 'products.json');
const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// Seed function to insert products
const seedDB = async () => {
  try {
    await Product.deleteMany({}); // Clear existing products
    console.log('✅ Existing products deleted');

    await Product.insertMany(productsData); // Insert products from products.json
    console.log('✅ Dummy products from products.json inserted');

    mongoose.connection.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding DB:', error);
    mongoose.connection.close();
  }
};

seedDB();