const Event = require("../../models/Event");

// @desc    Update event (only by owner)
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Ownership check
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Prepare update object
    const updates = {
      title: req.body.title ?? event.title,
      description: req.body.description ?? event.description,
      dateTime: req.body.dateTime ?? event.dateTime,
      location: req.body.location ?? event.location,
      capacity: req.body.capacity ?? event.capacity,
    };

    // If new image uploaded
    if (req.file) {
      updates.image = req.file.path;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { updateEvent };
