import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import "./styles/navigation.css";

// Nav used on non-hero pages (Work, Project detail) — always opaque, always fixed
export function PageNav() {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

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
        ].map(({ label, to }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={label}
              to={to}
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 300,
                fontSize: 15,
                color: "#2E2C29",
                textDecoration: "none",
                opacity: isActive ? 1 : 0.5,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.opacity = isActive ? "1" : "0.5")
              }
            >
              {label}
            </Link>
          );
        })}
        <Link
          to={isHomeRoute ? "#hire-me" : "/#hire-me"}
          className="nav-cta"
        >
          Hire me
        </Link>
      </div>
    </motion.nav>
  );
}

// HeroNav — lives INSIDE the hero section, fixed positioned on home page
export function HeroNav() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.55 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: scrolled ? "14px 52px" : "22px 52px",
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
        transition: "all 0.3s ease",
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
        ].map(({ label, to }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={label}
              to={to}
              className={`nav-link ${isActive ? "nav-link--active" : "nav-link--inactive"}`}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.opacity = isActive ? "1" : "0.6")
              }
            >
              {label}
            </Link>
          );
        })}
        <Link
          to={location.pathname === "/" ? "#hire-me" : "/#hire-me"}
          className="nav-cta"
        >
          Hire me
        </Link>
      </div>
    </motion.nav>
  );
}
