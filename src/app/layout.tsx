import '../styles/globals.css';

import React from 'react';
import { cookies } from 'next/headers';
import { Metadata, Viewport } from 'next';
import Providers from '@/app/providers';
import MainLayout from '@/components/templates/MainLayout';
import Toast from '@/components/organisms/toast';
import { AUTH_SESS_ID_NAME, sharedMetadata } from '@/utils/constants';

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

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionId = (await cookies()).get(AUTH_SESS_ID_NAME)?.value;

  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={'scroll-smooth}'}
    >
      <body>
        <Providers isAuthenticated={!!sessionId}>
          <MainLayout>
            {children}
          </MainLayout>
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
