import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "vighnesh-dev.vercel.app",
          },
        ],
        destination: "https://whoisvighnesh.in/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "vighnesh-portfolio.vercel.app",
          },
        ],
        destination: "https://whoisvighnesh.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;