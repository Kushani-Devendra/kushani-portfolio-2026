import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Data ──────────────────────────────────────────────────────────────────────

const CLIENTS = [
  "Commercial Bank of Ceylon PLC",
  "Orysys Ltd",
  "Virtusa (Pvt) Ltd",
  "Kapuli",
  "Detours Travel",
  "Neo Creative",
  "A Taste of Heaven",
  "Subee Clothing",
  "Salon Zero",
  "Aussie Life Education",
  "VIP Travels",
  "ESP Academy",
];

const experienceEntries = [
  {
    title: "UI/UX Engineer",
    period: "Dec 2023 – Present",
    company: "Orysys Ltd",
    subtitle:
      "Subsidiary of Commercial Bank of Ceylon PLC · Colombo, Sri Lanka",
    summary:
      "I lead interface design and frontend development for enterprise banking products, focusing on everything from Figma design systems and WCAG-compliant UI to production-ready React components across trading platforms, mobile banking, and internal portals.",
    projects: [
      {
        name: "ComBank Prestige Website",
        period: "Jul 2026 – Present",
        desc: "Rebrand the ComBank Elite website to capture high-end clients, crafting an elevated look and feel aligned with the premium brand positioning.",
      },
      {
        name: "Library Management System",
        period: "Jun 2026 – Present",
        desc: "Partnered with BAs and stakeholders to map end-to-end user journeys and redesign legacy screens in Figma. Implemented WCAG 2.1 AA standards, a scalable component-based design system, and improved overall usability.",
      },
      {
        name: "IVIG Internal Portal",
        period: "Mar 2026 – May 2026",
        desc: "Translated complex business requirements into user journey diagrams and high-fidelity wireframes. Prototyped the frontend using Next.js, TypeScript, Shadcn, and Tailwind CSS with REST API integrations via the Fetch API.",
      },
      {
        name: "Treasury Forex Trading Portal",
        period: "May 2025 – Feb 2026",
        desc: "Designed 200+ screens including trading interfaces, portfolio dashboards, and transaction workflows. Built a Figma design system with 20+ reusable components. Implemented WCAG 2.1 AA, custom keyboard navigation for power users, and data visualisation components. Translated designs into production-ready React, TypeScript, and SCSS.",
      },
      {
        name: "E-Statement Portal",
        period: "Jan 2025 – Apr 2025",
        desc: "Redesigned 100+ legacy screens replacing vendor UI with brand-aligned components. Collaborated with the Tech Lead to build a React component library using TypeScript, Tailwind CSS, and Storybook. Mentored an Associate UI/UX Engineer and applied responsive design across all breakpoints.",
      },
      {
        name: "OneApp (Mobile Banking)",
        period: "Jun 2024 – Dec 2024",
        desc: "Conducted user research with the CTO and product owner. Designed 200+ screens across 20+ core banking features. Contributed to frontend development using React Native, TypeScript, Redux, and Axios. Mentored a UI/UX intern.",
      },
      {
        name: "ComBank RemitPlus — Revamp",
        period: "Dec 2023 – Feb 2024",
        desc: "Redesigned the remittance service UI serving 30,000+ users. Developed with Angular 16, TypeScript, SCSS, Material UI, and Bootstrap. Product documentation contributed to winning the Payments Solution Award at the Asian Banking & Finance Awards 2024.",
        award:
          "🏆 Payments Solution Award · Asian Banking & Finance Awards 2024",
      },
    ],
  },
  {
    title: "Associate Engineer — Technology (UI)",
    period: "Jun 2022 – Nov 2023",
    company: "Virtusa (Pvt) Ltd",
    subtitle: "Colombo, Sri Lanka",
    summary:
      "Built web applications for enterprise clients across SRE tooling and e-learning, using Angular, React, Redux, and Material UI with Figma for design work.",
    projects: [
      {
        name: "InsightLive: Site Reliability Engineering System",
        period: "Aug – Nov 2023",
        desc: "Gathered requirements directly from client meetings. Built the application layout with Angular and JavaScript, developed a diagramming tool using Drawio for SLI/SLO use-case diagrams, and built real-time analytic charts for key SRE metrics.",
      },
      {
        name: "Learning Management System",
        period: "Feb – Jul 2023",
        desc: "Designed user journeys, wireframes, and prototypes in Figma. Implemented reusable components, routing, and custom validations using React, Redux, and Material UI. Applied responsive design and collaborated on API integration following agile practices.",
      },
    ],
  },
];

