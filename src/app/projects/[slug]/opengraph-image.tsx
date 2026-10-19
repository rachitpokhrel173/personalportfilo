import { ImageResponse } from "next/og";
import { PROFILE } from "@/data/profile";
import { getProject, publishedProjects, STATUS_LABEL } from "@/lib/projects";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const name = project?.name ?? "Project";
  const tint = project?.tint ?? "#6a58e8";

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
          background: `linear-gradient(135deg, #05070d 0%, #0b1530 55%, ${tint} 140%)`,
          color: "#f3f5fb",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#b9b0ff", letterSpacing: 4, textTransform: "uppercase" }}>
          Case study
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 30, color: "#a3abc2" }}>{project?.category ?? ""}</div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, marginTop: 14 }}>{name}</div>
          {project && (
            <div style={{ display: "flex", fontSize: 28, color: "#a3abc2", marginTop: 24 }}>
              {[STATUS_LABEL[project.status], project.stack.slice(0, 4).join(" · ")].join("  ·  ")}
            </div>
          )}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#f3f5fb" }}>
          {`${PROFILE.name} · ${PROFILE.title}`}
        </div>
      </div>
    ),
    size,
  );
}
