import DashboardCards from "../components/DashboardCards";

function Dashboard({
  events,
  participants,
}) {

  return (
    <div className="page">

      <div className="hero">

        <div className="overlay">
          <h1>
            Event Management Dashboard
          </h1>

          <p>
            Manage events and participants
            easily 
          </p>
        </div>

      </div>

      <DashboardCards
        events={events}
        participants={participants}
      />

    </div>
  );
}

export default Dashboard;