const skillCategories = [
  {
    label: "Design",
    items: [
      "User Journey Mapping",
      "Wireframing",
      "Design Systems",
      "Product Design",
      "Prototyping",
      "WCAG 2.1 Accessibility",
      "Data Visualisation",
      "Responsive Design",
    ],
  },
  {
    label: "Frontend",
    items: [
      "HTML",
      "CSS",
      "SCSS",
      "Tailwind CSS",
      "React",
      "JavaScript (ES6)",
      "TypeScript",
      "Angular",
      "Redux",
    ],
  },
  {
    label: "Tools",
    items: [
      "Figma",
      "Storybook",
      "Git",
      "Material UI",
      "Shadcn",
      "Ant Design",
      "Bootstrap",
      "Radzen",
    ],
  },
];

const education = [
  {
    degree: "BSc (Hons) in Information Systems",
    year: "2022",
    institution: "General Sir John Kotelawala Defence University",
    location: "Rathmalana, Sri Lanka",
    detail: "GPA: 3.7",
  },
  {
    degree: "GCE Advanced Level — Commerce Stream",
    year: "2018",
    institution: "Viharamahadevi Girls' School",
    location: "Kiribathgoda, Sri Lanka",
    detail: "",
  },
];

const awards = [
  {
    title: "Tier 1 UX Designer Bootcamp",
    year: "2026",
    type: "cert",
  },
  {
    title: "Payments Solution Award — Asian Banking & Finance Awards",
    year: "2024",
    type: "award",
    detail: "As part of the ComBank RemitPlus revamp team",
  },
  {
    title: "UI Designer Bootcamp",
    year: "2024",
    type: "cert",
  },
  {
    title: "AWS Partner: Accreditation (Business) — Digital",
    year: "2022",
    type: "cert",
  },
  {
    title: "AWS Partner: Cloud Economics Accreditation",
    year: "2022",
    type: "cert",
  },
];

