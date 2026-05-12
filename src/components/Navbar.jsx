import { Link } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        <FaCalendarAlt />
        <h2>Event Dashboard</h2>
      </div>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/events">Events</Link>
        <Link to="/participants">Participants</Link>
      </div>

    </nav>
  );
}

export default Navbar;