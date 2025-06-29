import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true, // Helps with S3 routing
  images: {
    unoptimized: true, // Required for static export (can stay)
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/,
      use: ['raw-loader', 'glslify-loader'],
    });
    return config;
  },
};

export default nextConfig;
