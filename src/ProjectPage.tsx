import React, { useRef, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_PROJECTS, Project, CaseSection } from "./data";
import { PasswordGate, useAuth } from "./PasswordGate";

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Sticky sidebar TOC ───────────────────────────────────────────────────────
function TableOfContents({
  sections,
  activeId,
  accent,
}: {
  sections: CaseSection[];
  activeId: string;
  accent: string;
}) {
  return (
    <nav style={{ position: "sticky", top: 100, paddingTop: 4 }}>
      <div
        style={{
          fontFamily: "Instrument Sans, sans-serif",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#C4C5C7",
          marginBottom: 16,
        }}
      >
        Contents
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sections.map((s) => {
          const active = activeId === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(s.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                color: active ? "#2E2C29" : "#9FA0A3",
                textDecoration: "none",
                padding: "6px 0 6px 14px",
                borderLeft: `2px solid ${active ? accent : "transparent"}`,
                transition: "all 0.2s",
                letterSpacing: "-0.01em",
                display: "block",
              }}
              onMouseEnter={(e) => {
                if (!active)
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#2E2C29";
              }}
              onMouseLeave={(e) => {
                if (!active)
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#9FA0A3";
              }}
            >
              {s.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

// ─── Figma embed ──────────────────────────────────────────────────────────────
function FigmaEmbed({ url, title }: { url: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        background: "#F5F4F0",
        position: "relative",
      }}
    >
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              border: "2px solid rgba(0,0,0,0.1)",
              borderTopColor: "#2E2C29",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <span
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontSize: 13,
              color: "#9FA0A3",
            }}
          >
            Loading Figma…
          </span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      <iframe
        src={url}
        title={`${title} — Figma`}
        allowFullScreen
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: 600,
          border: "none",
          display: "block",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s",
        }}
      />
    </div>
  );
}

// ─── Section block ────────────────────────────────────────────────────────────
function SectionBlock({
  section,
  accentColor,
}: {
  section: CaseSection;
  accentColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      id={section.id}
      ref={ref}
      style={{
        paddingTop: 80,
        scrollMarginTop: 100,
      }}
    >
      {/* Section label */}
      <div
        style={{
          fontFamily: "Instrument Sans, sans-serif",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: accentColor,
          marginBottom: 12,
        }}
      >
        {section.label}
      </div>

      {/* Section heading */}
      <h2
        style={{
          fontFamily: "Instrument Serif, serif",
          fontWeight: 400,
          fontSize: "clamp(26px, 3vw, 38px)",
          letterSpacing: "-0.03em",
          color: "#2E2C29",
          lineHeight: 1.15,
          marginBottom: section.body ? 24 : 0,
        }}
      >
        {section.heading}
      </h2>

      {/* Body */}
      {section.body && (
        <p
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 300,
            fontSize: 17,
            lineHeight: 1.8,
            color: "#4A4845",
            letterSpacing: "-0.01em",
            maxWidth: 680,
            marginBottom: section.subsections ? 40 : 0,
          }}
        >
          {section.body}
        </p>
      )}

      {/* Subsections */}
      {section.subsections && section.subsections.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {section.subsections.map((sub, i) => (
            <div key={i}>
              <h3
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  letterSpacing: "-0.02em",
                  color: "#2E2C29",
                  marginBottom: 10,
                }}
              >
                {sub.heading}
              </h3>
              <p
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: 300,
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: "#5C5A57",
                  letterSpacing: "-0.01em",
                  maxWidth: 640,
                }}
              >
                {sub.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Related project card ─────────────────────────────────────────────────────
function RelatedCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const hasCover = !!(project.thumbImage || project.bgImage);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        navigate(`/work/${project.id}`);
        window.scrollTo(0, 0);
      }}
      data-cursor
      style={{ cursor: "pointer", flex: 1, minWidth: 0 }}
    >
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          height: 220,
          background: project.bg,
          marginBottom: 16,
          boxShadow: hovered
            ? "0 16px 40px rgba(0,0,0,0.16)"
            : "0 2px 12px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {hasCover ? (
          <motion.img
            src={project.thumbImage || project.bgImage}
            alt={project.title}
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.5, ease: easeOut }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: project.accent + "30",
              }}
            />
          </div>
        )}
      </div>
      <div
        style={{
          fontFamily: "Instrument Sans, sans-serif",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: "#9FA0A3",
          marginBottom: 6,
        }}
      >
        {project.tags[0]}
      </div>
      <div
        style={{
          fontFamily: "Instrument Serif, serif",
          fontSize: 20,
          letterSpacing: "-0.03em",
          color: "#2E2C29",
          lineHeight: 1.2,
          textDecoration: hovered ? "underline" : "none",
          textDecorationColor: "rgba(0,0,0,0.2)",
          textUnderlineOffset: 3,
          transition: "text-decoration 0.2s",
        }}
      >
        {project.title}
      </div>
    </div>
  );
}

