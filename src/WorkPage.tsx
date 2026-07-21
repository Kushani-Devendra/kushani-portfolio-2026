import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ALL_PROJECTS, CATEGORIES, Project } from "./data";
import { ProjectThumbnail } from "./ProjectThumbnail";
import Footer from "./Footer";

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Category pill ────────────────────────────────────────────────────────────
function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      data-cursor
      style={{
        fontFamily: "Instrument Sans, sans-serif",
        fontWeight: active ? 600 : 400,
        fontSize: 14,
        padding: "8px 20px",
        borderRadius: 99,
        border: "1.5px solid",
        borderColor: active ? "#2E2C29" : "rgba(0,0,0,0.12)",
        background: active ? "#2E2C29" : "transparent",
        color: active ? "#fff" : "#2E2C29",
        cursor: "pointer",
        transition: "all 0.2s",
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#2E2C29";
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(0,0,0,0.04)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "rgba(0,0,0,0.12)";
          (e.currentTarget as HTMLButtonElement).style.background =
            "transparent";
        }
      }}
    >
      {label}
    </button>
  );
}

// ─── Work card ────────────────────────────────────────────────────────────────
function WorkCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const hasCover = !!(project.thumbImage || project.bgImage);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.07, ease: easeOut }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/work/${project.id}`)}
      data-cursor
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: 20,
          overflow: "hidden",
          height: 280,
          background: project.bg,
          boxShadow: hovered
            ? "0 26px 60px rgba(0,0,0,0.16)"
            : "0 8px 24px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.3s ease",
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
            <ProjectThumbnail project={project} height={280} />
          </motion.div>
        )}

        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25, ease: easeOut }}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.06)",
            pointerEvents: "none",
          }}
        />

      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "Instrument Serif, serif",
              fontSize: 22,
              letterSpacing: "-0.03em",
              color: "#2E2C29",
              lineHeight: 1.2,
              marginBottom: 6,
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
        <span
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontSize: 12,
            color: "#B0AFAD",
            flexShrink: 0,
            paddingTop: 4,
            letterSpacing: "0.01em",
          }}
        >
          {project.year}
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontSize: 11,
              color: "#6F6A64",
              background: "rgba(0,0,0,0.04)",
              padding: "5px 10px",
              borderRadius: 999,
              letterSpacing: "-0.01em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── List row view ────────────────────────────────────────────────────────────
function WorkRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: easeOut }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/work/${project.id}`)}
      data-cursor
      style={{
        display: "flex",
        alignItems: "center",
        padding: "20px 0",
        borderTop: "1px solid rgba(0,0,0,0.07)",
        cursor: "pointer",
        gap: 20,
      }}
    >
      {/* Color swatch */}
      <motion.div
        animate={{ scale: hovered ? 1.15 : 1 }}
        transition={{ duration: 0.25 }}
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          flexShrink: 0,
          background: project.bg,
          border: `2px solid ${project.accent}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: project.accent,
            opacity: 0.85,
          }}
        />
      </motion.div>

      {/* Title */}
      <div style={{ flex: 1 }}>
        <span
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 600,
            fontSize: 17,
            letterSpacing: "-0.03em",
            color: "#2E2C29",
            transition: "color 0.2s",
          }}
        >
          {project.title}
        </span>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontSize: 12,
              color: "#9FA0A3",
              background: "rgba(0,0,0,0.04)",
              padding: "4px 10px",
              borderRadius: 99,
              letterSpacing: "-0.01em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Category */}
      <span
        style={{
          fontFamily: "Instrument Sans, sans-serif",
          fontSize: 13,
          color: "#9FA0A3",
          width: 130,
          textAlign: "right",
          flexShrink: 0,
          letterSpacing: "-0.01em",
        }}
      >
        {project.category}
      </span>

      {/* Year */}
      <span
        style={{
          fontFamily: "Instrument Sans, sans-serif",
          fontSize: 13,
          color: "#C4C5C7",
          width: 40,
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        {project.year}
      </span>

      {/* Arrow */}
      <motion.span
        animate={{ x: hovered ? 0 : -6, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22 }}
        style={{
          fontSize: 16,
          color: "#2E2C29",
          flexShrink: 0,
          width: 20,
          textAlign: "center",
        }}
      >
        ↗
      </motion.span>
    </motion.div>
  );
}

// ─── Main Work Page ───────────────────────────────────────────────────────────
export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered =
    activeCategory === "All"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {/* Page header */}
      <div
        style={{
          paddingTop: 130,
          paddingBottom: 56,
          paddingLeft: 64,
          paddingRight: 64,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 28,
            }}
          >
            <Link
              to="/"
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: 13,
                color: "#9FA0A3",
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#2E2C29")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9FA0A3")}
            >
              Home
            </Link>
            <span style={{ color: "#C4C5C7", fontSize: 13 }}>/</span>
            <span
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: 13,
                color: "#2E2C29",
              }}
            >
              Work
            </span>
          </div>

          {/* Title row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 24,
              marginBottom: 40,
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "Instrument Serif, serif",
                  fontWeight: 400,
                  fontSize: "clamp(48px, 6vw, 80px)",
                  letterSpacing: "-0.04em",
                  color: "#2E2C29",
                  lineHeight: 1,
                  marginBottom: 14,
                }}
              >
                All Work
              </h1>
              <p
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: 300,
                  fontSize: 17,
                  color: "#9FA0A3",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.5,
                  maxWidth: 480,
                }}
              >
                {ALL_PROJECTS.length} projects across design systems, web,
                mobile, and branding.
              </p>
            </div>

            {/* View toggle */}
            <div
              style={{
                display: "flex",
                gap: 4,
                padding: 4,
                background: "rgba(0,0,0,0.05)",
                borderRadius: 12,
                flexShrink: 0,
              }}
            >
              {(["grid", "list"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  data-cursor
                  style={{
                    padding: "7px 14px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                    background: viewMode === mode ? "#fff" : "transparent",
                    boxShadow:
                      viewMode === mode ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: viewMode === mode ? "#2E2C29" : "#9FA0A3",
                    fontFamily: "Instrument Sans, sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {mode === "grid" ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect
                        x="1"
                        y="1"
                        width="5"
                        height="5"
                        rx="1.5"
                        fill="currentColor"
                      />
                      <rect
                        x="8"
                        y="1"
                        width="5"
                        height="5"
                        rx="1.5"
                        fill="currentColor"
                      />
                      <rect
                        x="1"
                        y="8"
                        width="5"
                        height="5"
                        rx="1.5"
                        fill="currentColor"
                      />
                      <rect
                        x="8"
                        y="8"
                        width="5"
                        height="5"
                        rx="1.5"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect
                        x="1"
                        y="2"
                        width="12"
                        height="2"
                        rx="1"
                        fill="currentColor"
                      />
                      <rect
                        x="1"
                        y="6"
                        width="12"
                        height="2"
                        rx="1"
                        fill="currentColor"
                      />
                      <rect
                        x="1"
                        y="10"
                        width="12"
                        height="2"
                        rx="1"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Filter pills */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
              <FilterPill
                key={cat}
                label={cat === "All" ? `All (${ALL_PROJECTS.length})` : cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div
        style={{ height: 1, background: "rgba(0,0,0,0.07)", margin: "0 64px" }}
      />

      {/* Project count line */}
      <motion.div
        layout
        style={{
          padding: "16px 64px",
          fontFamily: "Instrument Sans, sans-serif",
          fontSize: 13,
          color: "#9FA0A3",
          letterSpacing: "-0.01em",
        }}
      >
        Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
      </motion.div>

      {/* Content */}
      <div style={{ padding: "0 64px 100px" }}>
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="work-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
              }}
            >
              <AnimatePresence>
                {filtered.map((project, i) => (
                  <WorkCard key={project.id} project={project} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* List header */}
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  padding: "0 0 12px",
                  borderBottom: "1px solid rgba(0,0,0,0.07)",
                  fontFamily: "Instrument Sans, sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#C4C5C7",
                }}
              >
                <div style={{ width: 44, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>Project</div>
                <div>Tags</div>
                <div style={{ width: 130, textAlign: "right" }}>Category</div>
                <div style={{ width: 40, textAlign: "right" }}>Year</div>
                <div style={{ width: 20 }} />
              </div>
              <AnimatePresence>
                {filtered.map((project, i) => (
                  <WorkRow key={project.id} project={project} index={i} />
                ))}
              </AnimatePresence>
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
