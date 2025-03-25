const express = require("express");
const {
  loginAdmin,
  verifyOTP,
} = require("../controllers/adminLoginController");

const router = express.Router();

// Admin login route
router.post("/login", loginAdmin);

// OTP verification route
router.post("/verify-otp", verifyOTP);

module.exports = router;
