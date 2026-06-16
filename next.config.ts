import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Las imágenes de cada landing se introducen como URL desde el backoffice.
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
