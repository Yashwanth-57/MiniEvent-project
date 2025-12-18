const Event = require("../../models/Event");

// @desc    Leave event
// @route   POST /api/events/:id/leave
// @access  Private
const leaveEvent = async (req, res) => {
  try {
    const userId = req.user._id;

    const event = await Event.findOneAndUpdate(
      {
        _id: req.params.id,
        attendees: { $in: [userId] },          // user must be in attendees
        attendeesCount: { $gt: 0 }             // prevent negative count
      },
      { 
        $pull: { attendees: userId },          // remove user
        $inc: { attendeesCount: -1 }           // decrement count atomically
      },
      { new: true }
    );

    if (!event) {
      return res.status(400).json({ message: "Cannot leave (not joined or count issue)" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("LeaveEvent error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
  leaveEvent
  
};
