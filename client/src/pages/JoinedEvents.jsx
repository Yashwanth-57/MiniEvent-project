import { useEffect, useState } from "react";
import { getJoinedEvents } from "../api/eventApi";
import { leaveEvent } from "../api/rsvpapi";
import EventCard from "../components/EventCard";
import "../styles/dashboard.css"; // SAME CSS

const JoinedEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        const res = await getJoinedEvents();
        setEvents(res.data.events);
      } catch {
        alert("Failed to fetch joined events");
      }
    };
    fetchJoinedEvents();
  }, []);

  const handleLeave = async (id) => {
    try {
      await leaveEvent(id);
      setEvents(events.filter((e) => e._id !== id));
    } catch {
      alert("Failed to leave event");
    }
  };

  if (!events.length) return <p className="center">No joined events</p>;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Joined Events</h2>

      <div className="dashboard-events">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            mode="joined"
            onLeave={handleLeave}
          />
        ))}
      </div>
    </div>
  );
};

export default JoinedEvents;

