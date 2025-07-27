import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAIN || "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_IMAGE_DOMAIN || "localhost",
        pathname: "/assets/products/**",
      },
    ],
  },
};

export default nextConfig;
