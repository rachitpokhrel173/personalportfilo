// Skills are evidence-linked: each one lists the projects that use it, and its
// status is derived from those projects (see src/lib/skills.ts). A skill is matched
// against project `stack` names unless `projects` is given explicitly.
// Add things you are learning to `LEARNING`; they are shown separately.

export type SkillSpec = {
  name: string;
  /** Match this stack name instead of `name`. */
  match?: string[];
  /** Explicit evidence (project slugs) for skills that aren't stack entries. */
  projects?: string[];
};

export type SkillGroupSpec = { label: string; skills: SkillSpec[] };

const CLIENT_SITES = ["floral-roots-decor", "timeless-ties-events-decor", "discovery-pathway"];
const STATIC_SITES = ["discovery-pathway-admin-portal", "nagarkot-network", "rizz-app"];

export const SKILL_GROUPS: SkillGroupSpec[] = [
  {
    label: "Frontend",
    skills: [
      { name: "React" },
      { name: "Next.js (App Router)", match: ["Next.js"] },
      { name: "Tailwind CSS" },
      { name: "React Hook Form" },
      { name: "TanStack Query" },
      { name: "Radix UI" },
      { name: "Framer Motion" },
      { name: "GSAP" },
      { name: "Vite" },
      { name: "React Router" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Next.js server actions & route handlers", projects: ["floral-roots-decor", "timeless-ties-events-decor", "discovery-pathway"] },
      {
        name: "Supabase Auth",
        projects: [
          "floral-roots-decor",
          "timeless-ties-events-decor",
          "discovery-pathway-admin-portal",
          "nagarkot-network",
          "japanese-mastery",
          "gp-pathway-crm",
        ],
      },
      { name: "Zod validation", match: ["Zod"] },
      { name: "PDF generation", match: ["React PDF"] },
      { name: "Transactional email (Resend)", match: ["Resend"] },
      { name: "Node.js" },
      { name: "Express" },
    ],
  },
  {
    label: "Databases",
    skills: [
      { name: "PostgreSQL" },
      { name: "Supabase" },
      { name: "Row-level security", projects: ["floral-roots-decor", "timeless-ties-events-decor"] },
      { name: "SQL migrations", projects: ["floral-roots-decor", "timeless-ties-events-decor"] },
      { name: "Drizzle ORM" },
      { name: "MySQL" },
    ],
  },
  {
    label: "Languages",
    skills: [
      { name: "TypeScript" },
      { name: "JavaScript", match: ["TypeScript", "JavaScript"] },
      { name: "SQL", projects: ["floral-roots-decor", "timeless-ties-events-decor"] },
      { name: "HTML & CSS", projects: [...CLIENT_SITES, ...STATIC_SITES] },
    ],
  },
  {
    label: "Tools & workflow",
    skills: [
      { name: "Git", projects: CLIENT_SITES },
      { name: "npm", projects: CLIENT_SITES },
      { name: "ESLint", projects: CLIENT_SITES },
      { name: "Responsive design", projects: CLIENT_SITES },
      { name: "Technical SEO", projects: CLIENT_SITES },
    ],
  },
  {
    label: "Deployment & infrastructure",
    skills: [
      { name: "Vercel" },
      { name: "Custom domains & DNS", projects: ["timeless-ties-events-decor"] },
      { name: "Scheduled jobs (Vercel Cron)", projects: ["timeless-ties-events-decor"] },
      { name: "Supabase storage", projects: ["floral-roots-decor", "timeless-ties-events-decor"] },
    ],
  },
];

/** Technologies currently being learned (not yet used in a project). */
export const LEARNING: string[] = [];
