import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const cardConfig = [
  {
    title: "Total Events",
    icon: "🗓️",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    bg: "#f0eeff",
    accent: "#764ba2",
    textColor: "#3c2a7e",
    iconBg: "rgba(118,75,162,0.12)",
    border: "#c4b5f4",
  },
  {
    title: "Upcoming Events",
    icon: "⏳",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    bg: "#fff0f6",
    accent: "#e03a6d",
    textColor: "#8b1a4a",
    iconBg: "rgba(224,58,109,0.10)",
    border: "#f9a8c6",
  },
  {
    title: "Completed Events",
    icon: "✅",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    bg: "#eafffe",
    accent: "#0891b2",
    textColor: "#0e4f6b",
    iconBg: "rgba(8,145,178,0.10)",
    border: "#a5f3fc",
  },
  {
    title: "Total Participants",
    icon: "👥",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    bg: "#edfff7",
    accent: "#059669",
    textColor: "#064e3b",
    iconBg: "rgba(5,150,105,0.10)",
    border: "#6ee7b7",
  },
];

function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const prevValue = useRef(0);

  useEffect(() => {
    const start = prevValue.current;
    const end = value;
    const duration = 800;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      if (ref.current) ref.current.textContent = current;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    prevValue.current = end;
  }, [value]);

  return <span ref={ref}>{value}</span>;
}

function DashboardCards({ events, participants }) {
  const upcoming = events.filter((e) => e.status === "Upcoming").length;
  const completed = events.filter((e) => e.status === "Completed").length;

  const cards = [
    { title: "Total Events", value: events.length },
    { title: "Upcoming Events", value: upcoming },
    { title: "Completed Events", value: completed },
    { title: "Total Participants", value: participants.length },
  ];

  return (
    <>
      <style>{`
        .dc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          padding: 8px 0 24px;
        }
        .dc-card {
          border-radius: 18px;
          padding: 22px 22px 18px;
          border: 1.5px solid;
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: box-shadow 0.2s;
        }
        .dc-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
        }
        .dc-card::before {
          content: '';
          position: absolute;
          bottom: -18px;
          right: -18px;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          opacity: 0.13;
        }
        .dc-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-bottom: 16px;
        }
        .dc-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          margin-bottom: 6px;
          opacity: 0.72;
        }
        .dc-value {
          font-size: 38px;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -1px;
        }
        .dc-bar {
          height: 3px;
          border-radius: 2px;
          margin-top: 16px;
          opacity: 0.25;
        }
      `}</style>

      <div className="dc-grid">
        {cards.map((card, index) => {
          const cfg = cardConfig[index];
          return (
            <motion.div
              key={index}
              className="dc-card"
              style={{
                background: cfg.bg,
                borderColor: cfg.border,
              }}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              whileHover={{ scale: 1.03, y: -3 }}
            >
              {/* Decorative circle */}
              <div
                style={{
                  position: "absolute",
                  bottom: -22,
                  right: -22,
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  background: cfg.gradient,
                  opacity: 0.13,
                }}
              />

              <div className="dc-icon-wrap" style={{ background: cfg.iconBg }}>
                <span role="img" aria-label={card.title}>{cfg.icon}</span>
              </div>

              <div className="dc-label" style={{ color: cfg.accent }}>
                {card.title}
              </div>

              <div className="dc-value" style={{ color: cfg.textColor }}>
                <AnimatedNumber value={card.value} />
              </div>

              <div
                className="dc-bar"
                style={{ background: cfg.gradient }}
              />
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

export default DashboardCards;
