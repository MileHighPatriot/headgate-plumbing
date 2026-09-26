import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b2a2a",
          color: "#ffffff",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 36 36">
            <path d="M8 29V9M28 29V9M6 9h24" stroke="#9ed8c6" strokeWidth="2.6" strokeLinecap="round" />
            <rect x="11.5" y="12" width="13" height="8.5" rx="1.6" fill="#d9f24b" />
            <path d="M9.5 26.2c1.6-1.4 3.1-1.4 4.7 0s3.1 1.4 4.7 0 3.1-1.4 4.7 0 3 1.3 3.6.6" stroke="#9ed8c6" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 34, fontWeight: 700 }}>{site.name}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 108, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
            Water where it
          </div>
          <div style={{ display: "flex", fontSize: 108, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#d9f24b" }}>
            belongs.
          </div>
          <div style={{ display: "flex", marginTop: 32, fontSize: 30, color: "#8fb3ac" }}>
            Denver-metro plumbing · Upfront prices · 2-hour windows · 24/7
          </div>
        </div>
      </div>
    ),
    size,
  );
}
