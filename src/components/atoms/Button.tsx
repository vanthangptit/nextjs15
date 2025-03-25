import React from 'react';

export type SizeButton = 'sm' | 'md' | 'lg';

export type TypeButton = 'outline' | 'contained';

export type TypeHTMLButton = 'button' | 'submit' | 'reset';

export interface IButton {
  text: string
  isLoading?: boolean
  size?: SizeButton
  type?: TypeButton
  typeHTML?: TypeHTMLButton
  disabled?: boolean
}

const Button = ({
  text,
  isLoading,
  size, // default is 'md'
  type = 'contained',
  typeHTML = 'button',
  disabled
}: IButton) => {
  let buttonSize: string = 'pt-[8px] pr-[25px] pb-[8px] pl-[25px] text-base';
  let buttonType:string = 'text-white dark:text-black border-white dark:border-black bg-black dark:bg-white';
  const pointerEvents: string = isLoading ? 'pointer-events-none' : 'pointer-events-auto';

  switch (size) {
    case 'lg': {
      buttonSize = 'pt-[8px] pr-[25px] pb-[8px] pl-[25px] text-lg';
      break;
    }
    case 'sm': {
      buttonSize = 'pt-[5px] pr-[18px] pb-[5px] pl-[18px] text-sm';
      break;
    }
    default: {
      break;
    }
  }

  if (type === 'outline') {
    buttonType = 'text-black dark:text-white border-black dark:border-white bg-transparent';
  }

  return (
    <button
      type={typeHTML}
      disabled={!!disabled}
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
      {text}
    </button>
  );
};

export default Button;
