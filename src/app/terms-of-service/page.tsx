import { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LiveDemos } from "@/components/LiveDemos";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: `Terms of Service governing use of ${siteConfig.url} and engagement with ${siteConfig.name}.`,
  path: "/terms-of-service",
});

const lastUpdated = "September 18, 2026";

export default function TermsOfServicePage() {
  return (
    <section className="py-14">
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ name: "Terms of Service", href: "/terms-of-service" }]} />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Terms of Service</h1>
        <p className="mt-3 text-xs text-muted">Last updated: {lastUpdated}</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your use of {siteConfig.url} (the &quot;Site&quot;) and any
            engagement with {siteConfig.legalName} (&quot;{siteConfig.name}&quot;, &quot;we&quot;, &quot;us&quot;). By using the Site or
            engaging our services, you agree to these Terms. Specific engagements are further governed by a signed
            statement of work or services agreement, which will take precedence over these general Terms in case of
            conflict.
          </p>

          <div>
            <h2 className="text-lg font-semibold text-foreground">1. Use of the Site</h2>
            <p className="mt-3">
              You may use this Site for lawful purposes only. You may not use the Site in any way that could
              damage, disable, or impair it, or interfere with any other party’s use of the Site.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">2. Services &amp; Engagements</h2>
            <p className="mt-3">
              Descriptions of services on this Site are informational and do not constitute a binding offer. Scope,
              timelines, deliverables, and fees for any engagement are defined in a separate written agreement
              between {siteConfig.name} and the client.
            </p>
            <p className="mt-3">
              {siteConfig.name} engages only with legally registered business entities operating in compliance with
              applicable law in their jurisdiction. We do not provide engineering services to unregistered
              businesses, or to any platform intended to facilitate activity that is unlicensed or unlawful in its
              operating jurisdiction. Clients are responsible for obtaining and maintaining any licenses,
              registrations, or regulatory approvals required for their business before engaging our services, and
              for providing accurate registration details on request.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">3. No Legal, Licensing, or Financial Advice</h2>
            <p className="mt-3">
              Content on this Site, including references to regulatory frameworks, licensing bodies, or compliance
              controls, is provided for general informational purposes only and does not constitute legal,
              licensing, financial, or investment advice. You should consult qualified professionals before making
              decisions based on this content.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">4. Intellectual Property</h2>
            <p className="mt-3">
              Unless otherwise agreed in a services contract, all content on this Site — including text, graphics,
              logos, and code — is owned by or licensed to {siteConfig.name} and may not be reproduced without
              permission. Ownership of deliverables produced under a client engagement is governed by the applicable
              services agreement.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">5. Case Studies &amp; Results</h2>
            <p className="mt-3">
              Case studies and results referenced on this Site reflect specific client engagements and are shared
              with anonymized or aggregated details. Past results do not guarantee similar outcomes for future
              engagements, which depend on project-specific variables.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">6. Limitation of Liability</h2>
            <p className="mt-3">
              To the fullest extent permitted by law, {siteConfig.name} shall not be liable for any indirect,
              incidental, or consequential damages arising from use of this Site. Liability arising from a specific
              client engagement is governed exclusively by the applicable services agreement.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">7. Third-Party Links</h2>
            <p className="mt-3">
              This Site may link to third-party websites. We are not responsible for the content or practices of
              any linked third-party sites.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">8. Changes to These Terms</h2>
            <p className="mt-3">
              We may update these Terms from time to time. Continued use of the Site after changes are posted
              constitutes acceptance of the revised Terms.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">9. Governing Law</h2>
            <p className="mt-3">
              These Terms are governed by the laws of India, without regard to conflict-of-law principles, unless
              otherwise specified in a signed services agreement.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">10. Contact Us</h2>
            <p className="mt-3">
              Questions about these Terms can be directed to{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">{siteConfig.email}</a>.
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
