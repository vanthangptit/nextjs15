import React from 'react';

const DividerBottom = () => {
  return (
    <div className={
      'bg-[linear-gradient(90deg,rgba(211,211,211,0)0%,rgb(211,211,211)26.5766%,rgb(211,211,211)50%,rgb(211,211,211)76.1261%,rgba(211,211,211,0)100%)] ' +
      'dark:bg-[linear-gradient(90deg,rgba(32,34,39,0)0%,rgb(32,34,39)26.5766%,rgb(32,34,39)50%,rgb(32,34,39)76.1261%,rgba(32,34,39,0)100%)] ' +
      ' flex relative w-[100%] h-[1px] overflow-hidden'
    }></div>
  );
};

export default DividerBottom;
