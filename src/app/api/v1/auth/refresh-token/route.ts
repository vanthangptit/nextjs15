import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AUTH_SESS_ID_NAME, STATUS_CODE } from '@/utils/constants';
import { ResponseData } from '@/utils/types';
import { getTokenController } from '@/modules/auth/refreshToken/refreshToken.controller';
import { setCookie } from '@/utils/helpers';
import { logger } from '@/modules/logging';

export async function getRefreshToken() {
  const cookieStore = await cookies();
  const refreshToken =
    cookieStore.has(AUTH_SESS_ID_NAME)
      ? cookieStore.get(AUTH_SESS_ID_NAME)?.value
      : null;

  cookieStore.delete(AUTH_SESS_ID_NAME);
  if (!refreshToken) {
    return NextResponse.json({
      status: 401,
      message: 'Access Denied. No token provided or invalid refresh token'
    });
  }

  const {
    status,
    message,
    data
  }: ResponseData =
    await getTokenController.getTokenCtrl(refreshToken);

  if (status !== STATUS_CODE.SUCCESS) {
    return logger.appResponse({ message, status });
  }

  const cookie = setCookie(data.refreshToken);
  return logger.appResponse({
    data: data.accessToken,
    status,
    message
  }, {
    'Set-Cookie': cookie
  });
}

export const GET = getRefreshToken;