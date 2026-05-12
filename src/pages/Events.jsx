
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";

function Events({
  events,
  setEvents,
}) {

  const addEvent = (event) => {

    setEvents([
      ...events,
      {
        ...event,
        id: Date.now(),
        status: "Upcoming",
      },
    ]);

  };

  const deleteEvent = (id) => {

    setEvents(
      events.filter(
        (event) => event.id !== id
      )
    );

  };

  const completeEvent = (id) => {

    setEvents(
      events.map((event) =>
        event.id === id
          ? {
              ...event,
              status: "Completed",
            }
          : event
      )
    );

  };

  return (
    <div className="page">

      <h1 className="title">
        Events Module
      </h1>

      <EventForm addEvent={addEvent} />

      <EventList
        events={events}
        deleteEvent={deleteEvent}
        completeEvent={completeEvent}
      />

    </div>
  );
}

export default Events;