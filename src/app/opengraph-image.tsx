import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #05070d 0%, #0b0f1a 55%, #111629 100%)",
          color: "#eef1f8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "linear-gradient(135deg, #2dd4ef, #3b82f6)",
              alignItems: "center",
              justifyContent: "center",
              color: "#05070d",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            H
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600 }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", fontSize: 52, fontWeight: 700, marginTop: 48, maxWidth: 980, lineHeight: 1.15 }}>
          {siteConfig.tagline}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#8b93ab", marginTop: 28 }}>
          {siteConfig.url.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
