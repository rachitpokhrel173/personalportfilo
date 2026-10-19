import Image from "next/image";
import { PROFILE } from "@/data/profile";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

const FACTS = [
  { label: "Based in", value: PROFILE.location },
  { label: "From", value: PROFILE.origin },
  { label: "Studying", value: "Japanese, ISI Language School (Osaka)" },
  { label: "Focus", value: PROFILE.focus.join(", ") },
];

export function About() {
  return (
    <Section id="about" index="05" eyebrow="About" title="A developer who builds for real businesses">
      <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
            <Image
              src="/images/about.webp"
              alt="Portrait of Rachit Pokhrel"
              fill
              sizes="(min-width: 1024px) 400px, 90vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,7,13,0.6),transparent_40%)]"
            />
          </div>
        </Reveal>

        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {PROFILE.about.map((p, i) => (
              <p key={i} className={i === 0 ? "text-text" : undefined}>
                {p}
              </p>
            ))}
          </div>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {FACTS.map((fact) => (
              <div key={fact.label} className="bg-bg-raised p-5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{fact.label}</dt>
                <dd className="mt-2 text-sm font-medium text-text">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
