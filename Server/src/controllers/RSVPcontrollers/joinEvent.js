const Event = require("../../models/Event");


// @desc    Join event (atomic, concurrency-safe)
// @route   POST /api/events/:id/join
// @access  Private
const joinEvent = async (req, res) => {
  try {
    const userId = req.user._id;

    const event = await Event.findOneAndUpdate(
      {
        _id: req.params.id,
        attendees: { $ne: userId },
        $expr: { $lt: ["$attendeesCount", "$capacity"] } // atomic capacity check
      },
      { $addToSet: { attendees: userId }, $inc: { attendeesCount: 1 } },
      { new: true }
    );

    if (!event) {
      return res.status(400).json({ message: "Cannot join event (full or already joined)" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("JoinEvent error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
  joinEvent
  
};
