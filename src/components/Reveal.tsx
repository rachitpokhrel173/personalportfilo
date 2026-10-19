import type { ReactNode } from "react";

// Subtle fade-and-rise as content scrolls into view, done in CSS (see `.reveal` in
// globals.css). Content is always visible without it: browsers without scroll-driven
// animations, reduced-motion users and no-JS visitors simply see the static page.
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}
