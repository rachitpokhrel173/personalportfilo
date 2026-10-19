import { PROFILE } from "@/data/profile";
import { EDUCATION } from "@/data/experience";
import { SITE } from "@/lib/site";
import { skillGroups } from "@/lib/skills";

// Structured data. Only factual fields; no reviews, ratings or invented business details.

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE.url}/#person`,
  name: PROFILE.name,
  jobTitle: PROFILE.title,
  url: SITE.url,
  email: `mailto:${PROFILE.email}`,
  image: `${SITE.url}/images/about.webp`,
  homeLocation: { "@type": "Country", name: PROFILE.location },
  sameAs: [PROFILE.github, ...(PROFILE.linkedin ? [PROFILE.linkedin] : [])],
  alumniOf: EDUCATION.filter((e) => e.status === "completed").map((e) => ({
    "@type": "EducationalOrganization",
    name: e.institution,
  })),
  knowsAbout: skillGroups.flatMap((g) => g.skills.filter((s) => s.status === "delivered").map((s) => s.name)),
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: PROFILE.name,
  inLanguage: "en",
  author: { "@id": `${SITE.url}/#person` },
};

/** Serialise for a <script type="application/ld+json"> tag, escaping "<" per Next.js guidance. */
export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
