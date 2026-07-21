import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import "./styles/navigation.css";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "Experience", to: "/experience" },
];

// Custom hook to detect mobile screens
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

// Reusable Hamburger Toggle Button
const MenuButton = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) => (
  <button
    onClick={toggle}
    aria-label="Toggle Menu"
    style={{
      background: "transparent",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 8,
      marginRight: -8, // Offset padding for perfect edge alignment
      zIndex: 101,
    }}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E2C29"
      strokeWidth="1.5"
    >
      {isOpen ? (
        <path
          d="M6 18L18 6M6 6l12 12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M4 8h16M4 16h16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  </button>
);

// Animated Full-Screen Overlay for Mobile
function MobileMenu({
  isOpen,
  closeMenu,
  isHomeRoute,
}: {
  isOpen: boolean;
  closeMenu: () => void;
  isHomeRoute: boolean;
}) {
  const location = useLocation();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 98, // Placed strictly below the fixed top navs (100)
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
        >
          {NAV_LINKS.map(({ label, to }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={label}
                to={to}
                onClick={closeMenu}
                style={{
                  fontFamily: "Instrument Serif, serif",
                  fontSize: 36,
                  color: "#2E2C29",
                  textDecoration: "none",
                  opacity: isActive ? 1 : 0.6,
                  transition: "opacity 0.2s",
                }}
              >
                {label}
              </Link>
            );
          })}
          <Link
            to={isHomeRoute ? "#hire-me" : "/#hire-me"}
            onClick={closeMenu}
            className="nav-cta"
            style={{ marginTop: 24, fontSize: 18, padding: "14px 36px" }}
          >
            Hire me
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── PageNav (Work, Project detail) ───────────────────────────────────────────
export function PageNav() {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  // Auto-close menu if resizing back to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  return (
    <>
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
          padding: "clamp(16px, 3vw, 18px) clamp(20px, 5vw, 48px)",
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
        }}
      >
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          style={{
            fontFamily: "Instrument Serif, serif",
            fontSize: "clamp(20px, 4vw, 22px)",
            letterSpacing: "-0.04em",
            color: "#2E2C29",
            textDecoration: "none",
            fontWeight: 400,
            zIndex: 101, // Ensure logo is clickable when overlay is open
          }}
        >
          Kushani Devendra
        </Link>

        {isMobile ? (
          <MenuButton isOpen={menuOpen} toggle={() => setMenuOpen(!menuOpen)} />
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {NAV_LINKS.map(({ label, to }) => {
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
        )}
      </motion.nav>

      <MobileMenu
        isOpen={menuOpen}
        closeMenu={() => setMenuOpen(false)}
        isHomeRoute={isHomeRoute}
      />
    </>
  );
}

// ─── HeroNav (Home Page) ──────────────────────────────────────────────────────
export function HeroNav() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHomeRoute = location.pathname === "/";

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
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
          padding: scrolled
            ? "clamp(12px, 2.5vw, 14px) clamp(20px, 5vw, 52px)"
            : "clamp(16px, 3.5vw, 22px) clamp(20px, 5vw, 52px)",
          // Force solid background if menu is open to prevent overlap clashes
          background:
            scrolled || menuOpen ? "rgba(255,255,255,0.92)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
          borderBottom:
            scrolled || menuOpen ? "1px solid rgba(0,0,0,0.06)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          style={{
            fontFamily: "Instrument Serif, serif",
            fontSize: "clamp(20px, 4vw, 22px)",
            letterSpacing: "-0.04em",
            color: "#2E2C29",
            textDecoration: "none",
            fontWeight: 400,
            zIndex: 101,
          }}
        >
          Kushani Devendra
        </Link>

        {isMobile ? (
          <MenuButton isOpen={menuOpen} toggle={() => setMenuOpen(!menuOpen)} />
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {NAV_LINKS.map(({ label, to }) => {
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
              to={isHomeRoute ? "#hire-me" : "/#hire-me"}
              className="nav-cta"
            >
              Hire me
            </Link>
          </div>
        )}
      </motion.nav>

      <MobileMenu
        isOpen={menuOpen}
        closeMenu={() => setMenuOpen(false)}
        isHomeRoute={isHomeRoute}
      />
    </>
  );
}
