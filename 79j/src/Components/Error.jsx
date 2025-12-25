import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WebsitePaused() {
  const navigate = useNavigate();
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 520px)");

    const update = () => setIsSmall(mq.matches);
    update();

    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  const onGoBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/websites");
  };

  const s = useMemo(() => {
    const base = styles;

    return {
      ...base,
      card: {
        ...base.card,
        padding: isSmall ? 18 : 22,
        borderRadius: isSmall ? 16 : 18,
      },
      title: {
        ...base.title,
        fontSize: isSmall ? 22 : 26,
      },
      subtitle: {
        ...base.subtitle,
        fontSize: isSmall ? 14 : 14.5,
      },
      infoRow: {
        ...base.infoRow,
        gridTemplateColumns: isSmall ? "1fr" : "140px 1fr",
        gap: isSmall ? 6 : 12,
      },
      infoLabel: {
        ...base.infoLabel,
        paddingTop: 0,
      },
      actions: {
        ...base.actions,
        gridTemplateColumns: isSmall ? "1fr" : "1fr 1fr",
      },
      primaryBtn: {
        ...base.primaryBtn,
        width: "100%",
      },
      secondaryBtn: {
        ...base.secondaryBtn,
        width: "100%",
      },
    };
  }, [isSmall]);

  return (
    <div style={s.page}>
      <div style={s.card} role="status" aria-live="polite">
        <div style={s.badgeRow}>
          <span style={s.badgeDot} />
          <span style={s.badgeText}>Paused</span>
        </div>

        <h1 style={s.title}>This website is currently paused</h1>

        <p style={s.subtitle}>
          The site is temporarily unavailable. If you&apos;re an admin, you can
          resume it from the Websites dashboard.
        </p>

        <div style={s.info}>
          <div style={s.infoRow}>
            <span style={s.infoLabel}>What this means</span>
            <span style={s.infoValue}>
              Visitors may see this page instead of the live website.
            </span>
          </div>

          <div style={s.divider} />

          <div style={s.infoRow}>
            <span style={s.infoLabel}>Next steps</span>
            <span style={s.infoValue}>
              Resume the site, or keep it paused while you make changes.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "24px",
    background:
      "radial-gradient(900px 500px at 50% -10%, rgba(120,160,255,0.25), transparent 60%), #0b0b0f",
    color: "#fff",
    fontFamily:
      'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  },
  card: {
    width: "100%",
    maxWidth: "520px",
    borderRadius: "18px",
    padding: "22px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
    backdropFilter: "blur(10px)",
  },
  badgeRow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 12px",
    borderRadius: "999px",
    background: "rgba(255, 200, 80, 0.14)",
    border: "1px solid rgba(255, 200, 80, 0.22)",
    marginBottom: "14px",
  },
  badgeDot: {
    width: "10px",
    height: "10px",
    borderRadius: "999px",
    background: "rgba(255, 200, 80, 0.95)",
    boxShadow: "0 0 0 4px rgba(255, 200, 80, 0.15)",
  },
  badgeText: {
    fontSize: "13px",
    letterSpacing: "0.2px",
    color: "rgba(255, 230, 180, 0.95)",
  },
  title: {
    fontSize: "26px",
    lineHeight: 1.15,
    margin: "6px 0 10px",
    letterSpacing: "-0.3px",
  },
  subtitle: {
    margin: "0 0 18px",
    color: "rgba(255,255,255,0.72)",
    fontSize: "14.5px",
    lineHeight: 1.55,
  },
  info: {
    borderRadius: "14px",
    padding: "14px",
    background: "rgba(0,0,0,0.22)",
    border: "1px solid rgba(255,255,255,0.08)",
    marginBottom: "18px",
  },
  infoRow: {
    display: "grid",
    gridTemplateColumns: "140px 1fr",
    gap: "12px",
    alignItems: "start",
  },
  infoLabel: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.58)",
    textTransform: "uppercase",
    letterSpacing: "0.7px",
    paddingTop: "2px",
  },
  infoValue: {
    fontSize: "13.5px",
    color: "rgba(255,255,255,0.82)",
    lineHeight: 1.45,
  },
  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.08)",
    margin: "12px 0",
  },
  actions: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },
  primaryBtn: {
    border: "none",
    borderRadius: "12px",
    padding: "12px 14px",
    cursor: "pointer",
    background: "rgba(120,160,255,0.92)",
    color: "#0b0b0f",
    fontWeight: 700,
    fontSize: "14px",
  },
  secondaryBtn: {
    borderRadius: "12px",
    padding: "12px 14px",
    cursor: "pointer",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.16)",
    color: "rgba(255,255,255,0.92)",
    fontWeight: 600,
    fontSize: "14px",
  },
};
