// src/components/AttendeesModal.jsx
import React from "react";
import "../styles/attendeesModal.css";

const AttendeesModal = ({ show, onClose, attendees }) => {
  if (!show) return null; // Hide modal if show=false

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>RSVP Members ({attendees.length})</h2>
        <ul className="attendees-list">
          {attendees.map((attendee) => (
            <li key={attendee._id}>
              {attendee.name} ({attendee.email})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AttendeesModal;
