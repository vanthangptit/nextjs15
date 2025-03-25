import '../styles/globals.css';

import React from 'react';
import { Metadata, Viewport } from 'next';
import Providers from '@/app/providers';
import Layout from '@/components/Layout';
import Toast from '@/components/organisms/toast';

//Note: Generate default metadata by this way
export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Home | My Stories & Memoirs',
  description: 'My Stories & Memoirs',
  applicationName: 'dn-app',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Daniel',
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
        url: '/favicon/icon-16x16.png'
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
        url: '/favicon/favicon-192x192.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/favicon/favicon-512x512.png'
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
    site: 'https://nguyenthangdev.com/',
    images: '/logo/logo.png'
  }
};

//Note: Generate default viewport by this way
export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  themeColor: '#ffffff',
  colorScheme: 'dark light'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={'scroll-smooth}'}
    >
      <body>
        <Providers>
          <Layout>
            {children}
          </Layout>
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
