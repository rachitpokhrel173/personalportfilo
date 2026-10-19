"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

type Status =
  | { state: "idle" }
  | { state: "success" }
  | { state: "error"; message: string };

const field =
  "w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-text placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none aria-[invalid=true]:border-red-400/70";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", website: "" },
  });

  async function onSubmit(values: ContactInput) {
    setStatus({ state: "idle" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus({
          state: "error",
          message: data.error ?? "Something went wrong. Please try again.",
        });
        return;
      }
      reset();
      setStatus({ state: "success" });
    } catch {
      setStatus({
        state: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-line bg-bg-raised p-6 sm:p-8"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={field}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-300">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={field}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-300">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Tell me about your project"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`${field} resize-y`}
            {...register("message")}
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-xs text-red-300">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Honeypot: hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-strong px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight size={16} aria-hidden="true" />
          </>
        )}
      </button>

      <div aria-live="polite" className="mt-4 min-h-6 text-sm">
        {status.state === "success" && (
          <p
            role="status"
            className="flex items-start gap-2 text-emerald-300"
          >
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            Thanks! Your message is on its way. I&apos;ll reply soon.
          </p>
        )}
        {status.state === "error" && (
          <p role="alert" className="text-red-300">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
