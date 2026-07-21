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
import "./styles/navigation.css";

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
};

// Cursor tracker RAF loop
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
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
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
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable custom cursor on mobile/touch devices
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

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

  if (isTouchDevice) return null;

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
      {/* Ring */}
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
        backgroundImage: "url(/hero-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center 45%",
        backgroundAttachment: "scroll",
        overflow: "hidden",
      }}
    >
      <HeroNav />
      {/* Veil overlay */}
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

      {/* Main content area */}
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
          padding:
            "clamp(100px, 15vh, 140px) clamp(20px, 5vw, 40px) clamp(40px, 8vh, 80px)",
          textAlign: "center",
          width: "100%",
          boxSizing: "border-box",
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
            gap: "clamp(18px, 4vw, 28px)",
            width: "100%",
          }}
        >
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: "Instrument Serif, serif",
              fontWeight: 400,
              fontSize: "clamp(36px, 7.5vw, 88px)",
              lineHeight: 1.05,
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
              fontSize: "clamp(15px, 2vw, 22px)",
              lineHeight: 1.6,
              color: "#5C5A56",
              maxWidth: 620,
            }}
          >
            I design systems, build SaaS products, and write frontend code,
            turning scattered requirements into structured, purposeful screens
            that ship.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <a href="#hire-me" data-cursor className="hero-cta-primary">
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
            <a href="/work" data-cursor className="hero-cta-secondary">
              View all work
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            marginTop: "clamp(32px, 6vh, 64px)",
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

// ─── Client Belt ─────────────────────────────────────────────────────────────
function ClientBelt() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

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

      {/* Responsive edge fade masks */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "clamp(30px, 8vw, 100px)",
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
          width: "clamp(30px, 8vw, 100px)",
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

// ─── Thumb card ──────────────────────────────────────────────────────────────
function ThumbCard({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
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
        width: "100%",
      }}
    >
      {/* ── Image Container (Fluid Height) ── */}
      <div
        style={{
          position: "relative",
          borderRadius: 16,
          overflow: "hidden",
          height: "clamp(260px, 40vh, 420px)",
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
            <ProjectThumbnail project={project} height={420} />
          </motion.div>
        )}

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

        {/* Arrow */}
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
      </div>

      {/* ── Info below ── */}
      <div
        style={{
          padding: "16px 2px 8px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "Instrument Serif, serif",
              fontWeight: 400,
              fontSize: "clamp(20px, 3.5vw, 24px)",
              letterSpacing: "-0.03em",
              color: "#2E2C29",
              lineHeight: 1.2,
              marginBottom: 6,
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

          {project.brief && (
            <div
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 300,
                fontSize: 14,
                lineHeight: 1.55,
                color: "#8A8885",
                letterSpacing: "-0.01em",
              }}
            >
              {project.brief}
            </div>
          )}
        </div>

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
    </motion.div>
  );
}

// ─── Work Section ─────────────────────────────────────────────────────────────
function WorkSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const projects = FEATURED_PROJECTS.slice(0, 6);

  return (
    <section
      id="selected-work"
      style={{
        padding: "clamp(60px, 8vw, 100px) clamp(20px, 5vw, 72px)",
        background: "#fff",
      }}
    >
      {/* Header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: easeOut }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "clamp(32px, 5vw, 56px)",
          paddingBottom: 24,
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
              marginBottom: 10,
            }}
          >
            / Selected Work
          </div>
          <h2
            style={{
              fontFamily: "Instrument Serif, serif",
              fontWeight: 400,
              fontSize: "clamp(32px, 5vw, 52px)",
              letterSpacing: "-0.04em",
              color: "#2E2C29",
              lineHeight: 1,
            }}
          >
            Things I've designed.
          </h2>
        </div>
      </motion.div>

      {/* Fluid auto-responsive grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "clamp(28px, 4vw, 40px)",
        }}
      >
        {projects.map((p, i) => (
          <ThumbCard key={p.id} project={p} delay={0.05 + (i % 2) * 0.07} />
        ))}
      </div>

      {/* View more CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.4, ease: easeOut }}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "clamp(40px, 6vw, 64px)",
        }}
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
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section
      id="experience"
      style={{
        padding: "clamp(50px, 8vw, 80px) clamp(20px, 5vw, 80px)",
        background: "#fff",
      }}
    >
      <div
        ref={ref}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(32px, 6vw, 80px)",
          alignItems: "flex-start",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "Instrument Serif, serif",
            fontSize: "clamp(36px, 5vw, 48px)",
            letterSpacing: "-0.04em",
            color: "#2E2C29",
            lineHeight: 1,
            flexShrink: 0,
            paddingTop: 8,
          }}
        >
          Focus
        </motion.div>

        <div style={{ flex: "1 1 300px", minWidth: 0 }}>
          {SKILLS.map((skill, i) => {
            const isHovered = hoveredSkill === skill;
            return (
              <motion.div
                key={skill}
                initial={{ opacity: 0, x: 28 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.075, ease: easeOut }}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  borderTop: "1px solid rgba(0,0,0,0.07)",
                  padding: "clamp(12px, 2.5vw, 16px) 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "default",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(28px, 5.5vw, 72px)",
                    letterSpacing: "-0.04em",
                    color: isHovered ? "#C8B89A" : "#2E2C29",
                    lineHeight: 1.05,
                    transition: "color 0.2s",
                  }}
                >
                  {skill}
                </span>
                <span
                  style={{
                    fontSize: "clamp(16px, 2vw, 20px)",
                    color: isHovered ? "#C8B89A" : "#9FA0A3",
                    flexShrink: 0,
                  }}
                >
                  ↗
                </span>
              </motion.div>
            );
          })}
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }} />
        </div>
      </div>
    </section>
  );
}

// ─── Home page ─────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <main style={{ overflowX: "hidden" }}>
      <Hero />
      <ClientBelt />
      <WorkSection />
      <SkillsSection />
      <Footer />
    </main>
  );
}

// PageNav Wrapper
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
