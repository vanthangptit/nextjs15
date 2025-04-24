import { Metadata } from 'next';

export const sharedMetadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Home | My Stories & Memoirs',
  description: 'My Stories & Memoirs',
  applicationName: 'dn-app',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Daniel Nguyen',
    'my stories',
    'my memories',
    'create stories',
    'create memories',
    'my stories & memoirs'
  ],
  creator: 'Daniel Nguyen',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  robots: 'max-image-preview:large',
  icons: {
    shortcut: {
      url: '/favicon/favicon.ico',
      type: 'image/x-icon'
    },
    icon: [
      {
        type: 'image/x-icon',
        rel: 'icon',
        url: '/favicon/favicon.ico'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon/favicon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/favicon/android-chrome-192x192.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/favicon/android-chrome-512x512.png'
      }
    ],
    apple: [
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        url: '/favicon/apple-touch-icon.png'
      }
    ]
  },
  openGraph: {
    locale: 'en_US',
    type: 'website',
    url: '/logo/logo.png',
    title: 'My Website',
    description: 'DN – My Stories & Memoirs',
    siteName: 'DN',
    images: [
      {
        url: '/logo/logo.png',
        height: 630,
        width: 1200
      }
    ]
  },
  twitter: {
    card: 'summary',
    title: 'DN – My Stories & Memoirs',
    description: 'DN – My Stories & Memoirs',
    site: 'http://localhost:3000',
    images: '/logo/logo.png'
  }
};