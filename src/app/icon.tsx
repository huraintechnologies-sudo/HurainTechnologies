import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#05070d",
            fontSize: 38,
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
