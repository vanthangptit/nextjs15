'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import Container from '@/components/organisms/grid/Container';

const Home = () => {
  const { signOutApi } = useAuth();
  return (
    <Container>
      <button onClick={() => signOutApi()}>Logout</button>
    </Container>
  );
};

export default Home;