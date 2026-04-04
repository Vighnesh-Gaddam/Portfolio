import type { NextConfig } from "next";
import withMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
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

const mdxConfig = withMDX();

export default mdxConfig(nextConfig);