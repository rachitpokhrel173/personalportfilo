import type { ReactNode } from "react";

type Props = {
  id: string;
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Section({ id, index, eyebrow, title, intro, action, children, className = "" }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`py-20 sm:py-28 ${className}`}>
      <div className="container-page">
        <div className="mb-12 grid gap-6 border-t border-line pt-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow flex items-center gap-3">
              {index && <span className="text-subtle">{index}</span>}
              {index && <span className="h-px w-6 bg-line-strong" aria-hidden="true" />}
              {eyebrow}
            </p>
            <h2
              id={`${id}-heading`}
              className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]"
            >
              {title}
            </h2>
            {intro && <div className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{intro}</div>}
          </div>
          {action}
        </div>
        {children}
      </div>
    </section>
  );
}
