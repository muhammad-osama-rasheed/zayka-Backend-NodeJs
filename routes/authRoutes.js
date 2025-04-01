const express = require("express");
const router = express.Router();
const {
  signUpValidator,
  loginValidator,
} = require("../middlewares/authValidation");
const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.post("/signup", signUpValidator, signUp);

router.post("/login", loginValidator, login);

router.post("/forgot-password", forgotPassword);

router.put("/reset-password/:token", resetPassword);

module.exports = router;
