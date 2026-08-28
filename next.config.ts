import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the Turbopack workspace rooted at this repo, even when the repo
  // is nested inside another project that has its own lockfile.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
