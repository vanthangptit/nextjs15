import React from 'react';
import Container from '@/components/organisms/grid/Container';

const  Footer = ({ children }: { children?: React.ReactNode}) => {
  return (
    <footer role={'footer'}>
      <Container>
        {children}
        <p className={'text-center pt-[30px] pb-[20px]'}>2025 Ⓒ DN - All rights reserved</p>
      </Container>
    </footer>
  );
};

export default Footer;
