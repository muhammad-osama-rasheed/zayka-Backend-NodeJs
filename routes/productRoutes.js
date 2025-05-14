const express = require("express");
const router = express.Router();
const {
  upload,
  createProduct,
  getAllProducts,
  searchProduct,
} = require("../controllers/productController");

router.post("/", upload.single("image"), createProduct);

router.get("/", getAllProducts);

router.post("/search", searchProduct);

module.exports = router;
