"use client";

import { FormEvent, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleWhatsApp() {
    const form = formRef.current;
    if (!form) return;

    // Reuse the form's own required-field validation (native browser UI).
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const service = String(data.get("service") || "").trim();
    const budget = String(data.get("budget") || "").trim();
    const message = String(data.get("message") || "").trim();
    const sourceUrl = typeof window !== "undefined" ? window.location.href : siteConfig.url;

    const lines = [
      "Hi Hurain Technologies, I'd like to send you a project inquiry.",
      "",
      `Name: ${name}`,
      company && `Company: ${company}`,
      service && `Service: ${service}`,
      budget && `Estimated budget: ${budget}`,
      "",
      `Project details: ${message}`,
      "",
      `Source page: ${sourceUrl}`,
    ].filter(Boolean);

    window.open(`${siteConfig.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      service: String(data.get("service") || ""),
      budget: String(data.get("budget") || ""),
      message: String(data.get("message") || ""),
      honeypot: String(data.get("website") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 422) {
        const body = await res.json();
        setErrors(body.errors || {});
        setStatus("error");
        return;
      }

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setErrorMessage(body?.error || null);
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Icon name="check" className="w-6 h-6" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">Message received</h3>
        <p className="mt-2 text-sm text-muted">
          Thanks for reaching out — our team will get back to you within 1-2 business days.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot field, hidden from real users */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div>
        <label htmlFor="name" className="block text-xs font-medium text-foreground/85">Full name *</label>
        <input
          id="name"
          name="name"
          required
          minLength={2}
          className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary/60"
          placeholder="Jane Doe"
        />
        {errors.name && <p className="mt-1 text-xs text-danger">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="block text-xs font-medium text-foreground/85">Company</label>
          <input
            id="company"
            name="company"
            className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary/60"
            placeholder="Company name"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-xs font-medium text-foreground/85">Service of interest</label>
          <select
            id="service"
            name="service"
            className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary/60"
            defaultValue=""
          >
            <option value="" disabled>Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
            <option value="Other">Other / Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="budget" className="block text-xs font-medium text-foreground/85">Estimated budget</label>
        <select
          id="budget"
          name="budget"
          className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary/60"
          defaultValue=""
        >
          <option value="" disabled>Select a range</option>
          <option value="$2k-$10k">$2,000 – $10,000</option>
          <option value="$10k-$25k">$10,000 – $25,000</option>
          <option value="$25k-$75k">$25,000 – $75,000</option>
          <option value="$75k-$200k">$75,000 – $200,000</option>
          <option value="$200k+">$200,000+</option>
          <option value="Not sure">Not sure yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-medium text-foreground/85">Project details *</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary/60"
          placeholder="Tell us about your platform, timeline, and what you're trying to build..."
        />
        {errors.message && <p className="mt-1 text-xs text-danger">{errors.message}</p>}
      </div>

      {status === "error" && Object.keys(errors).length === 0 && (
        <p className="text-sm text-danger">
          {errorMessage || "Something went wrong sending your message. Please try again or email us directly."}
        </p>
      )}

      <div>
        <p className="mb-3 text-xs text-muted">Send your project details via WhatsApp — we respond within hours.</p>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1fb958]"
        >
          Send via WhatsApp
          <Icon name="whatsapp" className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
