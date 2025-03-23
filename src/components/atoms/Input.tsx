import React, { FocusEvent, ChangeEvent } from 'react';

export type NameField =
  //#endregion
  'firstName' |
  'lastName' |
  'email' |
  'password' |
  'passwordConfirm';
  //#region Sign Up Form

  // 'title' |
  // 'shortUrl' |
  // 'excerpt' |
  // 'writer' |
  // 'newPassword' |
  // 'address' |
  // 'job' |
  // 'newConfirmPassword' |
  // 'school' |
  // 'alias' |
  // 'websiteUrl';

export type TypeField = 'email' | 'password' | 'text';

export interface IInput {
  name: NameField
  type: TypeField
  value?: string
  placeholder?: string
  $height?: number
  $with?: number
  autoFocus?: boolean
  disabled?: boolean
  required?: boolean
  readonly?: boolean
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onInput?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
  value,
  name,
  type = 'text',
  placeholder,
  autoFocus = false,
  disabled,
  $height,
  $with,
  readonly = false,
  onBlur,
  onChange,
  onInput,
}: IInput) => {
  const height: string = $height ? `h-[${$height}px]` : 'h-[45px]';
  const width: string = $with ? `w-[${$with}px]` : 'w-full';
  return (
    <input
      className={`
        font-light text-md rounded-[8px] pt-[8px] pb-[8px] pr-[16px] 
        ${type === 'password' ? 'pr-[50px]' : 'pr-[16px]'}
        pl-[16px] text-black dark:text-white bg-transparent ${height} ${width}
      `}
      id={name}
      value={value}
      type={type}
      name={name}
      placeholder={placeholder}
      autoFocus={!!autoFocus}
      disabled={disabled}
      onBlur={onBlur}
      onChange={onChange}
      onInput={onInput}
      readOnly={readonly}
    />
  );
};

export default Input;
