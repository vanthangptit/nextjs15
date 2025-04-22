import { IFSignIn, IFSignUp, SessionKeys } from '@/utils/types';
import { ACCESS_TOKEN_NAME, API_URLs, STATUS_CODE, USER_NAME } from '@/utils/constants';
import requester from '@/api-client/requester';
import { useToast } from '@/hooks/useToast';

export const useAuth = () => {
  const { toastError } = useToast();
  const signInApi = async (data: IFSignIn) => {
    return requester.post(API_URLs.AUTH.SIGN_IN_URL, data);
  };

  const signUpApi = async (data: IFSignUp) => {
    return requester.post(API_URLs.AUTH.SIGN_UP_URL, data);
  };

  const signOutApi = async (): Promise<void> => {
    const token = sessionStorage.getItem(ACCESS_TOKEN_NAME) ?? undefined;
    const res = await requester.delete(API_URLs.AUTH.SIGN_OUT_URL, {}, false, token);
    if (res.status === STATUS_CODE.SUCCESS) {
      sessionStorage.removeItem(ACCESS_TOKEN_NAME);
      sessionStorage.removeItem(USER_NAME);
    } else {
      toastError(res.message);
    }
  };

  const setAuth = (key: SessionKeys, value: any) => {
    sessionStorage.setItem(key, value);
  };

  const getAuth = (key: string) => {
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
