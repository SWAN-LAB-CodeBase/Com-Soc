import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#EAF4FF",
      }}
    >
      <div
        style={{
          width: 132,
          height: 132,
          borderRadius: 132,
          display: "flex",
          background: "linear-gradient(172deg, #0B6E66 53%, #1D4ED8 53%)",
          boxShadow: "0 12px 30px rgba(29,78,216,0.35)",
        }}
      />
    </div>,
    size,
  );
}
