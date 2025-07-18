import React from 'react';
import FormSignUp from '@/app/(auth)/signup/components/FormSignup';
import TitleForm from '@/components/molecules/TitleForm';
import Link from 'next/link';
import { APP_ROUTES } from '@/utils/constants';
import { Metadata } from 'next';
import { sharedMetadata } from '@/constants/shared-metadata';
import Container from '@/components/organisms/grid/Container';

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Create a DN Account',
  openGraph: {
    ...sharedMetadata.openGraph,
    title: 'Create a DN Account'
  },
  twitter: {
    ...sharedMetadata.twitter,
    title: 'Create a DN Account',
    site: 'http://localhost:3000/signup'
  }
};

const SignUp = () => {
  return (
    <Container>
      <div className={'pt-[40px] md:pt-[70px]'}>
        <div
          className={'max-w-[640px] mr-auto ml-auto border border-solid border-gray-300 p-[20px] rounded-[5px]'}
        >
          <TitleForm title={'Sign up'}/>
          <FormSignUp/>
          <div className={'text-center mb-2 mt-3'}>
            <Link href={APP_ROUTES.SIGN_IN} className={'text-sm'}>Already have an account? Sign in</Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
