import React, { useRef, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type Variants,
} from "framer-motion";
import { PageNav, HeroNav } from "./Nav";
import WorkPage from "./WorkPage";
import ProjectPage from "./ProjectPage";
import NotFoundPage from "./NotFoundPage";
import { ProjectThumbnail } from "./ProjectThumbnail";
import ExperiencePage from "./ExperiencePage";
import Footer from "./Footer";
import {
  ALL_PROJECTS,
  FEATURED_PROJECTS,
  SKILLS,
  CLIENTS,
  Project,
} from "./data";
import "./index.css";

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
};

// We use a RAF loop to update cursor position directly on DOM for performance
function CursorTracker() {
  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    let mx = -100,
      my = -100;
    let rx = -100,
      ry = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      // Dot snaps to cursor — centred via -4px (half of 8px)
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      // Ring lerps — read actual half-size for perfect centering regardless of CSS transition
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      const rw = ring.offsetWidth;
      const rh = ring.offsetHeight;
      ring.style.transform = `translate(${rx - rw / 2}px, ${ry - rh / 2}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}

function Cursor() {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = "none";
    const over = (e: MouseEvent) => {
      setHovered(
        !!(e.target as HTMLElement).closest("a, button, [data-cursor]"),
      );
    };
    window.addEventListener("mouseover", over);
    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <CursorTracker />
      {/* Dot */}
      <div
        id="cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovered ? 0 : 8,
          height: hovered ? 0 : 8,
          borderRadius: "50%",
          background: "#2E2C29",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.15s, height 0.15s",
          willChange: "transform",
        }}
      />
      {/* Ring — offset via CSS var set in RAF, size via transition */}
      <div
        id="cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovered ? 46 : 32,
          height: hovered ? 46 : 32,
          borderRadius: "50%",
          border: `1.5px solid ${hovered ? "rgba(46,44,41,0.85)" : "rgba(46,44,41,0.38)"}`,
          pointerEvents: "none",
          zIndex: 99998,
          transition:
            "width 0.28s cubic-bezier(0.22,1,0.36,1), height 0.28s cubic-bezier(0.22,1,0.36,1), border-color 0.2s",
          willChange: "transform",
        }}
      />
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll();
  // Parallax on the section's background-position
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const unsub = scrollY.on("change", (v) => {
      el.style.backgroundPositionY = `calc(45% + ${v * 0.3}px)`;
    });
    return unsub;
  }, [scrollY]);

  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        // Hero image as CSS background — no child div
        backgroundImage: "url(/hero-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center 45%",
        backgroundAttachment: "scroll",
      }}
    >
      <HeroNav />
      {/* Veil overlay — heavier at bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.18) 35%, rgba(255,255,255,0.70) 72%, rgba(255,255,255,0.96) 100%)",
        }}
      />

      {/* Grain */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.07,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.68"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Main centred content — takes full height minus ticker */}
      <motion.div
        style={{
          opacity: heroOpacity,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 5,
          padding: "120px 40px 80px",
          textAlign: "center",
        }}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
          }}
        >
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: "Instrument Serif, serif",
              fontWeight: 400,
              fontSize: "clamp(44px, 6.5vw, 88px)",
              lineHeight: 1.0,
              color: "#2E2C29",
              maxWidth: 860,
              letterSpacing: "-0.025em",
            }}
          >
            No fluff. No noise.
            <br />
            <em style={{ fontStyle: "italic", color: "#7A7367" }}>
              Just interfaces
            </em>
            <br />
            that solve the right problem.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(16px, 1.7vw, 22px)",
              lineHeight: 1.65,
              color: "#5C5A56",
              maxWidth: 620,
            }}
          >
            I design systems, build SaaS products, and write frontend code, turning scattered requirements into structured, purposeful screens that ship.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: "flex", gap: 14 }}>
            <a
              href="#hire-me"
              data-cursor
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                borderRadius: 99,
                background: "#2E2C29",
                color: "#fff",
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 500,
                fontSize: 15,
                textDecoration: "none",
                transition: "background 0.25s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#4A4845")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#2E2C29")
              }
            >
              Hire me
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M2 6.5h9M6.5 2l4.5 4.5-4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="/work"
              data-cursor
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                borderRadius: 99,
                border: "1.5px solid rgba(0,0,0,0.18)",
                color: "#2E2C29",
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 500,
                fontSize: 15,
                textDecoration: "none",
                transition: "all 0.25s",
                background: "rgba(255,255,255,0.4)",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2E2C29";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.4)";
                e.currentTarget.style.color = "#2E2C29";
              }}
            >
              View all work
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator — below buttons, inside content area, not overlapping ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            marginTop: 64,
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#9FA0A3",
              fontFamily: "Instrument Sans, sans-serif",
            }}
          >
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ width: 1, height: 36, background: "rgba(0,0,0,0.25)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Client Belt — separate section below hero ────────────────────────────────
// ─── Client Marquee — faizur-inspired logo strip ─────────────────────────────
// Pill-tag style marquee, two rows scrolling in opposite directions
function ClientBelt() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  // Split clients into two rows for a staggered look
  const row1 = CLIENTS;
  const row2 = [...CLIENTS].reverse();

  const PillRow = ({
    items,
    reverse = false,
    speed = 32,
  }: {
    items: string[];
    reverse?: boolean;
    speed?: number;
  }) => (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <motion.div
        animate={{ x: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 10, whiteSpace: "nowrap" }}
      >
        {[...items, ...items, ...items].map((client, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "Instrument Sans, sans-serif",
              fontWeight: 400,
              fontSize: 13,
              letterSpacing: "-0.01em",
              color: "#5C5A57",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.09)",
              borderRadius: 99,
              padding: "8px 18px",
              flexShrink: 0,
            }}
          >
            {client}
          </span>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section
      ref={ref}
      style={{
        background: "#F5F4F0",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        padding: "36px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Header row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: "center",
          marginBottom: 24,
          fontFamily: "Instrument Sans, sans-serif",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#9FA0A3",
        }}
      >
        Worked with
      </motion.div>

      {/* Edge fade masks */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: 100,
          zIndex: 2,
          background: "linear-gradient(90deg, #F5F4F0 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: 100,
          zIndex: 2,
          background: "linear-gradient(270deg, #F5F4F0 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <PillRow items={row1} speed={35} />
        <PillRow items={row2} reverse speed={28} />
      </div>
    </section>
  );
}

// ─── Thumb card — faizur-inspired: image + info below ─────────────────────────
function ThumbCard({
  project,
  delay = 0,
  imgHeight = 400,
}: {
  project: Project;
  delay?: number;
  imgHeight?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const hasCover = !!(project.thumbImage || project.bgImage);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: easeOut }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => (window.location.href = `/work/${project.id}`)}
      data-cursor
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {/* ── Image ── */}
      <div
        style={{
          position: "relative",
          borderRadius: 16,
          overflow: "hidden",
          height: imgHeight,
          background: project.bg,
          transition: "box-shadow 0.4s ease",
          boxShadow: hovered
            ? "0 24px 56px rgba(0,0,0,0.16), 0 4px 14px rgba(0,0,0,0.08)"
            : "0 2px 16px rgba(0,0,0,0.07)",
        }}
      >
        {hasCover ? (
          <motion.img
            src={project.thumbImage || project.bgImage}
            alt={project.title}
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.6, ease: easeOut }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
            }}
          />
        ) : (
          <motion.div
            animate={{ scale: hovered ? 1.03 : 1 }}
            transition={{ duration: 0.6, ease: easeOut }}
            style={{ height: "100%" }}
          >
            <ProjectThumbnail project={project} height={imgHeight} />
          </motion.div>
        )}

        {/* Dark veil on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "rgba(0,0,0,0.07)",
          }}
        />

        {/* Arrow — top right */}
        <motion.div
          animate={{
            x: hovered ? 0 : 12,
            y: hovered ? 0 : -12,
            opacity: hovered ? 1 : 0,
          }}
          transition={{ duration: 0.28, ease: easeOut }}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.14)",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M2 11L11 2M11 2H4M11 2v7"
              stroke="#2E2C29"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Category pill — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: 14,
            display: "flex",
            gap: 6,
          }}
        >
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.85)",
                background: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(8px)",
                padding: "4px 10px",
                borderRadius: 99,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Info below ── */}
      <div
        style={{
          padding: "20px 2px 8px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Title */}
          <div
            style={{
              fontFamily: "Instrument Serif, serif",
              fontWeight: 400,
              fontSize: "clamp(18px, 2vw, 24px)",
              letterSpacing: "-0.03em",
              color: "#2E2C29",
              lineHeight: 1.2,
              marginBottom: 8,
              transition: "color 0.2s",
            }}
          >
            {hovered ? (
              <span
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "rgba(0,0,0,0.2)",
                  textUnderlineOffset: 3,
                }}
              >
                {project.title}
              </span>
            ) : (
              project.title
            )}
          </div>

          {/* Brief */}
          {project.brief && (
            <div
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 300,
                fontSize: 14,
                lineHeight: 1.65,
                color: "#8A8885",
                letterSpacing: "-0.01em",
              }}
            >
              {project.brief}
            </div>
          )}
        </div>

        {/* Year */}
        <span
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontSize: 12,
            fontWeight: 400,
            color: "#B0AFAD",
            flexShrink: 0,
            paddingTop: 4,
            letterSpacing: "0.01em",
          }}
        >
          {project.year}
        </span>
      </div>

      {/* Bottom border line — animates on hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.4, ease: easeOut }}
        style={{
          height: 1.5,
          background: `linear-gradient(90deg, ${project.accent}, transparent)`,
          transformOrigin: "left",
          borderRadius: 99,
          marginTop: 4,
        }}
      />
    </motion.div>
  );
}

// ─── Work Section — clean 2-col, faizur-inspired ──────────────────────────────
function WorkSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const projects = FEATURED_PROJECTS.slice(0, 6);

  return (
    <section
      id="selected-work"
      style={{ padding: "100px 72px", background: "#fff" }}
    >
      {/* ── Header ── */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: easeOut }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 56,
          paddingBottom: 32,
          borderBottom: "1px solid rgba(0,0,0,0.07)",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#9FA0A3",
              marginBottom: 12,
            }}
          >
            / Selected Work
          </div>
          <h2
            style={{
              fontFamily: "Instrument Serif, serif",
              fontWeight: 400,
              fontSize: "clamp(32px, 3.8vw, 52px)",
              letterSpacing: "-0.04em",
              color: "#2E2C29",
              lineHeight: 1,
            }}
          >
            Things I've designed.
          </h2>
        </div>

        <a
          href="/work"
          data-cursor
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "Instrument Sans, sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: "#2E2C29",
            textDecoration: "none",
            padding: "11px 22px",
            borderRadius: 99,
            border: "1.5px solid rgba(0,0,0,0.11)",
            transition: "all 0.22s",
            letterSpacing: "-0.01em",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "#2E2C29";
            el.style.color = "#fff";
            el.style.borderColor = "#2E2C29";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = "";
            el.style.color = "#2E2C29";
            el.style.borderColor = "rgba(0,0,0,0.11)";
          }}
        >
          All work
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 10L10 2M10 2H3M10 2v7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </motion.div>

      {/* ── 2-column grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "28px 40px",
        }}
      >
        {projects.map((p, i) => (
          <ThumbCard
            key={p.id}
            project={p}
            delay={0.05 + (i % 2) * 0.07}
            imgHeight={420}
          />
        ))}
      </div>

      {/* ── View more CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.4, ease: easeOut }}
        style={{ display: "flex", justifyContent: "center", marginTop: 64 }}
      >
        <a
          href="/work"
          data-cursor
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "Instrument Sans, sans-serif",
            fontSize: 15,
            fontWeight: 500,
            color: "#2E2C29",
            textDecoration: "none",
            padding: "14px 32px",
            borderRadius: 99,
            border: "1.5px solid rgba(0,0,0,0.11)",
            transition: "all 0.25s",
            letterSpacing: "-0.01em",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "#2E2C29";
            el.style.color = "#fff";
            el.style.borderColor = "#2E2C29";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = "";
            el.style.color = "#2E2C29";
            el.style.borderColor = "rgba(0,0,0,0.11)";
          }}
        >
          View all {ALL_PROJECTS.length} projects
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M2 6.5h9M6.5 2l4.5 4.5-4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────────
function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section
      id="experience"
      style={{ padding: "80px 80px", background: "#fff" }}
    >
      <div
        ref={ref}
        style={{ display: "flex", gap: 80, alignItems: "flex-start" }}
      >
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "Instrument Serif, serif",
            fontSize: 48,
            letterSpacing: "-0.04em",
            color: "#2E2C29",
            lineHeight: 1,
            flexShrink: 0,
            paddingTop: 12,
          }}
        >
          Focus
        </motion.div>
        <div style={{ flex: 1 }}>
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, x: 28 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.075, ease: easeOut }}
              style={{
                borderTop: "1px solid rgba(0,0,0,0.07)",
                padding: "16px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(36px, 5vw, 72px)",
                  letterSpacing: "-0.04em",
                  color: "#2E2C29",
                  lineHeight: 1.05,
                  transition: "color 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C8B89A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#2E2C29")}
              >
                {skill}
              </span>
              <span style={{ fontSize: 20, color: "#9FA0A3" }}>↗</span>
            </motion.div>
          ))}
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }} />
        </div>
      </div>
    </section>
  );
}

// ─── Home page ─────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <main>
      <Hero />
      <ClientBelt />
      <WorkSection />
      <SkillsSection />
      <Footer />
    </main>
  );
}

// Show PageNav on all pages except home (home has HeroNav inside)
function PageNavWrapper() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;
  return <PageNav />;
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Cursor />
      <PageNavWrapper />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:id" element={<ProjectPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
