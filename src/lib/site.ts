// Site-wide configuration. Personal content lives in src/data/.

export const SITE = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rachitpokhrel.com.np").replace(/\/$/, ""),
  // Contact form messages are delivered here (see README for email setup).
  contactTo: "rachitpokhrel123@gmail.com",
  resumePdf: "/Rachit-Pokhrel-Resume.pdf",
  resumeFileName: "Rachit-Pokhrel-Resume.pdf",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/#home", id: "home" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;
