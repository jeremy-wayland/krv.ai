// app/(site)/academia/coal/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "nodejs"; // ensure broad compatibility for crawlers
export const alt =
  "Accelerating US Coal Phaseout - Data-driven framework published in Nature Energy";
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
            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px 80px",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Brand badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 50,
            zIndex: 1,
          }}
        >
          <div
            style={{
              background: "rgba(59, 130, 246, 0.1)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 18,
              color: "#60a5fa",
              fontWeight: 600,
              letterSpacing: "0.5px",
            }}
          >
            NATURE ENERGY
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: 24,
              letterSpacing: "-0.02em",
              maxWidth: "90%",
            }}
          >
            Accelerating US Coal Phaseout
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 30,
              color: "#cbd5e1",
              lineHeight: 1.4,
              maxWidth: "85%",
              fontWeight: 400,
            }}
          >
            Data-driven strategies for retiring 198 coal plants faster
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 30,
            zIndex: 1,
          }}
        >
          <div style={{ fontSize: 22, color: "#94a3b8", fontWeight: 500 }}>
            Sidney Gathrid • Grace C. Wu
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "white",
              letterSpacing: "0.5px",
            }}
          >
            Krv Analytics
          </div>
        </div>

        {/* Accent element */}
        <div
          style={{
            position: "absolute",
            right: -100,
            top: -100,
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
