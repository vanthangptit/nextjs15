import React from 'react';
import Image from 'next/image';
import { BiLogoFacebook } from 'react-icons/bi';
import { BsArrowUp, BsGithub } from 'react-icons/bs';
import { SectionId } from '@/utils/enums';
import Row from '@/components/organisms/grid/Row';
import Column from '@/components/organisms/grid/Column';
import DividerBottom from '@/components/atoms/dividers/DividerBottom';

const Footer = () => {
  return (
    <footer role={'footer'}>
      <div>
        <div className={'text-center'}>
          <a href={`#${SectionId.IgnoredHome}`} className={'inline-flex relative group'}>
            <Image
              className={'rounded-[50%] border-[3px] border-[#ccc]'}
              src="/portfolio/avatar/logo.png"
              alt="User avatar"
              width={100}
              height={100}
            />
            <span
              className={
                'opacity-0 group-hover:opacity-100 absolute left-0 top-0 z-[1] w-full ' +
                'h-full bg-black rounded-full transition-all duration-700 ease-in-out ' +
                'border-[3px] border-[#eee] flex items-center justify-center'
              }
            >
              <BsArrowUp
                className={'text-white'}
                size={28}
              />
            </span>
          </a>
          <div className={'my-[15px] text-center text-fill-transparent bg-clip-text ' +
            'bg-[linear-gradient(0deg,rgb(167,164,164)0%,rgb(242,242,242)100%)] mb-7 leading-[1.3]'
          }>
            <h3 className={'text-size-22 sm:text-size-24 lg:text-size-28 mb-1'}>
               Thang Nguyen
            </h3>
            <p className={''}>Front-end & Back-end developer</p>
          </div>
          <div className={'my-3 text-left'}>
            <Row>
              <Column flexBasis={'lg:basis-[30%]'} maxWidth={'lg:max-w-[30%]'}>
                <div className={
                  'relative after:content-[""] after:absolute after:w-full after:h-px lg:after:h-full lg:after:w-px' +
                  ' after:bg-[#2f2f2f] after:right-px after:top-[calc(100%+15px)] lg:after:top-0' +
                  ' flex flex-col justify-center items-center lg:items-start'
                }>
                  <div className={'opacity-70 text-sm mb-1'}>Call me on:</div>
                  <div className={'font-bold text-sm'}>+(84) 984.619.295</div>
                </div>
              </Column>
              <Column flexBasis={'lg:basis-[40%]'} maxWidth={'lg:max-w-[40%]'}>
                <div className={
                  'relative after:content-[""] after:absolute after:w-full after:h-px lg:after:h-full lg:after:w-px' +
                  ' after:bg-[#2f2f2f] after:right-px after:top-[calc(100%+15px)] lg:after:top-0' +
                  ' flex flex-col justify-center items-center lg:items-start'
                }>
                  <div className={'opacity-70 text-sm mb-1'}>Email me at:</div>
                  <div className={'font-bold text-sm'}>thang.dev.ptit@gmail.com</div>
                </div>
              </Column>
              <Column flexBasis={'lg:basis-[30%]'} maxWidth={'lg:max-w-[30%]'}>
                <div className={'flex flex-col justify-center items-center lg:items-start'}>
                  <div className={'opacity-70 text-sm mb-2'}>Follow me on:</div>
                  <div>
                    <a
                      href="https://www.facebook.com/tnv.vt4"
                      className={'inline-block px-[5px] py-[5px] border border-[#4b4a4a] rounded-[5px] mr-[5px]'}
                    >
                      <BiLogoFacebook size={16}/>
                    </a>
                    <a
                      href="https://github.com/vanthangptit"
                      target="_blank"
                      title="Github"
                      className={'inline-block px-[5px] py-[5px] border border-[#4b4a4a] rounded-[5px] mr-[5px]'}
                    >
                      <BsGithub size={16}/>
                    </a>
                  </div>
                </div>
              </Column>
            </Row>
          </div>
        </div>
        <DividerBottom/>
        <div className={'text-center mt-[50px]'}>
          2025 Ⓒ <a href={'/'} className={'font-bold text-[#282] underline'}>DN</a> - All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
