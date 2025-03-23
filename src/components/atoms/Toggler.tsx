'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const Toggler = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [ translated, setTranslated ] = useState<string>('translate-x-[14px]');

  useEffect(() => {
    if (currentTheme === 'light') {
      setTranslated('translate-x-[14px]');
    } else {
      setTranslated('translate-x-[0px]');
    }
  }, [ currentTheme ]);

  return (
    <button
      onClick={() => theme === 'dark' ? setTheme('light'): setTheme('dark')}
      className={`
        relative w-40px h-23px bg-black dark:bg-white rounded-5xl border-0 m-auto cursor-pointer
      `}
    >
      <span
        className={`
          h-17px w-17px absolute transition ease-in-out duration-300 
          rounded-full bg-white dark:bg-black top-[3px] left-[4px]
          ${translated}
        `}
      />
    </button>
  );
};

export default Toggler;