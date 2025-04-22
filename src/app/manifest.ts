import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js App',
    short_name: 'Next.js App',
    description: 'Next.js App',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        type: 'image/x-icon',
        src: '/favicon/favicon.ico'
      },
      {
        type: 'image/png',
        sizes: '16x16',
        src: '/favicon/favicon-16x16.png'
      },
      {
        type: 'image/png',
        sizes: '32x32',
        src: '/favicon/favicon-32x32.png'
      },
      {
        type: 'image/png',
        sizes: '180x180',
        src: '/favicon/apple-touch-icon.png'
      },
      {
        type: 'image/png',
        sizes: '192x192',
        src: '/favicon/android-chrome-192x192.png'
      },
      {
        type: 'image/png',
        sizes: '512x512',
        src: '/favicon/android-chrome-512x512.png'
      }
    ]
  };
}