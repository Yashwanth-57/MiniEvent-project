const Event = require("../../models/Event");


// @desc    Get all events with search, filter & pagination
// @route   GET /api/events
// @access  Public
const getAllEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search, location, fromDate } = req.query;

    const filter = {};


    filter.createdBy = { $ne: req.user._id };

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Filters
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }
    if (fromDate) {
      filter.dateTime = { $gte: new Date(fromDate) };
    }

    // Count for pagination
    const totalEvents = await Event.countDocuments(filter);

    // Sort: textScore if search, else dateTime
    const sortOption = search ? { score: { $meta: "textScore" }, dateTime: 1 } : { dateTime: 1 };

    const events = await Event.find(filter, search ? { score: { $meta: "textScore" } } : {})
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name email");

    res.status(200).json({
      totalEvents,
      totalPages: Math.ceil(totalEvents / limit),
      currentPage: page,
      events,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
  try {

    console.log("helooooooooooooo", req.body);
    const event = await Event.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("attendees", "name email");

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
  getAllEvents,
  getEventById
  
};

