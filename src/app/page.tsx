import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { About } from "@/components/About";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { jsonLdScript, personJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { PROFILE } from "@/data/profile";

export const metadata: Metadata = pageMetadata({
  title: `${PROFILE.name} | ${PROFILE.title}`,
  absoluteTitle: true,
  description: `${PROFILE.name} is a full-stack developer based in Japan who builds business websites and the admin systems behind them, using Next.js, React, TypeScript and Supabase.`,
  path: "/",
});

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript([personJsonLd, websiteJsonLd])} />
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Education />
      <About />
      <Process />
      <Testimonials />
      <Contact />
    </>
  );
}
