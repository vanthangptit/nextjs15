import { IFSignIn, IFSignUp, SessionKeys } from '@/utils/types';
import { ACCESS_TOKEN_NAME, API_URLs, STATUS_CODE } from '@/utils/constants';
import requester from '@/libs/requester';
import { useToast } from '@/hooks/useToast';
import { getSessionStorage, removeSessionStorage, setSessionStorage } from '@/utils/helpers';

export const useAuth = () => {
  const { toastError } = useToast();

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
    const res = await requester.delete(API_URLs.AUTH.SIGN_OUT_URL, {}, false, token);
    if (res.status === STATUS_CODE.SUCCESS) {
      clearAllAuth();
    } else {
      toastError(res.message);
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
