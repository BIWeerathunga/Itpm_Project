const express = require("express");
const { loginAdmin } = require("../controllers/adminLoginController");

const router = express.Router();

// Login Route
router.post("/login", loginAdmin);

module.exports = router;
