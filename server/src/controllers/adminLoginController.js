require("dotenv").config(); // Load environment variables
const jwt = require("jsonwebtoken");
const express = require("express");

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  console.error("Missing JWT_SECRET in .env file");
  process.exit(1); // Stop execution if SECRET_KEY is missing
}

// Predefined User
const predefinedUser = {
  username: "admin",
  password: "123456",
};

// Login Function
const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  if (
    username === predefinedUser.username &&
    password === predefinedUser.password
  ) {
    // Generate JWT Token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ message: "Login successful", token });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};

module.exports = { loginAdmin };
