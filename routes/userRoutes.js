const express = require("express");
const {
  getUsers,
  deleteUser,
  getSingleUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getSingleUser);

router.delete("/:id", deleteUser);

module.exports = router;
