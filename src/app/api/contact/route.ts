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

export async function POST(request: NextRequest) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot field — bots fill every field, real users never see it.
  if (payload.honeypot) {
    return NextResponse.json({ success: true });
  }

  const errors: Record<string, string> = {};
  if (!payload.name || payload.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!payload.email || !EMAIL_RE.test(payload.email)) errors.email = "Please enter a valid email address.";
  if (!payload.message || payload.message.trim().length < 10) errors.message = "Please add a few more details about your project.";

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
