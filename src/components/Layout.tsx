import * as React from 'react';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';

interface ILayoutProps {
  children: React.ReactNode
}

//Note: Can't the change. It for the layout with path: src/app/layout.js
const Layout: React.FC<ILayoutProps> = async ({ children }) => {
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
