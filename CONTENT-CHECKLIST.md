# Content checklist (internal: never rendered on the site)

Status key: ✅ confirmed and published · ⏳ missing or awaiting approval (not published) · 🔒 deliberately withheld

Last reviewed: 19 Oct 2026

## Identity & contact

| Item | Status | Source / note |
| --- | --- | --- |
| Name, title "Full-Stack Developer", location Japan | ✅ | Brief |
| Email `rachitpokhrel123@gmail.com` (public, site + resume + contact form) | ✅ | Confirmed by you on 19 Oct 2026. Replaces `rachitpokhrel173@gmail.com`, which no longer appears anywhere. |
| GitHub `github.com/rachitpokhrel173` | ✅ | Profile exists (HTTP 200). **Confirm it's yours and approved.** |
| LinkedIn | ⏳ | Not provided. Set `PROFILE.linkedin` in `src/data/profile.ts`. |
| Domain `rachitpokhrel.com.np` | ✅ | Live. Used for canonical URLs and the PDF. |
| Address, phone, date of birth, photo from the Japanese resume | 🔒 | Never published. |
| Portrait (`public/images/about.webp`) | ⏳ | Real photo from the previous site, shown in About. **Confirm you approve it.** The previous suit/sunglasses hero image is no longer used. |
| Own biography wording | ⏳ | Draft in `PROFILE.about`, built only from confirmed facts. Replace it with your own words whenever you like. |

## Employment

| Item | Status | Note |
| --- | --- | --- |
| Discovery Pathway Pvt. Ltd., Nepal, Mar 2025 – present | ✅ | Japanese resume |
| Counseling + documentation (Mar 2025 – Sep 2026) → remote documentation (Sep 2026 – present) | ✅ | Japanese resume |
| Official job title | ⏳ | Shown as "Student Counseling & Documentation" (a description, not a title). The previous site said "Documentation Officer" and "started as a receptionist"; neither is confirmed, so both were removed. |
| Freelance / independent development as an employment entry (dates, arrangement) | ⏳ | The previous site said "Freelance 2024 – Present". Not confirmed, so projects appear under "Independent development" without a date range. |

## Education & qualifications

