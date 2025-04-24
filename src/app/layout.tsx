import '../styles/globals.css';

import React from 'react';
import { Metadata, Viewport } from 'next';
import Providers from '@/app/providers';
import Layout from '@/components/Layout';
import Toast from '@/components/organisms/toast';
import { sharedMetadata } from '@/utils/constants';

//Note: Generate default metadata by this way
export const metadata: Metadata = {
  ...sharedMetadata
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
