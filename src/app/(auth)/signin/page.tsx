'use client';
import React from 'react';
import TitleForm from '@/components/molecules/TitleForm';
import { FormSignIn } from '@/app/(auth)/signin/component/FormSignIn';
import SigninTemplate from '@/components/Templates/SigninTemplate';

const SignIn = () => {
  return (
    <SigninTemplate>
      <div
        className={'mt-[40px] md:mt-[70px] max-w-[500px] mr-auto ml-auto border border-solid border-gray-300 p-[20px] rounded-[5px]'}
      >
        <TitleForm title={'Sign in'} />
        <FormSignIn />
      </div>
    </SigninTemplate>
  );
};

export default SignIn;
