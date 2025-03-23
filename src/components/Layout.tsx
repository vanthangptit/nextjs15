import * as React from 'react';

interface ILayoutProps {
  children: React.ReactNode
}

//Note: Can't the change. It for the layout with path: src/app/layout.js
const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen bg-white dark:bg-black h-[10000px]">
      {children}
    </div>
  );
};

export default Layout;
