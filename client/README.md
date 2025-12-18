🎨 Frontend Architecture & Design (React)

The frontend is built using React.js with a strong focus on component reusability, mode-based UI control, clean API abstraction, and robust error handling.


Folder stuct

├── client/                 # Frontend (React)
│   ├── src/
│   ├── api/                # Axios API abstraction
│   ├── components/
│   ├── pages/
│   └── redux/
│

🔐 Authentication & Global State Management

Authentication is managed using Redux Toolkit

Redux stores:

Logged-in user details

Authentication status

This enables:

Global access to auth state

Conditional UI rendering

Clean separation between authentication logic and UI

📡 API Layer & Error Handling Strategy
Centralized Axios Instance

A single Axios instance is used across the application

Configured with:

Base URL

Credentials support

Token attachment (via interceptors)

This ensures:

Consistent API behavior

No repeated configuration in components

Separate API Files

API calls are organized by responsibility:

eventApi.js → event CRUD operations

RSVPApi.js → join / leave event logic

authApi.js → login & registration

This keeps components:

Clean

Focused only on UI and state updates

Error Handling

All API errors are handled gracefully:

Backend error messages are surfaced when available

Fallback messages are shown otherwise

User feedback is provided using toast notifications for:

Success states

Failures

Informational messages

🧩 Component Reusability with Mode-Based Control
📦 EventCard Component (Mode-Driven Design)

A single EventCard component is reused across multiple pages using a mode prop instead of duplicating logic.

Usage Examples:

Dashboard

<EventCard key={event._id} event={event} />


My Events Page

<EventCard
  key={event._id}
  event={event}
  mode="my-events"
  onDelete={handleDelete}
/>


Joined Events Page

<EventCard
  key={event._id}
  event={event}
  mode="joined"
  onLeave={handleLeave}
/>

Benefits of Mode-Based Approach:

No duplicated components

Clear intent per page

Easy to add future modes (e.g., archived, expired)

Cleaner than role-only checks

📄 EventPage Component (Single Source of Truth)

A single EventPage component is used across:

Dashboard events

My Events

Joined Events

Behavior adapts dynamically based on:

Event ownership

RSVP status

Event capacity

Event time (expired or active)


🔗 Navigation & Routing

React Router is used to handle navigation between pages seamlessly:

Dashboard – displays all upcoming events.

My Events – shows events created by the logged-in user.

Joined Events – lists events the user has RSVPed to.

EventPage – detailed view of a single event, reused across Dashboard, My Events, and Joined Events.

Navigation is handled programmatically using useNavigate, and all routes are protected based on authentication and ownership.

This approach allows a single EventPage component to serve multiple contexts (mode prop) while enforcing proper role-based UI control (e.g., edit/delete buttons only visible to owners, RSVP buttons only for non-owners).



⏳ Time-Based Event Logic

Event timing is calculated on the frontend using dateTime

UI dynamically shows:

Hours left (if less than 24 hours)

Days left (if more than 24 hours)

If the event time has passed:

Event is marked as “Event Time Over”

RSVP actions are disabled

Clear messaging is shown to the user

👥 Capacity & RSVP UX Handling

Displays:

Current attendees

Total capacity (e.g., 12 / 30)

Enhancements include:

Low-seat warnings

Full-event banners

Disabled RSVP when full or expired

⚙️ RSVP Concurrency Handling (Frontend Strategy)
Join RSVP (Non-Optimistic)

RSVP join uses a non-optimistic approach

UI shows “Confirming RSVP…” until backend response arrives

Prevents:

UI inconsistency

Overbooking confusion

Backend enforces capacity using atomic operations

Leave RSVP (Optimistic with Rollback)

RSVP cancellation uses optimistic UI

Flow:

UI updates immediately

Backend request is sent

On failure → UI is rolled back

Improves responsiveness without risking data integrity

🔒 Ownership & Access Control
Frontend Enforcement

UI elements rendered conditionally:

Edit / Delete buttons → only for event owner

RSVP button → only for non-owners

Cancel RSVP → only if user has joined

Backend Enforcement

Backend controllers strictly validate:

Only event owner can edit/delete

Users cannot RSVP to their own events

Frontend mirrors backend rules for UX clarity

📩 Organizer Contact Information

Event details page displays organizer contact:

Organizer name

Organizer email

Allows users to reach out directly for event-related queries

🎨 Styling Approach

Each page uses separate external CSS files

No inline styling

Ensures:

Clear separation of concerns

Maintainable styling

Scalable UI structure

🧠 Frontend Design Philosophy

The frontend is designed to:

Be mode-driven rather than duplicated

Reflect backend authorization rules accurately

Handle real-world concurrency safely

Prioritize clarity and reliability over risky optimistic updates

Stay scalable for future features



- All features

Authentication & Redux – ✅

Axios instance + API files – ✅

Error handling & toast notifications – ✅

Mode-based EventCard component – ✅

EventPage single component for multiple pages – ✅

Time-based event logic (hours/days/expired) – ✅

Capacity & urgency handling – ✅

RSVP concurrency: non-optimistic join, optimistic leave – ✅

Frontend & backend ownership/access enforcement – ✅

Organizer contact section – ✅

Separate CSS files per page – ✅


