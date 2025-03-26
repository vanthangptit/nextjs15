export const API_ROOT_URL = process.env.NEXT_PUBLIC_APP_API_ROOT;

export const API_URLs = {
  AUTH: {
    SIGN_UP_URL: `${API_ROOT_URL}/auth/sign-up`,
    REFRESH_TOKEN_URL: `${API_ROOT_URL}/auth/refresh-token`
  }
};