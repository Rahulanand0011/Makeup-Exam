import { useState } from "react";

function EventForm({ addEvent }) {

  const [event, setEvent] = useState({
    name: "",
    date: "",
    venue: "",
    organizer: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addEvent(event);

    setEvent({
      name: "",
      date: "",
      venue: "",
      organizer: "",
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Event Name"
        value={event.name}
        onChange={(e) =>
          setEvent({
            ...event,
            name: e.target.value,
          })
        }
        required
      />

      <input
        type="date"
        value={event.date}
        onChange={(e) =>
          setEvent({
            ...event,
            date: e.target.value,
          })
        }
        required
      />

      <input
        type="text"
        placeholder="Venue"
        value={event.venue}
        onChange={(e) =>
          setEvent({
            ...event,
            venue: e.target.value,
          })
        }
        required
      />

      <input
        type="text"
        placeholder="Organizer"
        value={event.organizer}
        onChange={(e) =>
          setEvent({
            ...event,
            organizer: e.target.value,
          })
        }
        required
      />

      <button type="submit">
        Add Event
      </button>

    </form>
  );
}

export default EventForm;