const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getSingleOrder,
} = require("../controllers/orderController");
const ensureAuthenticated = require("../middlewares/authenticateUser");

router.post("/", ensureAuthenticated, createOrder);

router.get("/:id", getSingleOrder);

router.get("/", getAllOrders);

router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);

module.exports = router;
