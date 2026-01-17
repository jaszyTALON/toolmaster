import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],
  // Removed 'output: standalone' - doesn't work well with Electron
  // Default Next.js build mode works better for desktop apps
};

export default nextConfig;
