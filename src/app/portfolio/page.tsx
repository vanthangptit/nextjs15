import React from 'react';
import { Metadata } from 'next';
import { sharedMetadata } from '@/utils/constants';
import { config } from '@/configs';
import Content from '@/app/portfolio/components/Content';

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Portfolio | Nguyen Van Thang',
  openGraph: {
    ...sharedMetadata.openGraph,
    title: 'Portfolio | Nguyen Van Thang'
  },
  twitter: {
    ...sharedMetadata.twitter,
    title: 'Portfolio | Nguyen Van Thang',
    site: `${config.baseURL}/portfolio`
  }
};

const Portfolio = () => {
  return (
    <Content />
  );
};

export default Portfolio;
