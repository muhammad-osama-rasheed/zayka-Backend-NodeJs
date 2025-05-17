const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
      default: "Karachi",
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    state: {
      type: String,
      default: "Sindh",
    },

    phone: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      default: "Pakistan",
    },

    altPhone: {
      type: String,
      default: null,
    },

    extraInfo: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    orderedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
