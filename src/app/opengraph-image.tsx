import { ImageResponse } from "next/og";
import { event } from "@/content/event";
import { formatDateRange } from "@/lib/format";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { identity, dates } = event;
  const when =
    dates.status === "confirmed" ? formatDateRange(dates.value) : "Dates to be announced";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#EAF4FF",
        color: "#0A1735",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
        <div style={{ fontSize: 28, fontWeight: 600, color: "#1D4ED8", letterSpacing: 1 }}>
          {when.toUpperCase()}
        </div>
        <div
          style={{ fontSize: 92, fontWeight: 700, lineHeight: 1, marginTop: 24, letterSpacing: -3 }}
        >
          {identity.name}
        </div>
        <div style={{ fontSize: 36, lineHeight: 1.25, marginTop: 28, color: "#44506B" }}>
          {identity.theme}
        </div>
      </div>
      <div
        style={{
          width: 340,
          height: 340,
          borderRadius: 340,
          display: "flex",
          background: "linear-gradient(172deg, #0B6E66 53%, #1D4ED8 53%)",
          boxShadow: "0 40px 80px rgba(29,78,216,0.3), inset 0 0 0 2px rgba(255,255,255,0.25)",
        }}
      />
    </div>,
    size,
  );
}
