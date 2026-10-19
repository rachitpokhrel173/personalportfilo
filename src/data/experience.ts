import type { Education, Employment } from "@/types/content";

// From the Japanese resume (履歴書). The position line describes the work; it is not
// an official job title. Replace it once the title is confirmed.

export const EMPLOYMENT: Employment[] = [
  {
    organization: "Discovery Pathway Pvt. Ltd.",
    location: "Nepal",
    period: "Mar 2025 – Present",
    position: "Student Counseling & Documentation",
    roles: [
      {
        period: "Sep 2026 – Present",
        title: "Documentation (remote)",
        detail: "Continuing remotely from Japan",
        responsibilities: ["Processing student documentation remotely."],
      },
      {
        period: "Mar 2025 – Sep 2026",
        title: "Student counseling & documentation",
        detail: "Nepal",
        responsibilities: [
          "Counseling students on their study-abroad plans.",
          "Processing student documentation.",
        ],
      },
    ],
  },
];

/** Transferable strengths supported by the role above. */
export const TRANSFERABLE_SKILLS = [
  "Detailed documentation",
  "Working directly with students",
  "Clear written communication",
  "Organising multi-step processes",
  "Working remotely",
];

export const EDUCATION: Education[] = [
  {
    institution: "ISI Language School",
    location: "Osaka campus, Japan",
    program: "Japanese language",
    period: "Oct 2026 – Present",
    status: "current",
  },
  {
    institution: "Siddhartha English Secondary School",
    location: "Nepal",
    program: "Higher Secondary Education, Science",
    period: "Jul 2022 – Aug 2024",
    status: "completed",
  },
  {
    institution: "Kabhre Secondary School",
    location: "Nepal",
    program: "Secondary Education Examination (SEE, Grade 10)",
    period: "Completed 2022",
    status: "completed",
  },
];
