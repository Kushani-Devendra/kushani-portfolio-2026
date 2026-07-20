import React from "react";

const experienceEntries = [
  {
    title: "UI/UX Engineer",
    period: "2023 – Present",
    company: "Commercial Bank of Ceylon PLC",
    summary:
      "Leading interface design and product thinking for digital banking products, turning complex services into clear, trustworthy journeys with strong design systems behind them.",
  },
  {
    title: "Product Designer",
    period: "2025 – Present",
    company: "NimiDev / Kapuli",
    summary:
      "Designed a travel discovery product with a mobile-first structure, reusable UI patterns, and a polished handoff path for product and engineering teams.",
  },
  {
    title: "Freelance Product Designer",
    period: "2024 – 2025",
    company: "Independent clients",
    summary:
      "Partnered with founders and teams across hospitality, retail, and creative industries to shape websites, mobile concepts, and brand-led digital products with a focus on usability and clarity.",
  },
];

const strengths = [
  "Product thinking and UX strategy",
  "Design systems and scalable UI foundations",
  "Responsive web and mobile interface design",
  "Figma prototyping and clear design handoff",
  "Cross-functional collaboration with product and engineering teams",
];

const selectedClients = [
  "Commercial Bank of Ceylon",
  "NimiDev",
  "Kapuli",
  "Neo Creative",
  "A Taste of Heaven",
  "Subee Clothing",
];

export default function ExperiencePage() {
  return (
    <div
      style={{ minHeight: "100vh", background: "#FAF9F6", color: "#2E2C29" }}
    >
      <div
        style={{ maxWidth: 1100, margin: "0 auto", padding: "120px 32px 80px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 28,
          }}
        >
          <a
            href="/"
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontSize: 13,
              color: "#9FA0A3",
              textDecoration: "none",
            }}
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
            Overview
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gap: 24,
            gridTemplateColumns: "1.2fr 0.8fr",
          }}
        >
          <section
            style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 24,
              padding: "36px 36px 42px",
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
              Experience
            </div>
            <h1
              style={{
                fontFamily: "Instrument Serif, serif",
                fontSize: "clamp(36px, 4.4vw, 56px)",
                lineHeight: 1.02,
                margin: "0 0 16px",
                letterSpacing: "-0.03em",
              }}
            >
              Designing clear digital products for product teams and clients.
            </h1>
            <p
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: 18,
                lineHeight: 1.75,
                color: "#5C5A56",
                margin: 0,
              }}
            >
              I work at the intersection of product thinking, visual design, and
              thoughtful interface systems — shaping products that feel calm,
              useful, and easy to use from first touch to final action.
            </p>
          </section>

          <section
            style={{
              background: "#2E2C29",
              color: "#fff",
              borderRadius: 24,
              padding: "32px 30px",
            }}
          >
            <div
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                opacity: 0.72,
                marginBottom: 12,
              }}
            >
              Core strengths
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {strengths.map((strength) => (
                <div
                  key={strength}
                  style={{
                    fontFamily: "Instrument Sans, sans-serif",
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  • {strength}
                </div>
              ))}
            </div>
          </section>
        </div>

        <section style={{ marginTop: 28, display: "grid", gap: 18 }}>
          {experienceEntries.map((entry) => (
            <article
              key={entry.title}
              style={{
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.06)",
                borderRadius: 20,
                padding: "24px 28px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  flexWrap: "wrap",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: "Instrument Sans, sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#C8B89A",
                  }}
                >
                  {entry.title}
                </div>
                <div
                  style={{
                    fontFamily: "Instrument Sans, sans-serif",
                    fontSize: 13,
                    color: "#9FA0A3",
                  }}
                >
                  {entry.period}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "Instrument Serif, serif",
                  fontSize: 24,
                  letterSpacing: "-0.03em",
                  marginBottom: 8,
                }}
              >
                {entry.company}
              </div>
              <p
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: "#5C5A56",
                  margin: 0,
                }}
              >
                {entry.summary}
              </p>
            </article>
          ))}
        </section>

        <section
          style={{
            marginTop: 28,
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: 24,
            padding: "30px 32px",
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
            Selected clients
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {selectedClients.map((client) => (
              <span
                key={client}
                style={{
                  padding: "8px 12px",
                  borderRadius: 999,
                  background: "#F4F1EC",
                  fontFamily: "Instrument Sans, sans-serif",
                  fontSize: 14,
                  color: "#2E2C29",
                }}
              >
                {client}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
