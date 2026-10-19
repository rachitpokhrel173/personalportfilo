// Content types shared by the website, the /resume page and the PDF resume.
// Runtime validation for projects lives in src/lib/projects.ts.

/**
 * live        – publicly reachable and in use
 * completed   – finished and handed over (may also be live)
 * in-progress – being built; parts may already be live
 * not-deployed – not publicly available (e.g. academic or private work)
 */
export type ProjectStatus = "live" | "completed" | "in-progress" | "not-deployed";

export type ProjectImage = {
  /** Path under /public. */
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  kind: "desktop" | "mobile" | "admin";
};

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  name: string;
  /** Compact label for dense lists such as the skills evidence. Defaults to the first word of `name`. */
  shortName?: string;
  /** One sentence for cards and the archive. */
  shortDescription: string;
  category: string;
  status: ProjectStatus;
  /** Short public qualifier shown next to the status, e.g. "Handed over Sep 2026". */
  statusNote?: string;
  /** Only set when confirmed. */
  period?: string;
  /** Who the project is for (client or audience), shown in the case study header. */
  client?: string;
  links: {
    live?: string;
    github?: string;
    demo?: string;
    extra?: ProjectLink[];
  };
  stack: string[];
  /** Brand tint used sparingly behind the project's imagery. */
  tint: string;
  featured: boolean;
  order: number;
  /** Unpublished projects are kept in the data but never rendered or listed. */
  published: boolean;
  /** Slugs of closely related projects, linked from the case study header. */
  related?: string[];

  // Case study
  role?: string;
  overview?: string[];
  audience?: string;
  problem?: string[];
  contributions?: string[];
  features?: { group: string; items: string[] }[];
  decisions?: { title: string; body: string }[];
  challenges?: { challenge: string; solution: string }[];
  outcome?: string[];
  /** Plain-language architecture layers (used when there are no screenshots). */
  architecture?: { layer: string; items: string[] }[];
  /** Ordered user workflow steps. */
  workflow?: string[];
  images: ProjectImage[];
  /** Public note about what is withheld, e.g. "Admin figures are blurred." */
  confidentiality?: string;
  /** Public note on what the case study is based on. */
  basis?: string;
  /** Bullets for the PDF/web resume. Falls back to shortDescription. */
  resumeBullets?: string[];
};

export type Role = {
  period: string;
  title: string;
  detail: string;
  responsibilities: string[];
};

export type Employment = {
  organization: string;
  location: string;
  period: string;
  /** Short line describing the position; not an official job title unless confirmed. */
  position: string;
  roles: Role[];
};

export type Education = {
  institution: string;
  location?: string;
  program: string;
  period: string;
  status: "completed" | "current";
  detail?: string;
};

export type Language = {
  name: string;
  level: string;
  detail?: string;
};
