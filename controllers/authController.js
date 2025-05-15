const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const signUp = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Already exists." });
    }

    const newUser = new User({ name, email, role, password });

    newUser.password = await bcrypt.hash(password, 10);
    const saveUser = await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error." });
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "Login failed! Email or Password is wrong.",
      });
    }

    const checkPassword = await bcrypt.compare(password, findUser.password);

    if (!checkPassword) {
      return res.status(404).json({
        success: false,
        message: "Login failed! Email or Password is wrong.",
      });
    }

    const jwtToken = jwt.sign(
      { email: findUser.email, _id: findUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successfully.",
      jwtToken,
      email,
      name: findUser.name,
      role: findUser.role,
      userData: findUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not registered." });
    }

    const resetPasswordToken = jwt.sign(
      { _id: user._id },
      process.env.RESET_PASSWORD_JWT_SECRET,
      { expiresIn: "10m" }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password",
      html: `  <div>
      <p>To reset your password, click the button below:</p>
      <a
       href="https://zaykaadmin.vercel.app/reset-password/${resetPasswordToken}"
        style="
          width: max-content;
          padding: 5px 10px;
          background-color: #d35400;
          color: #fff;
          border-radius: 2px;
          cursor: pointer;
          text-decoration: none;
          margin-left: 5px;
        "
      >
        Reset Password
      </a>

      <p>Please note: This link is valid for only 10 minutes.</p>
    </div>`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ success: true, message: "Reset link sent to you email." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "You're unauthorized to reset password.",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error." });
    console.log(error);
  }
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not registered." });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP code is <b>${otp}</b>. It is valid for 10 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "OTP sent to your email." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error." });
    console.log(error);
  }
};

const verifyOtpAndReset = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found." });
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP." });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error." });
    console.log(error);
  }
};

module.exports = {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  sendOtp,
  verifyOtpAndReset,
};
