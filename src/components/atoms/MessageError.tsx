import React from 'react';

const MessageError = ({ message, $align = 'left' }: { message: string, $align?: 'center' | 'right' | 'left' }) => {
  const textAlign = `text-${$align}`;
  return (
    <p
      className={`${textAlign} text-xs text-[#dd0505] mt-[5px]`}
    >{message}</p>
  );
};

export default MessageError;
