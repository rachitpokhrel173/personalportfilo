import type { CSSProperties } from "react";
import { ArrowDown, Download } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { SITE } from "@/lib/site";
import { getProject, hostOf } from "@/lib/projects";
import { BrowserFrame, PhoneFrame } from "./Frames";
import { ButtonLink, buttonStyles } from "./ui";

const delay = (ms: number) => ({ animationDelay: `${ms}ms` }) as CSSProperties;

export function Hero() {
  const floral = getProject("floral-roots-decor");
  const timeless = getProject("timeless-ties-events-decor");
  const desktop = floral?.images.find((i) => i.kind === "desktop");
  const phone = timeless?.images.find((i) => i.kind === "mobile");
  const [first, ...rest] = PROFILE.name.split(" ");

  return (
    <section id="home" aria-labelledby="hero-heading" className="relative overflow-hidden pt-16">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[620px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(106,88,232,0.18),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-40 h-[520px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(20,40,96,0.45),transparent)]"
      />

      <div className="container-page relative grid items-center gap-14 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24 lg:pt-24">
        <div>
          <p className="eyebrow animate-rise flex flex-wrap items-center gap-x-3 gap-y-1" style={delay(0)}>
            <span>{PROFILE.title}</span>
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            <span className="text-muted">Based in {PROFILE.location}</span>
          </p>

          <h1
            id="hero-heading"
            className="animate-rise mt-6 font-display text-[clamp(3rem,10vw,6.75rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em]"
            style={delay(80)}
          >
            {first}
            <br />
            <span className="text-transparent [-webkit-text-stroke:1.5px_var(--accent-soft)]">{rest.join(" ")}</span>
          </h1>

          <p
            className="animate-rise mt-8 max-w-xl font-display text-xl font-medium leading-snug text-text text-balance sm:text-2xl"
            style={delay(160)}
          >
            {PROFILE.headline}
          </p>
          <p className="animate-rise mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg" style={delay(220)}>
            {PROFILE.intro}
          </p>

          <div className="animate-rise mt-9 flex flex-wrap items-center gap-3" style={delay(280)}>
            <ButtonLink href="/#projects">
              Explore My Work
              <ArrowDown size={16} aria-hidden="true" />
            </ButtonLink>
            <a href={SITE.resumePdf} download={SITE.resumeFileName} className={buttonStyles.secondary}>
              <Download size={16} aria-hidden="true" />
              Download Resume
              <span className="sr-only">(PDF)</span>
            </a>
            <ButtonLink href="/#contact" variant="ghost">
              Contact Me
            </ButtonLink>
          </div>
        </div>

        {desktop && floral?.links.live && (
          <div className="animate-fade relative mx-auto w-full max-w-[640px] pb-10 pl-6 sm:pl-12 lg:pb-14" style={delay(300)}>
            <BrowserFrame
              image={desktop}
              address={hostOf(floral.links.live)}
              sizes="(min-width: 1024px) 560px, 90vw"
              priority
            />
            {phone && (
              <PhoneFrame
                image={phone}
                sizes="(min-width: 1024px) 160px, 28vw"
                className="absolute bottom-0 left-0 w-[27%] min-w-[96px] -rotate-2"
                priority
              />
            )}
            {timeless && (
              <p className="absolute -bottom-2 right-0 hidden max-w-[62%] items-start gap-2.5 rounded-lg border border-line bg-bg-raised/95 px-3.5 py-2.5 text-xs leading-snug text-muted shadow-lg sm:flex lg:-bottom-1">
                <span aria-hidden="true" className="mt-1 size-1.5 shrink-0 rounded-full bg-warning" />
                <span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">Now building</span>
                  <br />
                  <span className="text-text">{timeless.name}</span>: website + admin system
                </span>
              </p>
            )}
          </div>
        )}
      </div>

      <div className="container-page relative pb-6">
        <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
          {[
            { label: "Based in", value: `${PROFILE.location} · from ${PROFILE.origin}` },
            { label: "Focus", value: "Business websites & admin systems" },
            { label: "Core stack", value: "Next.js · TypeScript · Supabase" },
          ].map((item) => (
            <div key={item.label} className="bg-bg-raised/90 px-5 py-4">
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{item.label}</dt>
              <dd className="mt-1.5 text-sm text-text">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
