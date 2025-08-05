'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/contexts/AuthContext';

const Providers = ({
  children,
  isAuthenticated
}: {
  children: ReactNode,
  isAuthenticated: boolean
}) => {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider isAuthenticated={isAuthenticated}>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Providers;