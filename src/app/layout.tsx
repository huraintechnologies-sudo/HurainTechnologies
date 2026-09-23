import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header, HeaderNav } from "@/components/Header";
import { services } from "@/data/services";
import { serviceVerticals } from "@/data/service-verticals";
import { industries } from "@/data/industries";

const headerNav: HeaderNav = {
  services: services.map(({ slug, navLabel, category }) => ({ slug, navLabel, category })),
  serviceVerticals: serviceVerticals.map(({ id, slug, name, category }) => ({ id, slug, name, category })),
  industries: industries.map(({ slug, name }) => ({ slug, name })),
};
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { WhatsAppAutoOpen } from "@/components/WhatsAppAutoOpen";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "blockchain development company",
    "cryptocurrency development company",
    "smart contract development company",
    "payment gateway integration services",
    "api integration services",
    "cloud application modernization services",
    "ai fraud detection software development",
    "cybersecurity compliance services",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect fill='%2300D9FF' width='32' height='32' rx='6'/><text x='50%' y='50%' font-size='20' font-weight='bold' fill='white' text-anchor='middle' dy='.3em'>H</text></svg>",
    shortcut: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect fill='%2300D9FF' width='32' height='32' rx='6'/><text x='50%' y='50%' font-size='20' font-weight='bold' fill='white' text-anchor='middle' dy='.3em'>H</text></svg>",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
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
  verification: {
    google: "g2KlAMRyGVABaoLz50QvG1r-Hv1oSVwFFDBuvw7WSUY",
  },
  // Performance optimization hints
  other: {
    "dns-prefetch": "//cdn.jsdelivr.net,//cdnjs.cloudflare.com,//fonts.googleapis.com",
    "preconnect": "//cdn.jsdelivr.net,//fonts.googleapis.com,//fonts.gstatic.com",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  width: "device-width",
  initialScale: 1,
};

const GA_MEASUREMENT_ID = "G-R21Y7CWQ45";
const GTM_CONTAINER_ID = "GTM-MQSFZX8J";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Analytics are deferred until the visitor first interacts (scroll,
            tap, key, mouse) or 8s after load, whichever comes first. Loading
            gtag.js + gtm.js during page load cost ~850ms of main-thread time
            on mobile and pushed LCP past 6s. dataLayer/gtag are defined
            immediately so no events are lost. Search Console ownership is
            verified by the meta tag above and public/google*.html, so it no
            longer depends on these tags being in the raw HTML. */}
        <script
          id="analytics-loader"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');
dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
(function(){var done=false,ev=['scroll','pointerdown','keydown','touchstart','mousemove'];
function add(src){var s=document.createElement('script');s.async=true;s.src=src;document.head.appendChild(s);}
function load(){if(done)return;done=true;ev.forEach(function(e){removeEventListener(e,load,{passive:true});});
add('https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}');
add('https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}');}
ev.forEach(function(e){addEventListener(e,load,{passive:true,once:true});});
addEventListener('load',function(){setTimeout(load,8000);});})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-grid" suppressHydrationWarning>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Header nav={headerNav} />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <WhatsAppAutoOpen />
      </body>
    </html>
  );
}
