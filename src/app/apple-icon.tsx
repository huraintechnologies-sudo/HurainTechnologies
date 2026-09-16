import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2dd4ef, #3b82f6)",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#05070d",
            fontSize: 104,
            fontWeight: 700,
            fontFamily: "sans-serif",
          }}
        >
          H
        </div>
      </div>
    ),
    { ...size }
  );
}
