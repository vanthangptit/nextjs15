import { ToastContainer } from 'react-toastify';
import React from 'react';

const Toast = () => {
  return (
    <ToastContainer
      autoClose={4000}
      theme={'light'}
      position={'top-right'}
    />
  );
};

export default Toast;
