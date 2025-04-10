import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [],
    unoptimized: true, // Required for static export
  },
  // Enable static exports
  output: 'export',
  // Disable features that aren't supported in static sites
  // serverComponents property removed due to type error
  // This ensures Next.js properly prioritizes the favicon in public over src/app
  // Removing rewrites as they don't work with static export

  // Configure experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Set base path if needed for Render.com deployment
  // basePath: '',
};

export default nextConfig;
