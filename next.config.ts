import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  "eslint": {
    ignoreDuringBuilds: true,
  },

  "typescript": {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "phh5ur14gr.ufs.sh",

      }
    ]
  }
};

export default nextConfig;
