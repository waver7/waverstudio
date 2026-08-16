import { ImageResponse } from "next/og";

export const runtime = "nodejs";
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
          background: "#0D1017",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient
              id="g"
              x1="4"
              y1="6"
              x2="28"
              y2="26"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF2EA6" />
              <stop offset="0.5" stopColor="#A855F7" />
              <stop offset="1" stopColor="#3287FF" />
            </linearGradient>
          </defs>
          <path
            d="M7 10.5 L11.5 22 L16 13 L20.5 22 L25 10.5"
            stroke="url(#g)"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
