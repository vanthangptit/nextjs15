import React from 'react';
import FormSignUp from '@/app/(auth)/signup/component/FormSignup';
import SignupTemplate from '@/components/Templates/SignupTemplate';
import TitleForm from '@/components/molecules/TitleForm';

const SignUp = () => {
  return (
    <SignupTemplate>
      <div
        className={'mt-[40px] md:mt-[70px] max-w-[640px] mr-auto ml-auto border border-solid border-gray-300 p-[20px] rounded-[5px]'}
      >
        <TitleForm title={'Sign up'} />
        <FormSignUp />
      </div>
    </SignupTemplate>
  );
};

export default SignUp;
