import React, { Fragment } from 'react';
import SectionTitle from '@/app/portfolio/components/SectionTitle';
import WorkHistory from '@/app/portfolio/components/WorkHistory';

const WorkExperience = () => {
  return (
    <Fragment>
      <article className={'mt-4'}>
        <SectionTitle title={' Work Experience'} />
        <p className={'text-[#000000] dark:text-[#A7A4A4] text-base my-2 text-center mb-[50px] opacity-70 dark:opacity-100'}>
          6 years of experience in web development using HTML, CSS, ReactJS,
          and JavaScript/TypeScript, creating highly responsive
          and user-friendly websites.
        </p>
      </article>
      <article>
        <WorkHistory />
      </article>
    </Fragment>
  );
};

export default WorkExperience;
