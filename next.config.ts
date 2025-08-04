import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src']
  },
  output: 'standalone'
};

module.exports = nextConfig;