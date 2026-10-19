import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types/content";
import { coverImage, featuredProjects, hostOf, publishedProjects } from "@/lib/projects";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { BrowserFrame, PhoneFrame } from "./Frames";
import { ExternalLink, StatusBadge, Tag } from "./ui";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

function ProjectActions({ project }: { project: Project }) {
  return (
    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium">
      <Link
        href={`/projects/${project.slug}`}
        className="group/cta inline-flex min-h-11 items-center gap-2 text-text"
      >
        <span className="border-b border-accent/60 pb-0.5 transition-colors group-hover/cta:border-accent-soft">
          Read the case study
        </span>
        <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover/cta:translate-x-0.5" />
        <span className="sr-only">: {project.name}</span>
      </Link>
      {project.links.live && (
        <ExternalLink
          href={project.links.live}
          className="inline-flex min-h-11 items-center gap-1.5 text-muted transition-colors hover:text-text"
        >
          {hostOf(project.links.live)}
        </ExternalLink>
      )}
    </div>
  );
}

function ProjectText({ project, index }: { project: Project; index: number }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-xs text-subtle">{String(index + 1).padStart(2, "0")}</span>
        <span className="eyebrow">{project.category}</span>
      </div>
      <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">{project.name}</h3>
      <div className="mt-3">
        <StatusBadge status={project.status} note={project.statusNote} />
      </div>
      <p className="mt-5 text-base leading-relaxed text-muted">{project.shortDescription}</p>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
        {project.stack.slice(0, 7).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </ul>
      <ProjectActions project={project} />
    </div>
  );
}

/** Compact cards for published projects that aren't featured. */
function MoreProjects({ projects }: { projects: Project[] }) {
  return (
    <div>
      <h3 className="eyebrow">More projects</h3>
      <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 sm:[&>*:last-child:nth-child(odd)]:col-span-2 lg:[&>*:last-child:nth-child(odd)]:col-span-1">
        {projects.map((p) => (
          <li key={p.slug} className="bg-bg-raised">
            <Link
              href={`/projects/${p.slug}`}
              className="group/more flex h-full flex-col p-6 transition-colors hover:bg-surface"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{p.category}</span>
              <span className="mt-3 inline-flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-text">
                {p.name}
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="text-muted transition-transform group-hover/more:translate-x-0.5 group-hover/more:text-accent-soft"
                />
              </span>
              <span className="mt-3">
                <StatusBadge status={p.status} note={p.statusNote} />
              </span>
              <span className="mt-4 text-sm leading-relaxed text-muted">{p.shortDescription}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Tinted stage behind a project's imagery: the only place project colour appears. */
function Stage({ tint, children, className = "" }: { tint: string; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-line p-5 sm:p-8 ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 0% 0%, ${tint}55, transparent 60%), linear-gradient(180deg, var(--surface), var(--bg-raised))`,
      }}
    >
      {children}
    </div>
  );
}

function WideFeature({ project, index, reverse }: { project: Project; index: number; reverse: boolean }) {
  const cover = coverImage(project);
  const admin = project.images.find((i) => i.kind === "admin");
  const phone = project.images.find((i) => i.kind === "mobile");
  return (
    <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <Reveal className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
        <Stage tint={project.tint}>
          <div className="relative pb-8 sm:pb-12">
            {cover && (
              <BrowserFrame
                image={cover}
                address={project.links.live ? hostOf(project.links.live) : undefined}
                sizes="(min-width: 1024px) 600px, 90vw"
              />
            )}
            {admin ? (
              <BrowserFrame
                image={admin}
                address="Admin · figures blurred"
                sizes="(min-width: 1024px) 300px, 50vw"
                nativeAspect
                className={`absolute bottom-0 w-[52%] ${reverse ? "left-0 -translate-x-2" : "right-0 translate-x-2"}`}
              />
            ) : (
              phone && (
                <PhoneFrame
                  image={phone}
                  sizes="140px"
                  className={`absolute bottom-0 w-[22%] ${reverse ? "left-2" : "right-2"}`}
                />
              )
            )}
          </div>
        </Stage>
      </Reveal>
      <Reveal className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
        <ProjectText project={project} index={index} />
      </Reveal>
    </article>
  );
}

function CompactFeature({ project, index }: { project: Project; index: number }) {
  const cover = coverImage(project);
  const phone = project.images.find((i) => i.kind === "mobile");
  return (
    <article className="flex h-full flex-col">
      <Stage tint={project.tint} className="mb-8">
        {cover ? (
          <div className="relative pb-6">
            <BrowserFrame
              image={cover}
              address={project.links.live ? hostOf(project.links.live) : undefined}
              sizes="(min-width: 1024px) 520px, 90vw"
              className="mr-[14%]"
            />
            {phone && (
              <PhoneFrame image={phone} sizes="120px" className="absolute bottom-0 right-0 w-[24%]" />
            )}
          </div>
        ) : (
          project.architecture && <ArchitectureDiagram layers={project.architecture} />
        )}
      </Stage>
      <ProjectText project={project} index={index} />
    </article>
  );
}

export function Projects() {
  const [first, second, ...others] = featuredProjects;
  const more = publishedProjects.filter((p) => !p.featured);
  return (
    <Section
      id="projects"
      index="01"
      eyebrow="Selected work"
      title="Websites and systems built for real businesses"
      intro="Two event companies and a study-abroad consultancy in Nepal, plus a full-stack academic application. Each case study sets out who it serves, what I built and the technology behind it."
      action={
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-text"
        >
          All projects
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      }
    >
      <div className="space-y-24 sm:space-y-28">
        {first && <WideFeature project={first} index={0} reverse={false} />}
        {second && <WideFeature project={second} index={1} reverse />}
        {others.length > 0 && (
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
            {others.map((p, i) => (
              <Reveal key={p.slug} className="h-full">
                <CompactFeature project={p} index={i + 2} />
              </Reveal>
            ))}
          </div>
        )}
        {more.length > 0 && (
          <Reveal>
            <MoreProjects projects={more} />
          </Reveal>
        )}
      </div>
    </Section>
  );
}
