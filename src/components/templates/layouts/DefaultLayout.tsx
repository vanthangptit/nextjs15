import * as React from 'react';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';

interface ILayoutProps {
  children: React.ReactNode
}

//Note: Can't the change. It for the layout with path: src/app/layout.js
const DefaultLayout: React.FC<ILayoutProps> = async ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen bg-white dark:bg-[#0C0C13]">
      <Header />
      <main
        role={'main'}
        className={'pb-[74px] min-h-[calc(100vh-60px-74px)] md:min-h-[calc(100vh-70px-74px)] lg:min-h-[calc(100vh-85px-74px)]'}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
