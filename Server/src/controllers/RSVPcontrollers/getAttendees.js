
const Event = require("../../models/Event");


// @desc    Get attendees list (for owner)
// @route   GET /api/events/:id/attendees
// @access  Private
const getAttendees = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("attendees", "name email");

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json(event.attendees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
  getAttendees
  
};
