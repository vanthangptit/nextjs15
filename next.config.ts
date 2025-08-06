import type { NextConfig } from 'next';
import { config as configs } from '@/configs';

const nextConfig: NextConfig = {
  allowedDevOrigins: configs.accessDomain,
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src']
  }
};

module.exports = nextConfig;