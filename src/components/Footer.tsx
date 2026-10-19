import Link from "next/link";
import { cacheLife } from "next/cache";
import { Download, Mail } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { PROFILE } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";

// Cached for a day so the year updates without a redeploy, and the page stays static.
async function Year() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const social =
  "grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/70 hover:text-text";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-raised/40 print:hidden">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_auto] md:items-start">
        <div>
          <p className="font-display text-xl font-semibold tracking-tight">{PROFILE.name}</p>
          <p className="mt-1 text-sm text-muted">
            {PROFILE.title} · {PROFILE.location}
          </p>
          <a
            href={SITE.resumePdf}
            download={SITE.resumeFileName}
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent-soft transition-colors hover:text-text"
          >
            <Download size={16} aria-hidden="true" />
            Download resume (PDF)
          </a>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-muted">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <Link href={link.href} className="inline-flex min-h-9 items-center transition-colors hover:text-text">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/projects" className="inline-flex min-h-9 items-center transition-colors hover:text-text">
                All projects
              </Link>
            </li>
            <li>
              <Link href="/resume" className="inline-flex min-h-9 items-center transition-colors hover:text-text">
                Resume
              </Link>
            </li>
          </ul>
        </nav>

        <ul className="flex items-center gap-3">
          <li>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className={social}>
              <GithubIcon className="size-4" />
              <span className="sr-only">GitHub (opens in a new tab)</span>
            </a>
          </li>
          {PROFILE.linkedin && (
            <li>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className={social}>
                <LinkedinIcon className="size-4" />
                <span className="sr-only">LinkedIn (opens in a new tab)</span>
              </a>
            </li>
          )}
          <li>
            <a href={`mailto:${PROFILE.email}`} className={social}>
              <Mail size={16} aria-hidden="true" />
              <span className="sr-only">Email {PROFILE.email}</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="border-t border-line py-6">
        <p className="container-page text-xs text-subtle">
          © <Year /> {PROFILE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
