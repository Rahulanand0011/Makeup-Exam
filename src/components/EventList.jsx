import { motion, AnimatePresence } from "framer-motion";

const VENUE_COLORS = [
  { bg: "#f0eeff", accent: "#764ba2", border: "#c4b5f4", text: "#3c2a7e" },
  { bg: "#fff0f6", accent: "#e03a6d", border: "#f9a8c6", text: "#8b1a4a" },
  { bg: "#eafffe", accent: "#0891b2", border: "#a5f3fc", text: "#0e4f6b" },
  { bg: "#edfff7", accent: "#059669", border: "#6ee7b7", text: "#064e3b" },
  { bg: "#fff7ed", accent: "#d97706", border: "#fcd34d", text: "#78350f" },
];

function getColor(id) {
  return VENUE_COLORS[id % VENUE_COLORS.length];
}

function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function EventCard({ event, deleteEvent, completeEvent, index }) {
  const color = getColor(index);
  const isCompleted = event.status === "Completed";

  return (
    <motion.div
      className="el-card"
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: "0 12px 36px rgba(0,0,0,0.11)" }}
      style={{
        background: isCompleted ? "#f8f8f8" : "#fff",
        borderColor: isCompleted ? "#ddd" : color.border,
        opacity: isCompleted ? 0.82 : 1,
      }}
    >
      {/* Top color band */}
      <div
        className="el-band"
        style={{
          background: isCompleted
            ? "#e5e5e5"
            : `linear-gradient(135deg, ${color.accent}cc, ${color.accent}66)`,
        }}
      >
        {/* Avatar */}
        <div
          className="el-avatar"
          style={{
            background: isCompleted ? "#bbb" : color.bg,
            color: isCompleted ? "#777" : color.accent,
            border: `2px solid ${isCompleted ? "#ccc" : color.border}`,
          }}
        >
          {getInitials(event.name)}
        </div>

        {/* Status badge */}
        <span
          className="el-badge"
          style={{
            background: isCompleted ? "#e5e5e5" : color.bg,
            color: isCompleted ? "#777" : color.accent,
            border: `1px solid ${isCompleted ? "#ccc" : color.border}`,
          }}
        >
          {isCompleted ? "✓ Completed" : "⏳ Upcoming"}
        </span>
      </div>

      {/* Body */}
      <div className="el-body">
        <h3
          className="el-title"
          style={{
            color: isCompleted ? "#888" : color.text,
            textDecoration: isCompleted ? "line-through" : "none",
          }}
        >
          {event.name}
        </h3>

        <div className="el-meta">
          <div className="el-meta-row">
            <span className="el-meta-icon">📅</span>
            <span className="el-meta-value">{formatDate(event.date)}</span>
          </div>
          <div className="el-meta-row">
            <span className="el-meta-icon">📍</span>
            <span className="el-meta-value">{event.venue}</span>
          </div>
          <div className="el-meta-row">
            <span className="el-meta-icon">👤</span>
            <span className="el-meta-value">{event.organizer}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="el-actions">
        <button
          className="el-btn el-btn-complete"
          onClick={() => completeEvent(event.id)}
          disabled={isCompleted}
          style={{
            background: isCompleted ? "#f0f0f0" : color.bg,
            color: isCompleted ? "#aaa" : color.accent,
            borderColor: isCompleted ? "#ddd" : color.border,
            cursor: isCompleted ? "not-allowed" : "pointer",
          }}
        >
          {isCompleted ? "Done" : "✓ Mark Complete"}
        </button>

        <button
          className="el-btn el-btn-delete"
          onClick={() => deleteEvent(event.id)}
        >
          🗑 Delete
        </button>
      </div>
    </motion.div>
  );
}

function EventList({ events, deleteEvent, completeEvent }) {
  return (
    <>
      <style>{`
        .el-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
          padding: 8px 0 24px;
        }
        .el-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: #b8a8e0;
        }
        .el-empty-icon { font-size: 48px; display: block; margin-bottom: 12px; }
        .el-empty-text { font-size: 15px; font-weight: 500; }
        .el-card {
          border-radius: 18px;
          border: 1.5px solid;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.2s;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }
        .el-band {
          height: 64px;
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding: 0 14px 0 0;
        }
        .el-avatar {
          position: absolute;
          left: 18px;
          bottom: -20px;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.5px;
        }
        .el-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
          margin-bottom: 8px;
          letter-spacing: 0.03em;
        }
        .el-body {
          padding: 28px 18px 14px;
          flex: 1;
        }
        .el-title {
          font-size: 15px;
          font-weight: 700;
          margin: 0 0 14px;
          letter-spacing: -0.2px;
          line-height: 1.3;
        }
        .el-meta {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .el-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .el-meta-icon { font-size: 13px; width: 18px; }
        .el-meta-value {
          font-size: 13px;
          color: #6b5b9a;
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .el-actions {
          display: flex;
          gap: 8px;
          padding: 12px 14px 14px;
          border-top: 1px solid #f0eeff;
        }
        .el-btn {
          flex: 1;
          padding: 8px 10px;
          border-radius: 10px;
          border: 1.5px solid;
          font-size: 12px;
          font-weight: 600;
          transition: transform 0.12s, opacity 0.12s;
          font-family: inherit;
        }
        .el-btn:not(:disabled):hover { opacity: 0.82; transform: translateY(-1px); }
        .el-btn:active { transform: scale(0.97); }
        .el-btn-delete {
          background: #fff5f5;
          color: #e03a6d;
          border-color: #fca5b8;
        }
        .el-btn-delete:hover { background: #ffe4ec !important; }
      `}</style>

      <div className="el-grid">
        <AnimatePresence>
          {events.length === 0 ? (
            <motion.div
              className="el-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="el-empty-icon">🎪</span>
              <p className="el-empty-text">No events yet. Add your first event!</p>
            </motion.div>
          ) : (
            events.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                deleteEvent={deleteEvent}
                completeEvent={completeEvent}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default EventList;
