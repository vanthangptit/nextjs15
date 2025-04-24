import React from 'react';
import { Metadata } from 'next';
import { sharedMetadata } from '@/utils/constants';
import Container from '@/components/organisms/grid/Container';

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Create a post | DN Blog',
  openGraph: {
    ...sharedMetadata.openGraph,
    title: 'Create a post | DN Blog'
  },
  twitter: {
    ...sharedMetadata.twitter,
    title: 'Create a post | DN Blog',
    site: 'http://localhost:3000/create-post'
  }
};

const CreatePost = () => {
  return (
    <Container>
      <h1>Create post</h1>
    </Container>
  );
};

export default CreatePost;
