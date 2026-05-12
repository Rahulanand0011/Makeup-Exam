import { useState } from "react";
import { motion } from "framer-motion";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";

function Events({ events, setEvents }) {

  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");

  const addEvent = (event) => {
    setEvents([
      ...events,
      { ...event, id: Date.now(), status: "Upcoming" },
    ]);
    setShowForm(false);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const completeEvent = (id) => {
    setEvents(
      events.map((e) =>
        e.id === id ? { ...e, status: "Completed" } : e
      )
    );
  };

  const upcoming = events.filter((e) => e.status === "Upcoming").length;
  const completed = events.filter((e) => e.status === "Completed").length;

  const filteredEvents =
    filter === "All" ? events : events.filter((e) => e.status === filter);

  const filters = [
    { label: "All", count: events.length },
    { label: "Upcoming", count: upcoming },
    { label: "Completed", count: completed },
  ];

  return (
    <>
      <style>{`
        .ev-page {
          min-height: 100vh;
          background: #f7f5ff;
        }

        /* ── Page header ── */
        .ev-header {
          background: linear-gradient(135deg, #2d1b69 0%, #764ba2 100%);
          padding: 40px 40px 56px;
          position: relative;
          overflow: hidden;
        }
        .ev-header-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }
        .ev-header-inner {
          position: relative;
          z-index: 1;
          max-width: 960px;
          margin: 0 auto;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .ev-header-left {}
        .ev-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.13);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 20px;
          padding: 4px 13px;
          font-size: 12px;
          color: rgba(255,255,255,0.85);
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .ev-page-title {
          font-size: clamp(24px, 3.5vw, 36px);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.8px;
          line-height: 1.15;
          margin: 0 0 10px;
        }
        .ev-page-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.65);
          margin: 0;
          line-height: 1.5;
        }
        .ev-header-stats {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: flex-start;
          padding-top: 4px;
        }
        .ev-hstat {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 12px;
          padding: 10px 16px;
          text-align: center;
          min-width: 72px;
          backdrop-filter: blur(6px);
        }
        .ev-hstat-val {
          font-size: 22px;
          font-weight: 900;
          color: #fff;
          line-height: 1;
          display: block;
        }
        .ev-hstat-lbl {
          font-size: 10px;
          color: rgba(255,255,255,0.60);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-top: 4px;
          display: block;
        }

        /* ── Toolbar ── */
        .ev-toolbar {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 32px;
          transform: translateY(-24px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
        }
        .ev-filters {
          display: flex;
          gap: 6px;
          background: #fff;
          border: 1.5px solid #ede8fb;
          border-radius: 12px;
          padding: 5px;
          box-shadow: 0 2px 12px rgba(118,75,162,0.08);
        }
        .ev-filter-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 8px;
          border: none;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.18s, color 0.18s;
          background: transparent;
          color: #9585c4;
        }
        .ev-filter-btn.active {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #fff;
        }
        .ev-filter-btn:not(.active):hover {
          background: #f0eeff;
          color: #764ba2;
        }
        .ev-filter-count {
          font-size: 11px;
          background: rgba(255,255,255,0.22);
          border-radius: 10px;
          padding: 1px 7px;
          font-weight: 700;
        }
        .ev-filter-btn:not(.active) .ev-filter-count {
          background: #f0eeff;
          color: #764ba2;
        }
        .ev-add-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 10px 20px;
          border-radius: 11px;
          border: none;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #fff;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          box-shadow: 0 4px 14px rgba(118,75,162,0.30);
          transition: transform 0.15s, box-shadow 0.15s;
          white-space: nowrap;
        }
        .ev-add-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(118,75,162,0.38);
        }
        .ev-add-btn:active { transform: scale(0.97); }

        /* ── Form panel ── */
        .ev-form-panel {
          max-width: 960px;
          margin: 0 auto 24px;
          padding: 0 32px;
        }
        .ev-form-inner {
          background: #fff;
          border-radius: 18px;
          border: 1.5px solid #ede8fb;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(118,75,162,0.08);
        }
        .ev-form-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .ev-form-title {
          font-size: 14px;
          font-weight: 700;
          color: #2d1b69;
        }
        .ev-form-close {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: 1.5px solid #ede8fb;
          background: #f7f5ff;
          color: #9585c4;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
          font-family: inherit;
        }
        .ev-form-close:hover { background: #ede8fb; color: #764ba2; }

        /* ── Content ── */
        .ev-content {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 32px 48px;
        }
        .ev-content-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .ev-section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: #9585c4;
        }
        .ev-result-count {
          font-size: 12px;
          color: #b8a8e0;
        }

        @media (max-width: 600px) {
          .ev-header { padding: 28px 20px 48px; }
          .ev-toolbar { padding: 0 16px; }
          .ev-form-panel { padding: 0 16px; }
          .ev-content { padding: 0 16px 36px; }
        }
      `}</style>

      <div className="ev-page">

        {/* ── Page Header ── */}
        <div className="ev-header">
          <div className="ev-header-grid" />
          <div className="ev-header-inner">
            <motion.div
              className="ev-header-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="ev-eyebrow">🎪 Events Module</div>
              <h1 className="ev-page-title">Your Events</h1>
              <p className="ev-page-sub">
                Create, track, and complete your events in one place.
              </p>
            </motion.div>

            <motion.div
              className="ev-header-stats"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
            >
              {[
                { val: events.length, lbl: "Total" },
                { val: upcoming, lbl: "Upcoming" },
                { val: completed, lbl: "Done" },
              ].map((s) => (
                <div className="ev-hstat" key={s.lbl}>
                  <span className="ev-hstat-val">{s.val}</span>
                  <span className="ev-hstat-lbl">{s.lbl}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Toolbar: filters + add button ── */}
        <motion.div
          className="ev-toolbar"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
        >
          <div className="ev-filters">
            {filters.map((f) => (
              <button
                key={f.label}
                className={`ev-filter-btn${filter === f.label ? " active" : ""}`}
                onClick={() => setFilter(f.label)}
              >
                {f.label}
                <span className="ev-filter-count">{f.count}</span>
              </button>
            ))}
          </div>

          <button
            className="ev-add-btn"
            onClick={() => setShowForm((v) => !v)}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>
              {showForm ? "×" : "+"}
            </span>
            {showForm ? "Cancel" : "New Event"}
          </button>
        </motion.div>

        {/* ── Collapsible form panel ── */}
        {showForm && (
          <motion.div
            className="ev-form-panel"
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
          >
            <div className="ev-form-inner">
              <div className="ev-form-header">
                <span className="ev-form-title">✦ Create New Event</span>
                <button
                  className="ev-form-close"
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
              </div>
              <EventForm addEvent={addEvent} />
            </div>
          </motion.div>
        )}

        {/* ── Event list ── */}
        <div className="ev-content">
          <div className="ev-content-header">
            <span className="ev-section-label">
              {filter === "All" ? "All Events" : `${filter} Events`}
            </span>
            <span className="ev-result-count">
              {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}
            </span>
          </div>

          <EventList
            events={filteredEvents}
            deleteEvent={deleteEvent}
            completeEvent={completeEvent}
          />
        </div>

      </div>
    </>
  );
}

export default Events;
