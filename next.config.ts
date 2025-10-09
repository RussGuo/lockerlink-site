import path, { dirname } from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "@": path.join(__dirname, "src"),
    };
    return config;
  },
};

export default nextConfig;
