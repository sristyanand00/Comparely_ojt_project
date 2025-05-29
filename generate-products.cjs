const fs = require('fs');

const categories = [
  "Grocery", "Electronics", "Fashion", "Home", "Mobiles", "Beauty", "Toys", "Books", "Fitness", "Pharmacy", "Appliances", "Footwear", "Sports", "Stationery", "Pets"
];

const brands = {
  Grocery: ["Green Valley", "Farm Fresh", "Nature's Basket", "Daily Harvest"],
  Electronics: ["Dell", "Samsung", "Apple", "Sony", "HP", "Lenovo"],
  Fashion: ["Levi's", "Zara", "H&M", "Nike", "Adidas"],
  Home: ["Home Centre", "Ikea", "Urban Ladder", "Godrej"],
  Mobiles: ["Apple", "Samsung", "OnePlus", "Xiaomi", "Realme"],
  Beauty: ["Lakme", "Maybelline", "L'Oreal", "Nivea"],
  Toys: ["Lego", "Hot Wheels", "Barbie", "Fisher-Price"],
  Books: ["Penguin", "HarperCollins", "Scholastic", "Random House"],
  Fitness: ["Decathlon", "Nike", "Adidas", "Puma"],
  Pharmacy: ["Apollo", "1mg", "Netmeds", "Medlife"],
  Appliances: ["LG", "Samsung", "Whirlpool", "Bosch"],
  Footwear: ["Nike", "Adidas", "Puma", "Bata"],
  Sports: ["Nivia", "Cosco", "Yonex", "SG"],
  Stationery: ["Camlin", "Faber-Castell", "Classmate", "Cello"],
  Pets: ["Pedigree", "Drools", "Whiskas", "Royal Canin"]
};

const productTypes = {
  Grocery: ["Broccoli", "Carrot", "Potato", "Onion", "Tomato", "Spinach", "Rice", "Dal", "Bread", "Eggs"],
  Electronics: ["Laptop", "TV", "Headphones", "Tablet", "Monitor", "Camera"],
  Fashion: ["Jeans", "Dress", "T-shirt", "Jacket", "Shirt", "Skirt"],
  Home: ["Sofa", "Chair", "Table", "Lamp", "Curtains", "Bed"],
  Mobiles: ["Smartphone", "Feature Phone", "Charger", "Earbuds", "Screen Guard"],
  Beauty: ["Lipstick", "Foundation", "Face Wash", "Moisturizer", "Shampoo"],
  Toys: ["Car", "Doll", "Puzzle", "Blocks", "Action Figure"],
  Books: ["Novel", "Comics", "Textbook", "Notebook", "Magazine"],
  Fitness: ["Dumbbell", "Yoga Mat", "Treadmill", "Skipping Rope", "Cycle"],
  Pharmacy: ["Paracetamol", "Vitamin C", "Cough Syrup", "Bandage", "Sanitizer"],
  Appliances: ["Refrigerator", "Washing Machine", "Microwave", "Mixer", "Fan"],
  Footwear: ["Sneakers", "Sandals", "Boots", "Slippers", "Heels"],
  Sports: ["Cricket Bat", "Football", "Badminton Racket", "Tennis Ball", "Basketball"],
  Stationery: ["Pen", "Pencil", "Notebook", "Eraser", "Marker"],
  Pets: ["Dog Food", "Cat Food", "Leash", "Pet Shampoo", "Pet Toy"]
};

const images = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80"
];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPrice(min = 10, max = 1000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const products = [];
const PRODUCTS_PER_CATEGORY = Math.floor(10000 / categories.length);

for (const category of categories) {
  for (let i = 0; i < PRODUCTS_PER_CATEGORY; i++) {
    const brand = randomFrom(brands[category]);
    const type = randomFrom(productTypes[category]);
    const name = `${brand} ${type} ${Math.floor(Math.random() * 10000)}`;
    const description = `${type} by ${brand} in ${category}.`;
    const image = randomFrom(images);
    const prices = {
      zepto: randomPrice(),
      instamart: randomPrice(),
      blinkit: randomPrice(),
      jiomart: randomPrice()
    };
    products.push({
      name,
      brand,
      category,
      description,
      image,
      prices,
      updatedAt: new Date().toISOString()
    });
  }
}

fs.writeFileSync('public/data/products.json', JSON.stringify(products, null, 2));
console.log('Generated 10,000 products!'); 