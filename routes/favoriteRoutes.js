const express = require("express");
const router = express.Router();
const {
  toggleFavorite,
  getFavoriteProducts,
} = require("../controllers/favoriteController");
const ensureAuthenticated = require("../middlewares/authenticateUser");

router.post("/toggle", ensureAuthenticated, toggleFavorite);
router.get("/:id", getFavoriteProducts);

module.exports = router;
