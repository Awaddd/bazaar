import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"], // Allow localhost
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5176",
        pathname: "/assets/products/**",
      },
    ],
  },
};

export default nextConfig;
