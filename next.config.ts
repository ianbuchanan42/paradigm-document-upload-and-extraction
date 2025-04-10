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
  // This ensures Next.js properly prioritizes the favicon in app directory

  // Configure experimental features for proper client hydration
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Enable better client-side hydration for static exports
    optimizeCss: true,
  },
  // Set base path if needed for Render.com deployment
  // basePath: '',
};

export default nextConfig;
