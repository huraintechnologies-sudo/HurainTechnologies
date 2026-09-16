"use client";

import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { siteConfig } from "@/lib/site-config";

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const location = String(data.get("location") || "").trim();
    const message = String(data.get("message") || "").trim();

    const sourceUrl = typeof window !== "undefined" ? window.location.href : `${siteConfig.url}${pathname}`;

    const lines = [
      "Hi Hurain Technologies, I'd like to get in touch.",
      "",
      `Name: ${name}`,
      email && `Email: ${email}`,
      company && `Company: ${company}`,
      location && `Location: ${location}`,
      "",
      message && `Message: ${message}`,
      "",
      `Source page: ${sourceUrl}`,
    ].filter(Boolean);

    const url = `${siteConfig.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
    event.currentTarget.reset();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Chat with us on WhatsApp"
        className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/30 transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
        <Icon name="whatsapp" className="relative w-7 h-7 text-white" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-end bg-black/40 p-4 sm:items-center sm:justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                  <Icon name="whatsapp" className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-semibold text-foreground">Contact Us on WhatsApp</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-foreground"
              >
                <Icon name="close" className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div>
                <label htmlFor="wa-name" className="block text-xs font-medium text-foreground/85">Name</label>
                <input
                  id="wa-name"
                  name="name"
                  required
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary/60"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="wa-email" className="block text-xs font-medium text-foreground/85">Email</label>
                <input
                  id="wa-email"
                  name="email"
                  type="email"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary/60"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="wa-company" className="block text-xs font-medium text-foreground/85">Company Name</label>
                <input
                  id="wa-company"
                  name="company"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary/60"
                  placeholder="Your Company Name"
                />
              </div>
              <div>
                <label htmlFor="wa-location" className="block text-xs font-medium text-foreground/85">Location/City</label>
                <input
                  id="wa-location"
                  name="location"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary/60"
                  placeholder="Your City or Location"
                />
              </div>
              <div>
                <label htmlFor="wa-message" className="block text-xs font-medium text-foreground/85">Message</label>
                <textarea
                  id="wa-message"
                  name="message"
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary/60"
                  placeholder="Your Message"
                />
              </div>
              <button
                type="submit"
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1fb958]"
              >
                <Icon name="whatsapp" className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
