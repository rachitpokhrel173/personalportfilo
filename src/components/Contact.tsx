import { Mail, MapPin } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { GithubIcon, LinkedinIcon } from "./icons";

const AUDIENCES = [
  { who: "Recruiters & hiring teams", what: "Full-stack and web developer opportunities." },
  { who: "Businesses", what: "Websites, booking and inquiry flows, admin dashboards." },
  { who: "Collaborators", what: "Web projects where a full-stack developer can help." },
];

const row =
  "group inline-flex min-h-11 items-center gap-3 text-text transition-colors hover:text-accent-soft";
const icon =
  "grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors group-hover:border-accent/70";

export function Contact() {
  return (
    <Section
      id="contact"
      index="07"
      eyebrow="Contact"
      title="Let’s build something useful"
      intro="Whether you are hiring, need a website or system for your business, or want to collaborate, send me a message and I’ll reply by email."
    >
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <dl className="space-y-5">
            {AUDIENCES.map((a) => (
              <div key={a.who} className="border-l-2 border-accent/40 pl-4">
                <dt className="font-medium text-text">{a.who}</dt>
                <dd className="mt-0.5 text-sm text-muted">{a.what}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-10 space-y-3 text-sm">
            <li>
              <a href={`mailto:${PROFILE.email}`} className={row}>
                <span className={icon}>
                  <Mail size={17} aria-hidden="true" />
                </span>
                {PROFILE.email}
              </a>
            </li>
            <li>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className={row}>
                <span className={icon}>
                  <GithubIcon className="size-[17px]" />
                </span>
                github.com/{PROFILE.githubHandle}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            {PROFILE.linkedin && (
              <li>
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className={row}>
                  <span className={icon}>
                    <LinkedinIcon className="size-[17px]" />
                  </span>
                  LinkedIn
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            )}
            <li className="inline-flex min-h-11 items-center gap-3 text-text">
              <span className={icon}>
                <MapPin size={17} aria-hidden="true" />
              </span>
              {PROFILE.location}
            </li>
          </ul>
        </Reveal>

        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
