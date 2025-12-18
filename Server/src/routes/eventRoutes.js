const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const  upload  = require("../middlewares/uploadMiddleware");
const multerErrorHandler = require("../middlewares/multerEroorHandler");


const {getAllEvents} = require("../controllers/eventControllers/getevent");
const {getEventById} = require("../controllers/eventControllers/getevent");
const {createEvent} = require("../controllers/eventControllers/createEvent");
const {updateEvent} = require("../controllers/eventControllers/updateEvent");
const {deleteEvent} = require("../controllers/eventControllers/deleteEvent");
const {getMyEvents} = require("../controllers/eventControllers/getMyEvents");
const { getJoinedEvents } = require("../controllers/eventControllers/joinedEvents");



// Public
router.get("/",protect,  getAllEvents);

// PRIVATE — MUST BE ABOVE `/:id`
router.get("/my-events", protect, getMyEvents);
router.get("/joined-events", protect, getJoinedEvents);
router.get("/:id",protect,  getEventById);


// Protected
// Protected
router.post("/",
  protect,
  upload.single("image"), // image create
  multerErrorHandler,
  createEvent
);


router.put("/:id",
  protect,
  upload.single("image"), // image update
  multerErrorHandler,
  updateEvent
);
router.delete("/:id", protect, deleteEvent);


module.exports = router;
