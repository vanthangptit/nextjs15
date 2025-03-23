import React from 'react';
import { TextAlign } from '@/utils/types';

const TitleForm = ({
  title,
  subtitle,
  textAlign
} : {
  title: string;
  subtitle?: string;
  textAlign?: TextAlign
}) => {
  return (
    <hgroup className={'text-[1.5em] text-center mb-[35px] ' + `text-${textAlign ?? 'left'}`}>
      <h1
        className={'font-normal mb-[5px] w-full text-black dark:text-white text-size-24 md:text-size-28 lg:text-size-32'}
      >
        {title}
      </h1>
      {subtitle && <p className={'text-base mb-[5px] font-normal text-black dark:text-white'}>{subtitle}</p>}
    </hgroup>
  );
};

export default TitleForm;
