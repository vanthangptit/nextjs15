import React, { Fragment } from 'react';
import SectionTitle from '@/app/portfolio/components/SectionTitle';
import Button from '@/components/atoms/Button';
import { config } from '@/configs';
import { BsFiletypePdf, BsGithub } from 'react-icons/bs';
import Row from '@/components/organisms/grid/Row';
import Column from '@/components/organisms/grid/Column';
import AboutCard from '@/app/portfolio/components/AboutCard';

const AboutMe = () => {
  return (
    <Fragment>
      <article className={'flex gap-4 md:gap-8 justify-end flex-col md:flex-row items-center md:items-start'}>
        <img
          className={'shadow-[0_0_50px_15px_rgba(255,255,255,0.2)] bg-gray-100 w-40 h-40 rounded-[100%]'}
          src="/portfolio/avatar/logo.png"
          alt="User avatar"
          width={150}
          height={150}
        />
        <div className={'hidden md:block'}>
          <img
            src="/portfolio/custom-arrow.svg"
            alt="bg_header.png"
            className={'object-contain object-center pt-[12px]'}
            width={60}
            height={60}
          />
        </div>
        <strong className={'text-[#CDE4FE] opacity-90 font-thin text-[17px] leading-[1.3]'}>
          6 years of <br/>experiences
        </strong>
      </article>
      <article className={'mt-4'}>
        <SectionTitle
          titleStyles={'max-w-[220px] sm:max-w-[310px] mx-auto'}
          title={'What makes me different?'}
          description={'Frontend - focused developer with foundational Backend knowledge, aiming to build optimized and efficient features.'}
        />
      </article>
      <article className={'text-center flex flex-wrap gap-[20px] items-center justify-center'}>
        <Button typeHTML={'button'} type={'outlined'}>
          <a
            className={'normal-case flex gap-3 items-center opacity-70 text-[15px] font-thin w-[142px]'}
            href={config.PUBLIC_AWS_S3_URL + '/pdf/cv_fullstack-developer_nguyen-van-thang.pdf'}
            target="_blank"
            download
            title="Download resume"
          >
            <span>Download resume</span>
            <span><BsFiletypePdf/></span>
          </a>
        </Button>
        <Button typeHTML={'button'} type={'contained'}>
          <a
            className={'normal-case flex gap-3 items-center opacity-70 w-[142px] justify-center'}
            href={'https://github.com/vanthangptit/nextjs15'}
            target="_blank"
            title="Source code"
          >
            <span>Github</span>
            <span><BsGithub/></span>
          </a>
        </Button>
      </article>
      <article className={'mt-[30px] md:mt-[45px] lg:mt-[60px] flex flex-wrap lg:flex-nowrap'}>
        <Row>
          <Column flexBasis={'lg:basis-1/2'} maxWidth={'lg:max-w-1/2'}>
            <AboutCard
              data={{
                title: 'Front-end development',
                description: 'Expert in ReactJS, TypeScript, and Next.js, building fast, SEO-friendly web applications with clean HTML and CSS.',
                icons: [
                  {
                    src: `${config.PUBLIC_AWS_S3_URL}/html5.png`
                  },
                  {
                    src: `${config.PUBLIC_AWS_S3_URL}/tailwind-css.png`
                  },
                  {
                    src: `${config.PUBLIC_AWS_S3_URL}/javascript.png`
                  },
                  {
                    src: `${config.PUBLIC_AWS_S3_URL}/typescript.png`
                  },
                  {
                    src: `${config.PUBLIC_AWS_S3_URL}/reacrjs.png`
                  },
                  {
                    src: `${config.PUBLIC_AWS_S3_URL}/bg-nextjs.jpg`,
                    styles: 'w-[30px] rounded-[3px]'
                  }
                ]
              }}/>
          </Column>
          <Column flexBasis={'lg:basis-1/2'} maxWidth={'lg:max-w-1/2'}>
            <AboutCard
              data={{
                title: 'Back-end development',
                description: 'Basic backend development using Node.js, Express.js and MongoDB to create RESTful APIs with CRUD functionality.',
                icons: [
                  {
                    src: config.PUBLIC_AWS_S3_URL + '/nodejs.svg'
                  },
                  {
                    src: config.PUBLIC_AWS_S3_URL + '/expressjs.png'
                  },
                  {
                    src: config.PUBLIC_AWS_S3_URL + '/mongodb.svg'
                  }
                ]
              }}/>
          </Column>
        </Row>
      </article>
    </Fragment>
  );
};

export default AboutMe;
