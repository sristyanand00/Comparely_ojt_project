import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
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

// JSON parsing error handling
app.use((err, req, res, next) => {
  if (err.message === 'Invalid JSON') {
    return res.status(400).json({ message: 'Invalid JSON in request body' });
  }
  next(err);
});

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/comparely1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('✅ Connected to MongoDB comparely1'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Mount routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Health check route
app.get("/test", (req, res) => {
  res.json({ 
    status: "API is working",
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
  });
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
