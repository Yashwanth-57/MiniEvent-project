🎉 Mini Event Management & RSVP Platform

A full-stack event management application where users can create events, RSVP to events, manage attendance, and track participation — built with real-world UX patterns, secure authentication, and scalable architecture.

This project is designed to reflect industry-level frontend + backend practices, focusing on user experience, clean API design, and recruiter-ready structure.

🚀 Live Features Overview
👤 User Authentication

Secure login & registration

JWT-based authentication

Protected routes (frontend & backend)

Session persistence using cookies

📅 Event Management

Create, edit, delete events

Upload event images

Set event capacity and date/time

Owner-only access for edit/delete

✅ RSVP System (Core Feature)

Users can RSVP to events

Cancel RSVP anytime

Backend enforces capacity limits

Duplicate RSVP prevention

⚡ Smart UX Enhancements

Seat urgency warning when seats ≤ 5

Confirmation dialog for last-minute RSVPs

Disabled RSVP when event is full

Disabled RSVP when event time is over

⏳ Time-Aware Events

Countdown timer (hours/days left)

Automatically detects:

Upcoming events

Ongoing window

Past events

Past events show:

⛔ Event Time Over

RSVP button disabled

👥 Attendees Management

View list of attendees

Owner-only attendee access

Modal-based UI (clean UX)

👤 User Profile Dashboard

View personal details

Total events conducted

Total events attended

Stats fetched securely from backend

🧠 Why This Project Is Different

This is not a CRUD-only app.

This project demonstrates:

Real-world RSVP workflows

Optimistic vs confirmed UI decisions

Time-based business logic

Role-based access control

Clean separation of concerns

Scalable folder & API design

🛠️ Tech Stack & Why It’s Used


🌐 Frontend (Client)

Technology	Why It’s Used
React (Vite)	Fast SPA development, component-based UI
React Router	Page navigation & protected routes
Redux Toolkit	Centralized auth state & scalability
Axios Instance	Clean API calls, reusable config
React Toastify	Non-blocking, modern notifications
CSS Modules	Scoped, maintainable styling
🧩 Frontend Patterns Used

Conditional rendering

Disabled actions based on business rules

Clean component separation

API abstraction layer

🖥️ Backend (Server)

Technology	Why It’s Used
Node.js	Non-blocking, scalable backend
Express.js	Minimal & flexible REST API
MongoDB	Flexible schema for events/users
Mongoose	Data modeling & validation
JWT	Secure authentication
Middleware	Route protection & authorization
MVC Pattern	Clean code organization
🧩 Backend Patterns Used

Controller-Service separation

Protected routes

Ownership verification

Centralized error handling

🧱 Project Architecture
Mini-Event-Project/
│
├── client/                 # Frontend (React)
│   ├── src/
│   ├── api/                # Axios API abstraction
│   ├── components/
│   ├── pages/
│   └── redux/
│
├── server/                 # Backend (Node + Express)
│   ├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── config/
│
└── README.md               # Project overview (this file)

🔐 Authentication & Authorization Flow

User logs in

JWT issued by backend

Token stored securely (cookie)

Protected routes validated via middleware

Ownership checks for event actions

🧪 RSVP Logic (Important Design Decision)
❌ No Blind Optimistic UI for RSVP

Reason:

RSVP affects seat availability

Needs backend confirmation

Prevents race conditions

✅ Confirmed UI Update Pattern Used

Backend confirms seat

UI updates after success

Rollback handled safely for leave RSVP

This mirrors real production systems.

📊 Profile Statistics Logic

Backend calculates:

Events created by user

Events attended by user

Frontend:

Calls /profile-stats API

Displays clean summary

No heavy computation on client




▶️ How To Run The Project
1️⃣ Clone Repository
git clone <repo-url>
cd Mini-Event-Project

2️⃣ Backend Setup
cd server
npm install
npm run dev


Create .env file:

PORT=5000
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret

3️⃣ Frontend Setup
cd client
npm install
npm run dev



🔮 Future Enhancements (Planned Architecture)



1️⃣ Email Notifications for RSVP (Nodemailer)

Objective:
Ensure both attendees and event owners receive reliable email notifications for important RSVP actions.

Planned Implementation:

Integrate Nodemailer in the backend.

When a user successfully RSVPs:

📧 Send a confirmation email to the user.

📧 Send a notification email to the event owner.

When a user cancels an RSVP:

Notify the event owner about the freed seat.

Emails will include:

Event name

Date & time

Location

RSVP status

Why Email?

Works even when the user is offline

Reliable communication channel

Common industry practice for transactional events





2️⃣ Real-Time Notifications System (Socket.IO)

Objective:
Deliver instant, real-time notifications without page refresh, improving user engagement and system responsiveness.

🔌 Socket Connection Lifecycle

On user login:

Establish a Socket.IO handshake

Associate socket ID with user ID

On logout or session expiry:

Disconnect socket cleanly

Ensures:

No ghost connections

Accurate user presence tracking

📢 Event Creation Notifications

When a user creates a new event:

Backend controller emits a Socket.IO event

Notification is sent to all connected users

Example use case:

“New event ‘Tech Meetup’ has been created near you”

🔔 RSVP-Based Owner Notifications

When a user joins an event:

Backend emits a socket notification only to the event owner

When a user cancels RSVP:

Owner receives seat-availability update

This avoids unnecessary broadcast and keeps notifications relevant

🧠 Notification State Management (Frontend)

On app load:

Fetch previous notifications using REST API (useEffect)

In parallel:

Listen for real-time notifications using socket.on

Both are merged into a unified notification state

🔢 Notification Counter (Navbar UX)

Navbar displays a notification badge counter

Counter increases when:

A new real-time notification is received

Counter resets to 0 when:

User visits the notifications page

Ensures:

Clear visibility

Non-intrusive UX



🧩 Why This Design Is Scalable

Email = guaranteed delivery

Socket.IO = instant feedback

Backend controls all notification logic

Frontend only renders state (clean separation)

Supports future expansion:

Push notifications

Mobile app integration

Admin-level alerts








👨‍💻 Author

Yashwanth
B.E IT recently completed 2025
Aspiring Full-Stack Developer
567yashwanth@gmail.com