import type { Metadata } from "next";
import { Download } from "lucide-react";
import { RESUME } from "@/lib/resume";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { buttonStyles } from "@/components/ui";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = pageMetadata({
  title: "Resume",
  description:
    "Resume of Rachit Pokhrel, full-stack developer: skills, selected projects, experience, education and languages. Available as a PDF download.",
  path: "/resume",
});

const h2 =
  "border-b border-[#d5d8e2] pb-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4c3fc4]";

export default function ResumePage() {
  const r = RESUME;
  const anyInProgress = r.skills.some((g) => g.items.some((i) => i.inProgress));

  return (
    <div className="pb-24 pt-28 sm:pt-36 print:p-0">
      <div className="container-page print:hidden">
        <p className="eyebrow">Resume</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Resume</h1>
          <div className="flex flex-wrap gap-3">
            <a href={SITE.resumePdf} download={SITE.resumeFileName} className={buttonStyles.primary}>
              <Download size={16} aria-hidden="true" />
              Download PDF
            </a>
            <PrintButton />
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-muted">
          The PDF is generated from the same information as this page, with selectable text and working
          links, so applicant tracking systems can read it.
        </p>
      </div>

      {/* A light "paper" sheet: mirrors the PDF and prints cleanly. */}
      <div className="container-page mt-10 print:mt-0 print:max-w-none print:px-0">
        <article
          aria-label={`Resume of ${r.name}`}
          className="mx-auto max-w-[52rem] rounded-xl bg-[#fbfbfd] px-6 py-10 text-[15px] leading-relaxed text-[#14161f] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] sm:px-12 sm:py-14 print:max-w-none print:rounded-none print:p-0 print:text-[12px] print:shadow-none"
        >
          <header>
            <h2 className="font-display text-4xl font-bold tracking-tight text-[#14161f]">{r.name}</h2>
            <p className="mt-1 text-lg text-[#4c3fc4]">{r.title}</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#4a5063]">
              {r.contact.map((c) => (
                <li key={c.label}>
                  {c.href ? (
                    <a href={c.href} className="underline decoration-[#c9cce0] underline-offset-2 hover:text-[#14161f]">
                      {c.label}
                    </a>
                  ) : (
                    c.label
                  )}
                </li>
              ))}
            </ul>
          </header>

          <section className="mt-8">
            <h3 className={h2}>Summary</h3>
            <p className="mt-3">{r.summary}</p>
          </section>

          <section className="mt-8">
            <h3 className={h2}>Technical skills</h3>
            <dl className="mt-3 space-y-1.5">
              {r.skills.map((g) => (
                <div key={g.label} className="grid gap-x-4 sm:grid-cols-[190px_1fr]">
                  <dt className="font-semibold">{g.label}</dt>
                  <dd>{g.items.map((i) => (i.inProgress ? `${i.name}*` : i.name)).join(", ")}</dd>
                </div>
              ))}
            </dl>
            {anyInProgress && (
              <p className="mt-2 text-xs text-[#4a5063]">* Used in a project that is still in development.</p>
            )}
          </section>

          <section className="mt-8">
            <h3 className={h2}>Projects</h3>
            <div className="mt-3 space-y-6">
              {r.projects.map((p) => (
                <div key={p.name} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <p>
                      <span className="font-semibold">{p.name}</span>
                      <span className="text-[#4a5063]"> · {p.category}</span>
                    </p>
                    {p.status && <p className="text-sm text-[#4a5063]">{p.status}</p>}
                  </div>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 marker:text-[#9aa0b2]">
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <p className="mt-1.5 text-sm text-[#4a5063]">Stack: {p.stack.join(", ")}</p>
                  <p className="text-sm text-[#4a5063]">
                    {p.link && (
                      <>
                        Live:{" "}
                        <a href={p.link.href} className="underline decoration-[#c9cce0] underline-offset-2">
                          {p.link.label}
                        </a>
                        {" · "}
                      </>
                    )}
                    <a href={p.caseStudy.replace(SITE.url, "") || "/"} className="underline decoration-[#c9cce0] underline-offset-2">
                      Case study
                    </a>
                  </p>
                </div>
              ))}
            </div>
            {r.otherProjects.length > 0 && (
              <div className="mt-6 break-inside-avoid">
                <p className="font-semibold">Other projects</p>
                <ul className="mt-1.5 list-disc space-y-1 pl-5 marker:text-[#9aa0b2]">
                  {r.otherProjects.map((p) => (
                    <li key={p.name}>
                      <a
                        href={p.caseStudy.replace(SITE.url, "")}
                        className="font-medium underline decoration-[#c9cce0] underline-offset-2"
                      >
                        {p.name}
                      </a>
                      <span className="text-[#4a5063]">
                        {" "}
                        · {p.category} · {p.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section className="mt-8">
            <h3 className={h2}>Experience</h3>
            {r.experience.map((job) => (
              <div key={job.organization} className="mt-3 break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p>
                    <span className="font-semibold">{job.organization}</span>
                    <span className="text-[#4a5063]"> · {job.location}</span>
                  </p>
                  <p className="text-sm text-[#4a5063]">{job.period}</p>
                </div>
                <p className="italic">{job.position}</p>
                {job.roles.map((role) => (
                  <div key={role.period} className="mt-2">
                    <p>
                      <span className="font-semibold">{role.title}</span>
                      <span className="text-sm text-[#4a5063]"> · {role.period}</span>
                    </p>
                    <ul className="mt-1 list-disc space-y-0.5 pl-5 marker:text-[#9aa0b2]">
                      {role.responsibilities.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </section>

          <section className="mt-8">
            <h3 className={h2}>Education</h3>
            <div className="mt-3 space-y-3">
              {r.education.map((e) => (
                <div key={e.institution} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <p className="font-semibold">{e.institution}</p>
                    <p className="text-sm text-[#4a5063]">{e.period}</p>
                  </div>
                  <p>
                    {e.program}
                    {e.location && <span className="text-[#4a5063]"> · {e.location}</span>}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h3 className={h2}>Languages</h3>
            <ul className="mt-3 space-y-1">
              {r.languages.map((l) => (
                <li key={l.name}>
                  <span className="font-semibold">{l.name}:</span> {l.level}
                  {l.detail && <span className="text-[#4a5063]"> ({l.detail})</span>}
                </li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}
