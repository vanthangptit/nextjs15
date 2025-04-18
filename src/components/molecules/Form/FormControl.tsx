'use client';

import React, { useState } from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import LabelField from '@/components/atoms/LabelField';
import Input, { IInput } from '@/components/atoms/Input';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { IFormFieldSignUp } from '@/app/(auth)/signup/component/FormSignup';
import MessageError from '@/components/atoms/MessageError';
import { IFormFieldSignIn } from '@/app/(auth)/signin/component/FormSignIn';

interface IFormFieldAll extends IFormFieldSignUp, IFormFieldSignIn {}

export interface IFormControl extends IInput {
  label?: string
  errors?: FormikErrors<IFormFieldAll>
  touched?: FormikTouched<IFormFieldAll>
  isVertical?: boolean // If true label and input are 2 rows, else the label and input are the same row
}

const FormControl = (props: IFormControl) => {
  const [isHiddenPassword, setHiddenPassword] = useState<boolean>(true);
  const handleHiddenPassword = () => setHiddenPassword(!isHiddenPassword);
  const marginBottom: string = !!props?.errors?.[props.name] ? 'mb-[15px]' : 'mb-[25px]';
  const flexDirection: string = props?.isVertical ? 'flex-col' : 'flex-row';

  return (
    <div className={marginBottom}>
      <div className={`relative flex gap-[10px] ${flexDirection}`}>
        {props?.label && (
          <LabelField
            htmlFor={props.name}
            text={props.label}
            required={!!props?.required}
          />
        )}
        <span className={'relative'}>
          <Input
            {...props}
            type={
              props?.type === 'password' ? isHiddenPassword ? props.type : 'text' : props.type
            }
          />
          {props?.type === 'password' && (
            <span
              className={'absolute top-[50%] right-[20px] translate-y-[-50%] cursor-pointer'}
              onClick={handleHiddenPassword}
            >
              {isHiddenPassword ? <BsEyeSlash size={16}/> : <BsEye size={16}/>}
            </span>
          )}
        </span>
      </div>
      {props.value && props?.errors?.[props.name] && (
        <MessageError message={props?.errors?.[props.name] || 'The value is invalid'}/>
      )}
    </div>
  );
};

export default FormControl;
