import { z } from "zod";
import { PROJECTS } from "@/data/projects";
import type { Project, ProjectStatus } from "@/types/content";

// Validates the project data when this module loads, so a malformed entry fails
// `next build` (and the resume script) with a readable message instead of shipping.

const url = z.url({ protocol: /^https$/ });
const image = z.object({
  src: z.string().startsWith("/"),
  alt: z.string().min(8),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  caption: z.string().optional(),
  kind: z.enum(["desktop", "mobile", "admin"]),
});

const projectSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "slug must be kebab-case"),
    name: z.string().min(2),
    shortName: z.string().min(2).optional(),
    shortDescription: z.string().min(20).max(260),
    category: z.string().min(2),
    status: z.enum(["live", "completed", "in-progress", "not-deployed"]),
    statusNote: z.string().optional(),
    period: z.string().optional(),
    client: z.string().optional(),
    links: z.object({
      live: url.optional(),
      github: url.optional(),
      demo: url.optional(),
      extra: z.array(z.object({ label: z.string(), href: url })).optional(),
    }),
    stack: z.array(z.string()),
    tint: z.string().regex(/^#[0-9a-f]{6}$/i),
    featured: z.boolean(),
    order: z.number(),
    published: z.boolean(),
    related: z.array(z.string()).optional(),
    images: z.array(image),
  })
  .loose()
  .refine((p) => !p.published || p.role, { message: "published projects need a role" })
  .refine((p) => !p.published || p.stack.length > 0, { message: "published projects need a stack" });

for (const project of PROJECTS) {
  const result = projectSchema.safeParse(project);
  if (!result.success) {
    throw new Error(
      `Invalid project "${project.slug}":\n${z.prettifyError(result.error)}`,
    );
  }
}
const slugs = PROJECTS.map((p) => p.slug);
const duplicate = slugs.find((s, i) => slugs.indexOf(s) !== i);
if (duplicate) throw new Error(`Duplicate project slug "${duplicate}"`);
for (const project of PROJECTS) {
  const missing = project.related?.find((slug) => !slugs.includes(slug));
  if (missing) throw new Error(`Project "${project.slug}" is related to unknown slug "${missing}"`);
}

const byOrder = (a: Project, b: Project) => a.order - b.order;

export const publishedProjects = PROJECTS.filter((p) => p.published).sort(byOrder);
export const featuredProjects = publishedProjects.filter((p) => p.featured);

export function getProject(slug: string) {
  return publishedProjects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const i = publishedProjects.findIndex((p) => p.slug === slug);
  return publishedProjects[(i + 1) % publishedProjects.length];
}

export const coverImage = (p: Project) =>
  p.images.find((img) => img.kind === "desktop") ?? p.images[0];

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "Live",
  completed: "Completed",
  "in-progress": "Under development",
  "not-deployed": "Not publicly deployed",
};

export function hostOf(href: string) {
  return new URL(href).host.replace(/^www\./, "");
}
