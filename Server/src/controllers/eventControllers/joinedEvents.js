const Event = require("../../models/Event");

// @desc    Get events joined by logged-in user
// @route   GET /api/events/joined-events
// @access  Private
const getJoinedEvents = async (req, res) => {
  try {
    const events = await Event.find({
      attendees: req.user.id, // 👈 key logic
    })
      .sort({ dateTime: 1 })
      .populate("createdBy", "name email");

    res.status(200).json({
      events,
      totalEvents: events.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getJoinedEvents };
