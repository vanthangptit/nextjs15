import React from 'react';
import { TextAlign } from '@/utils/types';

const LabelField = ({
  text,
  align,
  htmlFor,
  required
}: {
  text: string
  align?: TextAlign
  htmlFor?: string
  required?: boolean
}) => {
  return (
    <label
      className={`relative block text-[16px] mb-[12px text-${align ?? 'left'} font-light text-sm`}
      htmlFor={htmlFor}
    >
      <span className={'dark:opacity-70'}>{text}</span>
      {required && (
        <span className={'text-[#dd0505] dark:text-[#b30202] text-xs pl-[2px] translate-y-[-2px] translate-x-[2px]'}>*</span>
      )}
    </label>
  );
};

export default LabelField;
