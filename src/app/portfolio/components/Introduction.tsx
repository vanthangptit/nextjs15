import React from 'react';
import SectionTitle from '@/app/portfolio/components/SectionTitle';
import Button from '@/components/atoms/Button';
import { SectionId } from '@/utils/enums';
import SectionBox from '@/app/portfolio/components/SectionBox';

const Introduction = () => {
  return (
    <SectionBox>
      <p className={'text-[#3a3a3a] dark:text-[#E7E7E7] font-semibold'}>🖐️ Hello I am,</p>
      <SectionTitle
        titleStyles={'text-left'}
        descriptionStyles={'text-left'}
        title={'Front-end developer?'}
        description={'For nearly 6 years, I’ve been focused on UI/UX development — creating intuitive, accessible UI and user-friendly experiences, while integrating modern technologies.'}
      />
      <div className={'flex gap-[15px] mt-[35px] flex-wrap sm:flex-nowrap'}>
        <Button typeHTML={'button'} type={'contained'}>
          <a className={'normal-case'} href={`#${SectionId.IgnoredContact}`}>{'Hire me'}</a>
        </Button>
        <Button typeHTML={'button'} type={'outlined'}>
          <a className={'normal-case'} href={`#${SectionId.IgnoredAbout}`}>{'Discover my journey'}</a>
        </Button>
      </div>
    </SectionBox>
  );
};

export default Introduction;
