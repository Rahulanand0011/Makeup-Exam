import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AVATAR_COLORS = [
  { bg: "#f0eeff", color: "#764ba2" },
  { bg: "#fff0f6", color: "#e03a6d" },
  { bg: "#eafffe", color: "#0891b2" },
  { bg: "#edfff7", color: "#059669" },
  { bg: "#fff7ed", color: "#d97706" },
];

function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function ParticipantList({ participants, deleteParticipant }) {
  const [search, setSearch] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  const filtered = participants.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.event.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (confirmId === id) {
      deleteParticipant(id);
      setConfirmId(null);
    } else {
      setConfirmId(id);
      setTimeout(() => setConfirmId(null), 2500);
    }
  };

  return (
    <>
      <style>{`
        .pl-wrap {
          background: #fff;
          border-radius: 20px;
          border: 1.5px solid #fce7f3;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(224,58,109,0.07);
        }
        .pl-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          border-bottom: 1.5px solid #fff0f6;
          gap: 14px;
          flex-wrap: wrap;
        }
        .pl-toolbar-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .pl-toolbar-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #f093fb, #e03a6d);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          flex-shrink: 0;
        }
        .pl-toolbar-title {
          font-size: 15px;
          font-weight: 700;
          color: #8b1a4a;
          letter-spacing: -0.3px;
        }
        .pl-count {
          font-size: 11px;
          background: #fff0f6;
          color: #e03a6d;
          border: 1px solid #f9a8c6;
          border-radius: 20px;
          padding: 2px 9px;
          font-weight: 600;
        }
        .pl-search-wrap {
          position: relative;
          flex: 1;
          max-width: 240px;
        }
        .pl-search-icon {
          position: absolute;
          left: 11px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          pointer-events: none;
        }
        .pl-search {
          width: 100%;
          box-sizing: border-box;
          padding: 8px 12px 8px 34px;
          border-radius: 10px;
          border: 1.5px solid #fce7f3;
          font-size: 13px;
          color: #8b1a4a;
          background: #fff8fb;
          outline: none;
          font-family: inherit;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .pl-search:focus {
          border-color: #e03a6d;
          box-shadow: 0 0 0 3px rgba(224,58,109,0.09);
          background: #fff;
        }
        .pl-search::placeholder { color: #f0b8cf; }
        .pl-table-wrap {
          overflow-x: auto;
        }
        .pl-table {
          width: 100%;
          border-collapse: collapse;
        }
        .pl-table thead tr {
          background: #fff8fb;
          border-bottom: 1.5px solid #fce7f3;
        }
        .pl-table th {
          padding: 11px 18px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #d08aaa;
          text-align: left;
          white-space: nowrap;
        }
        .pl-table td {
          padding: 13px 18px;
          font-size: 13.5px;
          color: #4a2040;
          border-bottom: 1px solid #fff0f6;
          vertical-align: middle;
        }
        .pl-row:last-child td { border-bottom: none; }
        .pl-row:hover td { background: #fff8fb; }
        .pl-avatar-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .pl-avatar {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
          flex-shrink: 0;
          letter-spacing: 0.5px;
        }
        .pl-name { font-weight: 600; color: #5c1a3a; }
        .pl-email {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #9b6080;
          font-size: 13px;
        }
        .pl-event-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #fff0f6;
          color: #e03a6d;
          border: 1px solid #fca5b8;
          border-radius: 8px;
          padding: 3px 10px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }
        .pl-del-btn {
          padding: 6px 14px;
          border-radius: 8px;
          border: 1.5px solid;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: transform 0.12s, opacity 0.12s;
          white-space: nowrap;
        }
        .pl-del-btn:hover { opacity: 0.82; transform: translateY(-1px); }
        .pl-del-btn:active { transform: scale(0.97); }
        .pl-del-normal {
          background: #fff5f5;
          color: #e03a6d;
          border-color: #fca5b8;
        }
        .pl-del-confirm {
          background: #e03a6d;
          color: #fff;
          border-color: #e03a6d;
          animation: pl-pulse 0.6s ease;
        }
        @keyframes pl-pulse {
          0% { transform: scale(1); }
          40% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        .pl-empty {
          text-align: center;
          padding: 52px 20px;
          color: #f0b8cf;
        }
        .pl-empty-icon { font-size: 44px; display: block; margin-bottom: 10px; }
        .pl-empty-text { font-size: 14px; font-weight: 500; }
        .pl-no-results { color: #d08aaa; font-size: 13px; padding: 28px 18px; text-align: center; }
      `}</style>

      <div className="pl-wrap">
        {/* Toolbar */}
        <div className="pl-toolbar">
          <div className="pl-toolbar-left">
            <div className="pl-toolbar-icon">👥</div>
            <span className="pl-toolbar-title">Participants</span>
            <span className="pl-count">{participants.length} total</span>
          </div>

          <div className="pl-search-wrap">
            <span className="pl-search-icon">🔍</span>
            <input
              className="pl-search"
              type="text"
              placeholder="Search name, email, event…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        {participants.length === 0 ? (
          <div className="pl-empty">
            <span className="pl-empty-icon">🙋</span>
            <p className="pl-empty-text">No participants yet. Register someone!</p>
          </div>
        ) : (
          <div className="pl-table-wrap">
            <table className="pl-table">
              <thead>
                <tr>
                  <th>Participant</th>
                  <th>Email</th>
                  <th>Event</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="pl-no-results">
                        No results for "{search}"
                      </td>
                    </tr>
                  ) : (
                    filtered.map((p, index) => {
                      const avc = AVATAR_COLORS[index % AVATAR_COLORS.length];
                      return (
                        <motion.tr
                          key={p.id}
                          className="pl-row"
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20, height: 0 }}
                          transition={{ duration: 0.25, delay: index * 0.04 }}
                        >
                          <td>
                            <div className="pl-avatar-cell">
                              <div
                                className="pl-avatar"
                                style={{ background: avc.bg, color: avc.color }}
                              >
                                {getInitials(p.name)}
                              </div>
                              <span className="pl-name">{p.name}</span>
                            </div>
                          </td>
                          <td>
                            <div className="pl-email">
                              <span>✉️</span>
                              {p.email}
                            </div>
                          </td>
                          <td>
                            <span className="pl-event-tag">
                              🎪 {p.event}
                            </span>
                          </td>
                          <td>
                            <button
                              className={`pl-del-btn ${
                                confirmId === p.id
                                  ? "pl-del-confirm"
                                  : "pl-del-normal"
                              }`}
                              onClick={() => handleDelete(p.id)}
                            >
                              {confirmId === p.id ? "⚠ Confirm?" : "🗑 Delete"}
                            </button>
                          </td>
                        </motion.tr>
                      );
                    })
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default ParticipantList;
