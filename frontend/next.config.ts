import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    removeConsole: true,
  },
  reactCompiler: true,
};

export default nextConfig;
