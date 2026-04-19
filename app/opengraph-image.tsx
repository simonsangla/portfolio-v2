import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          color: "#051A24",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#273C46",
          }}
        >
          {site.location} · Remote · Async
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              display: "flex",
              fontSize: 128,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {site.name}.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#273C46",
            }}
          >
            {site.tagline}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#6B6B66" }}>
          simonsangla.com
        </div>
      </div>
    ),
    size,
  );
}
