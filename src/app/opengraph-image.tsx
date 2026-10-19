import { ImageResponse } from "next/og";
import { PROFILE } from "@/data/profile";
import { SITE } from "@/lib/site";

export const alt = `${PROFILE.name}, ${PROFILE.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #05070d 0%, #0b1530 60%, #1b1650 100%)",
          color: "#f3f5fb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26, color: "#b9b0ff" }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #2a3759",
              borderRadius: 10,
              color: "#f3f5fb",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {PROFILE.initials}
          </div>
          {SITE.url.replace(/^https?:\/\//, "")}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{PROFILE.name}</div>
          <div style={{ fontSize: 40, color: "#b9b0ff", marginTop: 18 }}>{PROFILE.title}</div>
          <div style={{ display: "flex", fontSize: 28, color: "#a3abc2", marginTop: 28, maxWidth: 900, lineHeight: 1.35 }}>
            {`Business websites, admin systems and full-stack web applications. Based in ${PROFILE.location}.`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
