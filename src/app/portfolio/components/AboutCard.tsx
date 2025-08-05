import React from 'react';
import Image from 'next/image';
import LightWhite from '@/components/atoms/light-white/LightWhite';

const AboutCard = ({
  data
}: {
  data: {
    title: string
    description: string
    icons: {
      styles?: string
      src: string
    }[]
  }
}) => {
  return (
    <div className={
      'rounded-[15px] border-[1px] border-solid border-[#202227] bg-[rgba(0,0,0,0)] ' +
      'bg-[linear-gradient(rgb(19,21,25)0%,rgba(19,21,25,0.3)100%)] bg-repeat bg-auto bg-clip-border ' +
      'relative overflow-hidden'
    }>
      <div className={'p-[20px] sm:p-[35px] relative z-[1]'}>
        <h3 className={'text-[#E7E7E7] text-[20px] sm:text-[24px] leading-[1.3] mb-4'}>
          {data.title}
        </h3>
        <p className={'opacity-70 text-[15px] leading-[1.3] mb-8 font-thin'}>{data.description}</p>

        <div className={'flex gap-[7px]'}>
          {data.icons.map((icon, index) => (
            <Image
              className={'flex object-contain object-center ' + (icon.styles || '')}
              key={index}
              src={icon.src}
              alt={icon.src}
              height={20}
              width={20}
            />
          ))}
        </div>
      </div>
      <LightWhite styles={'rotate-[-40deg] top-[-20px] left-[-30px] w-[90px]'} />
    </div>
  );
};

export default AboutCard;
