// Testimonials are only rendered when `approved` is true. Approve one only after the
// person quoted has confirmed the wording and agreed to be named publicly.

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  approved: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Rachit built both our main website and admin portal. The website beautifully captures our mission to help students pursue global education, while the admin dashboard has transformed how we manage student applications and documentation. His technical skills and dedication are impressive.",
    name: "Amit Neupane",
    role: "CEO, Discovery Pathway",
    approved: false,
  },
  {
    quote:
      "Working with Rachit on both our website and admin portal was exceptional. The public site effectively showcases our services, while the admin system streamlines our entire workflow. He delivered both projects professionally and understood our needs perfectly.",
    name: "Suman Kumar Gautam",
    role: "MD, Discovery Pathway",
    approved: false,
  },
  {
    quote:
      "Rachit developed our news platform with excellent attention to detail. The website features a clean, responsive design that makes it easy for our readers to access local news. His understanding of content management and user experience helped create a platform that serves our community effectively.",
    name: "Pradeep Neupane",
    role: "CEO, Nagarkot Network",
    approved: false,
  },
];
