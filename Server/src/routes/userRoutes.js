const express = require("express");
const router = express.Router();

const {
  getProfileStats,
} = require("../controllers/UserProfileController/userStats");

const { protect } = require("../middlewares/authMiddleware");

router.get("/profile-stats", protect, getProfileStats);

module.exports = router;
