import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // allows serving local SVG placeholders (e.g. /images/map.svg) via next/image
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
