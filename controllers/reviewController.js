const Review = require("../models/review");

const createReview = async (req, res) => {
  try {
    const data = req.body;

    const newReview = new Review(data);
    const savedReview = await newReview.save();

    res.status(201).json({
      success: true,
      message: "Thank you for sharing your feedback!",
      data: savedReview,
    });
  } catch (error) {
    console.log("Error Saving: ", error);
    res.status(500).json({
      succes: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const findReviews = await Review.find()
      .populate("user", "_id name")
      .populate("product");
    res.json({
      success: true,
      message: "All reviews fetched successfully",
      data: findReviews,
    });
  } catch (error) {
    console.log("Error Fetching: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = { createReview, getAllReviews };
