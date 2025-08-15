import React from 'react';

const SectionTitle = ({
  title,
  description,
  titleStyles = '',
  descriptionStyles = ''
}: {
  title: string;
  description?: string;
  titleStyles?: string;
  descriptionStyles?: string;
}) => {
  return (
    <div className={
      'text-center text-fill-transparent ' +
      'bg-clip-text bg-[linear-gradient(0deg,rgb(91,90,90)0%,rgb(79,79,79)100%)] dark:bg-[linear-gradient(0deg,rgb(167,164,164)0%,rgb(242,242,242)100%)] ' +
      'mb-7 leading-[1.3]'
    }>
      <h3 className={'text-[#000000] dark:text-[#E7E7E7] text-size-28 sm:text-size-32 lg:text-size-42 mb-[15px] ' + titleStyles}>
        {title}
      </h3>
      {description && (
        <p className={descriptionStyles + ' text-[#000000] dark:text-[#E7E7E7]'}>{description}</p>
      )}
    </div>
  );
};

export default SectionTitle;
