'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import logoImage from '@/images/logo.png';
import NavItem from '@/components/atoms/NavItem';
import Toggler from '@/components/atoms/Toggler';
import { APP_ROUTES } from '@/utils/constants';
import { useAuth } from '@/hooks/useAuth';
import { AuthContext } from '@/contexts/AuthContext';
import { redirect, RedirectType, usePathname } from 'next/navigation';
import LinkButton from '@/components/atoms/LinkButton';

const MENU_LIST = [
  { text: 'Create Post', href: APP_ROUTES.CREATE_POST }
];

const Navbar = ({ isFixed }: { isFixed: boolean }) => {
  const [shownSignInButton, setShownSignInButton] = useState<boolean>(false);
  const { isAuthenticated } = useContext(AuthContext);
  const [activeIdx, setActiveIdx] = useState<number>(-1);
  const { signOutApi } = useAuth();
  const pathname = usePathname();

  const menuList = useMemo(() => {
    return MENU_LIST.filter((menu) => {
      switch (menu.href) {
        case APP_ROUTES.CREATE_POST: {
          return isAuthenticated;
        }
        default:
          return true;
      }
    });
  }, [isAuthenticated]);

  useEffect(() => {
    if (
      pathname === APP_ROUTES.SIGN_IN ||
      pathname === APP_ROUTES.SIGN_UP ||
      pathname === APP_ROUTES.FORGOT_PASSWORD
    ) {
      setShownSignInButton(false);
    } else {
      setShownSignInButton(true);
    }
  }, [pathname, isAuthenticated]);

  return (
    <nav className={'flex w-full gap-[20px] flex-nowrap items-center'} role={'navigation'}>
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
        {menuList.map((menu, idx) => (
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
        <div className={'mr-[25px]'}>
          {isAuthenticated ? (
            <LinkButton
              text={'Sign Out'}
              title={'Sign Out'}
              role={'button'}
              onClick={async (_e: React.MouseEvent<HTMLAnchorElement>) => {
                await signOutApi();
              }}
              isFixedOnNavbar={isFixed}
            />
          ) : shownSignInButton && (
            <LinkButton
              text={'Sign In'}
              title={'Sign In'}
              role={'button'}
              onClick={async (_e: React.MouseEvent<HTMLAnchorElement>) => {
                redirect(APP_ROUTES.SIGN_IN, RedirectType.push);
              }}
              isFixedOnNavbar={isFixed}
            />
          )}
        </div>
        <Toggler/>
      </div>
    </nav>
  );
};

export default Navbar;