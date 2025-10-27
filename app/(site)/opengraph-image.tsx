// app/(site)/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Krv Analytics — Enterprise AI Middleware";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1f2937 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "64px 72px",
          color: "white",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
            backgroundSize: "42px 42px",
          }}
        />

        {/* Badge */}
        <div style={{ zIndex: 1, marginBottom: 36 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(96,165,250,0.12)",
              border: "1px solid rgba(96,165,250,0.35)",
              color: "#93c5fd",
              fontWeight: 600,
              padding: "8px 14px",
              borderRadius: 10,
              letterSpacing: 0.3,
            }}
          >
            ENTERPRISE AI
          </div>
        </div>

        {/* Title + subtitle */}
        <div style={{ zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em", maxWidth: "92%" }}>
            One protocol layer for enterprise AI
          </div>
          <div style={{ marginTop: 18, fontSize: 32, color: "#cbd5e1", maxWidth: "86%", lineHeight: 1.38 }}>
            Deploy anywhere with no migrations. Plug into existing systems and spin up advanced ML/AI workflows in minutes.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.12)",
            zIndex: 1,
          }}
        >
          <div style={{ fontSize: 22, color: "#94a3b8", fontWeight: 500 }}>
            Built by data engineers and PhDs
          </div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>Krv Analytics</div>
        </div>

        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            right: -80,
            top: -80,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(96,165,250,0.16) 0%, transparent 70%)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}

