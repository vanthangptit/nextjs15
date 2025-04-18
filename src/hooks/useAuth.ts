import { IFSignIn, IFSignUp, SessionKeys } from '@/utils/types';
import { API_URLs } from '@/utils/constants';
import requester from '@/api-client/requester';

export const useAuth = () => {
  const signInApi = async (data: IFSignIn) => {
    return requester.post(API_URLs.AUTH.SIGN_IN_URL, data);
  };

  const signUpApi = async (data: IFSignUp) => {
    return requester.post(API_URLs.AUTH.SIGN_UP_URL, data);
  };

  const signOutApi = async () => {
    return requester.delete(API_URLs.AUTH.SIGN_OUT_URL);
  };

  const setAuth = (key: SessionKeys, value: any) => {
    sessionStorage.setItem(key, value);
  };

  const getAuth = (key: SessionKeys) => {
    return sessionStorage.getItem(key) ?? undefined;
  };

  const clearAllAuth = () => sessionStorage.clear();

  return {
    signInApi,
    signUpApi,
    signOutApi,
    setAuth,
    getAuth,
    clearAllAuth
  };
};
