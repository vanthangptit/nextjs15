import React from 'react';
import DefaultLayout from '@/components/templates/layouts/DefaultLayout';

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DefaultLayout>
      {children}
    </DefaultLayout>
  );
}