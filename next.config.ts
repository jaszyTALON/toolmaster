import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],
  output: 'standalone',
};

export default nextConfig;
