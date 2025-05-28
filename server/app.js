// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import path from "path"; 
// import userRoutes from "./routes/userRoutes.js";
// import productRoutes from "./routes/productRoutes.js";

// // Load environment variables
// dotenv.config();

// const app = express();

// // Enhanced JSON parsing with error handling
// app.use(express.json({
//   verify: (req, res, buf) => {
//     try {
//       JSON.parse(buf);
//     } catch (e) {
//       throw new Error('Invalid JSON');
//     }
//   }
// }));

// // Custom error middleware
// app.use((err, req, res, next) => {
//   if (err.message === 'Invalid JSON') {
//     return res.status(400).json({ message: 'Invalid JSON in request body' });
//   }
//   next(err);
// });

// // CORS configuration
// app.use(cors());

// // Database connection
// mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/comparely1", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 5000
// })
// .then(() => console.log('✅ Connected to MongoDB comparely1'))
// .catch(err => console.error('❌ MongoDB connection error:', err));

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);

// app.get("/api/products", (req, res) => {
//   const products = require(path.join(__dirname, "data", "products.json"));
//   const { category } = req.query;

//   if (category) {
//     const filteredProducts = products.filter(prod => 
//       prod.category.toLowerCase() === category.toLowerCase()
//     );
//     return res.json(filteredProducts);
//   }

//   res.json(products);
// });
// // Health check endpoint
// app.get("/test", (req, res) => {
//   res.json({ 
//     status: "API is working",
//     database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
//   });
// });

// // Error handling for undefined routes
// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Enhanced JSON parsing with error handling
app.use(express.json({
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf);
    } catch (e) {
      throw new Error('Invalid JSON');
    }
  }
}));

// CORS configuration
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/comparely1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('✅ Connected to MongoDB comparely1'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// MongoDB connection event listeners
mongoose.connection.on('disconnected', () => {
  console.error('❌ MongoDB disconnected');
});
mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Health check endpoint
app.get("/test", (req, res) => {
  res.json({
    status: "API is working",
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
  });
});

// Error handling for undefined routes
app.use((req, res) => {
  console.error(`❌ Undefined route accessed: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: "Route not found" });
});

// Custom error middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  if (err.message === 'Invalid JSON') {
    return res.status(400).json({ message: 'Invalid JSON in request body' });
  }
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
