'use client';

import React, { useRef, useState, useEffect } from 'react';
import { SectionId } from '@/utils/enums';
import ContainerPortfolio from '@/app/portfolio/components/Container';
import Header from '@/app/portfolio/components/Header';
import DividerBottom from '@/components/atoms/dividers/DividerBottom';
import Introduction from '@/app/portfolio/components/Introduction';
import SectionBox from '@/app/portfolio/components/SectionBox';
import LightWhite from '@/components/atoms/light-white/LightWhite';
import SectionTitle from '@/app/portfolio/components/SectionTitle';
import InfiniteSlider from '@/app/portfolio/components/Slider';
import AboutMe from '@/app/portfolio/components/AboutMe';
import WorkExperience from '@/app/portfolio/components/Experience';
import FormContact from '@/app/portfolio/components/FormContact';
import BackgroundImage from '@/app/portfolio/components/BackgroundImage';
import Footer from '@/app/portfolio/components/Footer';

type SectionKey = 'about' | 'experience' | 'contact';

const Content = () => {
  const [hash, setHash] = useState<SectionKey | null>(null);

  const refs: Record<SectionKey, React.RefObject<HTMLElement | null>> = {
    about: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null)
  };

  const scrollTo = (key: SectionKey) => {
    const sectionRef =  refs[key]?.current;
    if (!sectionRef) {
      return;
    }

    const yOffset = -(window.innerWidth > 1023 ? 90 : 70);
    const top =
      sectionRef!.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window?.scrollTo({ top, behavior: 'smooth' });
  };

  useEffect(() => {
    // Get the current hash value
    setHash(window.location.hash?.replace('#', '') as SectionKey);

    //Note: If you want to track hash changes (when the user clicks another anchor #link)
    const handleHashChange = () => {
      setHash(window.location.hash?.replace('#', '') as SectionKey);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (hash) {
      scrollTo(hash);
    }
  }, [hash]);

  return (
    <main id={SectionId.IgnoredHome}>
      <ContainerPortfolio>
        <Header/>
      </ContainerPortfolio>

      <DividerBottom/>

      <ContainerPortfolio>
        <Introduction/>
      </ContainerPortfolio>

      <DividerBottom/>

      <ContainerPortfolio>
        <SectionBox isNotPadding={true}>
          <div className={'relative'}>
            <LightWhite styles={'rotate-[40deg] top-[-140px] right-[15px] w-[90px]'}/>
            <SectionTitle title={'What can I do?'}/>
            <InfiniteSlider/>
          </div>
        </SectionBox>
      </ContainerPortfolio>

      <DividerBottom/>

      <ContainerPortfolio>
        <SectionBox ref={refs.about}>
          <AboutMe/>
        </SectionBox>
      </ContainerPortfolio>

      <DividerBottom/>

      <ContainerPortfolio>
        <SectionBox ref={refs.experience}>
          <WorkExperience/>
        </SectionBox>
      </ContainerPortfolio>

      <DividerBottom/>

      <ContainerPortfolio>
        <SectionBox ref={refs.contact}>
          <div className={'max-w-[400px] mx-auto relative'}>
            <LightWhite styles={'rotate-[140deg] top-[-100px] left-[-160px] w-[150px] h-[250px]'}/>
            <SectionTitle
              title={'How can I help you?'}
              description={'Got a project or collaboration in mind? Reach out, and I’ll get back to you soon!'}
            />
            <FormContact/>
          </div>
        </SectionBox>
      </ContainerPortfolio>

      <DividerBottom/>

      <ContainerPortfolio>
        <div className={'relative overflow-hidden'}>
          <LightWhite
            styles={'rotate-[0deg] top-[-100px] right-[-160px] w-[500px] !bg-[rgba(255,255,255,0.07)]'}
          />
          <BackgroundImage
            url={'/portfolio/bg-footer.png'}
            styles={'object-cover'}
          />
          <SectionBox>
            <Footer/>
          </SectionBox>
        </div>
      </ContainerPortfolio>

      <DividerBottom/>
      <div className={'pb-[50px]'}/>
    </main>
  );
};

export default Content;
