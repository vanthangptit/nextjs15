import React from 'react';
import DividerBeside from '@/components/atoms/dividers/DividerBeside';

const ContainerPortfolio = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={'max-w-[700px] m-auto relative'}>
      <DividerBeside beside={'left'} />
      {children}
      <DividerBeside beside={'right'} />
    </div>
  );
};

export default ContainerPortfolio;