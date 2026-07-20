import React from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";

// Nav used on non-hero pages (Work, Project detail) — always opaque, always fixed
export function PageNav() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 48px",
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: "Instrument Serif, serif",
          fontSize: 22,
          letterSpacing: "-0.04em",
          color: "#2E2C29",
          textDecoration: "none",
          fontWeight: 400,
        }}
      >
        Kushani Devendra
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        {[
          { label: "Home", to: "/" },
          { label: "Work", to: "/work" },
          { label: "Experience", to: "/experience" },
        ].map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontWeight: 300,
              fontSize: 15,
              color: "#2E2C29",
              textDecoration: "none",
              opacity: location.pathname === to ? 1 : 0.5,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.opacity =
                location.pathname === to ? "1" : "0.5")
            }
          >
            {label}
          </Link>
        ))}
        <Link
          to="/#hire-me"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "9px 22px",
            borderRadius: 99,
            background: "#2E2C29",
            color: "#fff",
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 500,
            fontSize: 14,
            textDecoration: "none",
            transition: "background 0.22s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#4A4845")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#2E2C29")}
        >
          Hire me
        </Link>
      </div>
    </motion.nav>
  );
}

// HeroNav — lives INSIDE the hero section, absolute positioned, disappears when hero ends
export function HeroNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.55 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "22px 52px",
        background: "transparent",
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: "Instrument Serif, serif",
          fontSize: 22,
          letterSpacing: "-0.04em",
          color: "#2E2C29",
          textDecoration: "none",
          fontWeight: 400,
        }}
      >
        Kushani Devendra
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        {[
          { label: "Home", to: "/" },
          { label: "Work", to: "/work" },
          { label: "Experience", to: "/experience" },
        ].map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontWeight: 300,
              fontSize: 15,
              color: "#2E2C29",
              textDecoration: "none",
              opacity: 0.6,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
          >
            {label}
          </Link>
        ))}
        <Link
          to="/#hire-me"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "9px 22px",
            borderRadius: 99,
            background: "rgba(46,44,41,0.12)",
            backdropFilter: "blur(8px)",
            color: "#2E2C29",
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 500,
            fontSize: 14,
            textDecoration: "none",
            border: "1px solid rgba(46,44,41,0.12)",
            transition: "all 0.22s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#2E2C29";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(46,44,41,0.12)";
            e.currentTarget.style.color = "#2E2C29";
          }}
        >
          Hire me
        </Link>
      </div>
    </motion.nav>
  );
}
