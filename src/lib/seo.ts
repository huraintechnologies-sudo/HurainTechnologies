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

  return {
    title,
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
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
