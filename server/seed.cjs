const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comparely1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB for seeding');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Define Product schema (adjust fields as per your Product model)
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,       // Optional
  category: String,    // Optional
  brand:String,
  prices: Object,
});

const Product = mongoose.model('Product', productSchema);

// Path to products.json in the public/data folder
const productsPath = path.resolve(__dirname, '../public/data/products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

// Seed function to insert products
const seedDB = async () => {
  try {
    await Product.deleteMany({});
    console.log('Existing products deleted');

    await Product.insertMany(products);
    console.log('Products from products.json inserted');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding DB:', error);
  }
};

seedDB();
