import React from 'react';
import PortfolioLayout from '@/components/templates/layouts/PortfolioLayout';

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PortfolioLayout>
      {children}
    </PortfolioLayout>
  );
}