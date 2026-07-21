import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
};

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kushani-devendra/" },
  { label: "Dribbble", href: "https://dribbble.com/kushanidevendra" },
  { label: "GitHub", href: "https://github.com/kushanidevendra" },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer
      id="hire-me"
      ref={ref}
      style={{
        background: "#E7E7E3",
        borderRadius: "clamp(24px, 5vw, 56px) clamp(24px, 5vw, 56px) 0 0",
        overflow: "hidden",
        marginTop: 0,
      }}
    >
      {/* Fluid padding scales down safely on mobile devices */}
      <div
        style={{ padding: "clamp(48px, 8vw, 88px) clamp(16px, 6vw, 80px) 0" }}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* ── Top row: contact + socials ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "clamp(40px, 8vw, 72px)",
              flexWrap: "wrap",
              gap: 32,
            }}
          >
            {/* Left: Location + contact */}
            <motion.div
              variants={fadeUp}
              style={{ flex: "1 1 min(100%, 300px)" }}
            >
              <div
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#9FA0A3",
                  marginBottom: 18,
                }}
              >
                Get in touch
              </div>
              <div
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(22px, 3vw, 42px)",
                  letterSpacing: "-0.04em",
                  color: "#2E2C29",
                  lineHeight: 1.1,
                  marginBottom: 8,
                }}
              >
                Ganemulla, Sri Lanka
              </div>
              <a
                href="mailto:kushani2000@gmail.com"
                data-cursor
                style={{
                  display: "block",
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(16px, 2.2vw, 32px)",
                  letterSpacing: "-0.04em",
                  color: "rgba(46,44,41,0.5)",
                  lineHeight: 1.2,
                  marginBottom: 4,
                  textDecoration: "none",
                  wordBreak: "break-all",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(46,44,41,0.85)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(46,44,41,0.5)")
                }
              >
                kushani2000@gmail.com
              </a>
              <a
                href="tel:+94778460592"
                data-cursor
                style={{
                  display: "block",
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(14px, 1.8vw, 26px)",
                  letterSpacing: "-0.04em",
                  color: "rgba(46,44,41,0.4)",
                  lineHeight: 1.2,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(46,44,41,0.7)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(46,44,41,0.4)")
                }
              >
                (+94) 77 846 0592
              </a>
            </motion.div>

            {/* Right: Social links */}
            <motion.div
              variants={fadeUp}
              style={{ display: "flex", flexDirection: "column", gap: 6 }}
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  data-cursor
                  style={{
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(22px, 3vw, 42px)",
                    letterSpacing: "-0.04em",
                    color: "#2E2C29",
                    lineHeight: 1.1,
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.45")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  {link.label} ↗
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Large name display ── */}
          <motion.div
            variants={
              {
                hidden: { opacity: 0, y: 40 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: easeOut },
                },
              } as Variants
            }
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontWeight: 700,
              // Scaled down safely so it doesn't force a horizontal scrollbar on mobile
              fontSize: "clamp(56px, 16vw, 260px)",
              letterSpacing: "-0.06em",
              color: "#2E2C29",
              lineHeight: 0.88,
              whiteSpace: "nowrap",
              width: "100%",
              overflow: "hidden",
            }}
          >
            kushani ✦
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px clamp(16px, 6vw, 80px) 20px",
          borderTop: "1px solid rgba(46,44,41,0.1)",
          marginTop: 16,
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontSize: 13,
            color: "#4A4A4A",
          }}
        >
          © 2026 All Rights Reserved
        </span>
        <span
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontSize: 13,
            color: "#4A4A4A",
          }}
        >
          Design by Kushani Devendra
        </span>
      </div>
    </footer>
  );
}
