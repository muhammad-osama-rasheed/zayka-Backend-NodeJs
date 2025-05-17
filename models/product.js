const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    enum: ["burger", "pizza", "seafood", "sweet", "drink"],
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  available: {
    type: Boolean,
    default: true,
  },

  discount: {
    type: Number,
    default: 0,
  },

  topWeek: {
    type: Boolean,
    default: false,
  },

  quantity: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
