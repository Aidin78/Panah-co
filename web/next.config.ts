import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 blocks image sources that resolve to a private/local IP by
    // default (SSRF hardening), which breaks fetching from a local Strapi
    // at localhost:1337 in dev. Safe here since remotePatterns below still
    // restricts it to our own CMS's /uploads path.
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // Production Strapi host — update once deployed.
      {
        protocol: "https",
        hostname: "cms.panah-co.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
