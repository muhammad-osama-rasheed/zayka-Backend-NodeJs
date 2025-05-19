const express = require("express");
const router = express.Router();
const {
  upload,
  createProduct,
  getAllProducts,
  searchProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

router.post("/", upload.single("image"), createProduct);

router.get("/", getAllProducts);

router.post("/search", searchProduct);

router.delete("/:id", deleteProduct);

router.put("/:id", upload.single("image"), updateProduct);

module.exports = router;
