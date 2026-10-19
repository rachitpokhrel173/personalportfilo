// "How I work": each step is tied to something that happened in a real project.

export const PROCESS = [
  {
    title: "Understand the problem",
    body: "Start with how the business actually runs: what customers ask, what staff need to track, and which information has to be correct.",
    evidence:
      "Discovery Pathway: I reviewed the company’s source material and flagged inconsistent claims before anything was published.",
  },
  {
    title: "Plan the experience",
    body: "Map the public journey and the internal workflow together, so a website inquiry becomes the start of a quotation, a booking and an invoice.",
    evidence:
      "Floral Roots & Decor: booking form → admin bookings → quotations → invoices and payments.",
  },
  {
    title: "Build and validate",
    body: "Type the data, validate input on the client and the server, and enforce access rules in the database itself.",
    evidence:
      "Timeless Ties: row-level security policies with a script that tests what every role can read and write.",
  },
  {
    title: "Test responsive behaviour",
    body: "Check every page, form and admin screen on phones as well as desktops, because staff use these systems away from a desk too.",
    evidence:
      "Floral Roots & Decor: website and admin tested on desktop and mobile before handover.",
  },
  {
    title: "Refine and deploy",
    body: "Ship to production on the client’s own domain, set up SEO foundations, and keep a written record of what is done, what needs testing and what is blocking launch.",
    evidence:
      "Timeless Ties: a written status report separating finished, needs-testing and blocking work.",
  },
] as const;
