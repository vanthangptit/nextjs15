'use client';
import React, { useEffect, useRef, useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { useTheme } from 'next-themes';

const ButtonSetting = () => {
  const [isOpenDropdown, setOpenDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  let animateClass = '';
  if (isOpenDropdown || hovered) {
    animateClass = '[animation-play-state:paused]';
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={'cursor-pointer animate-spin-reverse-slow ' + animateClass}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setOpenDropdown(!isOpenDropdown)}
      >
        <div className={'flex justify-center items-center w-[40px] h-[40px]'}>
          <FaCog size={26} />
        </div>
      </div>

      {isOpenDropdown && (
        <div className="absolute right-0 mt-2 w-30 border border-gray-200 rounded-lg shadow-lg">
          <button
            onClick={() => {
              setOpenDropdown(false);
              setTheme('dark');
            }}
            className="text-[14px] block w-full px-3 py-2 bg-transparent outline-none cursor-pointer border-b border-[#ccc] border-l-0 border-r-0 rounded-[0] border-t-0 text-[#000] dark:text-[#fff] hover:underline align-center"
          >
            Mode Dark
          </button>
          <button
            className="text-[14px] block w-full px-3 py-2 bg-transparent outline-none border-none cursor-pointer text-[#000] dark:text-[#fff] hover:underline text-center"
            onClick={() => {
              setOpenDropdown(false);
              setTheme('light');
            }}
          >
            Mode Light
          </button>
        </div>
      )}
    </div>
  );
};

export default ButtonSetting;
