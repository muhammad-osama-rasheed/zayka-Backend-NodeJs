const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getSingleOrder,
} = require("../controllers/orderController");

router.post("/", createOrder);

router.get("/:id", getSingleOrder);

router.get("/", getAllOrders);

router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);

module.exports = router;
