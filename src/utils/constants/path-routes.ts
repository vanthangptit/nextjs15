import { APP_ROUTES } from '@/constants/api-urls';

export const pathRoutes = {
  protectedRoutes: [APP_ROUTES.DASHBOARD, APP_ROUTES.CREATE_POST],
  publicRoutes: [APP_ROUTES.SIGN_IN, APP_ROUTES.SIGN_UP, APP_ROUTES.HOME]
};