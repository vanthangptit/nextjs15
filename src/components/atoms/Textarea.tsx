import React, { ChangeEvent, FocusEvent } from 'react';
import { IInput } from '@/components/atoms/Input';

type OmitTypeInput = 'type' | '$height' | '$with';

interface ITextarea extends Omit<IInput, OmitTypeInput> {
  cols?: number;
  rows?: number;
  // onBlur?: (_e: FocusEvent<HTMLTextAreaElement>) => void
  // onChange?: (_e: ChangeEvent<HTMLTextAreaElement>) => void
  // onInput?: (_e: ChangeEvent<HTMLTextAreaElement>) => void
}

const Textarea = ({
  value,
  name,
  placeholder,
  autoFocus = false,
  disabled,
  cols,
  rows,
  readonly = false,
  onBlur,
  onChange
}: ITextarea) => {

  return (
    <textarea
      className={
        'w-full font-light text-md rounded-[8px]' +
        ' pt-[8px] pb-[8px] pr-[16px] border border-[#cbcbcb] ' +
        'dark:border-[#414141] pl-[16px] text-black dark:text-white focus:outline-none'
      }
      value={value}
      id={name}
      name={name}
      cols={cols || 30}
      rows={rows || 5}
      readOnly={disabled || readonly}
      placeholder={placeholder}
      autoFocus={!!autoFocus}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
};

export type { OmitTypeInput, ITextarea };

export default Textarea;
