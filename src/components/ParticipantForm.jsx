import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fields = [
  {
    key: "name",
    type: "text",
    placeholder: "e.g. Priya Sharma",
    icon: "👤",
    label: "Full Name",
    autoComplete: "name",
  },
  {
    key: "email",
    type: "email",
    placeholder: "e.g. priya@email.com",
    icon: "✉️",
    label: "Email Address",
    autoComplete: "email",
  },
  {
    key: "event",
    type: "text",
    placeholder: "e.g. Tech Summit 2026",
    icon: "🎪",
    label: "Event Name",
    autoComplete: "off",
  },
];

function ParticipantForm({ addParticipant }) {
  const [participant, setParticipant] = useState({
    name: "",
    email: "",
    event: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (val) => {
    if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError) return;
    addParticipant(participant);
    setParticipant({ name: "", email: "", event: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2200);
  };

  const isComplete =
    Object.values(participant).every((v) => v.trim() !== "") && !emailError;

  const filledCount = Object.values(participant).filter(
    (v) => v.trim() !== ""
  ).length;

  return (
    <>
      <style>{`
        .pf-wrap {
          background: #fff;
          border-radius: 20px;
          border: 1.5px solid #fce7f3;
          padding: 28px 28px 24px;
          max-width: 480px;
          box-shadow: 0 4px 24px rgba(224,58,109,0.07);
        }
        .pf-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
          padding-bottom: 18px;
          border-bottom: 1.5px solid #fff0f6;
        }
        .pf-header-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, #f093fb, #e03a6d);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .pf-header-text h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          color: #8b1a4a;
          letter-spacing: -0.3px;
        }
        .pf-header-text p {
          margin: 2px 0 0;
          font-size: 12px;
          color: #d08aaa;
        }
        .pf-progress-track {
          height: 4px;
          background: #fce7f3;
          border-radius: 4px;
          margin-bottom: 20px;
          overflow: hidden;
        }
        .pf-progress-fill {
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, #f093fb, #e03a6d);
          transition: width 0.35s cubic-bezier(.4,0,.2,1);
        }
        .pf-fields {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 20px;
        }
        .pf-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .pf-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #d08aaa;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .pf-input-row {
          position: relative;
          display: flex;
          align-items: center;
        }
        .pf-input-icon {
          position: absolute;
          left: 13px;
          font-size: 15px;
          pointer-events: none;
          line-height: 1;
        }
        .pf-input {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 14px 10px 38px;
          border-radius: 10px;
          border: 1.5px solid #fce7f3;
          font-size: 14px;
          color: #8b1a4a;
          background: #fff8fb;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          outline: none;
          font-family: inherit;
        }
        .pf-input:hover { border-color: #f9a8c6; }
        .pf-input:focus {
          border-color: #e03a6d;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(224,58,109,0.10);
        }
        .pf-input::placeholder { color: #f0b8cf; }
        .pf-input.error {
          border-color: #f87171;
          background: #fff5f5;
        }
        .pf-error {
          font-size: 11px;
          color: #e03a6d;
          margin-top: 3px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .pf-submit {
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          border: none;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          font-family: inherit;
        }
        .pf-submit.ready {
          background: linear-gradient(135deg, #f093fb, #e03a6d);
          color: #fff;
          box-shadow: 0 4px 16px rgba(224,58,109,0.28);
        }
        .pf-submit.ready:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(224,58,109,0.36);
        }
        .pf-submit.ready:active { transform: scale(0.98); }
        .pf-submit.not-ready {
          background: #fff0f6;
          color: #f0b8cf;
          cursor: not-allowed;
        }
      `}</style>

      <motion.div
        className="pf-wrap"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="pf-header">
          <div className="pf-header-icon">👥</div>
          <div className="pf-header-text">
            <h3>Register Participant</h3>
            <p>Add someone to an event</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="pf-progress-track">
          <div
            className="pf-progress-fill"
            style={{ width: `${(filledCount / fields.length) * 100}%` }}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="pf-fields">
            {fields.map((f, i) => (
              <motion.div
                key={f.key}
                className="pf-field"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
              >
                <label className="pf-label">
                  {f.icon} {f.label}
                </label>
                <div className="pf-input-row">
                  <span className="pf-input-icon">{f.icon}</span>
                  <input
                    className={`pf-input${f.key === "email" && emailError ? " error" : ""}`}
                    type={f.type}
                    placeholder={f.placeholder}
                    value={participant[f.key]}
                    autoComplete={f.autoComplete}
                    onChange={(e) => {
                      setParticipant({ ...participant, [f.key]: e.target.value });
                      if (f.key === "email") validateEmail(e.target.value);
                    }}
                    required
                  />
                </div>
                {f.key === "email" && emailError && (
                  <motion.p
                    className="pf-error"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ⚠ {emailError}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>

          <motion.button
            type="submit"
            className={`pf-submit ${isComplete ? "ready" : "not-ready"}`}
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
                  ✓ Participant Registered!
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  + Add Participant
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>
      </motion.div>
    </>
  );
}

export default ParticipantForm;
