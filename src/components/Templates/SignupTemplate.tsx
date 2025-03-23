import React, { Fragment } from 'react';
import Header from '@/components/organisms/Header';
import Container from '@/components/organisms/grid/Container';
import Footer from '@/components/organisms/Footer';

interface ILayoutProps {
  children: React.ReactNode
}

const SignupTemplate: React.FC<ILayoutProps> = ({ children }) => {
  const spacingAside: string = 'pl-[20px] pr-[20px]';

  return (
    <Fragment>
      <Header spacingAside={spacingAside} />
      <main>
        <Container>
          {children}
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
};

export default SignupTemplate;
