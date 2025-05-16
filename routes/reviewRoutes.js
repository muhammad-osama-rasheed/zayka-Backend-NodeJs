const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  deleteReview,
} = require("../controllers/reviewController");

router.post("/", createReview);

router.get("/", getAllReviews);

router.delete("/:id", deleteReview);

module.exports = router;
