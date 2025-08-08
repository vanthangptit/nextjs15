import React from 'react';

const DividerBeside = ({ beside }: { beside: 'left' | 'right' }) => {
  return (
    <div className={
      'bg-[linear-gradient(rgba(32,34,39,0)0%,rgb(32,34,39)16.6667%,rgb(32,34,39)50%,rgb(32,34,39)81.5315%,rgba(32,34,39,0)100%)]' +
      ' absolute -top-[30px] w-px h-[calc(100%+60px)] overflow-hidden bg-scroll bg-clip-border bg-transparent ' +
      (beside === 'left' ? 'left-0' : 'right-0')
    }></div>
  );
};

export default DividerBeside;
