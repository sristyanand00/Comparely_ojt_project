import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  prices: {
    zepto: Number,
    blinkit: Number,
    swiggyinstamart: Number,
    jiomart: Number,
    bigbasket: Number
  },
  image: String,
  brand: String
});

const Product = mongoose.model("Product", productSchema);

export default Product;
