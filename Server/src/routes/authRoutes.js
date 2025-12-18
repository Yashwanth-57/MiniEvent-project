const express = require("express");
const router = express.Router();
const {  loginUser } = require("../controllers/authController/loginController");
const { registerUser } = require("../controllers/authController/registerController");
const  { logoutUser } = require("../controllers/authController/logoutController");
const { protect } = require("../middlewares/authMiddleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route (optional)
router.post("/logout", protect, logoutUser);

module.exports = router;
