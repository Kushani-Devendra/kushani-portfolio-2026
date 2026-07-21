import React, { useRef, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_PROJECTS, Project, CaseSection } from "./data";
import { PasswordGate, useAuth } from "./PasswordGate";
import Footer from "./Footer";
import "./styles/project-page.css";

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
    <nav className="project-page-toc">
      <div className="project-page-toc-title">Contents</div>
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
              className={`project-page-toc-link ${active ? "active" : ""}`}
              style={{ borderLeftColor: active ? accent : "transparent" }}
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
    <div className="project-page-embed-shell">
      {!loaded && (
        <div className="project-page-embed-loading">
          <div className="project-page-spinner" />
          <span className="project-page-loading-text">Loading Figma…</span>
        </div>
      )}
      <iframe
        src={url}
        title={`${title} — Figma`}
        allowFullScreen
        onLoad={() => setLoaded(true)}
        className="project-page-embed-frame"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s" }}
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
    <div id={section.id} ref={ref} className="project-page-section-block">
      {/* Section label */}
      <div
        className="project-page-section-label"
        style={{ color: accentColor }}
      >
        {section.label}
      </div>

      {/* Section heading */}
      <h2
        className="project-page-section-heading"
        style={{ marginBottom: section.body ? 24 : 0 }}
      >
        {section.heading}
      </h2>

      {/* Body */}
      {section.body && (
        <p
          className="project-page-section-body"
          style={{ marginBottom: section.subsections ? 40 : 0 }}
        >
          {section.body}
        </p>
      )}

      {/* Subsections */}
      {section.subsections && section.subsections.length > 0 && (
        <div className="project-page-subsection">
          {section.subsections.map((sub, i) => (
            <div key={i}>
              <h3 className="project-page-subsection-title">{sub.heading}</h3>
              <p className="project-page-subsection-body">{sub.body}</p>
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
      className="project-page-related-card"
    >
      <div
        className={`project-page-related-thumb ${hovered ? "hovered" : ""}`}
        style={{ background: project.bg }}
      >
        {hasCover ? (
          <motion.img
            src={project.thumbImage || project.bgImage}
            alt={project.title}
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="project-page-related-thumb-image"
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
      {/* <div className="project-page-related-tag">{project.tags[0]}</div> */}
      <div className={`project-page-related-title ${hovered ? "hovered" : ""}`}>
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
  };

  const formatRoleValue = (value?: string) =>
    value ? value.replace(/\./g, " . ") : "";

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
    <div className="project-page-shell">
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
      <div className="project-page-hero">
        <div className="project-page-container">
          {/* Breadcrumb */}
          <div className="project-page-breadcrumb">
            <Link to="/" className="project-page-breadcrumb-link">
              Home
            </Link>
            <span className="project-page-breadcrumb-separator">/</span>
            <Link to="/work" className="project-page-breadcrumb-link">
              Work
            </Link>
            <span className="project-page-breadcrumb-separator">/</span>
            <span className="project-page-breadcrumb-current">
              {project.title}
            </span>
          </div>

          {/* Category */}
          <div className="project-page-category">
            <div
              className="project-page-category-dot"
              style={{ background: project.accent }}
            />
            <span
              className="project-page-category-label"
              style={{ color: project.accent }}
            >
              {project.category}
            </span>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="project-page-title"
          >
            {project.title}
          </motion.h1>

          {/* Overview line */}
          {project.overview && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
              className="project-page-overview"
            >
              {project.overview}
            </motion.p>
          )}

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="project-page-meta"
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
                  <div className="project-page-meta-label">{label}</div>
                  <div
                    className={
                      label === "Role"
                        ? "project-page-role-value"
                        : "project-page-meta-value"
                    }
                  >
                    {label === "Role" ? formatRoleValue(value) : value}
                  </div>
                </div>
              ))}

            {project.tools && (
              <div>
                <div className="project-page-meta-label">Tools</div>
                <div className="project-page-meta-value">
                  {project.tools.join(" · ")}
                </div>
              </div>
            )}

            {/* Live link or Figma link */}
            {project.liveUrl && (
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button
                  onClick={() => {
                    if (project.liveUrl && project.liveUrl !== "#") {
                      window.open(
                        project.liveUrl,
                        "_blank",
                        "noopener,noreferrer",
                      );
                    }
                  }}
                  data-cursor
                  className="project-page-live-button"
                  style={{
                    background: project.accent,
                    border: `1.5px solid ${project.accent}`,
                  }}
                >
                  View live ↗
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Main content: TOC + body ── */}
      <div className="project-page-body">
        <div
          className={`project-page-body-grid ${hasSections ? "has-sections" : ""}`}
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
                      <div className="project-page-preview-label">
                        {preview.label}
                      </div>
                      <FigmaEmbed
                        url={preview.url}
                        title={`${project.title} — ${preview.label}`}
                      />
                      <p className="project-page-preview-caption">
                        Browse the preview above or{" "}
                        <a
                          href={preview.sourceUrl || preview.url}
                          target="_blank"
                          rel="noreferrer"
                          className="project-page-preview-link"
                          style={{ color: project.accent }}
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
      <div className="project-page-more-projects">
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
