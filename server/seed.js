const mongoose = require('mongoose');

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
});

const Product = mongoose.model('Product', productSchema);

// Dummy products array
const dummyProducts = [
  {
    name: 'Apple iPhone 13',
    price: 799,
    description: 'Latest Apple iPhone with A15 Bionic chip',
    category: 'Electronics',
    image: 'https://example.com/iphone13.jpg',
  },
  {
    name: 'Samsung Galaxy S21',
    price: 699,
    description: 'Samsung flagship smartphone',
    category: 'Electronics',
    image: 'https://example.com/galaxys21.jpg',
  },
  {
    name: 'Sony WH-1000XM4 Headphones',
    price: 349,
    description: 'Noise cancelling wireless headphones',
    category: 'Audio',
    image: 'https://example.com/sonyheadphones.jpg',
  },
  {
    name: "Organic Eggs",
    price: 120,
    image: "https://source.unsplash.com/220x160/?eggs",
    platform: "Swiggy Instamart",
    brand: "FarmFresh",
  },
  {
    name: "Fresh Milk",
    price: 60,
    image: "https://source.unsplash.com/220x160/?milk",
    platform: "BigBasket",
    brand: "DairyPure",
  },
  {
    name: "Brown Bread",
    price: 45,
    image: "https://source.unsplash.com/220x160/?bread",
    platform: "Zepto",
    brand: "BakeHouse",
  },
  {
    name: "Bananas (1 Dozen)",
    price: 55,
    image: "https://source.unsplash.com/220x160/?banana",
    platform: "Blinkit",
    brand: "TropicalFarms",
  },
];

// Seed function to insert products
const seedDB = async () => {
  try {
    await Product.deleteMany({}); // Clear existing products
    console.log('Existing products deleted');

    await Product.insertMany(dummyProducts);
    console.log('Dummy products inserted');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding DB:', error);
  }
};

seedDB();