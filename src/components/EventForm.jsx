import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fields = [
  {
    key: "name",
    type: "text",
    placeholder: "Event Name",
    icon: "🎪",
    label: "Event Name",
  },
  {
    key: "date",
    type: "date",
    placeholder: "",
    icon: "📅",
    label: "Date",
  },
  {
    key: "venue",
    type: "text",
    placeholder: "Venue",
    icon: "📍",
    label: "Venue",
  },
  {
    key: "organizer",
    type: "text",
    placeholder: "Organizer Name",
    icon: "👤",
    label: "Organizer",
  },
];

function EventForm({ addEvent }) {
  const [event, setEvent] = useState({
    name: "",
    date: "",
    venue: "",
    organizer: "",
  });

  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(event);
    setEvent({ name: "", date: "", venue: "", organizer: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  const isComplete = Object.values(event).every((v) => v.trim() !== "");

  return (
    <>
      <style>{`
        .ef-wrap {
          background: #fff;
          border-radius: 20px;
          border: 1.5px solid #e8e3f4;
          padding: 28px 28px 24px;
          max-width: 520px;
          box-shadow: 0 4px 24px rgba(118,75,162,0.07);
        }
        .ef-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          padding-bottom: 18px;
          border-bottom: 1.5px solid #f0eeff;
        }
        .ef-header-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        .ef-header-text h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          color: #2d1b69;
          letter-spacing: -0.3px;
        }
        .ef-header-text p {
          margin: 2px 0 0;
          font-size: 12px;
          color: #9585c4;
        }
        .ef-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 20px;
        }
        .ef-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ef-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #9585c4;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .ef-input-wrap {
          position: relative;
        }
        .ef-input {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1.5px solid #e8e3f4;
          font-size: 14px;
          color: #2d1b69;
          background: #faf9ff;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          outline: none;
          font-family: inherit;
        }
        .ef-input:hover {
          border-color: #c4b5f4;
        }
        .ef-input:focus {
          border-color: #764ba2;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(118,75,162,0.10);
        }
        .ef-input::placeholder {
          color: #c4b5f4;
        }
        .ef-input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0.4;
          cursor: pointer;
        }
        .ef-submit {
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          border: none;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          position: relative;
          overflow: hidden;
        }
        .ef-submit.ready {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #fff;
          box-shadow: 0 4px 16px rgba(118,75,162,0.30);
        }
        .ef-submit.not-ready {
          background: #f0eeff;
          color: #b8a8e0;
          cursor: not-allowed;
        }
        .ef-submit.ready:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(118,75,162,0.38);
        }
        .ef-submit.ready:active {
          transform: scale(0.98);
        }
        .ef-progress {
          display: flex;
          gap: 5px;
          margin-bottom: 16px;
        }
        .ef-progress-dot {
          height: 3px;
          flex: 1;
          border-radius: 2px;
          transition: background 0.3s;
        }
        @media (max-width: 480px) {
          .ef-grid { grid-template-columns: 1fr; }
          .ef-wrap { padding: 20px 16px; }
        }
      `}</style>

      <motion.div
        className="ef-wrap"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="ef-header">
          <div className="ef-header-icon">🎪</div>
          <div className="ef-header-text">
            <h3>Add New Event</h3>
            <p>Fill in the details to create an event</p>
          </div>
        </div>

        {/* Progress dots */}
        <div className="ef-progress">
          {fields.map((f) => (
            <div
              key={f.key}
              className="ef-progress-dot"
              style={{
                background: event[f.key]
                  ? "linear-gradient(90deg, #667eea, #764ba2)"
                  : "#f0eeff",
              }}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="ef-grid">
            {fields.map((f) => (
              <motion.div
                key={f.key}
                className="ef-field"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: fields.indexOf(f) * 0.06 }}
              >
                <label className="ef-label">
                  <span>{f.icon}</span>
                  {f.label}
                </label>
                <div className="ef-input-wrap">
                  <input
                    className="ef-input"
                    type={f.type}
                    placeholder={f.placeholder}
                    value={event[f.key]}
                    onFocus={() => setFocused(f.key)}
                    onBlur={() => setFocused(null)}
                    onChange={(e) =>
                      setEvent({ ...event, [f.key]: e.target.value })
                    }
                    required
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            type="submit"
            className={`ef-submit ${isComplete ? "ready" : "not-ready"}`}
            whileTap={isComplete ? { scale: 0.97 } : {}}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.span
                  key="done"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  ✓ Event Added!
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  + Add Event
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>
      </motion.div>
    </>
  );
}

export default EventForm;
