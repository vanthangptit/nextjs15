import React from 'react';

const PortfolioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={'max-w-[1000px] m-auto pl-[15px] pr-[15px]'}>
      {children}
    </div>
  );
};

export default PortfolioLayout;