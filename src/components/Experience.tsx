import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EMPLOYMENT, TRANSFERABLE_SKILLS } from "@/data/experience";
import { publishedProjects } from "@/lib/projects";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { StatusBadge } from "./ui";

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      eyebrow="Experience"
      title="Employment and independent development"
      intro="My employment so far has been in student counseling and documentation. I list my development work separately so the two are never confused."
    >
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">Employment</h3>
          {EMPLOYMENT.map((job) => (
            <article key={job.organization} className="mt-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="font-display text-2xl font-semibold tracking-tight">{job.organization}</h4>
                <p className="font-mono text-xs text-muted">{job.period}</p>
              </div>
              <p className="mt-1 text-sm text-accent-soft">
                {job.position} · {job.location}
              </p>

              <ol className="relative mt-8 space-y-8 border-l border-line pl-7">
                {job.roles.map((role, i) => (
                  <li key={role.period} className="relative">
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[33px] top-1.5 size-2.5 rounded-full border-2 ${
                        i === 0 ? "border-accent bg-accent" : "border-line-strong bg-bg"
                      }`}
                    />
                    <p className="font-mono text-xs text-muted">{role.period}</p>
                    <p className="mt-1 font-medium text-text">{role.title}</p>
                    <p className="text-sm text-subtle">{role.detail}</p>
                    <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted">
                      {role.responsibilities.map((r) => (
                        <li key={r} className="flex gap-2.5">
                          <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-line-strong" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </article>
          ))}

          <div className="mt-10 rounded-xl border border-line bg-bg-raised p-5">
            <p className="text-sm font-medium text-text">Transferable strengths from this role</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {TRANSFERABLE_SKILLS.map((s) => (
                <li key={s} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">Independent development</h3>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Websites and applications I have designed and built for businesses and as an academic project.
          </p>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {publishedProjects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group flex items-start justify-between gap-4 py-5 transition-colors"
                >
                  <span className="min-w-0">
                    <span className="block font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-accent-soft">
                      {p.name}
                    </span>
                    <span className="mt-1 block text-sm text-muted">{p.category}</span>
                    <span className="mt-3 block">
                      <StatusBadge status={p.status} note={p.statusNote} />
                    </span>
                  </span>
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="mt-1.5 shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-text"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/resume"
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-text"
          >
            View the full resume
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
