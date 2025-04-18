'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';

const Home = () => {
  const { signOutApi } = useAuth();
  return (
    <main>
      Home
      <button onClick={() => signOutApi()}>Logout</button>
    </main>
  );
};

export default Home;