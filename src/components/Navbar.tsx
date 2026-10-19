"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";

// Only real project URLs highlight "Projects". An unknown slug is rewritten to the 404
// page on the server, so matching it here would make server and client markup differ.
const projectPaths = new Set([
  "/projects",
  ...PROJECTS.filter((p) => p.published).map((p) => `/projects/${p.slug}`),
]);

function ResumeButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={SITE.resumePdf}
      download={SITE.resumeFileName}
      className={`inline-flex min-h-10 items-center gap-2 rounded-full border border-accent/50 px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-accent/15 ${className}`}
    >
      <Download size={16} aria-hidden="true" />
      Resume
      <span className="sr-only">(PDF)</span>
    </a>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view (home page only).
  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const link of NAV_LINKS) {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [onHome]);

  // Mobile menu: focus the first link, close on Escape (returning focus), lock page scroll,
  // and close if the viewport grows to the desktop layout.
  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onChange);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onChange);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const isCurrent = (id: string) =>
    onHome ? active === id : id === "projects" && projectPaths.has(pathname);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 print:hidden ${
        scrolled || open ? "border-line bg-bg/90 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${PROFILE.name}, home`}>
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-md border border-line-strong font-display text-sm font-bold tracking-tight transition-colors group-hover:border-accent/70"
          >
            {PROFILE.initials}
          </span>
          <span className="hidden font-display text-[15px] font-semibold tracking-tight sm:block">
            {PROFILE.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => {
            const current = isCurrent(link.id);
            return (
              <li key={link.id}>
                <Link
                  href={link.href}
                  aria-current={current ? (onHome ? "location" : "page") : undefined}
                  className={`relative block px-3 py-2 text-sm transition-colors hover:text-text ${
                    current ? "text-text" : "text-muted"
                  }`}
                >
                  {link.label}
                  {current && <span aria-hidden="true" className="absolute inset-x-3 -bottom-px h-px bg-accent" />}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <ResumeButton />
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="grid size-11 place-items-center rounded-md border border-line-strong text-text lg:hidden"
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg px-5 pb-8 pt-2 lg:hidden"
      >
        <ul className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-line py-3 font-display text-xl text-text"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/resume"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center border-b border-line py-3 font-display text-xl text-text"
            >
              Resume
            </Link>
          </li>
        </ul>
        <div className="mt-6">
          <ResumeButton />
        </div>
      </div>
    </header>
  );
}
