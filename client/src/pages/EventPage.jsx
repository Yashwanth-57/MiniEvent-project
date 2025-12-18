import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { joinEvent, leaveEvent } from "../api/RSVPApi";
import { getEventById, deleteEvent } from "../api/eventApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import "../styles/EventPage.css";
import AttendeesModal from "../components/AttendeesModal";

const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [joining, setJoining] = useState(false);
  const [leaving, setLeaving] = useState(false);
    
  const [showAttendees, setShowAttendees] = useState(false);


  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getEventById(id).then((res) => setEvent(res.data));
  }, [id]);

  if (!event) return <p>Loading...</p>;

  const isOwner = user && event.createdBy?._id === user._id;
  const isJoined =
    user && event.attendees.some((a) => a._id === user._id);
  const isFull = event.attendees.length >= event.capacity;

  //  Seat logic
  const seatsLeft = event.capacity - event.attendees.length;
  const showUrgency = seatsLeft > 0 && seatsLeft <= 5;

  /* ---------------- JOIN ---------------- */
const handleJoin = async () => {
  if (!user) {
    toast.info("Please login to RSVP");
    return;
  }

  if (isEventOver) {
  toast.info("This event has already ended. RSVPs are closed.");
  return;
}

  // Optional confirmation when seats are low (GOOD UX)
  if (seatsLeft <= 5) {
    const confirmJoin = window.confirm(
      "This event is almost full. Do you want to confirm your RSVP?"
    );
    if (!confirmJoin) return;
  }

  try {
    setJoining(true);

    await joinEvent(id); // backend enforces capacity

    //  Update UI ONLY after success
    setEvent((prev) => ({
      ...prev,
      attendees: [...prev.attendees, user],
    }));

    toast.success("Thank you for RSVPing!");
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Failed to join event"
    );
  } finally {
    setJoining(false);
  }
};



  /* ---------------- LEAVE ---------------- */
 const handleLeave = async () => {
  const confirmLeave = window.confirm(
    "Are you sure you want to cancel your RSVP? You may lose your seat if the event reaches capacity."
  );

  if (!confirmLeave) return;

  setLeaving(true);

  setEvent((prev) => ({
    ...prev,
    attendees: prev.attendees.filter(
      (a) => a._id !== user._id
    ),
  }));

  try {
    await leaveEvent(id);
    toast.success("Sucesessfully leaved from the event")
  } catch (err) {
    alert("Unable to cancel RSVP");
    setEvent((prev) => ({
      ...prev,
      attendees: [...prev.attendees, user],
    }));
  } finally {
    setLeaving(false);
  }
};


  /* ---------------- OWNER ACTIONS ---------------- */
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await deleteEvent(id);
       toast.success("Event deleted sucessfully");
      navigate("/dashboard");
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleEdit = () => {
    navigate(`/events/${id}/edit`);
  };

  const eventTime = new Date(event.dateTime);
const now = new Date();

const diffMs = eventTime - now;
const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
const diffDays = Math.floor(diffHours / 24);

let timeRemaining = null;

if (diffMs > 0) {
  if (diffHours < 24) {
    timeRemaining = `${diffHours} hour${diffHours !== 1 ? "s" : ""} left`;
  } else {
    timeRemaining = `${diffDays} day${diffDays !== 1 ? "s" : ""} left`;
  }
}

const isEventOver = diffMs <= 0;



  return (
    <div className="event-details-container">
      <div className="event-image-wrapper">
        <img src={event.image} alt={event.title} className="event-image" />
      </div>

      <div className="event-content">
        <h2 className="event-title">{event.title}</h2>
        <p className="event-description">{event.description}</p>

        <div className="event-meta">
          <p>📍 {event.location}</p>
          <p>🗓 {new Date(event.dateTime).toLocaleString()}</p>
          <p>👥 {event.attendees.length}/{event.capacity}</p>

          {showUrgency && (
            <p className="event-urgency">
              ⚠️ Only <strong>{seatsLeft}</strong> seat
              {seatsLeft > 1 ? "s" : ""} left — Hurry up!
            </p>
          )}

         {isFull && !isJoined && (
  <div className="event-full-banner">
    <p>🚫 Event is Full</p>
    <small>Unfortunately, no seats are available for this event.</small>
  </div>
)}

{timeRemaining && (
  <p className="event-timer">
    ⏳ {timeRemaining}
  </p>
)}
            {isEventOver && (
  <div className="event-over-banner">
    <h3>⛔ Event Time Over</h3>
    <small>This event has already ended. RSVPs are closed.</small>
  </div>
)}


        </div>

        {/* ---------------- ACTION BUTTONS ---------------- */}
        <div className="event-actions">
          {!user && (
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/login")}
            >
              Login to RSVP
            </button>
          )}

          {user && !isOwner && !isJoined && !isFull && !isEventOver  && (
            <button
              className="btn btn-primary"
              onClick={handleJoin}
              disabled={joining}
            >
              {joining
                ? "Confirming RSVP..."
                : showUrgency
                ? `Confirm RSVP •  ${seatsLeft} Seat${
                    seatsLeft > 1 ? "s" : ""
                  } Left`
                : "Confirm RSVP"}
            </button>
          )}

          {user && isJoined && (
            <button
              className="btn btn-success"
              onClick={handleLeave}
              disabled={leaving}
            >
              {leaving ? "Cancelling RSVP..." : "✅ RSVP Confirmed (Cancel)"}
            </button>
          )}

          {isOwner && (
            <>
              <button
                className="btn btn-secondary"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>

                  {/*  NEW BUTTON TO SHOW ATTENDEES */}
              <button
                className="btn btn-info"
                onClick={() => setShowAttendees(true)}
              >
                View Attendees
              </button>
              
            </>
          )}

<AttendeesModal
        show={showAttendees}
        onClose={() => setShowAttendees(false)}
        attendees={event.attendees}
      />
          
        </div>
      </div>
      {/* ---------------- ORGANIZER CONTACT ---------------- */}
<div className="event-organizer">
  <h3>📩 Organizer Contact</h3>

  <p>
    <strong>Name:</strong> {event.createdBy?.name}
  </p>

  <p>
    <strong>Email:</strong>{" "}
    <a href={`mailto:${event.createdBy?.email}`}>
      {event.createdBy?.email}
    </a>
  </p>
</div>
    </div>
    
    
  );
};

export default EventPage;
