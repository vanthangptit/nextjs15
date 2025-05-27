import { APP_ROUTES } from '@/constants/app-urls';

export const authRoutes = [APP_ROUTES.SIGN_IN, APP_ROUTES.SIGN_UP];

export const pathRoutes = {
  protectedRoutes: [APP_ROUTES.DASHBOARD, APP_ROUTES.CREATE_POST],
  publicRoutes: [...authRoutes, APP_ROUTES.HOME]
};