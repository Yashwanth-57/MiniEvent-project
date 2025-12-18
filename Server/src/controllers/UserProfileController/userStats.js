const Event = require("../../models/Event");

 const getProfileStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Total events created by user
    const eventsCreated = await Event.countDocuments({
      createdBy: userId,
    });

    // Total events user has attended
    const eventsAttended = await Event.countDocuments({
      attendees: userId,
    });

    res.status(200).json({
      eventsCreated,
      eventsAttended,
    });
  } catch (error) {
    console.error("Profile stats error:", error);
    res.status(500).json({
      message: "Failed to fetch profile statistics",
    });
  }
};


module.exports ={ getProfileStats};
