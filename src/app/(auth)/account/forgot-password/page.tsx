import React from 'react';
import TitleForm from '@/components/molecules/TitleForm';
import { Metadata } from 'next';
import { sharedMetadata } from '@/constants/shared-metadata';
import Container from '@/components/organisms/grid/Container';
import { FormForgotPassword } from '@/app/(auth)/account/forgot-password/components/FormForgotPassword';
import { config } from '@/configs';

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Forgot Password | Can not sign in',
  openGraph: {
    ...sharedMetadata.openGraph,
    title: 'Forgot Password | Can not sign in'
  },
  twitter: {
    ...sharedMetadata.twitter,
    title: 'Forgot Password | Can not sign in',
    site: `${config.baseURL}/account/forgot-password`
  }
};

const ForgotPassword = () => {
  return (
    <Container>
      <div className={'pt-[40px] md:pt-[70px]'}>
        <div
          className={'max-w-[450px] mr-auto ml-auto border border-solid border-gray-300 p-[20px] rounded-[5px]'}
        >
          <TitleForm title={'Reset your password'}/>
          <FormForgotPassword/>
        </div>
      </div>
    </Container>
  );
};

export default ForgotPassword;
