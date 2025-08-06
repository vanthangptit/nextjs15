import { config } from '@/configs';

export const APP_ROUTES = {
  HOME: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  FORGOT_PASSWORD: '/account/forgot-password',
  CREATE_POST: '/create-post',
  DASHBOARD: '/dashboard'
};

export const API_URLs = {
  AUTH: {
    SIGN_UP_URL: `${config.PUBLIC_API_ROOT_URL}/auth/sign-up`,
    FORGOT_PASSWORD: `${config.PUBLIC_API_ROOT_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${config.PUBLIC_API_ROOT_URL}/auth/reset-password`,
    SIGN_IN_URL: `${config.PUBLIC_API_ROOT_URL}/auth/sign-in`,
    SIGN_OUT_URL: `${config.PUBLIC_API_ROOT_URL}/auth/sign-out`,
    REFRESH_TOKEN_URL: `${config.PUBLIC_API_ROOT_URL}/auth/refresh-token`
  },
  PORTFOLIO: {
    CONTACT: `${config.PUBLIC_API_ROOT_URL}/contact/portfolio`
  }
};