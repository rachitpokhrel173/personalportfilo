import { PROFILE, LANGUAGES } from "@/data/profile";
import { EDUCATION, EMPLOYMENT } from "@/data/experience";
import { publishedProjects, hostOf, STATUS_LABEL } from "@/lib/projects";
import { skillGroups } from "@/lib/skills";
import { SITE } from "@/lib/site";

// One resume model shared by the /resume page and the PDF (scripts/generate-resume.tsx).
// Keep it free of Next.js imports so the PDF script can run under plain Node.

export const RESUME = {
  name: PROFILE.name,
  title: PROFILE.title,
  contact: [
    { label: PROFILE.location, href: undefined },
    { label: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { label: PROFILE.website, href: SITE.url },
    { label: `github.com/${PROFILE.githubHandle}`, href: PROFILE.github },
    ...(PROFILE.linkedin
      ? [{ label: PROFILE.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: PROFILE.linkedin }]
      : []),
  ],
  summary: PROFILE.summary,
  skills: skillGroups.map((g) => ({
    label: g.label,
    items: g.skills.map((s) => ({ name: s.name, inProgress: s.status === "in-progress" })),
  })),
  projects: publishedProjects
    .filter((p) => p.featured)
    .map((p) => ({
      name: p.name,
      category: p.category,
      status:
        p.status === "completed" || p.status === "not-deployed"
          ? (p.statusNote ?? STATUS_LABEL[p.status])
          : STATUS_LABEL[p.status],
      stack: p.stack.slice(0, 8),
      link: p.links.live ? { label: hostOf(p.links.live), href: p.links.live } : undefined,
      caseStudy: `${SITE.url}/projects/${p.slug}`,
      bullets: p.resumeBullets ?? [p.shortDescription],
    })),
  otherProjects: publishedProjects
    .filter((p) => !p.featured)
    .map((p) => ({
      name: p.name,
      category: p.category,
      status: [STATUS_LABEL[p.status], p.statusNote].filter(Boolean).join(" · "),
      link: p.links.live ? { label: hostOf(p.links.live), href: p.links.live } : undefined,
      caseStudy: `${SITE.url}/projects/${p.slug}`,
    })),
  experience: EMPLOYMENT,
  education: EDUCATION,
  languages: LANGUAGES,
};

export type Resume = typeof RESUME;
