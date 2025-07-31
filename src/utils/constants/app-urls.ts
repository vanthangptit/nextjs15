export const API_ROOT_URL = process.env.NEXT_PUBLIC_APP_API_ROOT;

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
    SIGN_UP_URL: `${API_ROOT_URL}/auth/sign-up`,
    FORGOT_PASSWORD: `${API_ROOT_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_ROOT_URL}/auth/reset-password`,
    SIGN_IN_URL: `${API_ROOT_URL}/auth/sign-in`,
    SIGN_OUT_URL: `${API_ROOT_URL}/auth/sign-out`,
    REFRESH_TOKEN_URL: `${API_ROOT_URL}/auth/refresh-token`
  },
  PORTFOLIO: {
    CONTACT: `${API_ROOT_URL}/contact/portfolio`,
  }
};