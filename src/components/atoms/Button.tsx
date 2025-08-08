import React from 'react';

export type SizeButton = 'sm' | 'md' | 'lg';

export type TypeButton = 'outlined' | 'contained';

export type TypeHTMLButton = 'button' | 'submit' | 'reset';

export interface IButton {
  children?: React.ReactNode;
  text?: string;
  isLoading?: boolean;
  size?: SizeButton;
  type?: TypeButton;
  typeHTML?: TypeHTMLButton;
  disabled?: boolean;
  onClick?: (_e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  children,
  text,
  isLoading,
  size, // default is 'md'
  type = 'contained',
  typeHTML = 'button',
  disabled,
  onClick
}: IButton) => {
  let buttonSize: string = 'py-[5px] px-[18px] md:py-[8px] md:px-[25px] text-base';
  let buttonType: string = 'text-white dark:text-black border-white dark:border-black bg-black dark:bg-white';
  const pointerEvents: string = isLoading ? 'pointer-events-none' : 'pointer-events-auto';

  switch (size) {
    case 'lg': {
      buttonSize = 'py-[8px] px-[25px] md:py-[12px] md:px-[32px] text-lg';
      break;
    }
    case 'sm': {
      buttonSize = 'py-[3px] px-[14px] md:py-[5px] md:px-[18px] text-sm';
      break;
    }
    default: {
      break;
    }
  }

  if (type === 'outlined') {
    buttonType = 'text-black dark:text-white border-black dark:border-white bg-transparent';
  }

  return (
    <button
      type={typeHTML}
      disabled={!!disabled}
      onClick={onClick}
      className={`
        border
        rounded-[70px]
        outline-none
        cursor-pointer
        gap-[5px]
        uppercase
        inline-block
        items-center
        justify-center
        ${pointerEvents + ' ' + buttonSize + ' ' + buttonType}
        transition-all
        duration-[0.3s]
        disabled:pointer-events-none
     `}
    >
      {text ?? children}
    </button>
  );
};

export default Button;
