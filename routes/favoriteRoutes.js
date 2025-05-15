const express = resquire("express");
const router = express.Router();
const {
  toggleFavorite,
  getFavoriteProducts,
} = require("../controllers/favoriteController");

router.post("/toggle", toggleFavorite);
router.get("/:id", getFavoriteProducts);

module.exports = router;
