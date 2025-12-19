import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Move allowedDevOrigins to the root level as per Next.js 15+ documentation
  allowedDevOrigins: [
    "localhost:3000",
    "192.168.1.19:3000",
    "*.loca.lt",
    "little-tables-check.loca.lt"
  ]
};

export default nextConfig;
