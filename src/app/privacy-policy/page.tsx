import { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LiveDemos } from "@/components/LiveDemos";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}, describing how we collect, use, and protect personal data.`,
  path: "/privacy-policy",
  noIndex: false,
});

const lastUpdated = "September 1, 2026";

export default function PrivacyPolicyPage() {
  return (
    <section className="py-14">
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ name: "Privacy Policy", href: "/privacy-policy" }]} />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-xs text-muted">Last updated: {lastUpdated}</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            This Privacy Policy explains how {siteConfig.legalName} (&quot;{siteConfig.name}&quot;, &quot;we&quot;, &quot;us&quot;) collects,
            uses, and protects information when you visit {siteConfig.url} or engage our services. This policy is
            provided for transparency and general informational purposes and should be reviewed by qualified legal
            counsel before relying on it for regulatory compliance in your jurisdiction.
          </p>

          <div>
            <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
            <p className="mt-3">
              We collect information you provide directly, such as your name, email address, company, and project
              details submitted through our contact form or email. We also collect standard technical data
              automatically, including IP address, browser type, device information, and pages visited, via
              analytics tooling.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">2. How We Use Information</h2>
            <p className="mt-3">
              We use collected information to respond to inquiries, provide and improve our services, communicate
              about projects, and understand how visitors use our website. We do not sell personal information to
              third parties.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">3. Cookies &amp; Analytics</h2>
            <p className="mt-3">
              We may use cookies and similar technologies to understand site usage and improve user experience. You
              can control cookies through your browser settings; disabling cookies may affect site functionality.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">4. Data Sharing</h2>
            <p className="mt-3">
              We may share information with service providers who support our operations (such as hosting, email
              delivery, and analytics providers) under confidentiality obligations, or when required by law.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">5. Data Security</h2>
            <p className="mt-3">
              We apply reasonable technical and organizational measures to protect information from unauthorized
              access, alteration, disclosure, or destruction. No system is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">6. Your Rights</h2>
            <p className="mt-3">
              Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict processing
              of your personal information. To exercise these rights, contact us at{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">{siteConfig.email}</a>.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">7. International Transfers</h2>
            <p className="mt-3">
              As a company serving clients across multiple regions, information may be processed and stored in
              countries other than your own. We take steps to ensure appropriate safeguards are applied to such
              transfers.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">8. Changes to This Policy</h2>
            <p className="mt-3">
              We may update this Privacy Policy periodically. Material changes will be reflected by updating the
              &quot;Last updated&quot; date above.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">9. Contact Us</h2>
            <p className="mt-3">
              Questions about this policy can be directed to{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">{siteConfig.email}</a>{" "}
              or {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.country}.
            </p>
          </div>
        </div>
      </Container>
      <Container className="pt-16">
        <LiveDemos />
      </Container>
    </section>
  );
}
