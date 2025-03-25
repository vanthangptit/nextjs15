import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { API_URLs, STATUS_CODE } from '@/utils/constants';
import { IFParamRetryCallApi, Method, ResponseData } from '@/utils/types';
import { sleeper } from '@/utils/helpers';

const setConf = ({ isCredentials= false, token }: { isCredentials?: boolean; token?: string }): AxiosRequestConfig => {
  return {
    withCredentials: isCredentials, // Only true when get token or login
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token ? 'Bearer ' + token : null
    }
  };
};

const verifyCredentials = (url: string, _method?: Method) => {
  switch (url) {
    case API_URLs.AUTH.REFRESH_TOKEN_URL:
      return true;
    default:
      return false;
  }
};

export const responseBody = (response: AxiosResponse, props?: IFParamRetryCallApi) => {
  if (props && props?.retry && response.status === STATUS_CODE.UNAUTHORIZED) {
    return getToken({ method: 'get', url: props.url, params: props.params });
  }
  return response.data;
};

export const errorBody = async (error: AxiosError, props?: IFParamRetryCallApi): Promise<ResponseData> => {
  if (props && props?.retry && error?.response?.status === STATUS_CODE.UNAUTHORIZED) {
    return getToken({ method: 'get', url: props.url, params: props.params });
  }
  return (error.response?.data ? error.response.data : error.response) as ResponseData;
};

export const getToken = async (props: IFParamRetryCallApi): Promise<ResponseData> => {
  try {
    const rs = await axios.get(
      API_URLs.AUTH.REFRESH_TOKEN_URL,
      setConf({ isCredentials: true })
    );
    sessionStorage.setItem('accessToken', rs.data.accessToken);
    return requester[props.method](props.url, props.params, false, rs.data.accessToken);
  } catch (error: any) {
    return errorBody(error);
  }
};

const get = (url: string, params = {}, config: AxiosRequestConfig) => axios.get(url, { params, ...config });
const post = (url: string, data = {}, config: AxiosRequestConfig) => axios.post(url, data, { ...config });
const put = (url: string, data = {}, config: AxiosRequestConfig) => axios.put(url, data, { ...config });
const patch = (url: string, data = {}, config: AxiosRequestConfig) => axios.patch(url, data, { ...config });
const del = (url: string, params = {}, config: AxiosRequestConfig) => axios.delete(url, { params, ...config });

const requester = {
  get: async (url: string, params = {}, retry?: boolean, token?: string): Promise<ResponseData> => {
    try {
      const response = await get(
        url,
        params,
        setConf({ token, isCredentials: verifyCredentials(url, 'get') })
      ).then(sleeper()).then((rs) => rs as AxiosResponse);
      return responseBody(response, { method: 'get', url, params, retry, token });
    } catch (e: any) {
      return errorBody(e, { method: 'get', url, params, retry, token });
    }
  },
  post: async (url: string, data = {}, retry?: boolean, token?: string): Promise<ResponseData> => {
    try {
      const response = await post(
        url,
        data, 
        setConf({ token, isCredentials: verifyCredentials(url, 'post') })
      ).then(sleeper()).then((rs) => rs as AxiosResponse);
      return responseBody(response, { method: 'post', url, params: data, retry, token });
    } catch (e: any) {
      return errorBody(e, { method: 'post', url, params: data, retry, token });
    }
  },
  put: async (url: string, data = {}, retry?: boolean, token?: string): Promise<ResponseData> => {
    try {
      const response = await put(
        url,
        data,
        setConf({ token, isCredentials: verifyCredentials(url, 'put') })
      );
      return responseBody(response, { method: 'put', url, params: data, retry, token });
    } catch (e: any) {
      return errorBody(e, { method: 'put', url, params: data, retry, token });
    }
  },
  patch: async (url: string, data = {}, retry?: boolean, token?: string): Promise<ResponseData> => {
    try {
      const response = await patch( 
        url, 
        data, 
        setConf({ token, isCredentials: verifyCredentials(url, 'patch') }) 
      );
      return responseBody(response, { method: 'patch', url, params: data, retry, token });
    } catch (e: any) {
      return errorBody(e, { method: 'patch', url, params: data, retry, token });
    }
  },
  delete: async (url: string, params = {}, retry?: boolean, token?: string): Promise<ResponseData> => {
    try {
      const response = await del(
        url,
        params,
        setConf({ token, isCredentials: verifyCredentials(url, 'delete') })
      );
      return responseBody(response, { method: 'delete', url, params, retry, token });
    } catch (e: any) {
      return errorBody(e, { method: 'delete', url, params, retry, token });
    }
  }
};

export default requester;
