import React from 'react';
import Link from 'next/link';
import TitleForm from '@/components/molecules/TitleForm';
import { FormSignIn } from '@/app/(auth)/signin/components/FormSignIn';
import { APP_ROUTES } from '@/utils/constants';
import { Metadata } from 'next';
import { sharedMetadata } from '@/constants/shared-metadata';
import Container from '@/components/organisms/grid/Container';

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Sign in to DN | DN Account',
  openGraph: {
    ...sharedMetadata.openGraph,
    title: 'Sign in to DN | DN Account'
  },
  twitter: {
    ...sharedMetadata.twitter,
    title: 'Sign in to DN | DN Account',
    site: 'http://localhost:3000/signin'
  }
};

const SignIn = () => {
  return (
    <Container>
      <div className={'pt-[40px] md:pt-[70px]'}>
        <div
          className={'max-w-[450px] mr-auto ml-auto border border-solid border-gray-300 p-[20px] rounded-[5px]'}
        >
          <TitleForm title={'Sign in'}/>
          <FormSignIn/>
          <div className={'flex justify-between align-center gap-[20px] mb-2 mt-3'}>
            <Link href={APP_ROUTES.FORGOT_PASSWORD} className={'text-sm'}>Forgot password?</Link>
            <Link href={APP_ROUTES.SIGN_UP} className={'text-sm'}>Don&rsquo;t have an account? Sign Up</Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SignIn;
