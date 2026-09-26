import { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

interface BuildMetadataArgs {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

const BRAND = ` | ${siteConfig.name}`;
const TITLE_MAX = 60;
const DESC_MAX = 152;
// Shared social image (src/app/opengraph-image.tsx). Pages that set their own
// openGraph object lose the file-based image, so it is added explicitly.
const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: `${siteConfig.name} — ${siteConfig.tagline}` };

const SHORTER: [RegExp, string][] = [
  [/ Development Company\b/, " Company"],
  [/ Software Development\b/, " Software"],
  [/ Development Services\b/, " Services"],
  [/United Arab Emirates/, "UAE"],
  [/United Kingdom/, "UK"],
  // Whole name only: "United States of America" must not become "USA of America",
  // and "United States Virgin Islands" is a different territory.
  [/United States(?: of America)?(?! Virgin Islands)/, "USA"],
  [/ and /g, " & "],
  [/ Development in /, " in "],
];

/** Keep titles inside what Google shows (~60 chars): drop trailing "| …" parts first, then cut at a word. Brand is appended only when it fits. */
export function fitTitle(raw: string): { absolute: string } {
  let t = raw.replace(/\s*\|\s*Hurain Technologies\s*$/i, "").trim();
  const parts = t.split(/\s+\|\s+/);
  while (parts.length > 1 && parts.join(" | ").length > TITLE_MAX) parts.pop();
  t = parts.join(" | ");
  // Drop filler words before resorting to a hard cut, so place names stay whole.
  for (const [from, to] of SHORTER) {
    if (t.length <= TITLE_MAX) break;
    t = t.replace(from, to);
  }
  if (t.length > TITLE_MAX) {
    t = t.slice(0, TITLE_MAX + 1).replace(/[\s,;:—–-]+\S*$/, "").replace(/[\s,;:—–&-]+$/, "");
    t = t.replace(/\s+(in|for|of|the|and|to|with|&)$/i, "");
  }
  return { absolute: t.length + BRAND.length <= TITLE_MAX ? t + BRAND : t };
}

/** Keep descriptions inside the snippet (~155 chars), ending on a sentence or word. */
export function fitDescription(raw: string): string {
  const d = raw.replace(/\s+/g, " ").trim();
  if (d.length <= DESC_MAX) return d;
  const cut = d.slice(0, DESC_MAX);
  const sentence = cut.lastIndexOf(". ");
  if (sentence > 90) return cut.slice(0, sentence + 1);
  return cut.replace(/[\s,;:—–-]+\S*$/, "").replace(/[\s,;:—–&-]+$/, "") + "…";
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: BuildMetadataArgs): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fitted = fitTitle(title);
  title = fitted.absolute;
  description = fitDescription(description);

  return {
    title: fitted,
    description,
    keywords: keywords?.join(", "),
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type,
      images: [OG_IMAGE],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
