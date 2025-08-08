import React from 'react';

const BackgroundImage = ({
  url,
  styles
}: {
  url?: string,
  styles?: string
}) => {
  return (
    <div className={'absolute top-[0] left-[0] rounded-[inherit] h-[100%] w-[100%]'}>
      <img
        src={url ?? '/portfolio/bg_header.png'}
        alt="bg_header.png"
        className={'h-[100%] w-[100%] object-contain object-center ' + styles}
      />
    </div>
  );
};

export default BackgroundImage;
