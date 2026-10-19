import { learning, skillGroups } from "@/lib/skills";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

function Marker({ inProgress }: { inProgress: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`mt-[7px] size-2 shrink-0 rounded-full ${
        inProgress ? "border border-accent-soft" : "bg-accent-soft"
      }`}
    />
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      eyebrow="Technical skills"
      title="Technologies, with the projects that prove them"
      intro="Each skill lists the projects it was used in. No percentages or self-ratings."
    >
      <Reveal>
        <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <span className="inline-flex items-center gap-2">
            <Marker inProgress={false} /> Used in live or completed projects
          </span>
          <span className="inline-flex items-center gap-2">
            <Marker inProgress /> Used only in a project still in development
          </span>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.label} className="bg-bg-raised p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">{group.label}</h3>
              <ul className="mt-5 space-y-3">
                {group.skills.map((skill) => (
                  <li key={skill.name} className="flex gap-3">
                    <Marker inProgress={skill.status === "in-progress"} />
                    <span className="min-w-0">
                      <span className="block text-[15px] text-text">
                        {skill.name}
                        <span className="sr-only">
                          {skill.status === "in-progress"
                            ? " (used in a project still in development)"
                            : " (used in live or completed projects)"}
                        </span>
                      </span>
                      <span className="block font-mono text-[11px] text-subtle">
                        {skill.projects.map((p) => p.shortName).join(" · ")}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {learning.length > 0 && (
          <p className="mt-6 text-sm text-muted">
            <span className="text-text">Currently learning:</span> {learning.join(", ")}
          </p>
        )}
      </Reveal>
    </Section>
  );
}
