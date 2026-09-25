import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Same monogram as components/Logo.tsx on the graphite background.
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
          background: "#0d0e10",
          borderRadius: 14,
        }}
      >
        <svg width="62%" height="62%" viewBox="0 0 32 32">
          <rect x="4" y="3" width="7" height="26" rx="1.5" fill="#ecebe6" />
          <rect x="21" y="3" width="7" height="26" rx="1.5" fill="#ecebe6" />
          <path d="M11 20.5 21 11.5" stroke="#ff7a45" strokeWidth="4.5" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
