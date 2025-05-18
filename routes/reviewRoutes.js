const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  deleteReview,
} = require("../controllers/reviewController");
const ensureAuthenticated = require("../middlewares/authenticateUser");

router.post("/", ensureAuthenticated, createReview);

router.get("/", getAllReviews);

router.delete("/:reviewId", ensureAuthenticated, deleteReview);

module.exports = router;
