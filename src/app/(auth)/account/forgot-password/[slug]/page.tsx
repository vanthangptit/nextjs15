import Container from '@/components/organisms/grid/Container';
import React from 'react';
import TitleForm from '@/components/molecules/TitleForm';
import FormResetPassword from '@/app/(auth)/account/forgot-password/[slug]/components/FormResetPassword';
import { Metadata } from 'next';
import { sharedMetadata } from '@/utils/constants';
import { config } from '@/configs';

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Forgot Password | Set your password',
  openGraph: {
    ...sharedMetadata.openGraph,
    title: 'Forgot Password | Set your password'
  },
  twitter: {
    ...sharedMetadata.twitter,
    title: 'Forgot Password | Set your password',
    site: `${config.baseURL}/account/forgot-password`
  }
};

const Page = async ({
  params
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <Container>
      <div className={'pt-[40px] md:pt-[70px]'}>
        <div
          className={'max-w-[450px] mr-auto ml-auto border border-solid border-gray-300 p-[20px] rounded-[5px]'}
        >
          <TitleForm title={'Reset your password'}/>
          <FormResetPassword slug={slug}/>
        </div>
      </div>
    </Container>
  );
};

export default Page;
