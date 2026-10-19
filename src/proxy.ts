import { NextResponse, type NextRequest } from "next/server";
import { PROJECTS } from "@/data/projects";

// Case study pages stream their content, so a notFound() thrown during render keeps a
// 200 status. Checking the slug here, before rendering, gives unknown or unpublished
// projects a real 404 (rewritten to an unmatched path, which renders app/not-found.tsx).
const published = new Set(PROJECTS.filter((p) => p.published).map((p) => p.slug));

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (!published.has(slug)) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }
}

export const config = {
  matcher: "/projects/:slug/:path*",
};
