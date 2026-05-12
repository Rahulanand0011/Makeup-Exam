import { motion } from "framer-motion";
import DashboardCards from "../components/DashboardCards";

const floatingShapes = [
  { size: 180, top: "-40px", left: "-50px", opacity: 0.18, delay: 0 },
  { size: 120, top: "30px", right: "60px", opacity: 0.13, delay: 0.3 },
  { size: 80,  bottom: "10px", left: "38%", opacity: 0.10, delay: 0.6 },
  { size: 60,  top: "60px", left: "45%", opacity: 0.12, delay: 0.2 },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { text: "Good morning", emoji: "☀️" };
  if (h < 17) return { text: "Good afternoon", emoji: "🌤️" };
  return { text: "Good evening", emoji: "🌙" };
}

function StatBadge({ label, value, icon }) {
  return (
    <div className="db-stat-badge">
      <span className="db-stat-icon">{icon}</span>
      <div>
        <div className="db-stat-val">{value}</div>
        <div className="db-stat-lbl">{label}</div>
      </div>
    </div>
  );
}

function Dashboard({ events, participants }) {
  const greeting = getGreeting();

  const upcoming = events.filter((e) => e.status === "Upcoming").length;
  const completed = events.filter((e) => e.status === "Completed").length;
  const completionRate =
    events.length > 0 ? Math.round((completed / events.length) * 100) : 0;

  return (
    <>
      <style>{`
        .db-page {
          min-height: 100vh;
          background: #f7f5ff;
        }

        /* ── Hero ── */
        .db-hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #2d1b69 0%, #764ba2 55%, #e03a6d 100%);
          padding: 52px 40px 80px;
        }
        .db-hero-shape {
          position: absolute;
          border-radius: 50%;
          background: #fff;
          pointer-events: none;
        }
        .db-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
        }
        .db-hero-inner {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          z-index: 1;
        }
        .db-greeting {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.13);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 20px;
          padding: 5px 14px;
          font-size: 13px;
          color: rgba(255,255,255,0.90);
          font-weight: 500;
          margin-bottom: 18px;
          backdrop-filter: blur(6px);
          letter-spacing: 0.01em;
        }
        .db-hero-title {
          font-size: clamp(26px, 4vw, 40px);
          font-weight: 900;
          color: #fff;
          letter-spacing: -1px;
          line-height: 1.15;
          margin: 0 0 12px;
        }
        .db-hero-title span {
          background: linear-gradient(90deg, #fbbf24, #f9a8d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .db-hero-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.70);
          margin: 0 0 32px;
          max-width: 480px;
          line-height: 1.6;
        }
        .db-stat-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .db-stat-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.20);
          border-radius: 12px;
          padding: 10px 16px;
          backdrop-filter: blur(8px);
        }
        .db-stat-icon { font-size: 20px; line-height: 1; }
        .db-stat-val {
          font-size: 18px;
          font-weight: 800;
          color: #fff;
          line-height: 1;
        }
        .db-stat-lbl {
          font-size: 11px;
          color: rgba(255,255,255,0.65);
          margin-top: 2px;
          font-weight: 500;
          letter-spacing: 0.04em;
        }

        /* ── Progress strip ── */
        .db-strip {
          background: #fff;
          border-bottom: 1.5px solid #ede8fb;
          padding: 14px 40px;
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .db-strip-label {
          font-size: 12px;
          font-weight: 600;
          color: #9585c4;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .db-strip-bar-wrap {
          flex: 1;
          min-width: 140px;
          height: 7px;
          background: #f0eeff;
          border-radius: 4px;
          overflow: hidden;
        }
        .db-strip-bar-fill {
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, #667eea, #e03a6d);
          transition: width 1s cubic-bezier(.4,0,.2,1);
        }
        .db-strip-pct {
          font-size: 13px;
          font-weight: 700;
          color: #764ba2;
          min-width: 36px;
          text-align: right;
        }

        /* ── Cards section ── */
        .db-cards-section {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 32px 48px;
          transform: translateY(-32px);
        }
        .db-section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: #9585c4;
          margin-bottom: 12px;
          padding-left: 2px;
        }

        /* ── Quick actions ── */
        .db-actions {
          max-width: 960px;
          margin: 0 auto 40px;
          padding: 0 32px;
        }
        .db-actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
        }
        .db-action-card {
          background: #fff;
          border-radius: 14px;
          border: 1.5px solid #ede8fb;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          text-decoration: none;
          transition: box-shadow 0.18s, transform 0.18s;
          cursor: pointer;
        }
        .db-action-card:hover {
          box-shadow: 0 6px 24px rgba(118,75,162,0.10);
          transform: translateY(-2px);
        }
        .db-action-icon {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .db-action-text strong {
          display: block;
          font-size: 13.5px;
          font-weight: 700;
          color: #2d1b69;
          margin-bottom: 2px;
        }
        .db-action-text span {
          font-size: 12px;
          color: #9585c4;
        }

        @media (max-width: 600px) {
          .db-hero { padding: 36px 20px 64px; }
          .db-strip { padding: 12px 20px; }
          .db-cards-section { padding: 0 16px 36px; }
          .db-actions { padding: 0 16px; }
        }
      `}</style>

      <div className="db-page">
        {/* ── Hero ── */}
        <div className="db-hero">
          <div className="db-hero-grid" />

          {floatingShapes.map((s, i) => (
            <motion.div
              key={i}
              className="db-hero-shape"
              style={{
                width: s.size,
                height: s.size,
                top: s.top,
                left: s.left,
                right: s.right,
                bottom: s.bottom,
                opacity: s.opacity,
              }}
              animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: s.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          <div className="db-hero-inner">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="db-greeting">
                <span>{greeting.emoji}</span>
                {greeting.text}, welcome back
              </div>
            </motion.div>

            <motion.h1
              className="db-hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Event Management<br />
              <span>Dashboard</span>
            </motion.h1>

            <motion.p
              className="db-hero-sub"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
            >
              Plan, track, and manage your events and participants — all in one place.
            </motion.p>

            <motion.div
              className="db-stat-row"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
            >
              <StatBadge label="Total Events" value={events.length} icon="🗓️" />
              <StatBadge label="Upcoming" value={upcoming} icon="⏳" />
              <StatBadge label="Participants" value={participants.length} icon="👥" />
            </motion.div>
          </div>
        </div>

        {/* ── Completion progress strip ── */}
        <div className="db-strip">
          <span className="db-strip-label">Completion Rate</span>
          <div className="db-strip-bar-wrap">
            <motion.div
              className="db-strip-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            />
          </div>
          <span className="db-strip-pct">{completionRate}%</span>
        </div>

        {/* ── Summary cards ── */}
        <div className="db-cards-section">
          <div className="db-section-label">Overview</div>
          <DashboardCards events={events} participants={participants} />
        </div>

        {/* ── Quick action shortcuts ── */}
        <div className="db-actions">
          <div className="db-section-label">Quick Actions</div>
          <div className="db-actions-grid">
            {[
              {
                icon: "🎪",
                bg: "#f0eeff",
                title: "Manage Events",
                sub: "Add or edit events",
                href: "/events",
              },
              {
                icon: "👥",
                bg: "#fff0f6",
                title: "Participants",
                sub: "View registrations",
                href: "/participants",
              },
              {
                icon: "✅",
                bg: "#edfff7",
                title: "Completed",
                sub: `${completed} events done`,
                href: "/events",
              },
            ].map((a, i) => (
              <motion.a
                key={i}
                className="db-action-card"
                href={a.href}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.5 + i * 0.08 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="db-action-icon" style={{ background: a.bg }}>
                  {a.icon}
                </div>
                <div className="db-action-text">
                  <strong>{a.title}</strong>
                  <span>{a.sub}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
