import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Events from "./pages/Events.jsx";
import Participants from "./pages/Participants.jsx";

function App() {

  // EVENTS STATE
  const [events, setEvents] = useState([]);

  // PARTICIPANTS STATE
  const [participants, setParticipants] =
    useState([]);

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={
            <Dashboard
              events={events}
              participants={participants}
            />
          }
        />

        <Route
          path="/events"
          element={
            <Events
              events={events}
              setEvents={setEvents}
            />
          }
        />

        <Route
          path="/participants"
          element={
            <Participants
              participants={participants}
              setParticipants={setParticipants}
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;