// ─── Main project page ────────────────────────────────────────────────────────
export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const [gateOpen, setGateOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { authed, unlock } = useAuth();

  const project = ALL_PROJECTS.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Scroll-spy for TOC
  useEffect(() => {
    if (!project?.sections) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );
    project.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [id, project]);

  if (!project) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <p style={{ fontFamily: "Instrument Serif, serif", fontSize: 32 }}>
          Project not found.
        </p>
        <Link
          to="/work"
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            color: "#2E2C29",
          }}
        >
          ← Back to work
        </Link>
      </div>
    );
  }

  const handleUnlock = () => {
    unlock();
    setGateOpen(false);
    if (project.liveUrl && project.liveUrl !== "#") {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    }
  };

  const related = ALL_PROJECTS.filter((p) => p.id !== project.id).slice(0, 3);
  const currentIndex = ALL_PROJECTS.findIndex((p) => p.id === id);
  const prevProject = currentIndex > 0 ? ALL_PROJECTS[currentIndex - 1] : null;
  const nextProject =
    currentIndex < ALL_PROJECTS.length - 1
      ? ALL_PROJECTS[currentIndex + 1]
      : null;

  const hasSections = project.sections && project.sections.length > 0;
  const figmaPreviewLinks =
    project.figmaLinks && project.figmaLinks.length > 0
      ? project.figmaLinks
      : project.figmaUrl
        ? [
            {
              label: "Figma file",
              url: project.figmaUrl,
              sourceUrl: project.figmaUrl,
            },
          ]
        : [];

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {/* Password gate modal */}
      <AnimatePresence>
        {gateOpen && !authed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setGateOpen(false);
            }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: easeOut }}
              style={{
                background: "#FAFAF8",
                borderRadius: 24,
                padding: "48px 40px",
                width: "100%",
                maxWidth: 400,
                boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
                position: "relative",
              }}
            >
              <button
                onClick={() => setGateOpen(false)}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.06)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M1 1l10 10M11 1L1 11"
                    stroke="#2E2C29"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <PasswordGate onUnlock={handleUnlock} modal />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <div
        style={{
          background: "#FAFAF8",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          paddingTop: 96,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "60px 72px 56px",
          }}
        >
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 36,
            }}
          >
            <Link
              to="/"
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: 13,
                color: "#C4C5C7",
                textDecoration: "none",
              }}
            >
              Home
            </Link>
            <span style={{ color: "#E0E0E0", fontSize: 13 }}>/</span>
            <Link
              to="/work"
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: 13,
                color: "#C4C5C7",
                textDecoration: "none",
              }}
            >
              Work
            </Link>
            <span style={{ color: "#E0E0E0", fontSize: 13 }}>/</span>
            <span
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: 13,
                color: "#9FA0A3",
              }}
            >
              {project.title}
            </span>
          </div>

          {/* Category */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: project.accent,
              }}
            />
            <span
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                color: project.accent,
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            style={{
              fontFamily: "Instrument Serif, serif",
              fontWeight: 400,
              fontSize: "clamp(40px, 5.5vw, 68px)",
              letterSpacing: "-0.03em",
              color: "#2E2C29",
              lineHeight: 1.05,
              marginBottom: 28,
              maxWidth: 780,
            }}
          >
            {project.title}
          </motion.h1>

          {/* Overview line */}
          {project.overview && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 300,
                fontSize: 18,
                lineHeight: 1.7,
                color: "#6B6A67",
                letterSpacing: "-0.01em",
                maxWidth: 640,
                marginBottom: 40,
              }}
            >
              {project.overview}
            </motion.p>
          )}

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px 48px",
              paddingTop: 28,
              borderTop: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {[
              { label: "Client", value: project.client },
              { label: "Year", value: project.year },
              { label: "Duration", value: project.duration },
              { label: "Role", value: project.role },
            ]
              .filter((m) => m.value)
              .map(({ label, value }) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "Instrument Sans, sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#C4C5C7",
                      marginBottom: 5,
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontFamily: "Instrument Sans, sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#2E2C29",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}

            {project.tools && (
              <div>
                <div
                  style={{
                    fontFamily: "Instrument Sans, sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#C4C5C7",
                    marginBottom: 5,
                  }}
                >
                  Tools
                </div>
                <div
                  style={{
                    fontFamily: "Instrument Sans, sans-serif",
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#2E2C29",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {project.tools.join(" · ")}
                </div>
              </div>
            )}

            {/* Live link or Figma link */}
            {project.liveUrl && (
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button
                  onClick={() => {
                    if (authed) {
                      if (project.liveUrl && project.liveUrl !== "#") {
                        window.open(
                          project.liveUrl,
                          "_blank",
                          "noopener,noreferrer",
                        );
                      }
                    } else {
                      setGateOpen(true);
                    }
                  }}
                  data-cursor
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "Instrument Sans, sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: project.accent,
                    background: "transparent",
                    border: `1px solid ${project.accent}50`,
                    borderRadius: 99,
                    padding: "7px 16px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = project.accent + "15")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  View live ↗
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Main content: TOC + body ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 72px 80px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: hasSections ? "180px 1fr" : "1fr",
            gap: hasSections ? 64 : 0,
          }}
        >
          {/* Sidebar TOC */}
          {hasSections && (
            <div style={{ paddingTop: 80 }}>
              <TableOfContents
                sections={project.sections!}
                activeId={activeSection}
                accent={project.accent}
              />
            </div>
          )}

          {/* Main body */}
          <div>
            {/* Figma embeds */}
            {figmaPreviewLinks.length > 0 && (
              <div style={{ paddingTop: 64 }}>
                <div
                  style={{
                    fontFamily: "Instrument Sans, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#9FA0A3",
                    marginBottom: 16,
                  }}
                >
                  Figma previews
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 24 }}
                >
                  {figmaPreviewLinks.map((preview, index) => (
                    <div key={`${preview.label}-${index}`}>
                      <div
                        style={{
                          fontFamily: "Instrument Sans, sans-serif",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#2E2C29",
                          marginBottom: 10,
                        }}
                      >
                        {preview.label}
                      </div>
                      <FigmaEmbed
                        url={preview.url}
                        title={`${project.title} — ${preview.label}`}
                      />
                      <p
                        style={{
                          fontFamily: "Instrument Sans, sans-serif",
                          fontSize: 12,
                          color: "#C4C5C7",
                          marginTop: 10,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        Browse the preview above or{" "}
                        <a
                          href={preview.sourceUrl || preview.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: project.accent,
                            textDecoration: "underline",
                            textUnderlineOffset: 2,
                          }}
                        >
                          open this view in Figma
                        </a>
                        .
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Case study sections */}
            {hasSections &&
              project.sections!.map((section) => (
                <SectionBlock
                  key={section.id}
                  section={section}
                  accentColor={project.accent}
                />
              ))}

            {/* Fallback: old-style content blocks if no sections */}
            {!hasSections && (
              <div style={{ paddingTop: 64 }}>
                {project.challenge && (
                  <div style={{ marginBottom: 56 }}>
                    <div
                      style={{
                        fontFamily: "Instrument Sans, sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: project.accent,
                        marginBottom: 12,
                      }}
                    >
                      Challenge
                    </div>
                    <p
                      style={{
                        fontFamily: "Instrument Sans, sans-serif",
                        fontWeight: 300,
                        fontSize: 17,
                        lineHeight: 1.8,
                        color: "#4A4845",
                        maxWidth: 640,
                      }}
                    >
                      {project.challenge}
                    </p>
                  </div>
                )}
                {project.solution && (
                  <div style={{ marginBottom: 56 }}>
                    <div
                      style={{
                        fontFamily: "Instrument Sans, sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: project.accent,
                        marginBottom: 12,
                      }}
                    >
                      Approach
                    </div>
                    <p
                      style={{
                        fontFamily: "Instrument Sans, sans-serif",
                        fontWeight: 300,
                        fontSize: 17,
                        lineHeight: 1.8,
                        color: "#4A4845",
                        maxWidth: 640,
                      }}
                    >
                      {project.solution}
                    </p>
                  </div>
                )}
                {project.outcome && (
                  <div
                    style={{
                      marginBottom: 56,
                      padding: "24px 28px",
                      background: project.accent + "0D",
                      border: `1px solid ${project.accent}28`,
                      borderLeft: `3px solid ${project.accent}`,
                      borderRadius: 14,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Instrument Sans, sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: project.accent,
                        marginBottom: 12,
                      }}
                    >
                      Outcome
                    </div>
                    <p
                      style={{
                        fontFamily: "Instrument Sans, sans-serif",
                        fontWeight: 300,
                        fontSize: 17,
                        lineHeight: 1.8,
                        color: "#4A4845",
                        maxWidth: 640,
                        margin: 0,
                      }}
                    >
                      {project.outcome}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Credits */}
            {project.credits && project.credits.length > 0 && (
              <div
                style={{
                  marginTop: 80,
                  paddingTop: 40,
                  borderTop: "1px solid rgba(0,0,0,0.07)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Instrument Sans, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#C4C5C7",
                    marginBottom: 20,
                  }}
                >
                  Credits
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {project.credits.map((credit, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 12,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Instrument Sans, sans-serif",
                          fontSize: 14,
                          fontWeight: 300,
                          color: "#9FA0A3",
                          minWidth: 240,
                        }}
                      >
                        {credit.role} →
                      </span>
                      {credit.url ? (
                        <a
                          href={credit.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            fontFamily: "Instrument Sans, sans-serif",
                            fontSize: 14,
                            fontWeight: 500,
                            color: "#2E2C29",
                            textDecoration: "underline",
                            textDecorationColor: "rgba(0,0,0,0.2)",
                            textUnderlineOffset: 3,
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = project.accent)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "#2E2C29")
                          }
                        >
                          {credit.name} ↗
                        </a>
                      ) : (
                        <span
                          style={{
                            fontFamily: "Instrument Sans, sans-serif",
                            fontSize: 14,
                            fontWeight: 500,
                            color: "#2E2C29",
                          }}
                        >
                          {credit.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Prev / Next ── */}
      <div
        style={{
          borderTop: "1px solid rgba(0,0,0,0.07)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {prevProject ? (
          <Link
            to={`/work/${prevProject.id}`}
            onClick={() => window.scrollTo(0, 0)}
            data-cursor
            style={{
              padding: "36px 64px",
              textDecoration: "none",
              borderRight: "1px solid rgba(0,0,0,0.07)",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(0,0,0,0.02)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <div
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#C4C5C7",
                marginBottom: 8,
              }}
            >
              ← Previous
            </div>
            <div
              style={{
                fontFamily: "Instrument Serif, serif",
                fontSize: 22,
                letterSpacing: "-0.03em",
                color: "#2E2C29",
              }}
            >
              {prevProject.title}
            </div>
          </Link>
        ) : (
          <div />
        )}
        {nextProject ? (
          <Link
            to={`/work/${nextProject.id}`}
            onClick={() => window.scrollTo(0, 0)}
            data-cursor
            style={{
              padding: "36px 64px",
              textDecoration: "none",
              textAlign: "right",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(0,0,0,0.02)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <div
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#C4C5C7",
                marginBottom: 8,
              }}
            >
              Next →
            </div>
            <div
              style={{
                fontFamily: "Instrument Serif, serif",
                fontSize: 22,
                letterSpacing: "-0.03em",
                color: "#2E2C29",
              }}
            >
              {nextProject.title}
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* ── More projects ── */}
      <div
        style={{
          background: "#F9F8F6",
          padding: "72px 72px 80px",
          borderTop: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 40,
          }}
        >
          <h2
            style={{
              fontFamily: "Instrument Serif, serif",
              fontWeight: 400,
              fontSize: 32,
              letterSpacing: "-0.04em",
              color: "#2E2C29",
            }}
          >
            More work
          </h2>
          <Link
            to="/work"
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "#9FA0A3",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#2E2C29")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9FA0A3")}
          >
            View all →
          </Link>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {related.map((p) => (
            <RelatedCard key={p.id} project={p} />
          ))}
        </div>
      </div>

      {/* Footer strip */}
      <div
        style={{
          background: "#E7E7E3",
          padding: "20px 72px",
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(0,0,0,0.07)",
        }}
      >
        <span
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontSize: 13,
            color: "#9FA0A3",
          }}
        >
          Kushani Devendra · UI/UX Designer
        </span>
        <Link
          to="/#hire-me"
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: "#2E2C29",
            textDecoration: "none",
          }}
        >
          Get in touch ↗
        </Link>
      </div>
    </div>
  );
}
