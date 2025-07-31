'use client';

import React, { useEffect, useRef, useState } from 'react';
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc';
import LightWhite from '@/components/atoms/light-white/LightWhite';

interface ISlideCollapseProps {
  headerTemplate: React.ReactNode;
  contentTemplate: React.ReactNode;
}

const SlideCollapse = ({
  headerTemplate,
  contentTemplate
}: ISlideCollapseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('0px');
  const [maxHeightLightWhite, setMaxHeightLightWhite] = useState('0px');

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
    setMaxHeightLightWhite(isOpen ? '190px' : '0px');
  }, [isOpen]);

  return (
    <div className={
      'relative overflow-hidden w-full relative after:content-[""] py-[20px] ' +
      'after:absolute after:top-[0px] after:left-[0px] after:w-[100%] after:h-[1px] ' +
      'after:bg-[#202227]'
    }
    >
      <div
        className={'flex flex-nowrap cursor-pointer'}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={'grow shrink basis-auto'}>
          {headerTemplate}
        </div>
        <div className={'flex items-center'}>
          <span className={'inline-block rounded-[3px] border border-[#393939]'}>
            {isOpen
              ? <VscChevronUp size={18} />
              : <VscChevronDown size={18} />
            }
          </span>
        </div>
      </div>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight }}
      >
        {contentTemplate}
      </div>

      <LightWhite
        maxHeight={maxHeightLightWhite}
        styles={
          'rotate-[0deg] top-[-170px] left-[50%] w-[70%] translate-x-[-50%] transition-[max-height] ' +
          'transition-all duration-500'
        }
      />
    </div>
  );
};

export type { ISlideCollapseProps };

export default SlideCollapse;
