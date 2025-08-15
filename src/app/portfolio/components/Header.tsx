'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CiUser } from 'react-icons/ci';
import { VscHome } from 'react-icons/vsc';
import { SlPhone } from 'react-icons/sl';
import { GoBriefcase } from 'react-icons/go';
import DividerTop from '@/components/atoms/dividers/DividerTop';
import DividerBottom from '@/components/atoms/dividers/DividerBottom';
import { SectionId } from '@/utils/enums';
import BackgroundImage from '@/app/portfolio/components/BackgroundImage';
import { useTheme } from 'next-themes';

const Header = () => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [positionLayer, setPositionLayer] = useState<string>('');
  const [firstRun, setFirstRun] = useState<boolean>(false);
  const [zIndexMenu, setZIndexMenu] = useState<string>('');
  const scrollYRef = useRef<any>(null);
  const isFixedRef = useRef<any>(null);

  const scrollHandler = useCallback(() => {
    const height = window.innerWidth > 1023 ? 90 : 70;
    const spacing =
      window.innerWidth > 1023
        ? 50
        : window.innerWidth > 767
          ? 25
          : 15;

    if (scrollYRef.current > window.scrollY) { // Scroll up
      if (window.scrollY <= spacing) {
        isFixedRef.current = false;
        setPositionLayer('relative');
        setZIndexMenu('');
      }
    } else { // Scroll down
      if (window.scrollY > spacing + height) {
        if (!isFixedRef.current) {
          isFixedRef.current = true;
          setPositionLayer('fixed animate-nav-scroll bg-[#f1f1f1] dark:bg-[#000000]' +
            ' shadow-lg max-w-[698px] left-[50%] transform translate-x-[-50%] pl-[15px] pr-[15px]'
          );
          setZIndexMenu('z-[9999]');
        }
      }
    }

    setFirstRun(true);
    scrollYRef.current = window.scrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('load', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('load', scrollHandler);
    };
  }, [scrollHandler]);

  useEffect(() => {
    if (!firstRun) {
      scrollHandler();
    }
  }, [firstRun, scrollHandler]);

  return (
    <header className={'mt-[15px] md:mt-[25px] px-[20px] lg:mt-[50px] h-[70px] lg:h-[90px]'} role={'header'}>
      <div className={`${positionLayer} ${zIndexMenu} 
        top-[0px] left-[0px] w-full`
      }>
        <DividerTop />
        <div className={'flex items-center pt-[10px] pb-[10px] lg:pt-[20px] lg:pb-[20px] relative overflow-hidden'}>
          <BackgroundImage />
          <div className={'flex gap-[10px] items-center relative'}>
            <Image
              className={'rounded-[50%]'}
              src="/portfolio/avatar/logo.png"
              alt="User avatar"
              width={48}
              height={48}
            />
            <div className={'hidden lg:block'}>
              <h1 className={'text-[#4f4f4f] dark:text-[#b9b8b9] font-bold'}>
                Thang Nguyen
              </h1>
              <p className={'flex gap-[5px] items-center'}>
                <span
                  className={'inline-block bg-[#13873A] rounded-[50%] w-[8px] h-[8px]'}
                />
                <span className={'text-[#616161] dark:text-[#cbcaca] text-xs pb-[1px]'}>Available for work</span>
              </p>
            </div>
          </div>
          <div className={'flex flex-1 justify-end items-center relative z-[9]'}>
            <ul className={'flex items-center'}>
              <li className={'relative group'}>
                <a href={`#${SectionId.IgnoredHome}`} className={'inline-block pl-[15px] pr-[15px] pt-[5px] pb-[5px]'}>
                  <VscHome className="text-[#4f4f4f] dark:text-[#b9b8b9] text-[20px] lg:text-[24px]" />
                </a>
                <span className={'text-[#E7E7E7] text-sm absolute pr-2 pl-2 pb-0.5 bg-[#202227] left-1/2 top-[100%]' +
                  ' opacity-0 duration-350 transition-all -translate-x-1/2 -translate-y-[-30px] ' +
                  'group-hover:translate-y-[0px] group-hover:opacity-100 rounded-[25px]'
                }>
                  Home
                </span>
              </li>
              <li className={'relative group'}>
                <a href={`#${SectionId.IgnoredAbout}`} className={'inline-block pl-[12px] pr-[12px] lg:pl-[15px] lg:pr-[15px] pt-[5px] pb-[5px]'}>
                  <CiUser className="text-[#000000] dark:text-[#cdcdcd] text-[20px] lg:text-[24px]" />
                </a>
                <span className={'text-[#E7E7E7] text-sm absolute pr-2 pl-2 pb-0.5 bg-[#202227] left-1/2 top-[100%]' +
                  ' opacity-0 duration-350 transition-all -translate-x-1/2 -translate-y-[-30px] ' +
                  'group-hover:translate-y-[0px] group-hover:opacity-100 rounded-[25px]'
                }>
                  About
                </span>
              </li>
              <li className={'relative group'}>
                <a href={`#${SectionId.IgnoredExperience}`} className={'inline-block pl-[12px] pr-[12px] lg:pl-[15px] lg:pr-[15px] pt-[5px] pb-[5px]'}>
                  <GoBriefcase className="text-[#4f4f4f] dark:text-[#b9b8b9] text-[18px] lg:text-[22px]" />
                </a>
                <span className={'text-[#E7E7E7] text-sm absolute pr-2 pl-2 pb-0.5 bg-[#202227] left-1/2 top-[100%]' +
                  ' opacity-0 duration-350 transition-all -translate-x-1/2 -translate-y-[-30px] ' +
                  'group-hover:translate-y-[0px] group-hover:opacity-100 rounded-[25px]'
                }>
                  Experience
                </span>
              </li>
              <li className={'relative group'}>
                <a href={`#${SectionId.IgnoredContact}`} className={'inline-block pl-[12px] pr-[12px] lg:pl-[15px] lg:pr-[15px] pt-[5px] pb-[5px]'}>
                  <SlPhone className="text-[#2b2b2b] dark:text-[#9d9d9d] text-[18px] lg:text-[21px]" />
                </a>
                <span className={'text-[#E7E7E7] text-sm absolute pr-2 pl-2 pb-0.5 bg-[#202227] right-0 top-[100%]' +
                  ' opacity-0 duration-350 transition-all -translate-x-0 -translate-y-[-30px] ' +
                  'group-hover:translate-y-[0px] group-hover:opacity-100 rounded-[25px]'
                }>
                  Contact
                </span>
              </li>
            </ul>
          </div>
          <div className={
            'absolute top-[-50px] left-[calc(50.00000000000002%-80%/2)] w-[80%] z-[0] bg-[rgba(255,255,255,0.4)] blur-[60px] rounded-[100%] opacity-[1] flex-none h-[50px]  overflow-visible'
          }></div>
        </div>
        {currentTheme === 'dark' && isFixedRef.current && (
          <DividerBottom />
        )}
      </div>
    </header>
  );
};

export default Header;
