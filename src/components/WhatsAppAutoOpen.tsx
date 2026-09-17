"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";

/**
 * Auto-opens WhatsApp chat after 30 seconds on first page visit
 * Uses localStorage to track if user has already seen the auto-open
 */
export function WhatsAppAutoOpen() {
  useEffect(() => {
    // Check if this is the first time visiting (no session marker)
    const sessionKey = "whatsapp-auto-opened";
    const hasAutoOpened = sessionStorage.getItem(sessionKey);

    if (!hasAutoOpened) {
      // Set timer to open after 30 seconds
      const timer = setTimeout(() => {
        // Mark that auto-open has been triggered this session
        sessionStorage.setItem(sessionKey, "true");

        // Open WhatsApp in a new window
        window.open(siteConfig.whatsapp, "_blank", "noopener,noreferrer");
      }, 30000); // 30 seconds

      // Cleanup timer if component unmounts
      return () => clearTimeout(timer);
    }
  }, []);

  // This component doesn't render anything
  return null;
}
