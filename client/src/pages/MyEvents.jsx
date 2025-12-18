import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyEvents } from "../api/eventApi";

import EventCard from "../components/EventCard";

import "../styles/myevents.css";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyEvents = async () => {
    try {
      const res = await getMyEvents();
      setEvents(res.data.events);
    } catch (err) {
      alert(err);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await deleteEvent(id);
      setEvents(events.filter((e) => e._id !== id)); // optimistic
    } catch {
      alert("Delete failed");
    }
  };

  if (loading) return <p className="center">Loading...</p>;

  return (
    <div className="events-container">
    <div className="my-events-header">
      <h2>My Events</h2>
      <button
        className="create-event-btn"
        onClick={() => navigate("/create-event")}
      >
        + Create Event
      </button>
    </div>

    {events.length === 0 && (
      <p className="center">No events created yet</p>
    )}

    {/* GRID WRAPPER (THIS FIXES EVERYTHING) */}
    <div className="my-events-grid">
      {events.map((event) => (
        <EventCard
          key={event._id}
          event={event}
          mode="my-events"
          onDelete={handleDelete}
        />
      ))}
    </div>
  </div>

  );
};

export default MyEvents;
