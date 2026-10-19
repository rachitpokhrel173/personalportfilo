import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { PROFILE } from "@/data/profile";
import { SITE } from "@/lib/site";

// Best-effort rate limit: 5 messages per IP per 10 minutes. It is per server instance,
// which is enough to slow down casual abuse on a personal site; the honeypot field
// and server-side validation do the rest.
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

const directly = `Please email me directly at ${PROFILE.email}.`;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { error: `Too many messages in a short time. ${directly}` },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot also fails validation; answer like success so bots learn nothing.
    const hitHoneypot = parsed.error.issues.some((i) => i.path[0] === "website");
    if (hitHoneypot) return Response.json({ ok: true });
    return Response.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: `The contact form isn’t connected to email yet. ${directly}` },
      { status: 503 },
    );
  }

  const { name, email, message } = parsed.data;
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO || SITE.contactTo,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: `Couldn’t send your message. ${directly}` },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Contact route failure:", err);
    return Response.json(
      { error: `Couldn’t send your message. ${directly}` },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
