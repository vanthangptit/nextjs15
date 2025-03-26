import { toast } from 'react-toastify';

export const useToast = () => {
  const toastInfo = (message: string) => {
    toast.info(message);
  };

  const toastSuccess = (message: string) => {
    toast.success(message);
  };

  const toastWarn = (message: string) => {
    toast.warn(message);
  };

  const toastError = (message: string) => {
    toast.error(message);
  };

  return {
    toastInfo,
    toastSuccess,
    toastWarn,
    toastError
  };
};