const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["manager", "admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
  },

  otpExpiry: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
