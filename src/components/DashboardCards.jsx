import { motion } from "framer-motion";

function DashboardCards({ events, participants }) {

  const upcoming = events.filter(
    (event) => event.status === "Upcoming"
  ).length;

  const completed = events.filter(
    (event) => event.status === "Completed"
  ).length;

  const cards = [
    {
      title: "Total Events",
      value: events.length,
    },
    {
      title: "Upcoming Events",
      value: upcoming,
    },
    {
      title: "Completed Events",
      value: completed,
    },
    {
      title: "Total Participants",
      value: participants.length,
    },
  ];

  return (
    <div className="card-container">

      {cards.map((card, index) => (
        <motion.div
          className="card"
          key={index}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>{card.title}</h3>
          <p>{card.value}</p>
        </motion.div>
      ))}

    </div>
  );
}

export default DashboardCards;