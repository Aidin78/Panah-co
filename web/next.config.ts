import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
