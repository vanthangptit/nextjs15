'use client';

import React, { Fragment, useMemo } from 'react';
import SlideCollapse, { ISlideCollapseProps } from '@/components/molecules/Collapse';
import { VscBriefcase } from 'react-icons/vsc';
import { BiTimeFive } from 'react-icons/bi';

interface IHeaderTemplateProps {
  jobTitle: string;
  company: string;
  time: string;
  img: string;
  isCustomImage?: boolean;
}

interface IContentTemplateProps {
  description: string;
  roleAndResponsibilities: {
    role: 'Backend' | 'Frontend',
    responsibilities: string[]
  }[];
}

interface IWorkHistory {
  header: IHeaderTemplateProps;
  content: IContentTemplateProps;
}

const WorkHistory = () => {
  const histories = useMemo((): IWorkHistory[] => {
    return [
      {

        header: {
          jobTitle: 'Frontend Developer',
          company: 'At APZON IRIS Vietnam',
          time: '03/2024 – Present',
          img: '/portfolio/banners/irs-logo.png'
        },
        content: {
          description: 'APZON IRS Vietnam is product company; ERP implementation and consulting service provider based on SAP Business One platform.',
          roleAndResponsibilities: [{
            role: 'Frontend',
            responsibilities: [
              'Developed UI features using React, TypeScript, and SCSS',
              'Created reusable components and custom hooks',
              'Integrated Axios to handle RESTful APIs in a usable and scalable',
              'Implemented OTP-based user verification on the client side',
              'Creating the system message log with IndexedDB',
              'Supporting other team members',
              'Reviewing other members\' code'
            ]
          }]
        }
      },
      {
        header: {
          jobTitle: 'Full-stack Developer',
          company: 'At Dandelion Labs',
          time: '07/2022 – 09/2023',
          img: '/portfolio/banners/dandelions-labs.png'
        },
        content: {
          description: 'Dandelion Labs is a blockchain product and research agency creating meaningful experiences to power the next generation of decentralized commerce.',
          roleAndResponsibilities: [
            {
              role: 'Frontend',
              responsibilities: [
                'Converting PSD to React/Typescript using functional components',
                'Styling layouts using Styled-components',
                'Develop interactive and responsive front-end elements',
                'Ensure compatibility across browsers and platforms',
                'Handling API requests with Redux Toolkit and Axios',
                'Created reusable components and custom hooks'
              ]
            },
            {
              role: 'Backend',
              responsibilities: [
                'Built RESTful APIs with NodeJS/Express to handle CRUD operations in a post management platform.',
                'Designed the system using a Modular Architecture pattern to ensure maintainability and scalability.',
                'Handling data validation using Express-Validator',
                'Used JWT to securely authenticate users',
                'Implemented email confirmation workflow using SendGrid for user account verification.',
                'Integrated centralized logging using Better Stack for real-time monitoring and debugging',
                'Implemented Google login for user authentication',
                'Implemented recurring payment workflows using Stripe Billing APIs'
              ]
            }
          ]
        }
      },
      {
        header: {
          jobTitle: 'Frontend Developer',
          company: 'At FRF Tech (formerly KyberOSC)',
          time: '10/2018 – 06/2022',
          img: '/portfolio/banners/frf-tech-logo.png',
          isCustomImage: true
        },
        content: {
          description: 'FRF is a software outsourcing company specializing in Web/Mobile Development and Enterprise Applications.',
          roleAndResponsibilities: [{
            role: 'Frontend',
            responsibilities: [
              'Initialized projects with Bootstrap, SASS, and HandlebarsJS',
              'Converted PSD files to HandlebarsJS components',
              'Developed responsive websites using Bootstrap and SASS with a mobile-first approach',
              'Ensured UI consistency across different browsers and screen resolutions',
              'Created reusable jQuery plugins for handling intricate front-end functionality',
              'Integrated APIs using jQuery AJAX for dynamic data exchange'
            ]
          }]
        }
      }
    ];
  }, []);

  const headerTemplate = (props: IHeaderTemplateProps): React.ReactNode => {
    return (
      <div className={'flex gap-[10px]'}>
        <div className={'pt-[5px] ' + (props?.isCustomImage ? 'bg-[#fff] p-[5px] rounded-[100%]' : '')}>
          <img
            src={props.img}
            alt={props.jobTitle}
            className={(props?.isCustomImage ? 'h-[40px] w-[43px]' : 'h-[50px] w-[50px]') + ' object-contain object-center'}
          />
        </div>
        <div className={'grow shrink basis-auto pr-[25px]'}>
          <h3 className={'text-size-22 mb-[2px]'}>
            {props.jobTitle}
          </h3>
          <div className={'flex flex-nowrap opacity-90 dark:opacity-80 gap-[40px] justify-between'}>
            <div className={'flex flex-nowrap items-center text-size-12 gap-[4px]'}>
              <span className={'pt-[1px]'}>
                <VscBriefcase className={'text-size-14'}/>
              </span>
              <span>{props.company}</span>
            </div>
            <div className={'flex flex-nowrap items-center text-size-12 gap-[4px]'}>
              <span className={'pt-[1px]'}>
                <BiTimeFive size={15}/>
              </span>
              <span>{props.time}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const contentTemplate = (props: IContentTemplateProps): React.ReactNode => {
    return (
      <Fragment>
        <div className={'my-[20px]'}>
          <strong className={'font-normal'}>Description: </strong>
          <span className={'opacity-70 font-thin text-[15px] my-[20px]'}>{props.description}</span>
        </div>
        <div>
          <h4 className={'text-lg'}>Role & Responsibilities</h4>
          {props.roleAndResponsibilities.length > 1 ? (
            <div>
              {props.roleAndResponsibilities.map((item, index) => (
                <Fragment key={index}>
                  <strong className={'font-normal block mt-[10px]'}>{item.role}</strong>
                  <ul className={'opacity-70 font-thin text-[14px] !list-disc list-outside pl-[20px] leading-relaxed'}>
                    {item.responsibilities.map((text, indexItem) => (
                      <li key={indexItem}>{text}</li>
                    ))}
                  </ul>
                </Fragment>
              ))}
            </div>
          ) : (
            <ul className={'opacity-70 font-thin text-[14px] !list-disc list-inside leading-relaxed'}>
              {props.roleAndResponsibilities.map((item) => {
                return item.responsibilities.map((text, index) => (
                  <li key={index}>{text}</li>
                ));
              })}
            </ul>
          )}
        </div>
      </Fragment>
    );
  };

  const data: ISlideCollapseProps[] = histories.map((history) => {
    return {
      headerTemplate: headerTemplate(history.header),
      contentTemplate: contentTemplate(history.content)
    };
  });

  return data.map((item, index) => (
    <SlideCollapse key={index} {...item} />
  ));
};

export type { IHeaderTemplateProps, IContentTemplateProps };
export default WorkHistory;
