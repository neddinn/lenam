import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    // Ensure Turbopack resolves from the project root.
    root: __dirname,
  },
};

export default nextConfig;
