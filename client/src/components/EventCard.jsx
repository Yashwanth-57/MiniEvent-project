import { useNavigate } from "react-router-dom";
import "../styles/eventCard.css";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
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
    <div
      className="event-card clickable"
      onClick={() => navigate(`/events/${event._id}`)}
    >
      {event.image && (
        <img src={event.image} alt={event.title} className="event-image" />
      )}

      <div className="event-info">
        <h3>{event.title}</h3>

        <p>
          📍 {event.location}
        </p>

        <p >
          🗓 {new Date(event.dateTime).toLocaleString()}
        </p>

        {isEventOver ? (
  <p className="event-over-text">⛔ Event Time Over</p>
) : (
  timeRemaining && (
    <p className="event-timer">
      ⏳ {timeRemaining}
    </p>
  )
)}


    

      </div>
    </div>
  );
};

export default EventCard;
