import type { NextConfig } from 'next';
import { config as configs } from '@/configs';
import { IFProtocol } from '@/utils/types';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: configs.PUBLIC_IMAGE_PROTOCOL as IFProtocol || 'https',
        hostname: configs.PUBLIC_IMAGE_HOST || '',
        pathname: `${configs.PUBLIC_IMAGE_PATH}/**`
      }
    ]
  },
  allowedDevOrigins: configs.accessDomain,
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src']
  },
  output: 'standalone'
};

module.exports = nextConfig;