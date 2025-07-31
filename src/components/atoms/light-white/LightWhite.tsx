import React from 'react';

//Note: Make sure the parent component has position: relative.
const LightWhite = ({
  styles,
  maxHeight
}: {
  styles: string,
  maxHeight?: string
}) => {
  return <div
    style={{ maxHeight }}
    className={
      'bg-[rgba(255,255,255,0.15)] blur-[40px] rounded-[100%] transform opacity-100 ' +
      'h-[190px] overflow-visible absolute z-[0] ' + styles
    }/>;
};

export default LightWhite;
