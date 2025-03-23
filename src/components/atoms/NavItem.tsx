'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const NavItem = ({
  text,
  href,
  active,
  isFixed
}: {
  isFixed: boolean;
  text: string;
  href: string;
  active: boolean
}) => {
  const [textColor, setTextColor] = useState<string>();

  useEffect(() => {
    setTextColor(isFixed ? 'dark:text-black': 'dark:text-white');
  }, [isFixed])
  return (
    <Link
      href={href}
      className={`${active ? "active" : ""} text-black md:text-base text-sm ${textColor}`}
    >
      {text}
    </Link>
  );
};

export default NavItem;