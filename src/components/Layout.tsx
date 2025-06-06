import * as React from 'react';
import { cookies } from 'next/headers';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import { AUTH_SESS_ID_NAME } from '@/constants/auth';

interface ILayoutProps {
  children: React.ReactNode
}

//Note: Can't the change. It for the layout with path: src/app/layout.js
const Layout: React.FC<ILayoutProps> = async ({ children }) => {
  const sessionId = (await cookies()).get(AUTH_SESS_ID_NAME)?.value;

  return (
    <div className="bg-gray-100 min-h-screen bg-white dark:bg-black h-[10000px]">
      <Header />
      <main role={'main'}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
