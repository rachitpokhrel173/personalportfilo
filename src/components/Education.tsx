import { EDUCATION } from "@/data/experience";
import { LANGUAGES } from "@/data/profile";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function Education() {
  return (
    <Section id="education" index="04" eyebrow="Education" title="Education and languages">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <Reveal>
          <ol className="divide-y divide-line border-y border-line">
            {EDUCATION.map((e) => (
              <li key={e.institution} className="grid gap-2 py-6 sm:grid-cols-[170px_1fr] sm:gap-6">
                <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-start">
                  <p className="font-mono text-xs text-muted">{e.period}</p>
                  <span
                    className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                      e.status === "current" ? "border-accent/50 text-accent-soft" : "border-line text-subtle"
                    }`}
                  >
                    {e.status === "current" ? "Current" : "Completed"}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">{e.institution}</h3>
                  <p className="mt-1 text-sm text-muted">{e.program}</p>
                  {e.location && <p className="text-sm text-subtle">{e.location}</p>}
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal>
          <div className="rounded-2xl border border-line bg-bg-raised p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">Languages</h3>
            <dl className="mt-5 space-y-5">
              {LANGUAGES.map((l) => (
                <div key={l.name}>
                  <dt className="font-display text-lg font-semibold">{l.name}</dt>
                  <dd className="mt-1 text-sm text-text">{l.level}</dd>
                  {l.detail && <dd className="text-sm text-muted">{l.detail}</dd>}
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
