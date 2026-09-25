import { siteConfig } from "@/lib/site-config";

export function whatsappUrl(text?: string) {
  return text ? `${siteConfig.whatsapp}?text=${encodeURIComponent(text)}` : siteConfig.whatsapp;
}

// Must be called from a real tap/click. Mobile browsers only hand wa.me off to
// the WhatsApp app during a user gesture; a new tab opened any other way gets
// stuck on api.whatsapp.com's "send" error page. On phones we navigate the
// current tab (the app takes over, and Back returns here) instead of leaving
// a blank tab behind.
export function openWhatsApp(text?: string) {
  const url = whatsappUrl(text);
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  if (isTouch) {
    window.location.href = url;
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
