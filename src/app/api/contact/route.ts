import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";
import { sendContactEmails } from "@/lib/email";

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  honeypot?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_LENGTHS: Record<keyof ContactPayload, number> = {
  name: 100,
  email: 254,
  company: 150,
  service: 150,
  budget: 50,
  message: 5000,
  honeypot: 500,
};

// Best-effort per-instance limit: each submission sends an email to the
// address typed into the form, so cap how fast one client can trigger that.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recentSubmissions.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  recentSubmissions.set(ip, hits);
  if (recentSubmissions.size > 5000) {
    for (const [key, times] of recentSubmissions) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) recentSubmissions.delete(key);
    }
  }
  return hits.length > RATE_LIMIT;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages from this connection. Please try again later or email us directly at " + siteConfig.email + "." },
      { status: 429 }
    );
  }

  let raw: unknown;

  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!raw || typeof raw !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Keep only known string fields, trimmed, single-line where it matters
  // (name/email end up in email headers) and capped in length.
  const payload = {} as ContactPayload;
  for (const key of Object.keys(MAX_LENGTHS) as (keyof ContactPayload)[]) {
    const value = (raw as Record<string, unknown>)[key];
    if (typeof value !== "string") continue;
    const cleaned = key === "message" ? value.trim() : value.replace(/[\r\n]+/g, " ").trim();
    payload[key] = cleaned.slice(0, MAX_LENGTHS[key]);
  }

  // Honeypot field — bots fill every field, real users never see it.
  if (payload.honeypot) {
    return NextResponse.json({ success: true });
  }

  const errors: Record<string, string> = {};
  if (!payload.name || payload.name.length < 2) errors.name = "Please enter your full name.";
  if (!payload.email || !EMAIL_RE.test(payload.email)) errors.email = "Please enter a valid email address.";
  if (!payload.message || payload.message.length < 10) errors.message = "Please add a few more details about your project.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  console.log(`[contact-form] New submission for ${siteConfig.email}:`, {
    name: payload.name,
    email: payload.email,
    company: payload.company,
    service: payload.service,
    budget: payload.budget,
    message: payload.message,
    receivedAt: new Date().toISOString(),
  });

  try {
    await sendContactEmails({
      name: payload.name,
      email: payload.email,
      company: payload.company,
      service: payload.service,
      budget: payload.budget,
      message: payload.message,
    });
  } catch (err) {
    console.error("[contact-form] Email delivery failed:", err);
    return NextResponse.json(
      { error: "We received your message but couldn't send the confirmation email. Please also reach us directly at " + siteConfig.email + "." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
