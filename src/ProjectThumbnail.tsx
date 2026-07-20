import React, { useState, useId } from "react";
import { motion } from "framer-motion";
import { Project } from "./data";

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Liquid glass mobile frame ─────────────────────────────────────────────────
function LiquidGlassMobile({
  screenImage,
  accent,
  hovered,
}: {
  screenImage?: string;
  accent: string;
  hovered: boolean;
}) {
  return (
    <div
      style={{ position: "relative", width: 158, height: 308, flexShrink: 0 }}
    >
      {/* Multi-layer glass shell */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 40,
          zIndex: 10,
          pointerEvents: "none",
          boxShadow: [
            "0 0 0 1.5px rgba(255,255,255,0.60)",
            "0 0 0 3.5px rgba(255,255,255,0.07)",
            "inset 0 1.5px 0 rgba(255,255,255,0.75)",
            "inset 0 -1px 0 rgba(255,255,255,0.18)",
            "inset 1.5px 0 0 rgba(255,255,255,0.35)",
            "inset -1px 0 0 rgba(255,255,255,0.12)",
            "0 28px 56px rgba(0,0,0,0.5)",
            "0 8px 20px rgba(0,0,0,0.3)",
          ].join(", "),
          background:
            "linear-gradient(158deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.03) 65%, rgba(255,255,255,0.16) 100%)",
          backdropFilter: "blur(3px)",
        }}
      />

      {/* Top-left specular shimmer */}
      <div
        style={{
          position: "absolute",
          top: 4,
          left: 8,
          width: 64,
          height: 96,
          borderRadius: "50%",
          zIndex: 11,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.50) 0%, transparent 68%)",
          opacity: hovered ? 0.8 : 0.55,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Bottom accent reflection */}
      <div
        style={{
          position: "absolute",
          bottom: 9,
          left: 22,
          right: 22,
          height: 18,
          background: `linear-gradient(180deg, transparent, ${accent}35)`,
          borderRadius: "0 0 28px 28px",
          zIndex: 11,
          pointerEvents: "none",
        }}
      />

      {/* Screen */}
      <div
        style={{
          position: "absolute",
          inset: 9,
          borderRadius: 31,
          overflow: "hidden",
          background: "#111",
          zIndex: 5,
        }}
      >
        {/* Status bar */}
        <div
          style={{
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 14px 0 16px",
            background: screenImage ? "rgba(0,0,0,0.15)" : "#f8f8f8",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              fontFamily: "-apple-system,sans-serif",
              color: screenImage ? "#fff" : "#000",
            }}
          >
            9:41
          </span>
          <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
            {/* Signal dots */}
            {[1, 2, 3].map((k) => (
              <div
                key={k}
                style={{
                  width: 3,
                  height: 3 + k,
                  borderRadius: 1,
                  background: screenImage
                    ? "rgba(255,255,255,0.7)"
                    : "rgba(0,0,0,0.4)",
                  marginBottom: 0,
                }}
              />
            ))}
            <div
              style={{
                width: 14,
                height: 7,
                borderRadius: 2,
                border: `1.5px solid ${screenImage ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)"}`,
                marginLeft: 4,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 1,
                  left: 1,
                  right: 1,
                  bottom: 1,
                  borderRadius: 1,
                  background: screenImage
                    ? "rgba(255,255,255,0.75)"
                    : "rgba(0,0,0,0.45)",
                }}
              />
            </div>
          </div>
        </div>
        {screenImage ? (
          <img
            src={screenImage}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
            }}
          />
        ) : (
          <FallbackScreen accent={accent} />
        )}
      </div>

      {/* Dynamic island */}
      <div
        style={{
          position: "absolute",
          top: 15,
          left: "50%",
          transform: "translateX(-50%)",
          width: 52,
          height: 11,
          background: "#000",
          borderRadius: 10,
          zIndex: 12,
        }}
      />
    </div>
  );
}

