import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import type { Project } from "@/types/content";
import { coverImage, getAdjacentProject, getProject, hostOf, publishedProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/metadata";
import { jsonLdScript } from "@/lib/jsonld";
import { SITE } from "@/lib/site";
import { PROFILE } from "@/data/profile";
import { BrowserFrame, PhoneFrame } from "@/components/Frames";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ExternalLink, StatusBadge, Tag, buttonStyles } from "@/components/ui";

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return pageMetadata({
    title: `${project.name} case study`,
    description: project.shortDescription,
    path: `/projects/${project.slug}`,
  });
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-line pt-8">
      <h2 id={`${id}-title`} className="font-display text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-5 space-y-4 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function Dash({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent/70" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function sectionsFor(p: Project) {
  return [
    p.overview && { id: "overview", title: "Overview" },
    p.problem && { id: "problem", title: "The problem" },
    p.contributions && { id: "contribution", title: "My contribution" },
    p.workflow && { id: "workflow", title: "User workflow" },
    p.features && { id: "features", title: "Features" },
    p.decisions && { id: "decisions", title: "Technical decisions" },
    p.challenges && { id: "challenges", title: "Challenges & solutions" },
    p.outcome && { id: "outcome", title: "Outcome" },
    p.images.length > 1 && { id: "screens", title: "Screens" },
  ].filter(Boolean) as { id: string; title: string }[];
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getAdjacentProject(project.slug);
  const cover = coverImage(project);
  const sections = sectionsFor(project);
  const desktopShots = project.images.filter((i) => i !== cover && i.kind !== "mobile");
  const mobileShots = project.images.filter((i) => i.kind === "mobile");
  const related = (project.related ?? []).map(getProject).filter((p) => p !== undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.shortDescription,
    url: `${SITE.url}/projects/${project.slug}`,
    creator: { "@type": "Person", name: PROFILE.name, url: SITE.url },
    keywords: project.stack.join(", "),
    ...(cover && { image: `${SITE.url}${cover.src}` }),
    ...(project.links.live && { sameAs: project.links.live }),
  };

  return (
    <article className="pb-24 pt-28 sm:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />

      <header className="container-page">
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-text"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          All projects
        </Link>
        <p className="eyebrow mt-8">{project.category}</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          {project.name}
        </h1>
        <div className="mt-5">
          <StatusBadge status={project.status} note={project.statusNote} />
        </div>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">{project.shortDescription}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.links.live && (
            <ExternalLink href={project.links.live} className={buttonStyles.primary}>
              Visit {hostOf(project.links.live)}
            </ExternalLink>
          )}
          {project.links.demo && (
            <ExternalLink href={project.links.demo} className={buttonStyles.secondary}>
              Live demo
            </ExternalLink>
          )}
          {project.links.github && (
            <ExternalLink href={project.links.github} className={buttonStyles.secondary}>
              Source code
            </ExternalLink>
          )}
          {project.links.extra?.map((l) => (
            <ExternalLink key={l.href} href={l.href} className={buttonStyles.secondary}>
              {l.label}
            </ExternalLink>
          ))}
        </div>

        {related.length > 0 && (
          <p className="mt-6 text-sm text-muted">
            Related:{" "}
            {related.map((r, i) => (
              <span key={r.slug}>
                {i > 0 && ", "}
                <Link
                  href={`/projects/${r.slug}`}
                  className="font-medium text-text underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent-soft"
                >
                  {r.name}
                </Link>
              </span>
            ))}
          </p>
        )}

        <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-bg-raised p-5">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">My role</dt>
            <dd className="mt-2 text-sm text-text">{project.role}</dd>
          </div>
          <div className="bg-bg-raised p-5">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
              {project.client ? "Client" : "Audience"}
            </dt>
            <dd className="mt-2 text-sm text-text">{project.client ?? project.audience}</dd>
          </div>
          <div className="bg-bg-raised p-5">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
              {project.period ? "Period" : "Status"}
            </dt>
            <dd className="mt-2 text-sm text-text">
              {project.period ?? [project.statusNote, project.status === "live" ? "Live" : null].filter(Boolean).join(" · ")}
            </dd>
          </div>
          <div className="bg-bg-raised p-5">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Stack</dt>
            <dd className="mt-3">
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </header>

      <div className="container-page mt-12">
        <div
          className="overflow-hidden rounded-2xl border border-line p-4 sm:p-10"
          style={{
            background: `radial-gradient(110% 90% at 0% 0%, ${project.tint}55, transparent 60%), linear-gradient(180deg, var(--surface), var(--bg-raised))`,
          }}
        >
          {cover ? (
            <BrowserFrame
              image={cover}
              address={project.links.live ? hostOf(project.links.live) : undefined}
              sizes="(min-width: 1280px) 1100px, 92vw"
              priority
              nativeAspect
            />
          ) : (
            project.architecture && (
              <div className="mx-auto max-w-xl">
                <ArchitectureDiagram layers={project.architecture} />
              </div>
            )
          )}
        </div>
      </div>

      <div className="container-page mt-16 grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-28">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">On this page</p>
            <ul className="mt-4 space-y-1 border-l border-line text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-muted transition-colors hover:border-accent hover:text-text">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="max-w-3xl space-y-14">
          {project.overview && (
            <Block id="overview" title="Overview">
              {project.overview.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {project.audience && (
                <p>
                  <span className="text-text">Who it serves: </span>
                  {project.audience}
                </p>
              )}
            </Block>
          )}

          {project.problem && (
            <Block id="problem" title="The problem">
              {project.problem.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Block>
          )}

          {project.contributions && (
            <Block id="contribution" title="My contribution">
              <Dash items={project.contributions} />
            </Block>
          )}

          {project.workflow && (
            <Block id="workflow" title="User workflow">
              <ol className="space-y-3">
                {project.workflow.map((step, i) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-xs text-accent-soft">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          {project.features && (
            <Block id="features" title="Features">
              <div className="grid gap-8 sm:grid-cols-2">
                {project.features.map((g) => (
                  <div key={g.group}>
                    <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">{g.group}</h3>
                    <div className="mt-4 text-[15px]">
                      <Dash items={g.items} />
                    </div>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {project.decisions && (
            <Block id="decisions" title="Technical decisions">
              <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 sm:[&>*:last-child:nth-child(odd)]:col-span-2">
                {project.decisions.map((d) => (
                  <div key={d.title} className="bg-bg-raised p-5">
                    <h3 className="font-medium text-text">{d.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed">{d.body}</p>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {project.challenges && (
            <Block id="challenges" title="Challenges & solutions">
              <div className="space-y-6">
                {project.challenges.map((c) => (
                  <div key={c.challenge} className="grid gap-3 rounded-xl border border-line p-5 sm:grid-cols-2 sm:gap-6">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Challenge</p>
                      <p className="mt-2 text-sm leading-relaxed">{c.challenge}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-soft">Solution</p>
                      <p className="mt-2 text-sm leading-relaxed text-text">{c.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {project.outcome && (
            <Block id="outcome" title="Outcome">
              <Dash items={project.outcome} />
            </Block>
          )}

          {project.images.length > 1 && (
            <Block id="screens" title="Screens">
              <div className="space-y-8">
                {desktopShots.map((img) => (
                  <div key={img.src}>
                    <BrowserFrame
                      image={img}
                      sizes="(min-width: 1024px) 760px, 92vw"
                      nativeAspect
                    />
                    {img.caption && <p className="mt-3 text-sm text-subtle">{img.caption}</p>}
                  </div>
                ))}
                {mobileShots.length > 0 && (
                  <div className="flex flex-wrap gap-6">
                    {mobileShots.map((img) => (
                      <div key={img.src} className="w-44">
                        <PhoneFrame image={img} sizes="176px" />
                        {img.caption && <p className="mt-3 text-sm text-subtle">{img.caption}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Block>
          )}

          {(project.confidentiality || project.basis) && (
            <aside className="flex gap-3 rounded-xl border border-line bg-bg-raised p-5 text-sm leading-relaxed text-muted">
              <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-accent-soft" />
              <div className="space-y-1">
                {project.confidentiality && <p>{project.confidentiality}</p>}
                {project.basis && <p>{project.basis}</p>}
              </div>
            </aside>
          )}
        </div>
      </div>

      {next && next.slug !== project.slug && (
        <div className="container-page mt-24">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-col gap-2 border-y border-line py-10 sm:flex-row sm:items-end sm:justify-between"
          >
            <span>
              <span className="eyebrow block">Next project</span>
              <span className="mt-3 block font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent-soft sm:text-4xl">
                {next.name}
              </span>
            </span>
            <ArrowRight
              size={28}
              aria-hidden="true"
              className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-text"
            />
          </Link>
        </div>
      )}
    </article>
  );
}
