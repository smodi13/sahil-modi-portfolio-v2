import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — there are lockfiles in the parent directory too.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
