import type { NextConfig } from "next";

const repo = "headgate-plumbing";
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? `/${repo}` : "";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isPages
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

export default nextConfig;
