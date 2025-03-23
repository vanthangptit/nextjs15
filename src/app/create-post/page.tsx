import React from 'react';
import Image from 'next/image';

const CreatePost = () => {
  return (
    <div>
      <h1>Create post</h1>
      <Image
        src={'breakpoint-tailwind.png'}
        alt="Picture of the author"
      />
    </div>
  );
};

export default CreatePost;
