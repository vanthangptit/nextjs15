import React from 'react';

const Column = ({
  children,
  key,
  flexBasis,
  maxWidth,
  spacing = 'px-[15px]'
}: {
  children: React.ReactNode,
  key?: string | number
  flexBasis?: string
  maxWidth?: string
  spacing?: string
}) => {
  return (
    <div
      key={key}
      className={
        'flex flex-col grow-[0] shrink-[0] pb-[30px] basis-[100%] max-w-[100%] ' +
        flexBasis + ' ' + maxWidth + ' ' + spacing
      }
    >
      {children}
    </div>
  );
};

export default Column;
