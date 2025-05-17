const Order = require("../models/order");

const createOrder = async (req, res) => {
  try {
    const data = req.body;

    const newOrder = new Order(data);
    const saveOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Your order placed successfully.",
      data: saveOrder,
    });
  } catch (error) {
    console.error("Error Creating: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while placing the order.",
      error: error.message,
    });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error Fetching: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const data = await Order.find()
      .populate("user")
      .populate("products.product");

    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found." });
    }

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updateOrder = await Order.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updateOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found." });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully.",
      data: updateOrder,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Order.findByIdAndDelete(id);

    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully." });
  } catch (error) {
    console.error("Error Deleting: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

module.exports = {
  createOrder,
  getSingleOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