// ─── Liquid glass desktop frame ───────────────────────────────────────────────
function LiquidGlassDesktop({
  screenImage,
  accent,
  hovered,
}: {
  screenImage?: string;
  accent: string;
  hovered: boolean;
}) {
  return (
    <div style={{ position: "relative", width: "86%", maxWidth: 400 }}>
      {/* Glass shell */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 15,
          zIndex: 10,
          pointerEvents: "none",
          boxShadow: [
            "0 0 0 1.5px rgba(255,255,255,0.55)",
            "0 0 0 3px rgba(255,255,255,0.07)",
            "inset 0 1.5px 0 rgba(255,255,255,0.70)",
            "inset 0 -1px 0 rgba(255,255,255,0.12)",
            "0 24px 48px rgba(0,0,0,0.55)",
            "0 6px 16px rgba(0,0,0,0.3)",
          ].join(", "),
          background:
            "linear-gradient(148deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 55%, rgba(255,255,255,0.12) 100%)",
          backdropFilter: "blur(3px)",
        }}
      />
      {/* Top specular bar */}
      <div
        style={{
          position: "absolute",
          top: 2,
          left: 10,
          right: 10,
          height: 28,
          borderRadius: "13px 13px 0 0",
          zIndex: 11,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.38) 0%, transparent 100%)",
          opacity: hovered ? 0.85 : 0.5,
          transition: "opacity 0.4s ease",
        }}
      />
      {/* Screen */}
      <div
        style={{
          borderRadius: 13,
          overflow: "hidden",
          background: "#111",
          aspectRatio: "16/10",
          zIndex: 5,
          position: "relative",
        }}
      >
        {/* Titlebar */}
        <div
          style={{
            height: 24,
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "0 10px",
            background: screenImage ? "rgba(0,0,0,0.28)" : "#ececec",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 2,
          }}
        >
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c, k) => (
            <div
              key={k}
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: c,
                opacity: 0.88,
              }}
            />
          ))}
        </div>
        {screenImage ? (
          <img
            src={screenImage}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
              paddingTop: 24,
            }}
          />
        ) : (
          <FallbackScreen accent={accent} desktop />
        )}
      </div>
    </div>
  );
}

// ─── Liquid glass tablet frame ────────────────────────────────────────────────
function LiquidGlassTablet({
  screenImage,
  accent,
  hovered,
}: {
  screenImage?: string;
  accent: string;
  hovered: boolean;
}) {
  return (
    <div style={{ position: "relative", width: "75%", maxWidth: 340 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 20,
          zIndex: 10,
          pointerEvents: "none",
          boxShadow: [
            "0 0 0 1.5px rgba(255,255,255,0.52)",
            "0 0 0 3px rgba(255,255,255,0.07)",
            "inset 0 1.5px 0 rgba(255,255,255,0.68)",
            "inset 0 -1px 0 rgba(255,255,255,0.14)",
            "0 24px 48px rgba(0,0,0,0.52)",
          ].join(", "),
          background:
            "linear-gradient(148deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.04) 55%, rgba(255,255,255,0.10) 100%)",
          backdropFilter: "blur(3px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 2,
          left: 10,
          right: 10,
          height: 26,
          borderRadius: "18px 18px 0 0",
          zIndex: 11,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)",
          opacity: hovered ? 0.8 : 0.45,
          transition: "opacity 0.4s ease",
        }}
      />
      <div
        style={{
          borderRadius: 18,
          overflow: "hidden",
          background: "#111",
          aspectRatio: "4/3",
          zIndex: 5,
          position: "relative",
        }}
      >
        <div
          style={{
            height: 22,
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "0 10px",
            background: screenImage ? "rgba(0,0,0,0.25)" : "#e8e8e8",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 2,
          }}
        >
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c, k) => (
            <div
              key={k}
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: c,
                opacity: 0.88,
              }}
            />
          ))}
        </div>
        {screenImage ? (
          <img
            src={screenImage}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
              paddingTop: 22,
            }}
          />
        ) : (
          <FallbackScreen accent={accent} desktop />
        )}
      </div>
    </div>
  );
}

// ─── Fallback procedural screen ───────────────────────────────────────────────
function FallbackScreen({
  accent,
  desktop,
}: {
  accent: string;
  desktop?: boolean;
}) {
  return (
    <div
      style={{
        padding: desktop ? "34px 12px 10px" : "32px 10px 10px",
        background: "#fff",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "48%",
          height: desktop ? 7 : 6,
          background: accent,
          borderRadius: 4,
          marginBottom: 8,
        }}
      />
      <div
        style={{
          width: "78%",
          height: 4,
          background: "#0001",
          borderRadius: 3,
          marginBottom: 4,
        }}
      />
      <div
        style={{
          width: "62%",
          height: 4,
          background: "#0001",
          borderRadius: 3,
          marginBottom: 14,
        }}
      />
      <div
        style={{
          height: desktop ? 52 : 68,
          background: accent + "22",
          borderRadius: 10,
          marginBottom: 10,
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: desktop ? "1fr 1fr 1fr" : "1fr 1fr",
          gap: 6,
        }}
      >
        {Array.from({ length: desktop ? 6 : 4 }, (_, k) => (
          <div
            key={k}
            style={{
              height: desktop ? 36 : 48,
              background: "#0000000B",
              borderRadius: 8,
            }}
          />
        ))}
      </div>
      <div
        style={{
          marginTop: 8,
          height: 24,
          background: accent + "14",
          borderRadius: 6,
        }}
      />
    </div>
  );
}

