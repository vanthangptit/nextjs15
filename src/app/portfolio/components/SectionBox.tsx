import React from 'react';

const SectionBox = ({
  ref,
  children,
  isNotPadding
}: {
  ref?: any
  children: React.ReactNode;
  isNotPadding?: boolean
}) => {
  return (
    <section ref={ref || undefined}>
      <div className={(isNotPadding ? '' : 'px-[50px] ') + ' py-[50px] overflow-hidden'}>
        {children}
      </div>
    </section>
  );
};

export default SectionBox;
