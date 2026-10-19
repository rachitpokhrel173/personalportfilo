import type { Language } from "@/types/content";

// Only confirmed, public-safe information. Private resume fields (address, phone,
// date of birth) are deliberately not stored here. See CONTENT-CHECKLIST.md.

export const PROFILE = {
  name: "Rachit Pokhrel",
  initials: "RP",
  title: "Full-Stack Developer",
  location: "Japan",
  origin: "Nepal",
  email: "rachitpokhrel123@gmail.com",
  website: "rachitpokhrel.com.np",
  github: "https://github.com/rachitpokhrel173",
  githubHandle: "rachitpokhrel173",
  /** Add when provided, e.g. "https://www.linkedin.com/in/…". */
  linkedin: null as string | null,

  headline:
    "I build thoughtful digital experiences and practical web applications that solve real problems.",
  intro:
    "Business websites and the systems behind them: booking and inquiry flows, quotations, invoicing and content management, built with Next.js, TypeScript and Supabase.",

  /** Used on the web resume and the PDF. */
  summary:
    "Full-stack developer based in Japan. I build business websites and the admin systems behind them, including inquiry and booking flows, quotations, invoicing, inventory and content management, using Next.js, React, TypeScript and Supabase (PostgreSQL). My recent work includes two website-and-admin systems for event decoration businesses in Nepal and a multi-page website with interactive planning tools for a study-abroad consultancy.",

  about: [
    "I’m Rachit Pokhrel, a full-stack developer from Nepal, currently living in Japan, where I study Japanese at ISI Language School in Osaka.",
    "Most of my development work so far has been for real businesses in Nepal: an event decoration studio, a wedding and events company, and a study-abroad consultancy. For two of them the work went past the public website into the admin systems their teams use for inquiries, quotations, bookings and payments.",
    "Since March 2025 I have also worked at Discovery Pathway Pvt. Ltd. in student counseling and documentation, now remotely from Japan. The job involves detailed documentation and working directly with students, and both carry over into how I gather requirements and document software.",
    "I want to keep growing as a full-stack developer by building useful products with international teams and for businesses that need websites and web applications they can rely on.",
  ],

  focus: [
    "Business websites",
    "Admin dashboards & CRMs",
    "Full-stack web applications",
  ],
} as const;

export const LANGUAGES: Language[] = [
  { name: "English", level: "IELTS 6.0 overall", detail: "2024" },
  {
    name: "Japanese",
    level: "Currently studying",
    detail: "ISI Language School, Osaka. JLPT not yet taken.",
  },
];
