import Link from "next/link";
import { publishedProjects } from "@/lib/projects";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col justify-center pb-20 pt-32">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">This page doesn’t exist</h1>
      <p className="mt-4 max-w-xl text-muted">
        The link may be outdated, or the page may have moved. Here are some places to start instead.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/projects" variant="secondary">
          All projects
        </ButtonLink>
      </div>
      {publishedProjects.length > 0 && (
        <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {publishedProjects.map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`} className="text-muted underline-offset-4 hover:text-text hover:underline">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
