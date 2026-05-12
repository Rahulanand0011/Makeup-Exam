import { motion } from "framer-motion";
import eventImage from "../assets/event.jpg";

function EventList({
  events,
  deleteEvent,
  completeEvent,
}) {
  return (
    <div className="event-grid">

      {events.map((event) => (

        <motion.div
          className="event-card"
          key={event.id}
          whileHover={{ scale: 1.03 }}
        >

          <img
            src={eventImage}
            alt="event"
          />

          <h3>{event.name}</h3>

          <p>
            <strong>Date:</strong> {event.date}
          </p>

          <p>
            <strong>Venue:</strong> {event.venue}
          </p>

          <p>
            <strong>Organizer:</strong> {event.organizer}
          </p>

          <p>
            <strong>Status:</strong> {event.status}
          </p>

          <div className="btn-group">

            <button
              className="complete-btn"
              onClick={() =>
                completeEvent(event.id)
              }
            >
              Complete
            </button>

            <button
              className="delete-btn"
              onClick={() =>
                deleteEvent(event.id)
              }
            >
              Delete
            </button>

          </div>

        </motion.div>

      ))}

    </div>
  );
}

export default EventList;