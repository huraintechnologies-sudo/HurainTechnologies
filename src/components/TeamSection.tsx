import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { team } from "@/data/team";
import { siteConfig } from "@/lib/site-config";

const PHOTO_EXTS = ["jpg", "jpeg", "png", "webp"];

function photoFor(slug: string): string | null {
  for (const ext of PHOTO_EXTS) {
    const rel = `/images/team/${slug}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export function TeamSection() {
  const members = team.map((m) => ({ ...m, photo: photoFor(m.slug) }));

  const jsonLd = members.map((m) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/about#${m.slug}`,
    name: m.name,
    ...(m.role ? { jobTitle: m.role } : {}),
    ...(m.focus ? { knowsAbout: m.focus } : {}),
    ...(m.photo ? { image: `${siteConfig.url}${m.photo}` } : {}),
    url: `${siteConfig.url}/about#${m.slug}`,
    sameAs: [m.linkedin],
    worksFor: { "@id": `${siteConfig.url}/#organization` },
  }));

  return (
    <section id="team" className="border-t border-border py-20">
      <JsonLd data={jsonLd} />
      <Container>
        <SectionHeading
          eyebrow="Our team"
          title="The people who build and deliver your platform"
          description="A senior, in-house team — the engineers you meet in discovery are the ones who write, ship and support your code."
        />

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <li
              key={m.slug}
              id={m.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={`${m.name}${m.role ? `, ${m.role}` : ""} at Hurain Technologies`}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-6xl font-semibold tracking-[-0.04em] text-foreground/25">{initials(m.name)}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-foreground">{m.name}</h3>
                {m.role && <p className="mt-1 text-sm font-medium text-primary">{m.role}</p>}
                {m.intro && <p className="mt-3 text-sm leading-relaxed text-muted">{m.intro}</p>}
                {m.focus && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {m.focus.map((f) => (
                      <li key={f} className="rounded-full border border-border bg-background px-2.5 py-1 text-[11.5px] text-foreground/75">
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener"
                  className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  <Icon name="linkedin" className="h-4 w-4" />
                  LinkedIn profile
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
