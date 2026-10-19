import { PROCESS } from "@/data/process";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function Process() {
  return (
    <Section
      id="process"
      index="06"
      eyebrow="How I work"
      title="The process I follow, and where it showed up"
      intro="Five steps I follow when building for a client, each with an example from real work."
    >
      <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-5 md:max-lg:[&>li:last-child:nth-child(odd)]:col-span-2">
        {PROCESS.map((step, i) => (
          <li key={step.title} className="flex flex-col bg-bg-raised p-6">
            <Reveal className="flex h-full flex-col">
              <span className="font-mono text-xs text-accent-soft">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-display text-lg font-semibold leading-snug tracking-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
              <div className="mt-auto pt-6">
                <p className="border-t border-line pt-4 text-xs leading-relaxed text-subtle">
                  <span className="block font-mono uppercase tracking-[0.14em] text-muted">In practice</span>
                  <span className="mt-1.5 block">{step.evidence}</span>
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
