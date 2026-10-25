import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

// Karobar (inventory app, separate Vercel project) is served at /karobar on this domain.
// KAROBAR_URL is its deployment origin, e.g. https://karobar.vercel.app; unset = no rewrite.
const karobarUrl = process.env.KAROBAR_URL?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    // /karobar sends its own headers (it needs camera access for the barcode scanner)
    return [{ source: "/((?!karobar(?:/|$)).*)", headers: securityHeaders }];
  },
  async rewrites() {
    if (!karobarUrl) return [];
    return [
      { source: "/karobar", destination: `${karobarUrl}/karobar` },
      { source: "/karobar/:path+", destination: `${karobarUrl}/karobar/:path+` },
    ];
  },
};

export default nextConfig;
