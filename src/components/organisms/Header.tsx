'use client';

import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import Navbar from './Navbar';
import Container from '@/components/organisms/grid/Container';

let IS_FIXED: boolean = false;
let SCROLL_Y: number = 0;
const padding: number = 15;

const Header = ({ spacingAside }: { spacingAside?: string }) => {
  const [ positionLayer, setPositionLayer ] = useState<string>('');
  const [ firstRun, setFirstRun ] = useState<boolean>(false);
  const [ spacing, setSpacing ] = useState<string>('');
  const [ zIndexMenu, setZIndexMenu ] = useState<string>('');

  const scrollHandler = useCallback(() => {
    if (SCROLL_Y > window.scrollY) { // Scroll up
      if (window.scrollY === 0) {
        IS_FIXED = false;
        setPositionLayer('relative');
        setSpacing('');
        setZIndexMenu('');
      }
    } else { // Scroll down
      if (window.scrollY > 85) {
        if (!IS_FIXED) {
          IS_FIXED = true;
          setPositionLayer(`fixed animate-nav-scroll p-[${padding}px] bg-white dark:bg-[#f1f1f1] shadow-lg`);
          setZIndexMenu('z-[9999]');
          setSpacing(spacingAside ?? '');
        }
      }
    }

    setFirstRun(true);
    SCROLL_Y = window.scrollY;
  }, [ spacingAside ]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [ scrollHandler ]);

  useEffect(() => {
    if (!firstRun) {
      scrollHandler();
    }
  },  [ firstRun, scrollHandler ]);

  return (
    <header
      className={`pt-[${padding}px] pb-[${padding}px] h-[60px] md:h-[70px] lg:h-[85px] border-b border-b-solid border-b-gray-400`}
    >
      <Container>
        <div className={`${positionLayer} ${zIndexMenu} top-[0px] left-[0px] w-full flex item-center md:h-[70px] h-[60px] lg:h-[85px]`}>
          <div className={`max-w-screen-lg m-auto w-full ${spacing}`}>
            <Navbar isFixed={IS_FIXED} />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
