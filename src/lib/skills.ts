import { LEARNING, SKILL_GROUPS } from "@/data/skills";
import { publishedProjects } from "@/lib/projects";

export type SkillStatus = "delivered" | "in-progress";

export type Skill = {
  name: string;
  status: SkillStatus;
  projects: { slug: string; name: string; shortName: string }[];
};

/**
 * "delivered"   – used in at least one live or completed project
 * "in-progress" – only used in projects still being built or not deployed
 * Skills with no published evidence are dropped, so nothing unsupported is shown.
 */
export const skillGroups = SKILL_GROUPS.map((group) => ({
  label: group.label,
  skills: group.skills
    .map((spec): Skill | null => {
      const names = spec.match ?? [spec.name];
      const used = publishedProjects.filter((p) =>
        spec.projects ? spec.projects.includes(p.slug) : names.some((n) => p.stack.includes(n)),
      );
      if (used.length === 0) return null;
      const delivered = used.some((p) => p.status === "live" || p.status === "completed");
      return {
        name: spec.name,
        status: delivered ? "delivered" : "in-progress",
        projects: used.map((p) => ({ slug: p.slug, name: p.name, shortName: p.shortName ?? p.name.split(" ")[0] })),
      };
    })
    .filter((s): s is Skill => s !== null)
    // Delivered first, keeping the authored order within each status.
    .sort((a, b) => Number(a.status === "in-progress") - Number(b.status === "in-progress")),
})).filter((g) => g.skills.length > 0);

export const learning = LEARNING;
