import React from 'react';

const Column = ({
  children,
  key,
  flexBasis,
  maxWidth
}: {
  children: React.ReactNode,
  key?: string | number
  flexBasis?: string
  maxWidth?: string
}) => {
  return (
    <div
      key={key}
      className={
        'flex flex-col grow-[0] shrink-[0] pl-[15px] pr-[15px] basis-[100%] max-w-[100%] ' + flexBasis + ' ' + maxWidth
      }
    >
      {children}
    </div>
  );
};

export default Column;
