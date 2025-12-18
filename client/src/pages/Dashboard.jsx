import { useEffect, useState } from "react";
import { getAllEvents } from "../api/eventApi";
import "../styles/dashboard.css";
import EventCard from "../components/EventCard";

function Dashboard() {

  const [events, setEvents] = useState([]);
  const [meta, setMeta] = useState({
    totalEvents: 0,
    totalPages: 0,
    currentPage: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [dateRange, setDateRange] = useState(""); //  NEW

  const fetchEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllEvents();
      setEvents(res.data.events);
      setMeta({
        totalEvents: res.data.totalEvents,
        totalPages: res.data.totalPages,
        currentPage: res.data.currentPage,
      });
    } catch (err) {
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  /* ---------- DATE HELPERS ---------- */

  const isSameDate = (eventDateTime, selectedDate) => {
    const eventDate = new Date(eventDateTime);
    const filter = new Date(selectedDate);

    return (
      eventDate.getFullYear() === filter.getFullYear() &&
      eventDate.getMonth() === filter.getMonth() &&
      eventDate.getDate() === filter.getDate()
    );
  };

  const isInRange = (eventDateTime, range) => {
    if (!range) return true;

    const now = new Date();
    const eventDate = new Date(eventDateTime);

    let diff = 0;
    switch (range) {
      case "24h":
        diff = 24 * 60 * 60 * 1000;
        break;
      case "3d":
        diff = 3 * 24 * 60 * 60 * 1000;
        break;
      case "7d":
        diff = 7 * 24 * 60 * 60 * 1000;
        break;
      case "30d":
        diff = 30 * 24 * 60 * 60 * 1000;
        break;
      case "6m":
        diff = 6 * 30 * 24 * 60 * 60 * 1000;
        break;
      case "1y":
        diff = 365 * 24 * 60 * 60 * 1000;
        break;
      default:
        return true;
    }

    return now - eventDate <= diff;
  };

  /* ---------- FILTER LOGIC ---------- */
  const filteredEvents = events.filter((event) => {
    return (
      event.title.toLowerCase().includes(search.toLowerCase()) &&
      (filterLocation ? event.location === filterLocation : true) &&
      (filterDate ? isSameDate(event.dateTime, filterDate) : true) &&
      isInRange(event.dateTime, dateRange)
    );
  });

  const locations = [...new Set(events.map(e => e.location))];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Upcoming Events</h2>

      <div className="dashboard-filters">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="dashboard-input"
        />

        <select
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="dashboard-input"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="dashboard-input"
        />

        {/*  DATE RANGE FILTER */}
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="dashboard-input"
        >
          <option value="">All Time</option>
          <option value="24h">Last 24 Hours</option>
          <option value="3d">Past 3 Days</option>
          <option value="7d">Past 7 Days</option>
          <option value="30d">Past 30 Days</option>
          <option value="6m">Past 6 Months</option>
          <option value="1y">Past 1 Year</option>
        </select>
      </div>

      {loading && <p>Loading events...</p>}
      {error && <p className="dashboard-error">{error}</p>}

      <div className="dashboard-events">
        {filteredEvents.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
