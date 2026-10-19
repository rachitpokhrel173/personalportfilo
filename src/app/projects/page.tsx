import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { coverImage, hostOf, publishedProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/metadata";
import { ExternalLink, StatusBadge, Tag } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Business websites, admin systems and full-stack applications by Rachit Pokhrel, with case studies covering scope, contribution, technology and outcomes.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <header className="container-page">
        <p className="eyebrow">Project archive</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          All projects
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Every project here has a case study covering what it is, who it serves, what I built and which
          technologies were used.
        </p>
      </header>

      <div className="container-page mt-16">
        {publishedProjects.length === 0 ? (
          <p className="rounded-xl border border-line bg-bg-raised p-8 text-muted">
            Projects are being prepared. Please check back soon.
          </p>
        ) : (
          <ol className="divide-y divide-line border-y border-line">
            {publishedProjects.map((p, i) => {
              const cover = coverImage(p);
              return (
                <li key={p.slug} className="grid gap-6 py-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-10">
                  <Link
                    href={`/projects/${p.slug}`}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="relative block aspect-[16/10] overflow-hidden rounded-xl border border-line"
                    style={{ background: `linear-gradient(135deg, ${p.tint}66, var(--surface))` }}
                  >
                    {cover ? (
                      <Image
                        src={cover.src}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 280px, 90vw"
                        className="object-cover object-top"
                      />
                    ) : (
                      <span className="absolute inset-0 grid place-items-center p-6 text-center font-mono text-xs text-muted">
                        {p.stack.slice(0, 4).join(" · ")}
                      </span>
                    )}
                  </Link>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                      <span className="eyebrow">{p.category}</span>
                    </div>
                    <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                      <Link href={`/projects/${p.slug}`} className="transition-colors hover:text-accent-soft">
                        {p.name}
                      </Link>
                    </h2>
                    <div className="mt-3">
                      <StatusBadge status={p.status} note={p.statusNote} />
                    </div>
                    <p className="mt-4 max-w-2xl leading-relaxed text-muted">{p.shortDescription}</p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                      {p.stack.slice(0, 8).map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="inline-flex min-h-11 items-center gap-2 text-text hover:text-accent-soft"
                      >
                        Case study
                        <ArrowRight size={16} aria-hidden="true" />
                        <span className="sr-only">: {p.name}</span>
                      </Link>
                      {p.links.live && (
                        <ExternalLink
                          href={p.links.live}
                          className="inline-flex min-h-11 items-center gap-1.5 text-muted hover:text-text"
                        >
                          {hostOf(p.links.live)}
                        </ExternalLink>
                      )}
                      {p.links.github && (
                        <ExternalLink
                          href={p.links.github}
                          className="inline-flex min-h-11 items-center gap-1.5 text-muted hover:text-text"
                        >
                          Source code
                        </ExternalLink>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}