// ─── Experience Card ───────────────────────────────────────────────────────────
function ExperienceCard({
  entry,
  index,
}: {
  entry: (typeof experienceEntries)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: easeOut }}
      style={{
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 24,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{ padding: "clamp(24px, 4vw, 28px) clamp(20px, 5vw, 32px) 0" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 8,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#C8B89A",
                marginBottom: 6,
              }}
            >
              {entry.title}
            </div>
            <div
              style={{
                fontFamily: "Instrument Serif, serif",
                fontSize: "clamp(20px, 2.5vw, 28px)",
                letterSpacing: "-0.03em",
                color: "#2E2C29",
                lineHeight: 1.1,
                marginBottom: 4,
              }}
            >
              {entry.company}
            </div>
            <div
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: 13,
                color: "#9FA0A3",
                letterSpacing: "-0.01em",
              }}
            >
              {entry.subtitle}
            </div>
          </div>
          <span
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontSize: 13,
              color: "#B0AFAD",
              flexShrink: 0,
              paddingTop: 2,
              background: "#F5F4F0",
              padding: "5px 14px",
              borderRadius: 99,
            }}
          >
            {entry.period}
          </span>
        </div>

        <p
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontSize: 15,
            lineHeight: 1.75,
            color: "#5C5A56",
            margin: "16px 0 0",
          }}
        >
          {entry.summary}
        </p>
      </div>

      {/* Projects accordion */}
      <div style={{ padding: "20px clamp(20px, 5vw, 32px) 28px" }}>
        <button
          onClick={() => setExpanded(!expanded)}
          data-cursor
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            padding: "0",
            cursor: "pointer",
            fontFamily: "Instrument Sans, sans-serif",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#9FA0A3",
            marginBottom: expanded ? 20 : 0,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#2E2C29")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9FA0A3")}
        >
          <motion.span
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.22 }}
            style={{ display: "inline-block" }}
          >
            →
          </motion.span>
          {expanded ? "Hide" : "Show"} {entry.projects.length} projects
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            {entry.projects.map((proj, pi) => (
              <motion.div
                key={proj.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: pi * 0.05 }}
                style={{
                  padding: "clamp(14px, 3vw, 18px) clamp(16px, 3vw, 20px)",
                  background: "#FAF9F6",
                  borderRadius: 14,
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 12,
                    marginBottom: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Instrument Sans, sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      color: "#2E2C29",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {proj.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "Instrument Sans, sans-serif",
                      fontSize: 12,
                      color: "#B0AFAD",
                      flexShrink: 0,
                    }}
                  >
                    {proj.period}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "Instrument Sans, sans-serif",
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "#6F6A64",
                    margin: 0,
                  }}
                >
                  {proj.desc}
                </p>
                {"award" in proj && proj.award && (
                  <div
                    style={{
                      marginTop: 10,
                      fontFamily: "Instrument Sans, sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#C8B89A",
                      background: "rgba(200,184,154,0.12)",
                      borderRadius: 8,
                      padding: "6px 12px",
                      display: "inline-block",
                    }}
                  >
                    {proj.award}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.article>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function ExperiencePage() {
  return (
    <div
      style={{ minHeight: "100vh", background: "#FAF9F6", color: "#2E2C29" }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          // Clamped padding naturally shrinks for mobile devices
          padding: "clamp(60px, 10vw, 120px) clamp(16px, 5vw, 32px) 80px",
        }}
      >
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 40,
          }}
        >
          <a
            href="/"
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontSize: 13,
              color: "#9FA0A3",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#2E2C29")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9FA0A3")}
          >
            Home
          </a>
          <span style={{ color: "#C4C5C7" }}>/</span>
          <span
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontSize: 13,
              color: "#2E2C29",
            }}
          >
            Experience
          </span>
        </div>

        {/* ── Hero cards: intro + strengths ── */}
        <div
          style={{
            display: "flex", // Replaced rigid CSS grid with responsive flex wrap
            flexWrap: "wrap",
            gap: 20,
            marginBottom: 24,
          }}
        >
          {/* Intro */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOut }}
            style={{
              flex: "1.3 1 min(100%, 450px)", // Allows it to shrink to 100% on small screens
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 24,
              padding:
                "clamp(24px, 4vw, 36px) clamp(24px, 4vw, 36px) clamp(32px, 5vw, 42px)",
            }}
          >
            <div
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#9FA0A3",
                marginBottom: 12,
              }}
            >
              Overview
            </div>
            <h1
              style={{
                fontFamily: "Instrument Serif, serif",
                fontSize: "clamp(28px, 3.6vw, 48px)",
                lineHeight: 1.05,
                margin: "0 0 16px",
                letterSpacing: "-0.03em",
                color: "#2E2C29",
              }}
            >
              UI/UX Engineer bridging design and code for 4+ years.
            </h1>
            <p
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: 16,
                lineHeight: 1.75,
                color: "#5C5A56",
                margin: 0,
              }}
            >
              I am based in Ganemulla, Sri Lanka. I work at the intersection of
              product thinking, visual design, and frontend engineering,
              building enterprise banking and fintech products that feel calm,
              accessible, and purposeful.
            </p>

            {/* Quick stats */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap", // Added flex wrap for safety
                gap: "clamp(16px, 4vw, 32px)",
                marginTop: 28,
                paddingTop: 24,
                borderTop: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {[
                { value: "4+", label: "Years experience" },
                { value: "15+", label: "Products designed" },
                { value: "10+", label: "Clients" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: "Instrument Serif, serif",
                      fontSize: 36,
                      letterSpacing: "-0.04em",
                      color: "#2E2C29",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "Instrument Sans, sans-serif",
                      fontSize: 12,
                      color: "#9FA0A3",
                      marginTop: 4,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Clients */}
            <div
              style={{
                marginTop: 32,
                paddingTop: 24,
                borderTop: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#9FA0A3",
                  marginBottom: 16,
                }}
              >
                Selected Companies & Clients
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {CLIENTS.map((client) => (
                  <span
                    key={client}
                    style={{
                      fontFamily: "Instrument Sans, sans-serif",
                      fontSize: 13,
                      color: "#5C5A56",
                      background: "#F5F4F0",
                      padding: "6px 14px",
                      borderRadius: 99,
                    }}
                  >
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Skills summary */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: easeOut }}
            style={{
              flex: "0.7 1 min(100%, 300px)", // Keeps aspect ratio but forces 100% stack on mobile
              background: "#2E2C29",
              color: "#fff",
              borderRadius: 24,
              padding: "clamp(24px, 4vw, 32px) clamp(20px, 4vw, 28px)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {skillCategories.map((cat) => (
              <div key={cat.label}>
                <div
                  style={{
                    fontFamily: "Instrument Sans, sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    opacity: 0.5,
                    marginBottom: 8,
                  }}
                >
                  {cat.label}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {cat.items.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: "Instrument Sans, sans-serif",
                        fontSize: 12,
                        color: "rgba(255,255,255,0.85)",
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: 99,
                        padding: "4px 10px",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.section>
        </div>

        {/* ── Experience entries ── */}
        <div
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#9FA0A3",
            marginBottom: 16,
          }}
        >
          Professional Experience
        </div>
        <section style={{ display: "grid", gap: 16, marginBottom: 32 }}>
          {experienceEntries.map((entry, i) => (
            <ExperienceCard key={entry.company} entry={entry} index={i} />
          ))}
        </section>

        {/* ── Education + Awards row ── */}
        <div
          style={{
            display: "grid",
            // Responsive auto-fit Grid ensures 1 column on small screens and 2 on large screens
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 350px), 1fr))",
            gap: 20,
          }}
        >
          {/* Education */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: easeOut }}
            style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 24,
              padding: "clamp(24px, 4vw, 28px) clamp(24px, 4vw, 28px) 32px",
            }}
          >
            <div
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#9FA0A3",
                marginBottom: 20,
              }}
            >
              Education
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {education.map((edu) => (
                <div
                  key={edu.degree}
                  style={{
                    paddingBottom: 20,
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 12,
                      marginBottom: 6,
                      flexWrap: "wrap", // Added flex wrap
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Instrument Serif, serif",
                        fontSize: 18,
                        letterSpacing: "-0.02em",
                        color: "#2E2C29",
                        lineHeight: 1.2,
                      }}
                    >
                      {edu.degree}
                    </div>
                    <span
                      style={{
                        fontFamily: "Instrument Sans, sans-serif",
                        fontSize: 13,
                        color: "#B0AFAD",
                        flexShrink: 0,
                      }}
                    >
                      {edu.year}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "Instrument Sans, sans-serif",
                      fontSize: 13,
                      color: "#9FA0A3",
                    }}
                  >
                    {edu.institution} · {edu.location}
                  </div>
                  {edu.detail && (
                    <div
                      style={{
                        fontFamily: "Instrument Sans, sans-serif",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#C8B89A",
                        marginTop: 4,
                      }}
                    >
                      {edu.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Awards & Certifications */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: easeOut }}
            style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 24,
              padding: "clamp(24px, 4vw, 28px) clamp(24px, 4vw, 28px) 32px",
            }}
          >
            <div
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#9FA0A3",
                marginBottom: 20,
              }}
            >
              Awards & Certifications
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {awards.map((item, i) => (
                <div
                  key={item.title}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "14px 0",
                    borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>
                    {item.type === "award" ? "🏆" : "✦"}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "Instrument Sans, sans-serif",
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#2E2C29",
                        lineHeight: 1.4,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {item.title}
                    </div>
                    {item.detail && (
                      <div
                        style={{
                          fontFamily: "Instrument Sans, sans-serif",
                          fontSize: 12,
                          color: "#9FA0A3",
                          marginTop: 2,
                        }}
                      >
                        {item.detail}
                      </div>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "Instrument Sans, sans-serif",
                      fontSize: 12,
                      color: "#C4C5C7",
                      flexShrink: 0,
                    }}
                  >
                    {item.year}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
