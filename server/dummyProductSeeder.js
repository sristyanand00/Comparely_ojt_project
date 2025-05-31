import mongoose from "mongoose";
import Product from "./models/Product.js";  // Note the .js extension in import path
import fs from "fs";

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const jsonData = fs.readFileSync("./data/products.json", "utf-8");
const products = JSON.parse(jsonData);

// Insert into MongoDB
Product.insertMany(products)
  .then(() => {
    console.log("✅ Products imported from JSON file!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Failed to insert products:", err);
    mongoose.disconnect();
  });
