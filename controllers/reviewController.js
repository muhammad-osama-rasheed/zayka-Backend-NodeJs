const Review = require("../models/review");

const createReview = async (req, res) => {
  try {
    const data = req.body;

    const newReview = new Review(data);
    const savedReview = await newReview.save();

    res.status(201).json({
      success: true,
      message: "Thanks, for sharing your feedback!",
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
    const data = await Review.find().populate("user", "_id name");

    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found." });
    }

    res.json({
      success: true,
      message: "All reviews fetched successfully",
      data: data,
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

const deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await User.findByIdAndDelete(id);

    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Feedback deleted successfully." });
  } catch (error) {
    console.error("Error Deleting: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = { createReview, getAllReviews, deleteReview };
