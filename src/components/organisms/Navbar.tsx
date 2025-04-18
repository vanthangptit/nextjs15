'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import logoImage from '@/images/logo.png';
import NavItem from '@/components/atoms/NavItem';
import Toggler from '@/components/atoms/Toggler';

const MENU_LIST = [
  { text: 'Create Post', href: '/create-post' },
  { text: 'Login', href: '/login' },
  { text: 'Signup', href: '/signup' }
];

const Navbar = ({ isFixed }: { isFixed: boolean }) => {
  const [activeIdx, setActiveIdx] = useState<number>(-1);

  return (
    <nav className={'flex w-full gap-[20px] flex-nowrap items-center'}>
      <Link href={'/'}>
        <Image
          className={'lg:w-[45px] lg:h-[45px] md:w-[35px] md:h-[35px] w-[30px] h-[30px]'}
          src={logoImage}
          alt={'logo'}
          width={45}
          height={45}
          priority={true}
        />
      </Link>
      <ul className={'flex flex-auto gap-[10px] justify-end'}>
        {MENU_LIST.map((menu, idx) => (
          <li
            onClick={() => setActiveIdx(idx)}
            key={menu.text}
            className={`${activeIdx === idx ? 'active' : ''}`}
          >
            <NavItem active={activeIdx === idx} {...menu} isFixed={isFixed}/>
          </li>
        ))}
      </ul>
      <div className={'flex items-center'}>
        <Toggler/>
      </div>
    </nav>
  );
};

export default Navbar;