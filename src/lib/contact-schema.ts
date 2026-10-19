import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name is too long."),
  email: z.email("Please enter a valid email address.").max(120),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more (at least 10 characters).")
    .max(2000, "Message is too long (2000 characters max)."),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
