import React from 'react';
import Marquee from 'react-fast-marquee';
import { config } from '@/configs';

const InfiniteSlider = () => {
  const technologies = [
    {
      label: 'HTML5',
      image: 'html5.png',
      alt: 'HTML5'
    },
    {
      label: 'CSS3',
      image: 'css3.png',
      alt: 'CSS3'
    },
    {
      label: 'SCSS',
      image: 'sass.svg',
      alt: 'SCSS'
    },
    {
      label: 'TailwindCSS',
      image: 'tailwind-css.png',
      alt: 'tailwind-css.png'
    },
    {
      label: 'JavaScript',
      image: 'javascript.png',
      alt: 'JavaScript'
    },
    {
      label: 'Typescript',
      image: 'typescript.png',
      alt: 'Typescript'
    },
    {
      label: 'ReactJS',
      image: 'reacrjs.png',
      alt: 'ReactJS'
    },
    {
      label: 'NextJS',
      image: 'nextjs.png',
      alt: 'NextJS',
      isCircle: true
    },
    {
      label: 'Redux',
      image: 'redux.png',
      alt: 'Redux'
    },
    {
      label: 'NodeJS',
      image: 'nodejs.svg',
      alt: 'NodeJS'
    },
    {
      label: 'Git',
      image: 'git.png',
      alt: 'Git'
    },
    {
      label: 'Eslint',
      image: 'eslint.png',
      alt: 'Eslint'
    },
    {
      label: 'GulpJS',
      image: 'gulpjs.png',
      alt: 'GulpJS'
    },
    {
      label: 'NPM',
      image: 'npm.png',
      alt: 'NPM'
    },
    {
      label: 'AWS',
      image: 'aws.png',
      alt: 'AWS'
    },
    {
      label: 'Docker',
      image: 'docker.png',
      alt: 'Docker'
    }
  ];

  return (
    <div
      className={'flex w-full h-full max-w-full max-h-full place-items-center m-0 overflow-hidden'}
      style={{
        maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
        WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)'
      }}
    >
      <Marquee speed={10} gradient={false} style={{ display: 'flex' }}>
        {technologies.map((item) => (
          <div key={item.label} className="px-7 py-4 rounded shadow">
            <figure className={'flex gap-2 flex-col items-center'}>
              <img
                className={(item.isCircle ? 'rounded-[100%] w-[30px] ': '') + 'h-[30px] object-contain dark:filter dark:grayscale-100'}
                src={`${config.PUBLIC_AWS_S3_URL}/${item.image}`}
                alt={item.alt}
              />
              <figcaption className={'opacity-100 dark:opacity-50 font-thin'}>{item.label}</figcaption>
            </figure>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default InfiniteSlider;
