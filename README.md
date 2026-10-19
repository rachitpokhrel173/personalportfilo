# Rachit Pokhrel — Portfolio

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 · Zod · React Hook Form · Resend · @react-pdf/renderer

## Run it

```bash
npm install
npm run dev         # http://localhost:3000
npm run build       # regenerates the resume PDF, then builds
npm run start       # serve the production build
npm run lint
npm run typecheck   # run `npx next typegen` first on a fresh clone
npm run resume      # regenerate public/Rachit-Pokhrel-Resume.pdf only
```

Requires Node 20.9+ (tested on Node 24).

## Routes

| Route | What |
| --- | --- |
| `/` | Home: hero, selected work, experience, skills, education, about, how I work, contact |
| `/projects` | Project archive |
| `/projects/[slug]` | Case study (static; unknown or unpublished slugs return a real 404 via `src/proxy.ts`) |
| `/resume` | Web resume with PDF download and print |
| `/Rachit-Pokhrel-Resume.pdf` | Generated PDF resume |
| `/api/contact` | Contact form endpoint (validation, honeypot, rate limit, Resend) |
| `/sitemap.xml`, `/robots.txt`, `opengraph-image` | SEO |

## Where content lives

All content is data. Pages never hard-code personal facts.

| What | File |
| --- | --- |
| Name, headline, summary, bio, email, GitHub, LinkedIn, languages | `src/data/profile.ts` |
| Projects and case studies | `src/data/projects.ts` |
| Employment and education | `src/data/experience.ts` |
| Skills (linked to projects as evidence) | `src/data/skills.ts` |
| "How I work" steps | `src/data/process.ts` |
| Testimonials (hidden until `approved: true`) | `src/data/testimonials.ts` |
| Site URL, nav, contact-form recipient | `src/lib/site.ts` |
| Colours and design tokens | `src/app/globals.css` (`:root`) |
| What is confirmed or still missing | `CONTENT-CHECKLIST.md` (internal, never rendered) |

The website, `/resume` and the PDF all read the same data through `src/lib/resume.ts`, so they stay in sync.

## Add a project

1. Save screenshots (about 1440px wide, `.webp`) in `public/images/projects/`. Blur any client or financial data first.
2. Add an entry to `PROJECTS` in `src/data/projects.ts`. Required: `slug`, `name`, `shortDescription`, `category`, `status`, `links`, `stack`, `tint`, `featured`, `order`, `published`, `images`. A published project also needs a `role`. Case-study sections (`overview`, `problem`, `contributions`, `features`, `decisions`, `challenges`, `outcome`, `workflow`, `architecture`) render only when present.
3. Set `published: true`. `featured: true` puts it in Selected Work and on the resume.

The data is validated with Zod at build time (`src/lib/projects.ts`), so a malformed entry fails the build with a readable message. Skills update automatically from project stacks.

## Contact form email (Resend)

1. Create a Resend account and an API key.
2. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`.
3. Messages go to `SITE.contactTo` in `src/lib/site.ts` (or `CONTACT_TO`).

Resend's default sender can only deliver to your Resend sign-up address. To send from your domain, verify it in Resend and set `CONTACT_FROM`, e.g. `Portfolio <hello@rachitpokhrel.com.np>`.

Until a key is set, the form validates input and then tells visitors to email you directly. It never shows a fake "sent" message.

## Deploy (Vercel)

1. Push to GitHub and import the repository on Vercel (framework: Next.js).
2. Set environment variables: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY` (and optionally `CONTACT_FROM`, `CONTACT_TO`).
3. Add the domain in Project Settings → Domains.
4. Optional: enable Web Analytics (the `@vercel/analytics` component is already in the layout).

## Notes

- Dark theme only, by design. Scroll reveals use CSS scroll-driven animations: no JavaScript, and disabled for `prefers-reduced-motion`.
- `originals/` holds unprocessed source images (including unblurred admin screenshots). It is git-ignored and not served.
- `next dev` may re-create `AGENTS.md`; that is expected.
- `npm audit` advisories are in ESLint's dev-only dependency chain. Don't run `npm audit fix --force`.
