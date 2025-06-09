'use client';

import React, { useEffect, useState } from 'react';

const LinkButton = ({
  text,
  title = '',
  role = '',
  onClick,
  isFixedOnNavbar = false
}: {
  text: string
  title?: string
  role?: string
  onClick?: (_e: React.MouseEvent<HTMLAnchorElement>) => void
  isFixedOnNavbar?: boolean;
}) => {
  const [textColor, setTextColor] = useState<string>('');

  useEffect(() => {
    if (isFixedOnNavbar === undefined) {
      return;
    }
    setTextColor(isFixedOnNavbar ? 'dark:text-black' : 'dark:text-white');
  }, [isFixedOnNavbar]);
  
  return (
    <a
      title={title}
      role={role}
      onClick={onClick}
      className={'cursor-pointer text-black md:text-base text-sm ' + textColor}
    >
      {text}
    </a>
  );
};

export default LinkButton;
