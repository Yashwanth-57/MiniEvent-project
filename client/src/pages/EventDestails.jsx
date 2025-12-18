import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getEventById,
  joinEvent,
  leaveEvent,
} from "../api/eventApi";
import { useSelector } from "react-redux";
import "../styles/eventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");

  const fetchEvent = async () => {
    try {
      const res = await getEventById(id);
      setEvent(res.data);
    } catch {
      setError("Failed to load event");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const isJoined = event?.attendees.some(
    (att) => att._id === user._id
  );

  const seatsLeft = event
    ? event.capacity - event.attendees.length
    : 0;

  // 🔥 JOIN EVENT (Race-safe UI)
  const handleJoin = async () => {
    setJoining(true);
    setError("");

    try {
      await joinEvent(id);
      await fetchEvent(); // refresh state
    } catch (err) {
      setError(
        err.response?.data?.message || "Seats are full"
      );
    } finally {
      setJoining(false);
    }
  };

  const handleLeave = async () => {
    setJoining(true);
    try {
      await leaveEvent(id);
      await fetchEvent();
    } catch {
      setError("Failed to leave event");
    } finally {
      setJoining(false);
    }
  };

  if (loading) return <p className="center">Loading...</p>;
  if (!event) return <p className="center">{error}</p>;

  return (
    <div className="event-details-container">
      <img
        src={`${import.meta.env.VITE_API_BASE_URL}/uploads/events/${event.image}`}
        className="event-details-img"
      />

      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p><b>Location:</b> {event.location}</p>
      <p><b>Date:</b> {new Date(event.dateTime).toLocaleString()}</p>

      <p className="seats">
        Seats left: <b>{seatsLeft}</b>
      </p>

      {error && <p className="error">{error}</p>}

      {/*  JOIN / LEAVE LOGIC */}
      {!isJoined ? (
        <button
          className="join-btn"
          disabled={joining || seatsLeft === 0}
          onClick={handleJoin}
        >
          {joining ? "Joining..." : "Join Event"}
        </button>
      ) : (
        <button
          className="leave-btn"
          disabled={joining}
          onClick={handleLeave}
        >
          {joining ? "Leaving..." : "Leave Event"}
        </button>
      )}
    </div>
  );
};

export default EventDetails;
