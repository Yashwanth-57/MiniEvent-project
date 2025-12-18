import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createEvent, getEventById, updateEvent } from "../api/eventApi";
import "../styles/createEvent.css";

const CreateEvent = ({ eventId }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dateTime: "",
    location: "",
    capacity: "",
  });

  const [image, setImage] = useState(null); // for file input
  const [loading, setLoading] = useState(false);

  // Pre-fill form if editing
  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        try {
          const res = await getEventById(eventId);
          const event = res.data;
           
          setFormData({
            title: event.title,
            description: event.description,
            dateTime: new Date(event.dateTime).toISOString().slice(0, 16), // for datetime-local
            location: event.location,
            capacity: event.capacity,
          });
          // Optional: preview existing image if needed
        } catch (err) {
            toast.error("Event not created!!!");
          console.error("Failed to fetch event", err);
        }
      };
      fetchEvent();
    }
  }, [eventId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = new FormData();
    Object.keys(formData).forEach((key) => {
      eventData.append(key, formData[key]);
    });
    if (image) eventData.append("image", image); // append only if a new image is selected

    try {
      setLoading(true);

      if (eventId) {
        // EDIT mode
        await updateEvent(eventId, eventData);
        alert("Event updated successfully");
      } else {
        // CREATE mode
        await createEvent(eventData);
        alert("Event created successfully");
      }

      navigate("/my-events");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-container">
      <h2>{eventId ? "Edit Event" : "Create Event"}</h2>

      <form onSubmit={handleSubmit} className="create-event-form">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
          min="1"
          required
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit" disabled={loading}>
          {loading
            ? eventId
              ? "Updating..."
              : "Creating..."
            : eventId
            ? "Update Event"
            : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
