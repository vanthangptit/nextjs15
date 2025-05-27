import { IFSignIn, IFSignUp, SessionKeys } from '@/utils/types';
import { ACCESS_TOKEN_NAME, API_URLs, STATUS_CODE } from '@/utils/constants';
import index from '@/libs/requester';
import { getSessionStorage, removeSessionStorage, setSessionStorage } from '@/utils/helpers';
import { redirect, RedirectType } from 'next/navigation';

export const useAuth = () => {
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
    return index.post(API_URLs.AUTH.SIGN_IN_URL, data);
  };

  const signUpApi = async (data: IFSignUp) => {
    return index.post(API_URLs.AUTH.SIGN_UP_URL, data);
  };

  const signOutApi = async (): Promise<void> => {
    const token = getSessionStorage(ACCESS_TOKEN_NAME) ?? undefined;
    const res = await index.delete(API_URLs.AUTH.SIGN_OUT_URL, {}, true, token);
    if (res.status === STATUS_CODE.SUCCESS) {
      clearAllAuth();
    } else {
      redirect('/signin', RedirectType.push);
    }
  };

  return {
    signInApi,
    signUpApi,
    signOutApi,
    setAuth,
    getAuth,
    clearAllAuth
  };
};