// ─── Cinematic background ─────────────────────────────────────────────────────
function CinematicBg({
  project,
  hovered,
  noiseId,
}: {
  project: Project;
  hovered: boolean;
  noiseId: string;
}) {
  if (project.bgImage) {
    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <img
          src={project.bgImage}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
        {/* light vignette so info bar stays legible */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.55) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    );
  }
  const [c1, c2, c3] = project.cinematicColors ?? [
    project.bg,
    project.bg,
    project.accent + "55",
  ];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(138deg, ${c1} 0%, ${c2} 52%, ${c3} 100%)`,
        }}
      />
      {/* Primary orb — top right */}
      <motion.div
        animate={
          hovered ? { scale: 1.18, opacity: 0.72 } : { scale: 1, opacity: 0.42 }
        }
        transition={{ duration: 0.85, ease: easeOut }}
        style={{
          position: "absolute",
          top: "-35%",
          right: "-22%",
          width: "75%",
          height: "85%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${project.accent}75 0%, transparent 68%)`,
          filter: "blur(22px)",
        }}
      />
      {/* Secondary orb — bottom left */}
      <motion.div
        animate={
          hovered ? { scale: 1.12, opacity: 0.52 } : { scale: 1, opacity: 0.28 }
        }
        transition={{ duration: 0.85, ease: easeOut, delay: 0.06 }}
        style={{
          position: "absolute",
          bottom: "-22%",
          left: "-18%",
          width: "60%",
          height: "65%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${project.accent}48 0%, transparent 70%)`,
          filter: "blur(28px)",
        }}
      />
      {/* Subtle mid orb */}
      <motion.div
        animate={hovered ? { opacity: 0.35 } : { opacity: 0.12 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute",
          top: "40%",
          left: "30%",
          width: "45%",
          height: "45%",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)`,
          filter: "blur(18px)",
        }}
      />
      {/* Noise */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.22,
          mixBlendMode: "soft-light",
          pointerEvents: "none",
        }}
      >
        <filter id={noiseId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.70"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${noiseId})`} />
      </svg>
      {/* Lens flare */}
      <motion.div
        animate={
          hovered
            ? { opacity: 0.6, scaleX: 1.25 }
            : { opacity: 0.22, scaleX: 1 }
        }
        transition={{ duration: 0.55 }}
        style={{
          position: "absolute",
          top: "10%",
          left: "15%",
          right: "15%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)",
          filter: "blur(1.5px)",
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 38%, rgba(0,0,0,0.42) 100%)",
        }}
      />
      {/* Bottom scrim */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "48%",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.60) 100%)",
        }}
      />
    </div>
  );
}

// ─── Full ProjectThumbnail card ───────────────────────────────────────────────
export function ProjectThumbnail({
  project,
  height = 360,
  onClick,
}: {
  project: Project;
  height?: number;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const uid = useId().replace(/:/g, "");
  const noiseId = `noise-${uid}`;
  const isMobile = project.mockup === "mobile";
  const isTablet = project.mockup === "tablet";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      data-cursor
      style={{
        position: "relative",
        borderRadius: 22,
        overflow: "hidden",
        height,
        cursor: onClick ? "pointer" : "default",
        boxShadow: hovered
          ? "0 0 0 1px rgba(255,255,255,0.16), 0 28px 56px rgba(0,0,0,0.52)"
          : "0 0 0 1px rgba(255,255,255,0.09), 0 12px 32px rgba(0,0,0,0.32)",
        transition: "box-shadow 0.4s ease",
      }}
    >
      <CinematicBg project={project} hovered={hovered} noiseId={noiseId} />

      {/* Device mockup — floats above the bg */}
      <motion.div
        animate={hovered ? { y: -10, scale: 1.04 } : { y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: easeOut }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: isMobile ? 64 : 56,
          paddingTop: isMobile ? 12 : 8,
        }}
      >
        {project.mockupImage ? (
          <img
            src={project.mockupImage}
            alt={project.title}
            style={{
              maxHeight: "82%",
              maxWidth: "78%",
              objectFit: "contain",
              display: "block",
              filter:
                "drop-shadow(0 24px 48px rgba(0,0,0,0.45)) drop-shadow(0 8px 16px rgba(0,0,0,0.3))",
            }}
          />
        ) : isMobile ? (
          <LiquidGlassMobile
            screenImage={project.screenImage}
            accent={project.accent}
            hovered={hovered}
          />
        ) : isTablet ? (
          <LiquidGlassTablet
            screenImage={project.screenImage}
            accent={project.accent}
            hovered={hovered}
          />
        ) : (
          <LiquidGlassDesktop
            screenImage={project.screenImage}
            accent={project.accent}
            hovered={hovered}
          />
        )}
      </motion.div>

      {/* Accent strip on hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.38, ease: easeOut }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent 0%, ${project.accent} 40%, ${project.accent} 60%, transparent 100%)`,
          transformOrigin: "center",
          zIndex: 11,
        }}
      />
    </div>
  );
}
