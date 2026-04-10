import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    'preview-chat-622999b0-3f12-446c-8760-24138854384f.space.z.ai',
    '.space.z.ai',
  ],
};

export default nextConfig;
