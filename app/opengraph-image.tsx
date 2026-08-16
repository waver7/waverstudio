import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt =
  "WaverStudio — AI Automation & Custom Software in Miamisburg, Ohio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050608",
          padding: "72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: 320,
            width: 720,
            height: 520,
            borderRadius: 9999,
            background: "rgba(168,85,247,0.28)",
            filter: "blur(140px)",
          }}
        />
        {/* top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background:
                "linear-gradient(100deg,#FF2EA6,#A855F7,#3287FF)",
              display: "flex",
            }}
          />
          <div style={{ color: "#F7F8FA", fontSize: 30, fontWeight: 700 }}>
            WaverStudio
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              color: "#A1A7B3",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            AI Automation • Software • Miamisburg, OH
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0 20px",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#F7F8FA",
            }}
          >
            <span>Build a</span>
            <span
              style={{
                background: "linear-gradient(100deg,#FF2EA6,#A855F7,#3287FF)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              smarter business
            </span>
            <span>with AI.</span>
          </div>
        </div>

        {/* bottom */}
        <div style={{ color: "#6F7683", fontSize: 24 }}>
          AI agents · Workflow automation · CRM · Integrations · Custom software
        </div>
      </div>
    ),
    { ...size },
  );
}
