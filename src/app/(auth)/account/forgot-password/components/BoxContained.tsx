'use client';

import React, { Fragment } from 'react';
import TitleForm from '@/components/molecules/TitleForm';

const BoxContained = () => {
  return (
    <Fragment>
      <TitleForm title={'Reset your password'} />
      <strong className={'flex mb-[15px] text-base mb-[25px] font-normal text-black dark:text-white'}>
        Enter the email address you used to sign up for your <br/>
        DN account, and we’ll send you a password reset link.
      </strong>
    </Fragment>
  );
};

export default BoxContained;
