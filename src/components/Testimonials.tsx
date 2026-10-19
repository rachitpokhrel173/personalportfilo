import { TESTIMONIALS } from "@/data/testimonials";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

// Renders nothing until at least one testimonial is approved in src/data/testimonials.ts.
export function Testimonials() {
  const approved = TESTIMONIALS.filter((t) => t.approved);
  if (approved.length === 0) return null;

  return (
    <Section id="testimonials" eyebrow="Client words" title="What clients say">
      <ul className="grid gap-6 lg:grid-cols-3">
        {approved.map((t) => (
          <li key={t.name}>
            <Reveal className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-bg-raised p-6">
                <blockquote className="flex-1 text-sm leading-relaxed text-muted">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-5">
                  <span className="block text-sm font-medium text-text">{t.name}</span>
                  <span className="block text-xs text-muted">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
