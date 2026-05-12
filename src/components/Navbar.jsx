import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";

const navLinks = [
  { to: "/", label: "Dashboard", icon: "🏠" },
  { to: "/events", label: "Events", icon: "🎪" },
  { to: "/participants", label: "Participants", icon: "👥" },
];

function Navbar() {
  const { pathname } = useLocation();

  return (
    <>
      <style>{`
        .nb-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1.5px solid #ede8fb;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 62px;
          box-shadow: 0 2px 16px rgba(118,75,162,0.07);
        }
        .nb-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .nb-logo-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 17px;
          flex-shrink: 0;
        }
        .nb-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }
        .nb-logo-title {
          font-size: 15px;
          font-weight: 800;
          color: #2d1b69;
          letter-spacing: -0.4px;
        }
        .nb-logo-sub {
          font-size: 10px;
          color: #9585c4;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .nb-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .nb-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 600;
          transition: color 0.18s;
          color: #9585c4;
          letter-spacing: 0.01em;
        }
        .nb-link:hover {
          color: #764ba2;
          background: #f5f0ff;
        }
        .nb-link.active {
          color: #3c2a7e;
        }
        .nb-link-icon {
          font-size: 15px;
          line-height: 1;
        }
        .nb-pill {
          position: absolute;
          inset: 0;
          border-radius: 10px;
          background: #f0eeff;
          border: 1.5px solid #c4b5f4;
          z-index: -1;
        }
        .nb-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 6px;
          border: none;
          background: none;
        }
        .nb-hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          border-radius: 2px;
          background: #764ba2;
          transition: transform 0.2s;
        }
        @media (max-width: 540px) {
          .nb-nav { padding: 0 16px; }
          .nb-links { display: none; }
          .nb-logo-sub { display: none; }
        }
      `}</style>

      <nav className="nb-nav">
        {/* Logo */}
        <Link to="/" className="nb-logo">
          <div className="nb-logo-icon">
            <FaCalendarAlt />
          </div>
          <div className="nb-logo-text">
            <span className="nb-logo-title">EventHub</span>
            <span className="nb-logo-sub">Dashboard</span>
          </div>
        </Link>

        {/* Links */}
        <div className="nb-links">
          {navLinks.map(({ to, label, icon }) => {
            const isActive = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`nb-link${isActive ? " active" : ""}`}
              >
                {isActive && (
                  <motion.div
                    className="nb-pill"
                    layoutId="nb-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="nb-link-icon">{icon}</span>
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
