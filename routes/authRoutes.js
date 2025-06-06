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
  sendOtp,
  changePasswordAfterVerify,
  verifyOtp,
} = require("../controllers/authController");

router.post("/signup", signUpValidator, signUp);

router.post("/login", loginValidator, login);

router.post("/forgot-password", forgotPassword);

router.put("/reset-password/:token", resetPassword);

router.post("/send-otp", sendOtp);

router.post("/verify-otp", verifyOtp);

router.post("/change-password", changePasswordAfterVerify);

module.exports = router;
