import type { Project } from "@/types/content";

// Project dataset. To add a project: append an entry, put screenshots in
// /public/images/projects/, and set `published: true`. The first `desktop` image is the cover.
//
// Every claim here is backed by the project's source code, its live site, or its
// handover/status documents. Unconfirmed details stay out (see CONTENT-CHECKLIST.md).

export const PROJECTS: Project[] = [
  {
    slug: "floral-roots-decor",
    name: "Floral Roots & Decor",
    shortDescription:
      "Event decoration website with online booking and quotations, plus a full admin system for bookings, invoicing, payments, inventory and staff.",
    category: "Business website + admin system",
    status: "completed",
    statusNote: "Handed over Sep 2026",
    client: "Floral Roots & Decor, an event decoration studio in Nepal",
    links: { live: "https://www.floralrootsdecor.com.np" },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "TanStack Query",
      "React Hook Form",
      "Zod",
      "Radix UI",
      "Vercel",
    ],
    tint: "#1f5a43",
    featured: true,
    order: 1,
    published: true,
    role: "Designed, built, tested and handed over the public website and the admin system.",
    overview: [
      "Floral Roots & Decor designs decoration for weddings, engagements, birthdays and other celebrations across Nepal. I built their public website and the admin system the studio uses to run bookings, from first inquiry to final payment.",
      "The project was completed, tested on desktop and mobile, and handed over to the client in September 2026.",
    ],
    audience:
      "People planning weddings and celebrations, who browse designs and packages and book online, and studio staff, who manage the work behind each booking.",
    problem: [
      "The studio needed two things: a public site that presents its designs and packages and accepts booking requests, and an internal system for everything that follows a booking, including quotations, invoices, payments, scheduling, stock and staff.",
    ],
    contributions: [
      "Designed the layout and interface of the public site and the admin panel.",
      "Built the public pages, booking form, contact form and online quotation page.",
      "Designed the PostgreSQL schema, access policies and storage in Supabase through versioned SQL migrations.",
      "Built the admin modules: dashboard, bookings, inquiries, calendar, pipeline, customers, quotations, invoices, payments, staff, inventory, vendors and reports.",
      "Tested the website and admin panel on desktop and mobile before handover.",
    ],
    features: [
      {
        group: "Public website",
        items: [
          "Home, Services, Designs gallery, Packages, About and Contact pages",
          "Online event booking form with a confirmation page",
          "Contact form whose messages arrive in the admin inbox",
          "Wedding packages with pricing",
          "Online quotation page where clients can view, download and accept a quote",
          "WhatsApp and phone contact links",
          "Sitemap, robots.txt and page metadata",
        ],
      },
      {
        group: "Admin system",
        items: [
          "Staff sign-in with roles",
          "Dashboard with “needs attention” alerts and upcoming events",
          "Bookings, inquiries, calendar and a pipeline board",
          "Calendar dates in both the Gregorian and Nepali (Bikram Sambat) calendars",
          "Customer profiles with notes and history",
          "Quotations, invoices, payments and printable receipts",
          "Staff, tasks, inventory and vendor management",
          "Reports with CSV export, notifications and company settings",
          "Works on mobile phones as well as desktop",
        ],
      },
    ],
    decisions: [
      {
        title: "One managed backend",
        body: "Supabase provides the PostgreSQL database, authentication, file storage and realtime updates. The schema is managed through 14 versioned SQL migrations, so every database change can be reviewed and reproduced.",
      },
      {
        title: "Shareable quotations without accounts",
        body: "Each quotation gets its own share token. Clients open a private link to view, download and accept their quote without creating an account.",
      },
      {
        title: "Local calendar support",
        body: "Many events in Nepal are planned in the Bikram Sambat calendar, so the admin shows BS dates next to Gregorian ones.",
      },
    ],
    challenges: [
      {
        challenge:
          "The public booking form failed silently. Postgres row-level security filters the rows an INSERT … RETURNING gives back through SELECT policies, so the insert succeeded but the app never received the new booking’s ID.",
        solution:
          "Adding a public read policy would have exposed every customer’s details through the public API key. Instead I wrote a database function that inserts the booking and its services in a single transaction and returns only the booking ID and reference code.",
      },
      {
        challenge:
          "Creating a quotation failed with “permission denied for sequence”. Reference numbers such as QT-… come from database sequences, and permission to insert into a table doesn’t include permission to use the sequences its defaults read from.",
        solution:
          "A follow-up migration granted the specific sequence privileges the affected roles needed, fixing the latent version of the same problem for invoices and bookings too.",
      },
    ],
    outcome: [
      "Live on the client’s own domain and handed over in September 2026.",
      "Tested on desktop and mobile, including the booking and contact forms, admin sign-in and every admin section listed above.",
    ],
    images: [
      {
        src: "/images/projects/floral-home.webp",
        alt: "Floral Roots & Decor homepage: a decorated wedding stage behind the headline “We design the moments you’ll never forget.”",
        width: 1440,
        height: 900,
        kind: "desktop",
        caption: "Homepage",
      },
      {
        src: "/images/projects/floral-packages.webp",
        alt: "Floral Roots & Decor packages page introducing event packages with starting prices",
        width: 1440,
        height: 900,
        kind: "desktop",
        caption: "Packages",
      },
      {
        src: "/images/projects/floral-mobile.webp",
        alt: "Floral Roots & Decor homepage on a phone",
        width: 780,
        height: 1688,
        kind: "mobile",
        caption: "Mobile homepage",
      },
      {
        src: "/images/projects/floral-admin.webp",
        alt: "Floral Roots admin dashboard with quick actions and summary cards; all figures are blurred",
        width: 1600,
        height: 574,
        kind: "admin",
        caption: "Admin dashboard (figures blurred)",
      },
    ],
    confidentiality:
      "The admin panel is private. Figures in the admin screenshot are blurred and no customer data is shown.",
    basis:
      "Based on the project’s source code, the live website and the project handover document.",
    resumeBullets: [
      "Built a public website with online booking, a contact form and shareable quotation pages, plus an admin system for bookings, quotations, invoices, payments, inventory, staff and reports.",
      "Modelled the data in PostgreSQL (Supabase) through 14 SQL migrations with row-level security, and fixed a booking-insert issue with a transactional database function so customer data stays private.",
      "Tested on desktop and mobile and handed over to the client in September 2026.",
    ],
  },
  {
    slug: "timeless-ties-events-decor",
    name: "Timeless Ties Events & Decor",
    shortDescription:
      "Wedding and event décor website with an inquiry flow and client quotation links, backed by an admin system for sales, bookings, operations, finance and website content.",
    category: "Business website + admin system",
    status: "in-progress",
    statusNote: "Public site live, admin in active development",
    client: "Timeless Ties Events & Decor, a wedding and event décor company in Kathmandu",
    links: {
      live: "https://www.timelesstieevents.com.np",
      extra: [{ label: "Inquiry page", href: "https://www.timelesstieevents.com.np/inquiry" }],
    },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Drizzle ORM",
      "Zod",
      "React PDF",
      "Resend",
      "Vercel",
    ],
    tint: "#6b1d39",
    featured: true,
    order: 2,
    published: true,
    role: "Built the public website, the admin system, the inquiry workflow and the Supabase backend, and set up deployment and the custom domain.",
    overview: [
      "Timeless Ties Events & Decor creates wedding and event décor in Kathmandu. The project combines a public website with an admin system that covers the business from first inquiry to final payment.",
      "The public website is live on the company’s domain. The admin system is built and still in active development and testing.",
    ],
    audience:
      "Couples and families planning weddings and celebrations, and the company’s team, who manage leads, quotations, bookings, events and finances.",
    problem: [
      "An events business tracks a lot of information for each celebration: the inquiry, the quotation and its revisions, the advance payment, the event day plan, stock, vendors and staff. The project brings all of it into one system, connected to the public website where inquiries begin.",
    ],
    contributions: [
      "Built the public pages: Home, About, Services, Catalogue & price list, Gallery, Contact and Inquiry.",
      "Built the admin modules for sales, quotations, bookings and events, operations, finance and website content.",
      "Designed the PostgreSQL schema and row-level security policies in Supabase, with a script that tests what each role can read and write.",
      "Set up authentication: invitations, password reset, roles and permissions.",
      "Deployed the site on Vercel and configured the custom domain, with www as the canonical address.",
    ],
    features: [
      {
        group: "Public website",
        items: [
          "Catalogue with prices, grouped into décor, Baja & music, tentage, lights & sound and rentals",
          "Gallery organised by occasion",
          "Full event inquiry form; “Enquire” on a catalogue design pre-fills the message with that design and its price",
          "Date availability hint (“looks open”, “popular date”, “very busy”) that never reveals counts or client details",
          "Private client quotation page: view, download as PDF, accept online, ask for changes or decline, without logging in",
          "Sitemap, robots.txt, social share image, web app manifest and page metadata",
        ],
      },
      {
        group: "Admin system",
        items: [
          "Dashboard with customisable widgets",
          "Leads, pipeline board, inquiries, follow-ups and customers",
          "Quotation editor with versions, sending, client links, PDF output and conversion to a booking",
          "Bookings and events with tasks, timelines, design approvals, a calendar and a printable event day sheet",
          "Inventory with reservations, packages, vendors, staff and tasks",
          "Invoices, payments, receipts, expenses, reports, and CSV import and export",
          "Website editor for content sections, gallery albums, services, testimonials and the media library",
          "Users, roles and permissions, notifications and an activity log",
        ],
      },
    ],
    decisions: [
      {
        title: "Security enforced in the database",
        body: "Access rules live in PostgreSQL row-level security policies rather than only in the app. A dedicated test script creates temporary users for each role, checks what each one can read and write, and rolls everything back.",
      },
      {
        title: "Rate limiting that works on serverless hosting",
        body: "Public forms are rate-limited through a database-backed counter, so the limit holds across serverless instances instead of resetting with each one.",
      },
      {
        title: "Transparent email outbox",
        body: "Every outgoing email, including quotations, acceptances, receipts and reminders, is recorded in an outbox. If the email provider isn’t configured, the message is marked as not sent, so staff can see exactly what would have gone out.",
      },
      {
        title: "Privacy-aware availability",
        body: "The inquiry form helps people choose a date without exposing the calendar. It shows a coarse hint, never a booking count or another client’s details.",
      },
    ],
    challenges: [
      {
        challenge:
          "Clients needed to accept quotations without creating accounts, while staff still needed control over who could see a quote.",
        solution:
          "Each quotation has a private share link. Staff can reset the link, which immediately stops the old one from working, and an online acceptance is recorded with the client’s name and date.",
      },
      {
        challenge:
          "Links in emails sent while testing locally pointed to localhost, which is useless to a client.",
        solution:
          "Email links always resolve to the live site, so a message is correct wherever it was sent from.",
      },
    ],
    outcome: [
      "The public website and inquiry flow are live on the company’s own domain.",
      "The admin system’s modules are built. Recent features are being tested, and some content is still to come from the client before full launch.",
    ],
    images: [
      {
        src: "/images/projects/timeless-home.webp",
        alt: "Timeless Ties homepage: an outdoor wedding mandap with the headline “We Turn Moments Into Timeless Memories.”",
        width: 1440,
        height: 770,
        kind: "desktop",
        caption: "Homepage",
      },
      {
        src: "/images/projects/timeless-catalogue.webp",
        alt: "Timeless Ties décor catalogue with category filters such as Stage Décor, Entrance Décor and Lights & Sound",
        width: 1440,
        height: 900,
        kind: "desktop",
        caption: "Catalogue & price list",
      },
      {
        src: "/images/projects/timeless-inquiry.webp",
        alt: "Timeless Ties inquiry form asking for name, phone, email and preferred contact method",
        width: 1440,
        height: 900,
        kind: "desktop",
        caption: "Inquiry form",
      },
      {
        src: "/images/projects/timeless-mobile.webp",
        alt: "Timeless Ties homepage on a phone",
        width: 780,
        height: 1688,
        kind: "mobile",
        caption: "Mobile homepage",
      },
      {
        src: "/images/projects/timeless-admin.webp",
        alt: "Timeless Ties admin dashboard with navigation for leads, quotations, bookings, events and operations; all figures are blurred",
        width: 1600,
        height: 783,
        kind: "admin",
        caption: "Admin dashboard (figures blurred)",
      },
    ],
    confidentiality:
      "The admin panel is private and is not linked here. Figures in the admin screenshot are blurred and no customer data is shown.",
    basis: "Based on the project’s source code, the live website and the project status report.",
    resumeBullets: [
      "Building a public website and admin system covering leads, quotations (versioned, PDF, client acceptance by private link), bookings, events, inventory, finance and a content editor.",
      "Enforced access with PostgreSQL row-level security, tested by a script that checks each role’s permissions, and added database-backed rate limiting for public forms.",
      "Deployed on Vercel with a custom domain. The public site is live and the admin is in active development.",
    ],
  },
  {
    slug: "discovery-pathway",
    name: "Discovery Pathway",
    shortDescription:
      "Multi-page website for a study-abroad consultancy, with destination guides and interactive planning tools: a cost calculator, a course finder and IELTS reading practice.",
    category: "Business website",
    status: "live",
    client: "Discovery Pathway, a study-abroad consultancy in Banepa, Nepal",
    links: { live: "https://www.discoverypathway.edu.np" },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "React Hook Form",
      "Zod",
      "Vercel",
    ],
    tint: "#2a59b4",
    featured: true,
    order: 3,
    published: true,
    related: ["discovery-pathway-admin-portal"],
    role: "Designed and built the website.",
    overview: [
      "Discovery Pathway guides Nepali students through admissions and visas for study abroad. I built the company’s website: destination guides, the application process, resources and company information, plus interactive tools that help students plan.",
      "This website project is separate from my employment at the company, which involves student counseling and documentation work.",
      "I also built the company’s private staff portal, which has its own case study.",
    ],
    audience:
      "Students in Nepal and their families comparing study destinations, costs and courses, and the institutions and partners who want to know the company.",
    problem: [
      "Prospective students arrive with practical questions: where to go, what it will cost and which courses fit. The website answers these with destination guides and self-service tools before a student books a consultation.",
    ],
    contributions: [
      "Designed the visual system, including the boarding-pass motif used across the site.",
      "Built over 20 page types, with eight destination guides generated from one template.",
      "Built the cost calculator, the course finder and the IELTS reading practice tool.",
      "Built the consultation request form with client- and server-side validation and rate limiting.",
      "Added SEO foundations: metadata, sitemap, robots.txt and structured data.",
      "Reviewed the company’s source material and flagged inconsistencies before publishing.",
    ],
    features: [
      {
        group: "Pages",
        items: [
          "Home, Process, About, Team, Gallery, Certificates, Company profile, Events, FAQ, Success stories and Contact",
          "Eight destination guides plus a side-by-side destination comparison",
          "Resources section with articles",
          "Privacy policy and terms",
        ],
      },
      {
        group: "Interactive tools",
        items: [
          "Cost calculator: choose destination, program level, duration and city tier to get an itemised estimate that updates instantly",
          "Course finder that filters programs by field of study, level and budget",
          "IELTS reading practice",
          "Consultation form with validation and per-IP rate limiting",
        ],
      },
    ],
    decisions: [
      {
        title: "Content as typed data",
        body: "Destinations, costs, courses, FAQs, team and events live in typed data modules. Pages are generated from that data, so the eight destination guides share one template and stay consistent.",
      },
      {
        title: "Structured data for search",
        body: "Company profile, destination and FAQ pages include JSON-LD structured data alongside the usual metadata, sitemap and robots.txt.",
      },
    ],
    challenges: [
      {
        challenge:
          "The company’s existing printed material contained inconsistent facts and absolute claims that could not be verified.",
        solution:
          "I kept those claims out of the website and wrote up the inconsistencies for the company to resolve, so the site and their documents agree.",
      },
      {
        challenge:
          "After launch, the company clarified that one language-test service was not offered, but it was mentioned throughout the site.",
        solution:
          "I audited every mention across the codebase, separated real claims from neutral references, and corrected the ones that implied the service.",
      },
    ],
    outcome: [
      "Live on the company’s .edu.np domain, with all pages and tools publicly available.",
    ],
    images: [
      {
        src: "/images/projects/discovery-home.webp",
        alt: "Discovery Pathway homepage: the headline “Your global education begins in Banepa.” next to a boarding-pass illustration",
        width: 1440,
        height: 900,
        kind: "desktop",
        caption: "Homepage",
      },
      {
        src: "/images/projects/discovery-cost-calculator.webp",
        alt: "Discovery Pathway cost calculator: destination and program options with an itemised estimated cost receipt",
        width: 1440,
        height: 900,
        kind: "desktop",
        caption: "Study-abroad cost calculator",
      },
      {
        src: "/images/projects/discovery-mobile.webp",
        alt: "Discovery Pathway homepage on a phone",
        width: 780,
        height: 1688,
        kind: "mobile",
        caption: "Mobile homepage",
      },
    ],
    basis: "Based on the project’s source code and the live website.",
    resumeBullets: [
      "Built a 20+ page website for a study-abroad consultancy, with eight data-driven destination guides and a destination comparison.",
      "Built interactive tools (cost calculator, course finder, IELTS reading practice) and a validated, rate-limited consultation form.",
      "Added SEO foundations, including metadata, sitemap and JSON-LD structured data.",
    ],
  },
  {
    slug: "conference-management-system",
    name: "Conference Management System",
    shortDescription:
      "Full-stack application for running academic conferences: submissions, peer review, programs, registration, QR-code check-in and certificates.",
    category: "Full-stack web application",
    status: "not-deployed",
    statusNote: "Academic project",
    links: {},
    stack: [
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "React Router",
      "Node.js",
      "Express",
      "Zod",
      "MySQL",
    ],
    tint: "#5b4bd6",
    featured: true,
    order: 4,
    published: true,
    role: "Full-stack developer.",
    overview: [
      "An academic conference management application, designed to work as a real application rather than only a coursework submission. It covers the life of a conference, from creating the event and collecting papers to checking attendees in and issuing certificates.",
      "The application is not publicly deployed.",
    ],
    audience:
      "Conference organisers, authors submitting abstracts and papers, peer reviewers, and attendees.",
    problem: [
      "Running an academic conference involves several groups working through one process: organisers set it up, authors submit, reviewers assess, and attendees register and attend. The application brings these steps into one system with the right access for each role.",
    ],
    workflow: [
      "Organiser creates and configures a conference",
      "Authors submit abstracts and papers",
      "Reviewers assess submissions through a peer review workflow",
      "Organisers build the conference program",
      "Attendees register",
      "Attendees check in on the day with a QR code",
      "Certificates are generated for participants",
    ],
    architecture: [
      { layer: "Client", items: ["React 19", "Vite", "TypeScript", "Tailwind CSS", "React Router"] },
      { layer: "API", items: ["Node.js", "Express", "TypeScript", "Zod validation"] },
      { layer: "Database", items: ["MySQL 8"] },
    ],
    features: [
      {
        group: "Documented scope",
        items: [
          "Conference creation and management",
          "Abstract and paper submissions",
          "Peer review workflows",
          "Conference program management",
          "Attendee registration",
          "QR-code check-in",
          "Certificate generation",
        ],
      },
      {
        group: "Documented security measures",
        items: [
          "Password hashing",
          "HTTP-only cookies",
          "Security headers",
          "Rate limiting",
          "Account locking after repeated failed sign-ins",
        ],
      },
    ],
    decisions: [
      {
        title: "Typed end to end",
        body: "TypeScript on both the React client and the Express API, with Zod validating data at the API boundary.",
      },
      {
        title: "Relational data model",
        body: "Conferences, submissions, reviews, programs and registrations are closely related records, which suits a relational database such as MySQL.",
      },
    ],
    images: [],
    basis: "Based on the project’s documented scope and stack.",
    resumeBullets: [
      "Full-stack conference platform (React 19, Vite, TypeScript, Express, Zod, MySQL 8) covering submissions, peer review, program management, registration, QR-code check-in and certificate generation.",
    ],
  },


  // ── More projects (not featured on the home page or the resume) ──────────────
  {
    slug: "discovery-pathway-admin-portal",
    name: "Discovery Pathway Admin Portal",
    shortName: "Discovery admin",
    shortDescription:
      "Private staff portal for a study-abroad consultancy: applicants, students, visitors, appointments, classes, tasks, payments and reports in one installable web app.",
    category: "Internal web application",
    status: "live",
    statusNote: "Private staff portal",
    client: "Discovery Pathway, a study-abroad consultancy in Banepa, Nepal",
    links: { live: "https://admin.discoverypathway.edu.np" },
    stack: ["JavaScript", "HTML", "CSS", "Supabase", "Chart.js", "EmailJS", "PWA"],
    tint: "#1d7a4a",
    featured: false,
    order: 5,
    published: true,
    related: ["discovery-pathway"],
    role: "Built the portal: its interface, staff workflows and Supabase integration.",
    overview: [
      "A sign-in-only web app that the consultancy’s staff use for day-to-day work: incoming applicants, enrolled students, walk-in visitors, appointments, classes, tasks, payments and reports.",
      "It is a separate application from the company’s public website, which has its own case study, and it can be installed on a phone or computer like an app.",
    ],
    audience: "Counselors, administrators and other staff at the consultancy.",
    problem: [
      "A consultancy tracks many students at different stages, each with documents, visa details, appointments and payments. The portal keeps these records in one place, so staff can see where each student stands.",
    ],
    features: [
      {
        group: "Students and applicants",
        items: [
          "Applicant list and applicant profiles",
          "Student records with a documents checklist, visa information, counseling sessions, notes, application status and tasks",
          "Visitor log for walk-in enquiries",
          "Abroad section for students who have already travelled",
        ],
      },
      {
        group: "Operations and reporting",
        items: [
          "Dashboard with summary cards and charts",
          "Tasks, appointments and classes",
          "Payments with printable receipts",
          "Staff and team management",
          "Reports, plus CSV and JSON export of applicants, students and payments",
          "Staff sign-in and password reset through Supabase Auth",
          "Installable app with a service worker and an offline page",
        ],
      },
    ],
    decisions: [
      {
        title: "No build step",
        body: "The portal is plain HTML, CSS and JavaScript that talks to Supabase directly, with Chart.js for charts. It is served as static files on the company’s own subdomain.",
      },
      {
        title: "Installable for staff",
        body: "A web app manifest, icons and a service worker let staff install the portal and see an offline page when the connection drops.",
      },
    ],
    outcome: ["Live on the company’s admin subdomain. Access requires a staff sign-in."],
    images: [
      {
        src: "/images/projects/discovery-admin-dashboard.webp",
        alt: "Discovery Pathway admin portal dashboard: sidebar with applicants, students, visitors, tasks, appointments, classes, payments, staff, documents and reports, and empty summary cards",
        width: 1600,
        height: 752,
        kind: "desktop",
        caption: "Staff dashboard (no client records shown)",
      },
    ],
    confidentiality:
      "The portal is private and requires a staff sign-in. The screenshot shows the dashboard without any student records, and no credentials or client data are published.",
    basis: "Based on the portal’s source code and the live sign-in page.",
  },
  {
    slug: "nagarkot-network",
    name: "Nagarkot Network",
    shortDescription:
      "Nepali-language news website with a private admin panel for writing, publishing and managing articles, categories, breaking news and featured stories.",
    category: "News website + publishing admin",
    status: "live",
    client: "Nagarkot Network, a local and national news outlet in Nepal",
    links: { live: "https://nagarkotnetwork.com" },
    stack: ["JavaScript", "HTML", "CSS", "Tailwind CSS", "Supabase", "Supabase Edge Functions", "PWA"],
    tint: "#2149c7",
    featured: false,
    order: 6,
    published: true,
    role: "Built the public news website and the admin panel used to publish articles.",
    overview: [
      "Nagarkot Network publishes local and national news in Nepali. I built its public website, where readers browse and read articles, and a private admin panel where the team writes and manages them.",
    ],
    audience: "Nepali-speaking readers, and the outlet’s staff who publish the news.",
    problem: [
      "The outlet needed a site where readers can find the latest and most important stories quickly, and a simple way for staff to publish articles without editing code.",
    ],
    contributions: [
      "Built the public site: home page, category navigation, article view, search and newsletter sign-up.",
      "Built the admin panel: sign-in, dashboard, article editor with image upload, article management, categories and settings.",
      "Set up the Supabase backend: the articles table, image storage, newsletter subscribers and staff accounts.",
      "Made the site installable as an app.",
      "Wrote a Supabase Edge Function that receives Facebook Page posts through a signed webhook.",
    ],
    features: [
      {
        group: "News website",
        items: [
          "Nepali-language interface with categories such as news, politics, education, technology and sports",
          "Breaking-news ticker",
          "Featured stories with category, date and excerpt",
          "Trending topics",
          "Article search",
          "Newsletter sign-up",
          "Installable as an app",
        ],
      },
      {
        group: "Admin panel",
        items: [
          "Staff sign-in and password reset",
          "Dashboard with counts of total, breaking and featured articles, and recent articles",
          "Article editor with image upload, category, and breaking and featured flags",
          "Article list with search, editing and deletion",
          "Categories with English and Nepali names",
          "Account settings, including password change",
          "Facebook auto-sync page (built; not yet connected)",
        ],
      },
    ],
    decisions: [
      {
        title: "Supabase as the whole backend",
        body: "Articles live in a Postgres table, images in Supabase Storage and staff accounts in Supabase Auth, so the site runs as static pages with no separate server to maintain.",
      },
      {
        title: "Verified webhook for Facebook",
        body: "The Edge Function checks Facebook’s HMAC SHA-256 signature against the app secret before it accepts a post, so only genuine requests from Facebook can create articles.",
      },
    ],
    outcome: [
      "Live on the outlet’s own domain, with articles published through the admin panel.",
      "Facebook auto-sync still needs a Facebook app to be connected before it can run.",
    ],
    images: [
      {
        src: "/images/projects/nagarkot-home.webp",
        alt: "Nagarkot Network homepage in Nepali: breaking-news ticker, category navigation, featured stories and a trending topics panel",
        width: 1600,
        height: 657,
        kind: "desktop",
        caption: "Homepage",
      },
      {
        src: "/images/projects/nagarkot-admin.webp",
        alt: "Nagarkot Network admin dashboard with article counts, recent articles and a Facebook auto-sync setup panel",
        width: 1600,
        height: 754,
        kind: "admin",
        caption: "Admin dashboard",
      },
      {
        src: "/images/projects/nagarkot-mobile.webp",
        alt: "Nagarkot Network homepage on a phone",
        width: 780,
        height: 1688,
        kind: "mobile",
        caption: "Mobile homepage",
      },
    ],
    confidentiality:
      "The admin panel is private and is not linked. Its screenshot shows only articles already published on the public site. The outlet’s phone number is blurred in the homepage screenshot.",
    basis: "Based on the project’s source code and the live website.",
  },
  {
    slug: "japanese-mastery",
    name: "Japanese Mastery",
    shortDescription:
      "Japanese learning app for beginners living in Japan, with kana practice, structured lessons, spaced-repetition review and JLPT-style practice. Works offline.",
    category: "Learning web application",
    status: "in-progress",
    statusNote: "First release live",
    links: { live: "https://japanese-mastery.vercel.app" },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Zustand",
      "Zod",
      "Vitest",
      "Playwright",
    ],
    tint: "#2f8a5f",
    featured: false,
    order: 7,
    published: true,
    role: "Designed and built the app.",
    overview: [
      "A personal Japanese tutor for learners in Japan who are starting from zero. It is meant to complement language school: it explains each concept in simple English and makes daily practice easy, with the long-term goal of JLPT N2 readiness.",
      "The first release is live. The app is still under development, and later stages of its learning roadmap don’t have dedicated lessons yet.",
    ],
    audience: "Beginners studying Japanese in Japan, alongside a language school.",
    problem: [
      "Language school moves quickly, and beginners need a place to review what they learned and practise a little every day, even on a train with no signal.",
    ],
    features: [
      {
        group: "In the first release",
        items: [
          "Kana studio for hiragana and katakana, with several practice modes including handwriting and stroke order",
          "Structured lessons for the writing system, the basics and N5 grammar",
          "Vocabulary, grammar and kanji libraries (starter sets, not the full JLPT lists)",
          "Spaced-repetition review with daily and weekly revision",
          "Daily-life scenarios, reading and listening practice",
          "JLPT dashboards and practice exams",
          "Progress tracking, streaks and XP",
          "Works without an account; optional sign-in syncs progress across devices",
        ],
      },
      {
        group: "Still in development",
        items: [
          "Lessons for the later months of the learning roadmap, which currently point to the libraries instead",
          "Full vocabulary and kanji coverage for higher JLPT levels",
        ],
      },
    ],
    decisions: [
      {
        title: "Local-first progress",
        body: "Every answer is saved on the device first (IndexedDB), so the app works offline and without an account. Signed-in users’ changes queue in an outbox and sync to Supabase later.",
      },
      {
        title: "Curriculum as typed data",
        body: "Lessons, vocabulary, grammar and kanji are typed TypeScript data checked by automated tests, so content can be added without changing the interface.",
      },
      {
        title: "Honest progress estimates",
        body: "The app states that no tool can guarantee a JLPT result, and presents its readiness indicators as estimates based on the learner’s own results.",
      },
    ],
    challenges: [
      {
        challenge:
          "Progress recorded offline, possibly on more than one device, has to merge without double-counting or losing work.",
        solution:
          "Sync goes through one database function that applies each event only once and follows fixed rules: the newest review wins, completed lessons are never undone, and XP is de-duplicated.",
      },
    ],
    outcome: [
      "First release deployed on Vercel and usable without an account.",
      "The repository includes unit, integration and end-to-end (Playwright) test suites.",
    ],
    images: [
      {
        src: "/images/projects/japanese-mastery-home.webp",
        alt: "Japanese Mastery landing page: “Your personal Japanese tutor, every day.” next to a grid of kana and kanji tiles",
        width: 1600,
        height: 740,
        kind: "desktop",
        caption: "Landing page",
      },
      {
        src: "/images/projects/japanese-mastery-mobile.webp",
        alt: "Japanese Mastery landing page on a phone",
        width: 780,
        height: 1688,
        kind: "mobile",
        caption: "Mobile landing page",
      },
    ],
    basis: "Based on the project’s source code and the live application.",
  },
  {
    slug: "gp-pathway-crm",
    name: "GP Pathway CRM",
    shortName: "GP CRM",
    shortDescription:
      "CRM for a study-abroad consultancy: a staff dashboard for applicants, students, documents, appointments, tasks and payments, and a portal where students follow their applications.",
    category: "CRM web application",
    status: "in-progress",
    statusNote: "Team project",
    links: { live: "https://gpcrm-app.vercel.app/staff-login" },
    stack: ["React", "Vite", "JavaScript", "React Router", "Material UI", "Supabase", "Supabase Edge Functions"],
    tint: "#0f8a86",
    featured: false,
    order: 8,
    published: true,
    role: "Built the first version (staff dashboard and student portal), then continued development with a collaborator, who built the online payment integration.",
    overview: [
      "A customer relationship management system for a study-abroad consultancy. Staff manage the student pipeline from first visit to visa, and students sign in to their own portal to follow their application.",
      "The application is under development. Its sign-in pages are live, but it is not yet in use with real student data.",
    ],
    audience: "Consultancy staff and administrators, and the students they advise.",
    features: [
      {
        group: "Staff dashboard",
        items: [
          "Applicants and applications",
          "Student records and documents",
          "Visitor log",
          "Tasks and appointments",
          "Payments and reports",
          "Staff accounts and internal staff chat",
        ],
      },
      {
        group: "Student portal",
        items: [
          "Application and visa status",
          "Document uploads",
          "Appointment booking",
          "Payments and receipts",
          "Chat with their counselor",
        ],
      },
    ],
    decisions: [
      {
        title: "Separate sign-in for students and staff",
        body: "Students and staff have their own sign-in pages and see different interfaces. Tasks that need elevated rights, such as creating staff accounts, run in Supabase Edge Functions rather than in the browser.",
      },
    ],
    outcome: ["Under development. Online payments through eSewa and Khalti are being integrated."],
    images: [
      {
        src: "/images/projects/gpcrm-login.webp",
        alt: "Global Pathway student portal sign-in page listing application and visa status, document uploads, appointment booking, payments and counselor chat",
        width: 1600,
        height: 751,
        kind: "desktop",
        caption: "Student portal sign-in",
      },
    ],
    confidentiality:
      "Only the public sign-in page is shown, with its support email blurred. No staff credentials, student records or other private data are published.",
    basis: "Based on the project’s source code and its public sign-in pages.",
  },
  {
    slug: "vyapar-erp",
    name: "Vyapar ERP",
    shortDescription:
      "Interactive demo of a stock, billing and manufacturing system for businesses in Nepal: parties, sales and invoices, purchases, inventory, bills of materials, payments, expenses and reports.",
    category: "Business management system",
    status: "in-progress",
    statusNote: "Interactive demo",
    links: { live: "https://vyapar-erp-vcue.vercel.app" },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Recharts", "Zustand"],
    tint: "#1f4fa8",
    featured: false,
    order: 9,
    published: true,
    role: "Designed and built the demo.",
    overview: [
      "A working demo of an ERP for small manufacturing and trading businesses in Nepal, built to show a prospective client how stock, billing, payments and production would fit together in one system.",
      "It is a front-end demo: it runs on generated sample data stored in the browser and isn’t connected to a database yet.",
    ],
    audience: "Owners and accountants of small trading and manufacturing businesses in Nepal.",
    features: [
      {
        group: "Trading and accounts",
        items: [
          "Dashboard with sales, purchases, receivables, payables, stock value, low-stock alerts and charts",
          "Parties (customers and suppliers) with a running ledger, payments and statements",
          "Sales billing with discounts and 13% VAT, and tax invoices with the amount in words",
          "Purchases that update stock",
          "Payments allocated to the oldest invoices first, and expenses",
          "Amounts in NPR with Nepali digit grouping, and menu labels in English and Nepali",
        ],
      },
      {
        group: "Stock, production and reports",
        items: [
          "Products and inventory with stock history and stock adjustment",
          "Bills of materials with estimated cost and margin",
          "Production runs that consume raw materials and add finished goods",
          "Reports: sales, purchases, profit and loss with VAT summary, stock valuation, outstanding balances and statements",
          "Report export to CSV and Excel, and printing",
          "Global search (Ctrl + K) and a quick-add menu",
        ],
      },
    ],
    decisions: [
      {
        title: "Business logic kept separate",
        body: "Balances, stock levels, ledgers and payment allocation are pure functions in one module, apart from the state store, so the browser storage can later be replaced by a server and database without rewriting the calculations.",
      },
      {
        title: "Demo data that stays current",
        body: "Sample data is generated on first load with dates shifted so that “today” always has activity, and a reset option restores it before each presentation.",
      },
    ],
    outcome: [
      "Deployed as an interactive demo on Vercel.",
      "Not yet built: a database, sign-in and role permissions, Nepali (BS) dates and PDF generation.",
    ],
    images: [
      {
        src: "/images/projects/vyapar-dashboard.webp",
        alt: "Vyapar ERP dashboard with quick actions, sales, purchase, receivable and payable cards, and a sales chart, showing generated sample data",
        width: 1600,
        height: 673,
        kind: "desktop",
        caption: "Dashboard (generated sample data)",
      },
    ],
    basis: "Based on the project’s source code and the live demo. All business names and figures in the demo are sample data.",
  },
  {
    slug: "rizz-app",
    name: "RIZZ APP",
    shortName: "RIZZ",
    shortDescription:
      "Playful single-page web app (RizzMate) with categorised pick-up lines, a love quiz, a private diary, date reminders and truth-or-dare challenges, all saved in the browser.",
    category: "Personal web app",
    status: "live",
    statusNote: "Personal project",
    links: {
      live: "https://rachitpokhrel173.github.io/RIZZ-APP/",
      github: "https://github.com/rachitpokhrel173/RIZZ-APP",
    },
    stack: ["HTML", "CSS", "JavaScript", "localStorage", "GitHub Pages"],
    tint: "#8b2fc9",
    featured: false,
    order: 10,
    published: true,
    role: "Designed and built it.",
    overview: [
      "RizzMate is a light-hearted app for couples and anyone who wants a smile: pick-up lines by category, a love quiz, a private diary, reminders for special dates and truth-or-dare challenges.",
    ],
    audience: "Couples and friends looking for something fun to share.",
    features: [
      {
        group: "Features",
        items: [
          "Pick-up lines by category, with previous, next and shuffle",
          "Copy a line or share it through the device’s share sheet",
          "Favourites, with export to a file",
          "Love quiz with retake",
          "Love diary entries saved on the device",
          "Reminders with a countdown to each date",
          "Truth-or-dare challenges",
        ],
      },
    ],
    decisions: [
      {
        title: "No backend",
        body: "Everything is stored in the browser’s localStorage, so entries stay private to the device and the app can be hosted for free on GitHub Pages. Text that users type is escaped before it is displayed.",
      },
    ],
    images: [
      {
        src: "/images/projects/rizz-home.webp",
        alt: "RizzMate app with tabs for Rizz Lines, Love Quiz, Love Diary, Reminders and Challenges, and a pick-up line card with copy, share, previous, next and shuffle buttons",
        width: 1600,
        height: 739,
        kind: "desktop",
        caption: "Rizz Lines",
      },
      {
        src: "/images/projects/rizz-mobile.webp",
        alt: "RizzMate on a phone",
        width: 780,
        height: 1688,
        kind: "mobile",
        caption: "Mobile view",
      },
    ],
    basis: "Based on the project’s source code and the live app.",
  },
];
