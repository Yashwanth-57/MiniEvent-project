const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { joinEvent} = require("../controllers/RSVPcontrollers/joinEvent");
const { leaveEvent} =  require("../controllers/RSVPcontrollers/leaveEvent");
const {getAttendees} = require("../controllers/RSVPcontrollers/getAttendees");



router.post("/:id/join", protect, joinEvent);
router.post("/:id/leave", protect, leaveEvent);
router.get("/:id/attendees", protect, getAttendees);

module.exports = router;