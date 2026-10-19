import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ProjectStatus } from "@/types/content";
import { STATUS_LABEL } from "@/lib/projects";

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200";

export const buttonStyles = {
  primary: `${buttonBase} bg-accent-strong text-white hover:bg-accent`,
  secondary: `${buttonBase} border border-line-strong text-text hover:border-accent/70 hover:bg-surface`,
  ghost: `${buttonBase} px-3 text-muted hover:text-text`,
} as const;

/** External link that always opens safely in a new tab and says so to screen readers. */
export function ExternalLink({
  href,
  children,
  className,
  showIcon = true,
  ...rest
}: ComponentProps<"a"> & { href: string; showIcon?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
      {showIcon && <ArrowUpRight size={15} aria-hidden="true" className="shrink-0" />}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: { href: string; variant?: keyof typeof buttonStyles; children: ReactNode; className?: string } & Omit<
  ComponentProps<typeof Link>,
  "href" | "className"
>) {
  return (
    <Link href={href} className={`${buttonStyles[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

const statusTone: Record<ProjectStatus, string> = {
  live: "bg-success",
  completed: "bg-success",
  "in-progress": "bg-warning",
  "not-deployed": "bg-subtle",
};

export function StatusBadge({ status, note }: { status: ProjectStatus; note?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/60 px-2.5 py-1 font-mono text-[11px] text-muted">
      <span aria-hidden="true" className={`size-1.5 rounded-full ${statusTone[status]}`} />
      <span>
        <span className="text-text">{STATUS_LABEL[status]}</span>
        {note && <span> · {note}</span>}
      </span>
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-md border border-line px-2 py-1 font-mono text-[11px] leading-none text-muted">
      {children}
    </li>
  );
}
