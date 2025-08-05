import React, { FocusEvent, ChangeEvent } from 'react';

type NameField =
  //#endregion
  'firstName' |
  'lastName' |
  'email' |
  'password' |
  'passwordConfirm' |

  //portfolio
  'customerName' |
  'message' |
  'subject';
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

type TypeField = 'email' | 'password' | 'text';

interface IInput {
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
  onBlur?: (_e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onChange?: (_e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onInput?: (_e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
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
  onInput
}: IInput) => {
  const height: string = $height ? `h-[${$height}px]` : 'h-[45px]';
  const width: string = $with ? `w-[${$with}px]` : 'w-full';
  return (
    <input
      className={`
        font-light text-md rounded-[8px] pt-[8px] pb-[8px] pr-[16px] border-[#cbcbcb] dark:border-[#414141]
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
      autoComplete="on"
    />
  );
};

export type { TypeField, NameField, IInput };
export default Input;
