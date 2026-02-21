

## 📌 Project Title

**Mini Event Management & RSVP Platform**

A production-grade full-stack web application built to demonstrate modern frontend engineering, secure backend integration, and scalable system design — fully aligned with the Frontend Developer Intern assignment requirements.

---
## 🚀 Live Demo
https://mini-event-project.vercel.app/

## 🎯 Alignment Summary

This project satisfies **all core requirements** of the given assignment:

* ✅ React-based frontend with protected routes
* ✅ Secure authentication using JWT
* ✅ Dashboard-driven user experience
* ✅ CRUD operations on a real-world entity
* ✅ Search, filter, and responsive UI
* ✅ Scalable backend architecture
* ✅ Industry-standard security practices


This is **not a demo CRUD app**, but a real-world system with business rules, validations, and UX decisions.

---

## 🚀 Core Features Implemented

### 👤 Authentication & Authorization

* User registration & login
* JWT-based authentication
* Secure token storage using HTTP-only cookies
* Protected routes (frontend & backend)
* Role-based access control (owner-only actions)

---

### 📊 User Dashboard

* View personal profile information
* Total events created
* Total events attended
* Secure stats fetched from backend APIs

---

### 📅 Event Management (CRUD Entity)

* Create, edit, and delete events
* Upload event images
* Set event capacity, date, time, and location
* Owner-only permissions for event modification

---

### 🔍 Search & Filters (UI + Backend)

* Search events by **title**
* Filter events by:

  * 📍 Location
  * 📅 Date
* Clean and responsive filter UI
* Optimized backend query handling

---

### ✅ RSVP System (Business-Critical Logic)

* RSVP to events
* Cancel RSVP at any time
* Backend-enforced capacity limits
* Duplicate RSVP prevention

#### Smart UX Rules

* Seat urgency warning when seats ≤ 5
* Confirmation dialog for last-seat RSVP
* RSVP disabled when event is full
* RSVP disabled when event time has passed

> ⚠️ No blind optimistic UI — backend confirmation required to prevent race conditions

---

### ⏳ Time-Aware Event Handling

* Countdown timer for upcoming events
* Automatic detection of:

  * Upcoming events
  * Ongoing events
  * Past events
* Past events display **“Event Time Over”** status
* RSVP actions disabled for expired events

---

### 👥 Attendee Management

* View attendee list per event
* Owner-only access
* Modal-based UI for clean experience

---

## 🔐 Security Practices

* Password hashing using bcrypt
* JWT verification middleware
* Ownership validation for protected resources
* Centralized error handling
* Input validation on client & server

---

## 🛠️ Tech Stack

### 🌐 Frontend

| Technology     | Purpose                        |
| -------------- | ------------------------------ |
| React (Vite)   | Component-based SPA            |
| React Router   | Navigation & protected routes  |
| Redux Toolkit  | Centralized auth & scalability |
| Axios Instance | Clean API abstraction          |
| React Toastify | User feedback & alerts         |
| CSS Modules    | Scoped & maintainable styles   |

---

### 🖥️ Backend

| Technology  | Purpose                      |
| ----------- | ---------------------------- |
| Node.js     | Non-blocking backend         |
| Express.js  | RESTful API layer            |
| MongoDB     | Flexible NoSQL database      |
| Mongoose    | Schema modeling & validation |
| JWT         | Secure authentication        |
| MVC Pattern | Scalable code structure      |

---

## 🧱 Project Architecture

```
Mini-Event-Project/
│
├── client/                 # React Frontend
│   ├── src/
│   ├── api/                # Axios abstraction
│   ├── components/
│   ├── pages/
│   └── redux/
│
├── server/                 # Node.js Backend
│   ├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── config/
│
└── README.md
```

---

## 🧪 API Documentation

* Complete Postman collection included
* Covers:

  * Authentication APIs
  * Profile APIs
  * Event CRUD APIs
  * RSVP APIs

---

## 📈 Scalability & Production Readiness

### Current Design Strengths

* Modular frontend & backend separation
* Centralized auth and API layers
* Business logic enforced on backend
* Clean MVC structure

### Planned Enhancements

* Email notifications using Nodemailer
* Real-time notifications using Socket.IO
* Notification state synchronization (REST + WebSocket)
* Future-ready for:

  * Mobile apps
  * Push notifications
  * Admin dashboards

---

## ▶️ Running the Project Locally

### Backend Setup

```bash
cd server
npm install
npm run dev
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 👨‍💻 Author

**Yashwanth**
B.E Information Technology (2025)
Aspiring Full-Stack Developer
📧 [567yashwanth@gmail.com](mailto:567yashwanth@gmail.com)

---

## ✅ Final Note

This project was built specifically with **real-world product thinking**, security, and scalability in mind — fully aligned with the Frontend Developer Intern assignment requirements.
