import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time rather than shipped as a binary asset, so the card
 * always matches the site copy and the repository stays free of images.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#f9f9fb",
        backgroundImage:
          "radial-gradient(900px 420px at 50% -10%, #e5e3fb 0%, #f9f9fb 70%)",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background: "#5b58e3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 18V6l12 12V6"
              stroke="#ffffff"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div style={{ fontSize: 40, fontWeight: 600, color: "#11121c" }}>
          Nexa
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 68,
            fontWeight: 600,
            letterSpacing: -2,
            lineHeight: 1.05,
            color: "#11121c",
            maxWidth: 900,
          }}
        >
          Automatisez votre travail.
        </div>
        <div style={{ fontSize: 32, color: "#5f616c", maxWidth: 880 }}>
          {siteConfig.description}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div
          style={{
            height: 4,
            width: 88,
            borderRadius: 999,
            background: "#5b58e3",
          }}
        />
        <div style={{ fontSize: 24, color: "#70717c" }}>
          Projet fictif de démonstration
        </div>
      </div>
    </div>,
    size,
  );
}
