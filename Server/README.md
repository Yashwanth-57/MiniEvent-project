Mini Event Project – Backend 🚀

Tech Stack: Node.js, Express.js, MongoDB, JWT Authentication

Folder Structure

├── server/                 # Backend (Node + Express)
│   ├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── config/




/controllers
    /authController.js       → Handles signup, login
    /eventController.js      → CRUD operations for events
    /rsvpController.js       → Join/leave events with concurrency handling
    /userProfileController.js → Profile stats (events conducted/attended)
/models
    User.js                  → User schema (name, email, password, etc.)
    Event.js                 → Event schema (title, description, dateTime, location, capacity, attendees, createdBy)
/routes
    authRoutes.js
    eventRoutes.js
    rsvpRoutes.js
    userRoutes.js
/middlewares
    authMiddleware.js        → Protect routes, JWT verification
/config
    db.js                    → MongoDB connection
/utils
    helpers.js               → Utility functions (if any)
/app.js                     → Mount routes, middlewares
/server.js                  → Start server
.env                         → Environment variables (DB_URI, JWT_SECRET)

Features
1. Authentication

JWT-based authentication for stateless sessions

Role-based access: only event owners can edit/delete their events

Protected routes using authMiddleware

2. Event Management (CRUD)

Create, edit, delete events (only owner can edit/delete)

Fields: title, description, dateTime, location, capacity, image, createdBy

Server validates user authorization

3. RSVP System (Critical Business Logic)

Join/Leave events

Prevent duplicate RSVPs

Concurrency-safe using MongoDB atomic operations

Example:

await Event.findOneAndUpdate(
  { _id: eventId, attendees: { $ne: userId }, capacity: { $gt: 0 } },
  { $addToSet: { attendees: userId }, $inc: { capacity: -1 } },
  { new: true }
);


Join: confirmed only after backend response

Leave: optimistic update with rollback on failure

4. Profile Stats

Endpoint /api/users/profile-stats returns:

Total events conducted by user

Total events attended by user

5. Error Handling

Centralized error responses

Proper HTTP status codes and messages

Easy to debug and integrate with frontend




- Controllers Overview
AuthController

registerUser → Register new user

loginUser → Authenticate and return JWT

Password hashing with bcrypt

EventController

createEvent → Create event

getEvents → Fetch all events

getEventById → Single event details

updateEvent → Only owner can update

deleteEvent → Only owner can delete

RSVPController

joinEvent → Safely join event, enforce capacity

leaveEvent → Leave event with optimistic UI rollback

Concurrency-safe with atomic MongoDB operations

UserProfileController

getProfileStats → Returns total events conducted and attended

Routes Overview

Route	Method	Controller	Access
/api/auth/register	POST	authController	Public
/api/auth/login	POST	authController	Public
/api/events	GET	eventController	Public
/api/events	POST	eventController	Private
/api/events/:id	GET	eventController	Public
/api/events/:id	PUT	eventController	Owner Only
/api/events/:id	DELETE	eventController	Owner Only
/api/rsvp/:id/join	POST	rsvpController	Private
/api/rsvp/:id/leave	POST	rsvpController	Private
/api/users/profile-stats	GET	userProfileController	Private



Notes

Atomic operations ensure safe concurrent RSVPs

Optimistic UI used for leaving events

Backend modularity: separate folders for controllers, routes, models

.env stores secrets

Backend fully compatible with React frontend

Error handling is consistent for API responses