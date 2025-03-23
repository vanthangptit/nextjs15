import React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={'max-w-screen-lg m-auto pl-[15px] pr-[15px]'}>
      {children}
    </div>
  )
};

export default Container;
