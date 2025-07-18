import { IFormForgotPassword, IFResetPassword, IFSignIn, IFSignUp, SessionKeys } from '@/utils/types';
import { ACCESS_TOKEN_NAME, API_URLs, APP_ROUTES, STATUS_CODE } from '@/utils/constants';
import requester from '@/libs/requester';
import { getSessionStorage, removeSessionStorage, setSessionStorage } from '@/utils/helpers';
import { redirect, RedirectType } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export const useAuth = () => {
  const { setAuthenticated } = useContext(AuthContext);

  const setAuth = (key: SessionKeys, value: any) => {
    setSessionStorage(key, value);
  };

  const getAuth = (key: SessionKeys) => {
    return getSessionStorage(key) ?? undefined;
  };

  const clearAllAuth = () => {
    removeSessionStorage(ACCESS_TOKEN_NAME);
  };

  const signInApi = async (data: IFSignIn) => {
    return requester.post(API_URLs.AUTH.SIGN_IN_URL, data);
  };

  const signUpApi = async (data: IFSignUp) => {
    return requester.post(API_URLs.AUTH.SIGN_UP_URL, data);
  };

  const signOutApi = async (): Promise<void> => {
    const token = getSessionStorage(ACCESS_TOKEN_NAME) ?? undefined;
    const res =
      await requester.delete(API_URLs.AUTH.SIGN_OUT_URL, {}, true, token);
    if (res.status === STATUS_CODE.SUCCESS) {
      clearAllAuth();
      setAuthenticated(false);
    } else {
      redirect(APP_ROUTES.SIGN_IN, RedirectType.push);
    }
  };

  const forgotPasswordApi = async (values: IFormForgotPassword) => {
    return requester.post(API_URLs.AUTH.FORGOT_PASSWORD, values);
  };

  const resetPasswordApi = async (values: IFResetPassword) => {
    return requester.post(API_URLs.AUTH.RESET_PASSWORD, values);
  };

  return {
    signInApi,
    signUpApi,
    signOutApi,
    setAuth,
    getAuth,
    clearAllAuth,
    forgotPasswordApi,
    resetPasswordApi
  };
};