| Item | Status |
| --- | --- |
| Kabhre Secondary School, SEE (Grade 10), 2022 | ✅ |
| Siddhartha English Secondary School, +2 Science, Jul 2022 – Aug 2024 | ✅ (subjects not listed; the old site's "Physics, Chemistry, Maths, Computer Science" is unconfirmed) |
| ISI Language School, Osaka campus, from Oct 2026 | ✅ |
| IELTS 6.0 overall (2024) | ✅ |
| Japanese: studying, JLPT not yet taken | ✅ |
| Native language(s) (e.g. Nepali) | ⏳ Not stated in the brief; add to `LANGUAGES` if wanted. |
| Driving licence (Nepal, car & motorcycle, Aug 2023) | 🔒 Omitted as not relevant to a developer portfolio. Add it if you want it. |
| Certifications | ⏳ None provided |

## Projects

| Project | Status | Evidence used | Still needed |
| --- | --- | --- | --- |
| Floral Roots & Decor | ✅ published | Source code (`Project - 1 (Floral)`), live site, handover certificate (29 Sep 2026) | Start date; permission to name the client publicly (implied by the handover doc's portfolio clause; confirm). |
| Timeless Ties Events & Decor | ✅ published, marked In progress | Source code (`Project - 3 (Timeless)`), live site, status report (10 Oct 2026) | Start date; update status to Completed when launched. The admin URL is deliberately **not** linked. |
| Discovery Pathway | ✅ published | Source code (`Project - 2 (Discovery)`), live site | Project dates. |
| Discovery Pathway Admin Portal | ✅ published, Live · Private staff portal | Confirmed by you; source code (`Project for Later/discoverypathway.edu.np/admin.discoverypathway.edu.np`), live sign-in page, your dashboard screenshot | Dates; whether it was built as part of your job or as separate work. |
| Conference Management System | ✅ published, "Not publicly deployed · Academic project" | **Brief only**: the source code was not found on this machine | Source/repo or demo link; completion status per feature; whether security measures were tested; team or solo; course/institution and dates. |
| Nagarkot Network | ✅ published, Live | Confirmed by you; source code (`Project for Later/Nagarkot Network`), live site, your screenshots | Dates (git history: Jan–Mar 2026); permission to name the outlet. Facebook auto-sync is described as built but not connected. |
| Japanese Mastery | ✅ published, Under development | Confirmed by you; source code (`Project - 5 (Learn Japanese)`), live site | Nothing blocking. |
| GP Pathway CRM | ✅ published, Under development · Team project | Confirmed by you; source code (`Project for Later/global-pathway`, `gp-crm-admin`), live sign-in pages | **Confirm your role.** Git history shows a collaborator (Prashant Sharma) wrote 15 of the 19 commits in the shared repo, including the eSewa/Khalti payment work. The case study says you built the first version and continued with a collaborator. Also confirm the client relationship (`gp-crm-admin` README says it was built for Discovery Pathway). |
| Vyapar ERP | ✅ published, Under development · Interactive demo | Confirmed by you; source code (`Project - 4 (Demo)/vyapar-erp`), live demo | Whether it was for a specific client. All figures in the screenshot are generated sample data. |
| RIZZ APP | ✅ published, Live · Personal project | Confirmed by you; live app, public GitHub repo | The live page logs a JavaScript error on load (`Cannot read properties of null (reading 'addEventListener')`, around line 694); the visible features still work in the screenshot. |
| GitHub repositories for any project | ⏳ | None provided | Add to `links.github` |

## Testimonials

All three testimonials from the previous site (Discovery Pathway ×2, Nagarkot Network) are kept in `src/data/testimonials.ts` with `approved: false`, so **the section is hidden**. Before approving one, confirm the person wrote or approved the wording and agreed to be named. Two of them mention the Discovery Pathway admin portal, which is now confirmed and published.

## Skills

Skills are derived from project stacks (`src/data/skills.ts`). Anything used only in Timeless Ties or the Conference system is marked "in development" on the site and with * in the PDF.

| Item | Status |
| --- | --- |
| Technologies you are learning | ⏳ Add to `LEARNING` in `src/data/skills.ts` |
| PostgreSQL, Supabase, Next.js, React, TypeScript, Tailwind, etc. | ✅ verified in source code |
| Node.js, Express, MySQL, Vite, React Router | ✅ but evidence is the brief only (Conference system) |

## Images

| Image | Note |
| --- | --- |
| Public-site screenshots (`public/images/projects/*-home`, `-mobile`, `-packages`, `-catalogue`, `-inquiry`, `-cost-calculator`) | Captured from the live sites on 19 Oct 2026. Timeless Ties' launch-offer popup was dismissed before capture. |
| `floral-admin.webp`, `timeless-admin.webp` | Business figures blurred. Unblurred originals are only in `originals/` (git-ignored). |
| `nagarkot-home`, `nagarkot-admin`, `japanese-mastery-home`, `vyapar-dashboard`, `gpcrm-login`, `discovery-admin-dashboard`, `rizz-home` | From your screenshots (19 Oct 2026), converted to 1600px WebP. Nagarkot's phone number and the install popup were removed (blur and crop); the GP CRM support email is blurred. Originals are in `originals/new/`. Your 8th screenshot was a duplicate of the GP CRM sign-in page and isn't used. |
| `nagarkot-mobile`, `japanese-mastery-mobile`, `rizz-mobile` | Captured from the live sites on 19 Oct 2026. |
| Not available | No inside screenshots of Japanese Mastery, GP CRM (staff dashboard) or the Discovery admin portal beyond its dashboard; these need a sign-in. |
