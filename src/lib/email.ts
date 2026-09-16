import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmails(submission: ContactSubmission) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Email is not configured. Set RESEND_API_KEY in .env.local.");
  }

  let fromAddress = process.env.RESEND_FROM || "onboarding@resend.dev";
  // Extract email if format is "Name <email@domain.com>"
  const emailMatch = fromAddress.match(/<([^>]+)>/);
  if (emailMatch) {
    fromAddress = emailMatch[1];
  }

  const ccAddresses = process.env.CONTACT_CC ? process.env.CONTACT_CC.split(",") : [];

  const detailRows = [
    ["Name", submission.name],
    ["Email", submission.email],
    ["Company", submission.company || "—"],
    ["Service of interest", submission.service || "—"],
    ["Estimated budget", submission.budget || "—"],
  ];

  const detailsHtml = detailRows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#8b93ab;font-size:13px;">${label}</td><td style="padding:4px 0;font-size:13px;">${value}</td></tr>`
    )
    .join("");

  // 1. Notify the business inbox (and CC the requested emails)
  try {
    await resend.emails.send({
      from: `"${siteConfig.name} Website" <${fromAddress}>`,
      to: "huraintechnologies@gmail.com", // Sandbox strictly requires the verified owner email here
      cc: ccAddresses,
      replyTo: submission.email,
      subject: `New inquiry from ${submission.name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;">
          <h2 style="margin-bottom:4px;">New website inquiry</h2>
          <table>${detailsHtml}</table>
          <p style="margin-top:16px;"><strong>Message</strong></p>
          <p style="white-space:pre-wrap;">${submission.message}</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Error sending admin notification:", err);
    throw err; // If we can't even notify the owner, throw the error
  }

  // 2. Confirmation to the customer.
  // NOTE: This will silently fail if using the Resend sandbox (onboarding@resend.dev)
  // because Resend sandbox only allows sending to the account owner's verified email.
  try {
    await resend.emails.send({
      from: `"${siteConfig.name}" <${fromAddress}>`,
      to: submission.email,
      replyTo: siteConfig.email,
      subject: `We've received your inquiry — ${siteConfig.name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;">
          <p>Hi ${submission.name},</p>
          <p>Thanks for reaching out to ${siteConfig.name}. We've received your inquiry and our team will get back to you within 1-2 business days.</p>
          <p style="margin-top:16px;"><strong>What you sent us</strong></p>
          <p style="white-space:pre-wrap;color:#444;">${submission.message}</p>
          <p style="margin-top:16px;">If anything is urgent, you can reach us directly:</p>
          <ul>
            <li>Email: ${siteConfig.email}</li>
            <li>Phone / WhatsApp: ${siteConfig.phoneDisplay}</li>
          </ul>
          <p style="margin-top:16px;">— ${siteConfig.founderName}, ${siteConfig.name}</p>
        </div>
      `,
    });
  } catch (err) {
    console.warn("Could not send confirmation to client (likely due to Resend sandbox limits):", err);
  }
}
