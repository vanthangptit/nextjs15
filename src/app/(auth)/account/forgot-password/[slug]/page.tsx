import Container from '@/components/organisms/grid/Container';
import React from 'react';
import TitleForm from '@/components/molecules/TitleForm';
import FormResetPassword from '@/app/(auth)/account/forgot-password/[slug]/components/FormResetPassword';

const Page = async ({
  params
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <Container>
      <div
        className={ 'mt-[40px] md:mt-[70px] max-w-[450px] mr-auto ml-auto border border-solid border-gray-300 p-[20px] rounded-[5px]' }
      >
        <TitleForm title={ 'Reset your password' }/>
        <FormResetPassword slug={ slug }/>
      </div>
    </Container>
  );
};

export default Page;
