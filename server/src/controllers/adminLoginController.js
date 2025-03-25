require("dotenv").config(); // Ensure environment variables are loaded

const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;
const predefinedUser = {
  username: "admin",
  password: "123456",
  email: "buddhiniweerathunga188@gmail.com", // Admin's email
};

// Generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

// Send OTP via email
const sendOTPEmail = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: "gmail", // Or change to another service if using something else
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Admin Login OTP",
    text: `Your OTP is: ${otp}`,
  };

  try {
    console.log(`Sending OTP to: ${email}`); // Debugging message
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error(`Error sending OTP email: ${error.message}`);
  }
};

// Temporary OTP storage
let storedOTP = null;
let otpExpirationTime = null;

// Login API - Authenticates user and sends OTP
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (
    username === predefinedUser.username &&
    password === predefinedUser.password
  ) {
    storedOTP = generateOTP();
    otpExpirationTime = Date.now() + 300000; // OTP expires in 5 minutes

    try {
      await sendOTPEmail(predefinedUser.email, storedOTP);
      return res.json({ message: "OTP sent to your email" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to send OTP", error: error.message });
    }
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};

// Verify OTP and issue JWT
const verifyOTP = (req, res) => {
  const { otp } = req.body;

  if (!otpExpirationTime || Date.now() > otpExpirationTime) {
    return res.status(400).json({ message: "OTP has expired" });
  }

  if (parseInt(otp) === storedOTP) {
    const token = jwt.sign({ username: predefinedUser.username }, SECRET_KEY, {
      expiresIn: "1h",
    });
    storedOTP = null; // Reset OTP after successful verification
    otpExpirationTime = null; // Reset expiration time
    return res.json({
      message: "Login successful",
      token,
    });
  } else {
    return res.status(401).json({ message: "Invalid OTP" });
  }
};

module.exports = { loginAdmin, verifyOTP };
