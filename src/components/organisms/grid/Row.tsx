import React from 'react';

const Row = ({ children, key }: { children: React.ReactNode, key?: string | number }) => {
  return (
    <div key={key} className={'flex flex-wrap ml-[-15px] mr-[-15px]'}>
      {children}
    </div>
  );
};

export default Row;
