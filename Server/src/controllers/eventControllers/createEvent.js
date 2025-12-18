const Event = require("../../models/Event");

const createEvent = async (req, res) => {
  try {
    const { title, description, dateTime, location, capacity } = req.body;

   console.log("missing", req.body);
    if (!title || !description || !dateTime || !capacity) {
        
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Image is OPTIONAL but recommended
    const imageName = req.file ? req.file.path : null;

    const event = await Event.create({
      title,
      description,
      dateTime,
      location,
      capacity,
      image: imageName,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createEvent };

