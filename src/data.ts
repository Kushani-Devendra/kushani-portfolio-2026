export interface Credit {
  role: string;
  name: string;
  url?: string;
}

export interface FigmaLink {
  label: string;
  url: string;
  sourceUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  tags: string[];
  category: string;
  bg: string;
  accent: string;
  mockup: "mobile" | "tablet" | "desktop";
  year: string;
  featured?: boolean;
  screenImage?: string;
  cinematicColors?: [string, string, string];
  bgImage?: string;
  mockupImage?: string;
  thumbImage?: string;
  brief?: string;
  client?: string;
  duration?: string;
  role?: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  credits?: Credit[];
  tools?: string[];
  liveUrl?: string;
  figmaUrl?: string;
  figmaLinks?: FigmaLink[];
  sections?: CaseSection[];
}

export interface CaseSection {
  id: string;
  label: string;
  heading: string;
  body?: string;
  subsections?: { heading: string; body: string }[];
}

const toEmbedUrl = (url: string) => {
  if (url.includes("/embed?")) {
    return url;
  }
  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
};

export const ALL_PROJECTS: Project[] = [
  {
    id: "kapuli-mobile-app",
    title: "Kapuli Mobile App",
    brief:
      "An offline-first travel journaling app designed for guides and tour operators to document experiences and recognize wildlife.",
    tags: ["Branding", "Design System", "Mobile Design"],
    category: "Mobile App",
    bg: "#1D1B18",
    accent: "#C8B89A",
    mockup: "mobile",
    year: "2026",
    featured: true,
    client: "NimiDev",
    duration: "5 months",
    role: "Branding · Design System · Wireframing · Mobile Design · Prototyping",
    overview:
      "Kapuli is a mobile app built for tour operators, guides, wildlife experiences, and outdoor journeys. It helps users capture travel experiences, create interactive journals, recognize wildlife, and document stories seamlessly—even in remote locations with limited connectivity. Designed with an offline-first experience, Kapuli combines storytelling, AI-powered recognition, and collaborative travel documentation into one connected platform.",
    challenge:
      "Travel logging and reporting in remote areas with limited cellular connectivity are often disjointed. The interface needed to remain simple, intuitive, and fully functional offline, accommodating large image uploads and AI operations without causing friction.",
    solution:
      "I designed a streamlined journaling interface featuring offline state indicators, locally cached draft states, and a robust offline-first user journey. The design system features specialized components for AI wildlife scan workflows, interactive map pins, and collaborative journal sharing.",
    outcome:
      "The project was delivered as a polished Figma system with reusable components and a clear handoff path for product development.",
    tools: ["Figma"],
    liveUrl: "https://www.kapuli.ai/",
    thumbImage: "/travel-planner-thumb.png",
    figmaLinks: [
      {
        label: "Mobile app",
        url: toEmbedUrl(
          "https://www.figma.com/design/R4QLVuC7KSqZlzkuHAng5Y/Kapuli--Public-?node-id=247-22044&t=PI5r2cisQYxXjGtt-1",
        ),
        sourceUrl:
          "https://www.figma.com/design/R4QLVuC7KSqZlzkuHAng5Y/Kapuli--Public-?node-id=247-22044&t=PI5r2cisQYxXjGtt-1",
      },
      {
        label: "Operator website",
        url: toEmbedUrl(
          "https://www.figma.com/design/R4QLVuC7KSqZlzkuHAng5Y/Kapuli--Public-?node-id=2216-24301&t=PI5r2cisQYxXjGtt-1",
        ),
        sourceUrl:
          "https://www.figma.com/design/R4QLVuC7KSqZlzkuHAng5Y/Kapuli--Public-?node-id=2216-24301&t=PI5r2cisQYxXjGtt-1",
      },
      {
        label: "Components",
        url: toEmbedUrl(
          "https://www.figma.com/design/R4QLVuC7KSqZlzkuHAng5Y/Kapuli--Public-?node-id=585-2947&t=PI5r2cisQYxXjGtt-1",
        ),
        sourceUrl:
          "https://www.figma.com/design/R4QLVuC7KSqZlzkuHAng5Y/Kapuli--Public-?node-id=585-2947&t=PI5r2cisQYxXjGtt-1",
      },
      {
        label: "Style guide",
        url: toEmbedUrl(
          "https://www.figma.com/design/R4QLVuC7KSqZlzkuHAng5Y/Kapuli--Public-?node-id=191-1689&t=PI5r2cisQYxXjGtt-1",
        ),
        sourceUrl:
          "https://www.figma.com/design/R4QLVuC7KSqZlzkuHAng5Y/Kapuli--Public-?node-id=191-1689&t=PI5r2cisQYxXjGtt-1",
      },
    ],
  },
  {
    id: "library-management-system",
    title: "Library Management System",
    brief:
      "A banking-facing web application designed for streamlined library operations and clear content workflows.",
    tags: ["Branding", "Design System", "Web App Design"],
    category: "Web App",
    bg: "#0F172A",
    accent: "#3B82F6",
    mockup: "desktop",
    year: "2026",
    featured: true,
    client: "Commercial Bank of Ceylon PLC",
    duration: "1 month - ongoing",
    role: "Requirement Gathering · Branding · Design System · Web App Design",
    overview:
      "The Library Management System was a revamp designed for a complex internal workflow with a strong emphasis on clarity, structure, and maintainability.",
    challenge:
      "The challenge was to create a web app that felt calm despite handling a large amount of operational data and workflow steps.",
    solution:
      "I mapped the core user journeys and designed a structured interface with strong content hierarchy, clear states, and a reusable component layer tailored to admin-heavy use.",
    outcome:
      "The design was presented as a scalable interface system with a clean web experience that could grow with future product needs.",
    tools: ["Figma"],
    thumbImage: "/library system thumb.png",
    figmaLinks: [
      {
        label: "Web app design",
        url: toEmbedUrl(
          "https://www.figma.com/design/URG24LTvoPWww00f1UA2IJ/OLMS--Public-?node-id=1-7&t=J61dA9pvzxzMwRIW-1",
        ),
        sourceUrl:
          "https://www.figma.com/design/URG24LTvoPWww00f1UA2IJ/OLMS--Public-?node-id=1-7&t=J61dA9pvzxzMwRIW-1",
      },
      {
        label: "Components",
        url: toEmbedUrl(
          "https://www.figma.com/design/URG24LTvoPWww00f1UA2IJ/OLMS--Public-?node-id=1-3&t=VKiSdLI6Itg5SKxB-1",
        ),
        sourceUrl:
          "https://www.figma.com/design/URG24LTvoPWww00f1UA2IJ/OLMS--Public-?node-id=1-3&t=VKiSdLI6Itg5SKxB-1",
      },
      {
        label: "Style guide",
        url: toEmbedUrl(
          "https://www.figma.com/design/URG24LTvoPWww00f1UA2IJ/OLMS--Public-?node-id=1-2&t=VKiSdLI6Itg5SKxB-1",
        ),
        sourceUrl:
          "https://www.figma.com/design/URG24LTvoPWww00f1UA2IJ/OLMS--Public-?node-id=1-2&t=VKiSdLI6Itg5SKxB-1",
      },
    ],
  },
  {
    id: "prestige-banking-website",
    title: "Prestige Elite Banking Website",
    brief:
      "A polished banking website experience for highlighting premium services and product versions.",
    tags: ["Website Design", "Prototyping"],
    category: "Website",
    bg: "#111827",
    accent: "#EAB308",
    mockup: "desktop",
    year: "2026",
    featured: true,
    client: "Commercial Bank of Ceylon PLC",
    duration: "3 weeks",
    role: "Website Design, Prototyping",
    overview:
      "The Prestige Elite banking website focused on shaping a premium, trustworthy digital presence for a high-value banking audience.",
    challenge:
      "The site needed to balance a premium tone with clarity and ease of browsing across multiple versions and content blocks.",
    solution:
      "I designed a structured website experience with strong typography, content hierarchy, and flexible layout patterns that could support different service versions without losing coherence.",
    outcome:
      "The project delivered a polished Figma reference for a responsive banking website experience with a clear design direction.",
    tools: ["Figma"],
    thumbImage: "/prestige thumb.png",
    figmaLinks: [
      {
        label: "Design",
        url: toEmbedUrl(
          "https://www.figma.com/design/zYHJJ2WALpf8D7YK511XXj/Prestige-Website--Public-?node-id=249-365&t=J61dA9pvzxzMwRIW-4",
        ),
        sourceUrl:
          "https://www.figma.com/design/zYHJJ2WALpf8D7YK511XXj/Prestige-Website--Public-?node-id=249-365&t=J61dA9pvzxzMwRIW-4",
      },
      {
        label: "Versions",
        url: toEmbedUrl(
          "https://www.figma.com/design/zYHJJ2WALpf8D7YK511XXj/Prestige-Website--Public-?node-id=0-1&t=VKiSdLI6Itg5SKxB-1",
        ),
        sourceUrl:
          "https://www.figma.com/design/zYHJJ2WALpf8D7YK511XXj/Prestige-Website--Public-?node-id=0-1&t=VKiSdLI6Itg5SKxB-1",
      },
    ],
  },
  {
    id: "neo-creative",
    title: "Neo Creative",
    brief:
      "A bold brand and e-commerce experience for a print studio with an editorial feel.",
    tags: ["Branding", "E-commerce Design"],
    category: "Website",
    bg: "#241A2E",
    accent: "#BF7FE0",
    mockup: "desktop",
    year: "2025",
    featured: true,
    client: "Neo Creative",
    duration: "4 weeks",
    role: "Branding · E-commerce Design",
    overview:
      "Neo Creative needed a clean, confident digital presence that could reflect a modern print studio while supporting product discovery and enquiries.",
    challenge:
      "The site needed to feel premium and editorial without losing practicality for product browsing and quote requests.",
    solution:
      "I shaped a refined visual language with a distinctive brand system and a storytelling-driven website structure that guides visitors through the studio offering.",
    outcome:
      "The project was delivered as a complete Figma experience complete with brand direction and an e-commerce-ready website flow.",
    tools: ["Figma"],
    thumbImage: "/neo-creative-thumb.png",
    figmaLinks: [
      {
        label: "Design",
        url: toEmbedUrl(
          "https://www.figma.com/design/JFBfWLIzm55gbaHopugR5V/Neo-Creative--Public-?node-id=0-1&t=6ybrWUKex1s8UYcm-1",
        ),
        sourceUrl:
          "https://www.figma.com/design/JFBfWLIzm55gbaHopugR5V/Neo-Creative--Public-?node-id=0-1&t=6ybrWUKex1s8UYcm-1",
      },
    ],
  },
  {
    id: "a-taste-of-heaven",
    title: "A Taste of Heaven",
    brief:
      "A warm and appetising website for a cake-selling business with a strong food-first experience.",
    tags: ["Branding", "E-commerce Design"],
    category: "Website",
    bg: "#E8D8D1",
    accent: "#C96A45",
    mockup: "desktop",
    year: "2025",
    featured: true,
    client: "A Taste of Heaven",
    duration: "4 weeks",
    role: "Branding · E-commerce Design",
    overview:
      "A Taste of Heaven needed an online presence that felt warm, friendly and appetising while still being straightforward to use.",
    challenge:
      "The site had to convey delight and credibility without relying on heavy product photography or complex flows.",
    solution:
      "I designed a clean, welcoming experience centered around food storytelling, clear offers, and an easy path to get in touch or order.",
    outcome:
      "The work was delivered as a simple yet polished web design concept ready for further development.",
    tools: ["Figma"],
    liveUrl: "https://www.atasteofheaven.lk/",
    thumbImage: "/taste-of-heaven-thumb.png",
    figmaLinks: [
      {
        label: "Design",
        url: toEmbedUrl(
          "https://www.figma.com/design/1lVcLBrAE4RVlkjFBdhpxq/A-Taste-of-Heaven--Public-?node-id=0-1&t=4dPPPJAwSDAveSMt-1",
        ),
        sourceUrl:
          "https://www.figma.com/design/1lVcLBrAE4RVlkjFBdhpxq/A-Taste-of-Heaven--Public-?node-id=0-1&t=4dPPPJAwSDAveSMt-1",
      },
    ],
  },

  {
    id: "salon-zero",
    title: "Salon Zero",
    brief: "A premium booking experience for a modern hair and beauty salon.",
    tags: ["Branding", "Website Design"],
    category: "Website",
    bg: "#2D211A",
    accent: "#D8A570",
    mockup: "desktop",
    year: "2024",
    featured: true,
    client: "Salon Zero",
    duration: "3 weeks",
    role: "Branding · Website Design",
    overview:
      "Salon Zero needed an experience that felt premium and effortless for booking services, learning about the studio, and discovering styling offers.",
    challenge:
      "The app needed to communicate luxury while remaining approachable and easy to use for everyday bookings.",
    solution:
      "I designed a simple booking journey with a warm visual identity and a clear service discovery flow that feels calm from first tap to final confirmation.",
    outcome:
      "The work was shaped into a polished mobile concept with a strong brand-led experience and clear interaction patterns.",
    tools: ["Figma"],
    liveUrl: "https://www.salonzero.lk/",
    thumbImage: "/salon zero thumb.png",
    figmaLinks: [
      {
        label: "Design",
        url: toEmbedUrl(
          "https://www.figma.com/design/Fah00UoWWv2wnUxJlJxY3B/Salon-Zero--Public-?node-id=25-113&t=ZXWOkGi63mtIWDq0-1",
        ),
        sourceUrl:
          "https://www.figma.com/design/Fah00UoWWv2wnUxJlJxY3B/Salon-Zero--Public-?node-id=25-113&t=ZXWOkGi63mtIWDq0-1",
      },
    ],
  },
  {
    id: "subee-clothing",
    title: "Subee Clothing",
    brief:
      "An elegant e-commerce concept for a clothing brand with a soft, editorial voice.",
    tags: ["Branding", "E-commerce Design"],
    category: "Website",
    bg: "#1F1A1A",
    accent: "#E8C4C4",
    mockup: "desktop",
    year: "2025",
    featured: true,
    client: "Subee Clothing",
    duration: "4 weeks",
    role: "Branding · E-commerce Design",
    overview:
      "Subee Clothing needed a digital storefront that felt premium, feminine and approachable while keeping shopping simple.",
    challenge:
      "The product experience had to reflect the brand personality without diluting clarity on mobile or desktop.",
    solution:
      "I built a soft editorial aesthetic around product browsing, story-led content, and a simple purchase path that felt calm and well considered.",
    outcome:
      "The project was delivered as a refined commerce concept with strong brand consistency and a clear visual system.",
    tools: ["Figma"],
    figmaLinks: [
      {
        label: "Design",
        url: toEmbedUrl(
          "https://www.figma.com/design/78Fh69iZ5GAOvvG58Su1N4/Subee-Clothing--Public-?node-id=0-1&t=rHiNDAQ2q5dZpriw-1",
        ),
        sourceUrl:
          "https://www.figma.com/design/78Fh69iZ5GAOvvG58Su1N4/Subee-Clothing--Public-?node-id=0-1&t=rHiNDAQ2q5dZpriw-1",
      },
    ],
  },
  {
    id: "treasury-forex-portal",
    title: "Treasury Forex Trading Portal",
    brief:
      "An enterprise-grade trading interface with 200+ screens, a 20+ component design system, and WCAG 2.1 AA compliance.",
    tags: ["Design System", "Web App Design", "Frontend Development"],
    category: "Web App",
    bg: "#0C1A2E",
    accent: "#22D3EE",
    mockup: "desktop",
    year: "2025",
    featured: false,
    client: "Commercial Bank of Ceylon PLC (via Orysys Ltd)",
    duration: "9 months",
    role: "Design System . Web App Design · Frontend Development ",
    overview:
      "I designed and built a complex forex trading portal for treasury operations from end to end, creating trading interfaces, portfolio dashboards, and transaction workflows across 200+ screens.",
    challenge:
      "Translating high-complexity trading scenarios into usable, accessible interfaces while meeting WCAG 2.1 AA standards and supporting power-user keyboard workflows.",
    solution:
      "Built a comprehensive Figma design system with 20+ reusable components, then translated designs directly into production-ready React, TypeScript, and SCSS. Added custom data visualizations and live market data displays.",
    outcome:
      "Delivered a scalable, accessible trading portal with 200+ screens, full WCAG 2.1 AA compliance including ARIA labels and custom keyboard navigation for power users.",
    tools: ["Figma", "React", "TypeScript", "SCSS"],
  },
  {
    id: "oneapp-mobile-banking",
    title: "OneApp Mobile Banking",
    brief:
      "A mobile banking super-app with 200+ screens streamlining 20+ core banking features into one intuitive experience.",
    tags: ["Mobile App Design", "Prototyping"],
    category: "Mobile App",
    bg: "#0F1F3D",
    accent: "#4F8EF7",
    mockup: "mobile",
    year: "2024",
    featured: false,
    client: "Commercial Bank of Ceylon PLC (via Orysys Ltd)",
    duration: "7 months",
    role: "Mobile App Design, Prototyping",
    overview:
      "OneApp is a mobile banking super-app that brings 20+ core banking features into one cohesive mobile interface. I designed the screens and helped build them using React Native.",
    challenge:
      "Designing 200+ screens for a wide range of banking features while maintaining a consistent, brand-aligned experience across complex task flows.",
    solution:
      "Conducted user research with the CTO and product owner, then designed the full experience in Figma before contributing to frontend development using React Native, TypeScript, Redux, and Axios.",
    outcome:
      "Delivered a polished, feature-rich mobile banking experience with high-fidelity prototypes that reduced design approval cycles and mentored a UI/UX intern through the process.",
    tools: ["Figma", "React Native", "TypeScript", "Redux"],
  },
  {
    id: "estatement-portal",
    title: "E-Statement Portal",
    brief:
      "A complete UI overhaul replacing 100+ legacy vendor screens with a brand-aligned, accessible React component library.",
    tags: ["Web App Design", "Frontend Development"],
    category: "Web App",
    bg: "#111827",
    accent: "#34D399",
    mockup: "desktop",
    year: "2025",
    featured: false,
    client: "Commercial Bank of Ceylon PLC (via Orysys Ltd)",
    duration: "4 months",
    role: "Web App Design · Frontend Development ",
    overview:
      "I led a full redesign of the bank's e-statement portal, replacing legacy vendor UI with custom, brand-aligned components and a maintainable React component library.",
    challenge:
      "100+ legacy screens required redesign and reimplementation with improved usability, while keeping the system extensible for future feature additions.",
    solution:
      "Redesigned all screens in Figma, then collaborated with the Tech Lead to build a React component library with TypeScript, Tailwind CSS, and Storybook. Applied responsive design across all breakpoints and wrote Jest unit tests.",
    outcome:
      "Delivered a fully responsive, component-driven portal with 100+ redesigned screens, full Storybook documentation, and a mentored junior engineer who contributed to the team.",
    tools: ["Figma", "React", "TypeScript", "Tailwind CSS", "Storybook"],
  },
  {
    id: "ivig-internal-portal",
    title: "IVIG Internal Portal",
    brief:
      "A full-stack prototype for an internal banking portal, designed in Figma and built with Next.js, Shadcn, and Tailwind CSS.",
    tags: ["Wireframing", "Frontend Prototyping"],
    category: "Web App",
    bg: "#1A1A2E",
    accent: "#A78BFA",
    mockup: "desktop",
    year: "2026",
    featured: false,
    client: "Commercial Bank of Ceylon PLC (via Orysys Ltd)",
    duration: "3 months",
    role: "Wireframing · Frontend Prototyping",
    overview:
      "I designed and prototyped an internal banking portal from scratch, translating complex business requirements into user journey diagrams, wireframes, and a working Next.js prototype.",
    challenge:
      "Complex business requirements needed to be mapped into clear journeys and then validated quickly with a working frontend prototype.",
    solution:
      "Translated requirements into Figma wireframes, then built the prototype using Next.js and TypeScript with Shadcn and Tailwind CSS. Implemented REST API integrations using the Fetch API for live data communication.",
    outcome:
      "Delivered a modern, accessible internal portal prototype with REST API integration, ready for stakeholder validation and handoff to the development team.",
    tools: ["Figma", "Next.js", "TypeScript", "Shadcn", "Tailwind CSS"],
  },
];

export const FEATURED_PROJECTS = ALL_PROJECTS.filter(
  (project) => project.featured,
);
export const CATEGORIES = [
  "All",
  ...Array.from(new Set(ALL_PROJECTS.map((project) => project.category))),
];
export const SKILLS = [
  "Design Systems",
  "Product Design",
  "Web Design",
  "Frontend Development",
  "Mobile Design",
  "Figma",
];

export const SKILL_CATEGORIES = [
  {
    label: "Design",
    items: [
      "Design Systems",
      "Product Design",
      "User Journey Mapping",
      "Wireframing",
      "Prototyping",
      "WCAG 2.1 Accessibility",
      "Data Visualisation",
      "Responsive Design",
    ],
  },
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Angular",
      "SCSS",
      "Tailwind CSS",
      "Redux",
    ],
  },
  {
    label: "Tools",
    items: ["Figma", "Storybook", "Git", "Material UI", "Shadcn", "Ant Design"],
  },
];

export const CLIENTS = [
  "Commercial Bank of Ceylon PLC",
  "Orysys Ltd",
  "Virtusa (Pvt) Ltd",
  "NimiDev",
  "Neo Creative",
  "A Taste of Heaven",
  "Subee Clothing",
  "Salon Zero",
];
